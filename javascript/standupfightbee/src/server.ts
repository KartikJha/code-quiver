import http from "node:http";
import { connectDB } from "./db";
import { router } from "./router";



const PORT = 7000;

async function initEnv() {
    const env = process.env.NODE_ENV;
    if (!env) {
        process.env.NODE_ENV = "local";
    }

    console.log(`Using environment: ${process.env.NODE_ENV}`);

    const configFile = await import(`../.env.${process.env.NODE_ENV}.json`);

    process.env = {
        ...process.env,
        ...configFile.default
    };
}

async function start() {

    await initEnv();

    console.log(process.env);

    await connectDB();

    const server = http.createServer((req, res) => {
        router(req, res);
    });

    server.listen(PORT, () => {
        console.log(`🚀 Native Node API running on http://localhost:${PORT}`);
    });
}

start();
