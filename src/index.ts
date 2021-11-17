import express from "express";
import bodyParser from "body-parser";

import db from "./db";

import error from "./middlewares/error";
import { register } from "./controllers/user";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Hello world"));

app.post("/user", register);

app.use(error);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});

db.on("error", console.error.bind(console, "MongoDB connection error:"));
