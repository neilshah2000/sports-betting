import "dotenv/config";
import express, { Express, Request, Response } from "express";
import cookieParser from "cookie-parser";
import axios from "axios";
import jwt from "jsonwebtoken";
import { authenticateToken } from "./authenticate";

const app = express();
app.use(express.json());
app.use(cookieParser());
const port = 4000;

const headers = {
  "X-RapidAPI-Key": process.env.XRapidAPIKey,
  "X-RapidAPI-Host": process.env.XRapidAPIHost,
};

const mySecret = process.env.JWTSECRET || "some-secret";

//TODO: switch from proxy to CORS

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/login", (req, res) => {
  //   console.log(`${req.body.username}`);
  //   console.log(`${req.body.password}`);
  if (req.body.username === "testuser" && req.body.password === "testpass") {
    // TODO: remove secret to env file
    const token = jwt.sign("myusername", mySecret);
    // console.log("token", token);
    res.json({ token });
  } else {
    res.status(401).send({ error: "unauthorized" });
  }
});

app.get("/odds", authenticateToken, async (req, res) => {
  //   console.log(req.query.fixtureId);
  const fixtureId = req.query.fixtureId;
  const options = {
    method: "GET",
    url: "https://api-football-v1.p.rapidapi.com/v3/odds",
    params: { fixture: fixtureId },
    headers,
  };

  try {
    const response = await axios.request(options);
    // console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error(error);
  }
});

app.get("/fixture", authenticateToken, async (req, res) => {
  //   console.log(req.query.fixtureId);
  const fixtureId = req.query.fixtureId;
  const options = {
    method: "GET",
    url: "https://api-football-v1.p.rapidapi.com/v3/fixtures",
    params: { id: fixtureId },
    headers,
  };

  try {
    const response = await axios.request(options);
    // console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error(error);
  }
});

app.get("/fixtures", authenticateToken, async (req, res) => {
  const options = {
    method: "GET",
    url: "https://api-football-v1.p.rapidapi.com/v3/fixtures",
    // params: {
    //   league: "39",
    //   season: "2023",
    //   from: "2024-01-01",
    //   to: "2024-04-07",
    // },
    params: { next: "50" },
    headers,
  };

  try {
    const response = await axios.request(options);
    // console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
