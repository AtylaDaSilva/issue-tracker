"use server"
import { MongoClient, ObjectId } from "mongodb";
import type { MongoDBConnection, Project, Card } from "./types";
import { redirect, RedirectType } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

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

function serialize(mongoQueryResult: Array<any>): any {
    try {
        return mongoQueryResult.map((document) => {
            let aux = new Map();
            for (const [key, value] of Object.entries(document)) {
                if (key.indexOf("_id") !== -1) {
                    let val = value as ObjectId;
                    aux.set(key, val.toString());
                } else {
                    aux.set(key, value);
                }
            }
            return Object.fromEntries(aux);
        })
    } catch (err) {
        console.error("Error while serializing data: ", err);
    }
}

export async function fetchProjects(userId: string | ObjectId, projectId?: string | null) {
    try {
        if (!userId) throw new Error("User id missing.");
        const { db } = await connectToDatabase();
        const collection = db.collection("projects");
        const data = await collection
            .find(
                (projectId)
                    ? { "$and": [{ _id: { "$eq": new ObjectId(projectId) } }, { user_id: { "$eq": (userId instanceof ObjectId) ? userId : new ObjectId(userId) } }] }
                    : { user_id: (userId instanceof ObjectId) ? userId : new ObjectId(userId) }
            )
            .limit(QUERY_RESULT_LIMIT)
            .toArray()
        return serialize(data);
    } catch (err) {
        console.error("Error while fetching projects: ", err);
    }
}

export async function addProject(formData: any) {
    if (!formData.get("projectName")) throw new Error("Missing input with name='projectName'");

    const user = await fetchUserByEmail(formData.get("email"), false);

    const newProject: Project = {
        _id: new ObjectId(),
        name: formData.get("projectName"),
        user_id: user._id
    };

    var success: boolean = false;

    try {
        const { db } = await connectToDatabase();
        const collection = db.collection('projects');
        await collection.insertOne(newProject);
        success = true;
    } catch (err) {
        console.error("Error while adding project: ", err);
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
        await deleteAllCards();
        await db
            .collection('projects')
            .deleteOne({
                "_id": (projectId instanceof ObjectId)
                    ? projectId
                    : new ObjectId(projectId)
            });
        success = true;
    } catch (err) {
        console.error("Error while deleting project", err);
    } finally {
        if (success) redirect("/", RedirectType.replace);
    }
}

export async function fetchCards(fetchParams: { user_id: string, _id?: string, project_id?: string }) {
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
            .find({
                "$and": [
                    { user_id: { "$eq": new ObjectId(fetchParams.user_id) } },
                    query
                ]
            })
            .limit(QUERY_RESULT_LIMIT)
            .toArray();
        return serialize(data);
    } catch (err) {
        console.error("Error while fetching cards: ", err);
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
        const newCard: Card = Object.fromEntries(data);
        const { db } = await connectToDatabase();
        await db
            .collection('cards')
            .insertOne(newCard)
        revalidatePath(`/projects/${newCard.project_id}`);
    } catch (err) {
        console.error("Error while adding card: ", err);
    }
}

export async function deleteCard(cardId: string | ObjectId) {
    try {
        if (!cardId) throw new Error("Error while deleting card: Missing card id");
        const query = {
            "_id": (cardId instanceof ObjectId) ? cardId : new ObjectId(cardId)
        };
        const { db } = await connectToDatabase();
        const card: Card = await db
            .collection('cards')
            .findOne(query);
        await db
            .collection('cards')
            .deleteOne(query)
        revalidatePath(`/projects/${card.project_id}`)
    } catch (err) {
        console.error("Error while deleting card: ", err);
    }
}

/**Deletes ALL cards from database. This function should NOT be exported */
async function deleteAllCards() {
    try {
        const { db } = await connectToDatabase();
        return await (db
            .collection("cards")
            .deleteMany({}));

    } catch (err) {
        console.error("Error while deleting all cards: ", err);
    }
}

export async function fetchUserByCredentials(credentials: Record<"email" | "password", string>, serialized: boolean = true) {
    try {
        const { email, password } = credentials;
        const { db } = await connectToDatabase();
        const user = await (db
            .collection("users")
            .findOne({
                "$and": [
                    { email: { "$eq": email } },
                    { password: { "$eq": password } }
                ]
            }));
        return (serialized) ? serialize([user])[0] : user;
    } catch (err) {
        console.error("Error while fetching user by credentials: ", err);
    }
}

export async function fetchUserByEmail(email: string, serialized: boolean = true) {
    try {
        if (!email) throw new Error("E-mail missing.")
        const { db } = await connectToDatabase();
        const user = await (
            db
                .collection("users")
                .findOne({ email: email })
        )
        return (serialized) ? serialize([user])[0] : user;
    } catch (err) {
        console.error("Error while fetching user by email: ", err);
    }
}

export async function getSession() {
    return await getServerSession(authOptions);
}