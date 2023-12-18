import { MongoClient, ObjectId } from "mongodb";

const { MONGODB_URI, MONGODB, QUERY_RESULT_LIMIT } = process.env;

if (!MONGODB_URI || !MONGODB || !QUERY_RESULT_LIMIT) { 
    throw new Error("Missing/Invalid MongoDB variable(s) in .env.local");
}

let conn = { client: null, db: null }

export async function connectToDatabase() { 
    if (conn.client) return conn;

    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    conn = { client, db: client.db(MONGODB) };
    return conn;
}

export async function fetchProjects(projectId) {
    const { db } = await connectToDatabase();
    const collection = db.collection("projects");
    const data = (projectId)
        ? collection.findOne({project_id: parseInt(projectId)})
        : collection
            .find({})
            .limit(parseInt(QUERY_RESULT_LIMIT))
            .toArray()
    return data;
}