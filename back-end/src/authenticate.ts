// authentication middleware
import "dotenv/config";
import jwt from "jsonwebtoken";
import { Express, Request, Response, NextFunction } from "express";

const mySecret = process.env.JWTSECRET || "some-secret";

export function authenticateToken(req: any, res: Response, next: NextFunction) {
  const token = req.cookies.token;
  //   console.log("token", token);

  if (token == null) return res.status(401).send({ error: "unauthorized" });

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
