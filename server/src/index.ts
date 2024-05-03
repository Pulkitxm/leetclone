import express from "express";
import { client } from "./redis";
import codeRouter from "./routes/code";
import UserRouter from "./routes/user";
import cors from "cors";
import cookiesParser from "cookie-parser";
import morgan from "morgan";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookiesParser());
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
}));

//routes
app.use("/api/_v1/codes", codeRouter);
app.use("/api/_v1/user", UserRouter);

async function startServer() {
  try {
    await client.connect();
    console.log("Connected to Redis");

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.error("Failed to connect to Redis", error);
  }
}
startServer();
