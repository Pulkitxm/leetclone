import { Router } from "express";
import { client } from "../redis";
import { PrismaClient } from "@prisma/client";

const codeRouter = Router();

codeRouter.get("/", async (req, res) => {
    try {
        const prisma= new PrismaClient();
        const problems= await prisma.problem.findMany();
        const allProbs= problems.map((prob)=> {
            return {
                name:prob.name,
                topics:prob.topics,
                difficulty:prob.difficulty,
                id:prob.id
            }
        });
        return res.status(200).json(allProbs);
    } catch (error) {
        res.status(500).send("Failed to fetch problems.");
    }
});

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