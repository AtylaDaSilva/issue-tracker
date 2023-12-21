"use server"
import { MongoClient, ObjectId } from "mongodb";
import type { MongoDBConnection, Project } from "./types";
import { redirect, RedirectType } from "next/navigation";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB = process.env.MONGODB;
const QUERY_RESULT_LIMIT = process.env.QUERY_RESULT_LIMIT;

if (!MONGODB_URI || !MONGODB || !QUERY_RESULT_LIMIT) {
    throw new Error("Missing/Invalid MongoDB variable(s) in .env.local");
}

let conn: MongoDBConnection = { client: null, db: null };

export async function connectToDatabase() {
    if (conn.client) return conn;

    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    conn = { client, db: client.db(MONGODB) };
    return conn;
}

export async function fetchProjects(projectId?: string | null) {
    const { db } = await connectToDatabase();
    const collection = db.collection("projects");
    let data;
    if (projectId) {
        data = await collection.findOne({ _id: new ObjectId(projectId) });
        data._id = data._id.toString();
        for (let card of data.cards) {
            card._id = card._id.toString();
        }
    } else {
        data = await collection
            .find({})
            .limit(parseInt(QUERY_RESULT_LIMIT))
            .toArray()
        for (let document of data) {
            document._id = document._id.toString();
            for (let card of document.cards) {
                card._id = card._id.toString();
            }
        }
    }
    return data;
}

export async function addProject(formData: any) {
    if (!formData.get("projectName")) throw new Error("Missing input with name='projectName'");

    const newProject: Project = {
        _id: new ObjectId(),
        name: formData.get("projectName"),
        cards: []
    };

    var success: boolean = false;

    try {
        const { db } = await connectToDatabase();
        const collection = db.collection('projects');
        await collection.insertOne(newProject);
        success = true;
    } catch (err) {
        console.error(err);
    } finally {
        (success)
            ? redirect(`/projects/${newProject._id}`, RedirectType.replace)
            : redirect("/", RedirectType.replace);
    }
}

export async function deleteProject(projectId: string | ObjectId) {
    if (!projectId) throw new Error("Missing project id");
    var success: boolean = false;
    try {
        const { db } = await connectToDatabase();
        const collection = db.collection('projects');
        await collection.deleteOne({
            "_id": (projectId instanceof ObjectId)
                ? projectId
                : new ObjectId(projectId)
        });
        success = true;
    } catch (err) {
        console.error(err);
    } finally {
        if (success) redirect("/", RedirectType.replace);
    }
}