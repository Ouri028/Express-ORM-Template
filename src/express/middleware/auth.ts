import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const config = process.env;

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
        error: "ERROR",
        message: "A token is required for authentication"
    });
  }
  try {
    const decoded = jwt.verify(token, <jwt.Secret> config.TOKEN_SECRET);
    req.body.user = decoded;
  } catch (err) {
    return res.status(401).send({
        error: "AUTH_ERROR",
        message: "Invalid Token"
    });
  }
  return next();
};

module.exports = verifyToken;