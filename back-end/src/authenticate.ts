// authentication middleware
import "dotenv/config";
import jwt from "jsonwebtoken";
import { Express, Request, Response, NextFunction } from "express";

const mySecret = process.env.JWTSECRET || "some-secret";

export function authenticateToken(req: any, res: Response, next: NextFunction) {
  const authHeader = req.header("authorization");
  console.log("authHeader", authHeader);

  if (!authHeader) return res.status(401).send({ error: "unauthorized" });

  const token = authHeader.split(" ")[1];
  console.log("token", token);

  try {
    jwt.verify(token, mySecret as string, (err: any, user: any) => {
      if (err) {
        console.log(err);
        return res.status(403).send({ error: "unauthorized" });
      } else {
        req.user = user;

        next();
      }
    });
  } catch (e) {
    console.log("JWT Error");
    return res.status(403).send({ error: "unauthorized" });
  }
}
