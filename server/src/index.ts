import express from "express";
import { client } from "./redis";
import codeRouter from "./routes/code";
import UserRouter from "./routes/user";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

//routes
app.use("/api/_v1/codes",codeRouter);
app.use("/api/_v1/user",UserRouter);

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