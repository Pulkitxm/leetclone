import { Router } from "express";
import { client } from "../redis";

const codeRouter = Router();

codeRouter.post("/submit", async (req, res) => {
    const code = req.body.code;
    const language = req.body.language;

    try {
        await client.lPush("problems", JSON.stringify({ code, language }));
        res.status(200).send("Submission received and stored.");
    } catch (error) {
        console.error("Redis error:", error);
        res.status(500).send("Failed to store submission.");
    }
});

export default codeRouter;