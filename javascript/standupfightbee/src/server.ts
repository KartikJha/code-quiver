import http from "node:http";
import { connectDB } from "./db";
import { router } from "./router";


const PORT = 7000;

async function start() {
    await connectDB();

    const server = http.createServer((req, res) => {
        router(req, res);
    });

    server.listen(PORT, () => {
        console.log(`🚀 Native Node API running on http://localhost:${PORT}`);
    });
}

start();
