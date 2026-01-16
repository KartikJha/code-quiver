import { jokesController } from "./controllers/index";
import http from "node:http";

export function router(req: http.IncomingMessage, res: http.ServerResponse) {


    if (req.url === "/jokes") {
        if (req.method === "GET") {
            jokesController.getJokes(req, res).catch((err: Error) => {
                console.error(err);
                res.writeHead(500);
                res.end("Internal Server Error");
            });
            return;
        }
    }
}
