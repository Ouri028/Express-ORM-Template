import { Router, Request, Response } from "express";
const ROOT = Router();
const auth = require("../middleware/auth");
const config = process.env;

ROOT.get("/", auth, (req: Request, res: Response) => {
    return res.send({
        message: "Hello, World"
    }).status(200);
});

export {
    ROOT
}