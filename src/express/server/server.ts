import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import http from "http";
import { CONTROLLER } from "../controller/controller";
const app = express();
const server = http.createServer(app);

app.use(morgan("combined"));
app.use(helmet())
app.use(cors());
app.use(express.json());
CONTROLLER.forEach(controller => app.use("/api/v1/", controller));


export {
    server
}