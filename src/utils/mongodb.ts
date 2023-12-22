"use server"
import { MongoClient, ObjectId } from "mongodb";
import type { MongoDBConnection, Project, Card } from "./types";
import { redirect, RedirectType } from "next/navigation";
import { revalidatePath } from "next/cache";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB = process.env.MONGODB;
const QUERY_RESULT_LIMIT = parseInt(process.env.QUERY_RESULT_LIMIT);

if (!MONGODB_URI || !MONGODB || !QUERY_RESULT_LIMIT) {
    throw new Error("Missing/Invalid MongoDB variable(s) in .env.local");
}

let conn: MongoDBConnection = { client: null, db: null };

async function connectToDatabase() {
    if (conn.client) return conn;

    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    conn = { client, db: client.db(MONGODB) };
    return conn;
}

function serialize(mongoQueryResult: Array<any>, fields: Array<string> | undefined = ["_id"]): any {
    try {
        return mongoQueryResult.map((document) => {
            let aux = new Map();
            for (const [key, value] of Object.entries(document)) {
                if (fields.indexOf(key) !== -1) {
                    let val = value as ObjectId;
                    aux.set(key, val.toString());
                } else {
                    aux.set(key, value);
                }
            }
            return Object.fromEntries(aux);
        })
    } catch (err) {
        console.error(err);
    }
}

export async function fetchProjects(projectId?: string | null) {
    const { db } = await connectToDatabase();
    const collection = db.collection("projects");
    const data = await collection
        .find((projectId) ? { "_id": new ObjectId(projectId) } : {})
        .limit(QUERY_RESULT_LIMIT)
        .toArray()
    return serialize(data);
}

export async function fetchCards(fetchParams: { _id?: string, project_id?: string }) {
    try {
        //Serialize fetchParams properties into ObjectIds
        let queryMap = new Map();
        for (const [key, value] of Object.entries(fetchParams)) {
            if (value) queryMap.set(key, new ObjectId(value));
        }
        const query = Object.fromEntries(queryMap);
        const { db } = await connectToDatabase();
        const collection = db.collection('cards');
        const data = await collection
            .find(query)
            .limit(QUERY_RESULT_LIMIT)
            .toArray();
        return serialize(data, ["_id", "project_id"]);
    } catch (err) {
        console.error(err);
    }
}

export async function addProject(formData: any) {
    if (!formData.get("projectName")) throw new Error("Missing input with name='projectName'");

    const newProject: Project = {
        _id: new ObjectId(),
        name: formData.get("projectName")
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

export async function addCard(formData: any) {
    try {
        let data = new Map();
        for (const [key, value] of formData.entries()) {
            data.set(
                key,
                (key.indexOf("_id") !== -1) ? new ObjectId(value) : value
            );
        }
        const newCard : Card = Object.fromEntries(data);
        console.log(newCard);

        const { db } = await connectToDatabase();
        await db
            .collection('cards')
            .insertOne(newCard)
        revalidatePath(`/projects/${newCard.project_id}`);
    } catch (err) {
        console.error(err);
    }
}

export async function deleteCard(cardId: string | ObjectId) {
    try {
        if (!cardId) throw new Error("Error while deleting card: Missing card id");
        const query = {
            "_id": (cardId instanceof ObjectId) ? cardId : new ObjectId(cardId)
        };
        const { db } = await connectToDatabase();
        const card : Card = await db
            .collection('cards')
            .findOne(query);
        await db
            .collection('cards')
            .deleteOne(query)
        revalidatePath(`/projects/${card.project_id}`)
    } catch (err) {
        console.error(err);
    }
}