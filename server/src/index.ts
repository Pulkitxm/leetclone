import express from "express";
import { client } from "./redis";
import codeRouter from "./routes/code";

const app = express();
app.use(express.json());

//routes
app.use("/codes",codeRouter);

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