import { MongoClient } from "mongodb";

const uri =
    process.env.MONGO_URI ??
    "mongodb://standupfight:strongpassword@localhost:27017/standupfightdb?authSource=standupfightdb";

export const client = new MongoClient(uri);

export async function connectDB() {
    await client.connect();
    console.log("✅ MongoDB connected");
    return client.db(); // appdb
}
