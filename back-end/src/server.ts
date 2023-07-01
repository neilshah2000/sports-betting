import express from "express";
import cookieParser from "cookie-parser";
import { apiRouter } from "./api";
import path from "path";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
const port = 4000;

app.use("/api", apiRouter);

app.get("*", function (req, res) {
  res.sendFile("index.html", { root: path.resolve(__dirname, "./../public") });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
