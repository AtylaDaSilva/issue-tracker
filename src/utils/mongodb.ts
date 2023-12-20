"use server"
import { MongoClient, ObjectId } from "mongodb";
import type { MongoDBConnection, Project } from "./types";
import { redirect } from "next/navigation";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB = process.env.MONGODB;
const QUERY_RESULT_LIMIT = process.env.QUERY_RESULT_LIMIT;

if (!MONGODB_URI || !MONGODB || !QUERY_RESULT_LIMIT) {
    throw new Error("Missing/Invalid MongoDB variable(s) in .env.local");
}

let conn: MongoDBConnection = {client: null, db: null};

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
    const data = (projectId)
        ? collection.findOne({ _id: new ObjectId(projectId) })
        : collection
            .find({})
            .limit(parseInt(QUERY_RESULT_LIMIT))
            .toArray()
    return data;
}

export async function addProject(formData: any) {
    try {
        if (!formData.get("projectName")) throw new Error("Missing input with name='projectName'");

        const newProject: Project = {
            _id: new ObjectId(),
            name: formData.get("projectName"),
            cards: []
        };
        
        const { db } = await connectToDatabase();
        const collection = db.collection('projects');
        await collection.insertOne(newProject);

        //redirect(`/projects/${newProject._id.toString()}`);
    } catch (err) { 
        console.error(err);
    }
}