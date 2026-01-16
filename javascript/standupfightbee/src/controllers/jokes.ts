import http from "node:http";
import { connectDB } from "../db";

export async function getJokes(req: http.IncomingMessage, res: http.ServerResponse) {
    const db = await connectDB();
    const collection = db.collection("jokes");
    const jokes = await collection.find().toArray();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(jokes));
}