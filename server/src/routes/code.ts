import { Router } from "express";
import { client } from "../redis";
import { PrismaClient } from "@prisma/client";

const codeRouter = Router();

codeRouter.get("/", async (req, res) => {
  try {
    const prisma = new PrismaClient();
    const problems = await prisma.problem.findMany();
    const allProbs = problems.map((prob) => {
      return {
        name: prob.name,
        topics: prob.topics,
        difficulty: prob.difficulty,
        id: prob.id,
      };
    });
    return res.status(200).json(allProbs);
  } catch (error) {
    res.status(500).send("Failed to fetch problems.");
  }
});

codeRouter.get("/:id", async (req, res) => {
  try {
    const prisma = new PrismaClient();
    const problem = await prisma.problem.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!problem) return res.status(404).send("Problem not found.");

    return res.status(200).json({
      name: problem.name,
      topics: problem.topics,
      difficulty: problem.difficulty,
      id: problem.id,
      constraints: problem.Constraints,
      testCases: problem.testCases,
      description: problem.description,
      solutions: problem.Solutions,
    });
  } catch (error) {
    res.status(500).send("Failed to fetch problems.");
  }
});

codeRouter.post("/submit", async (req, res) => {
  const code = req.body.code;
  const language = req.body.language;
  const problemId = req.body.problemId;
  try {
    await client.lPush(
      `problems`,
      JSON.stringify({ code, language, problemId })
    );
    return res.status(200).send("Submission received and stored.");
  } catch (error) {
    console.error("Redis error:", error);
    res.status(500).send("Failed to store submission.");
  }
});

codeRouter.get("/check/problem/:problemId", async (req, res) => {
  const problemId = req.params.problemId;
  try {
    // redis
    const output = await client.brPop(`solutions`, 0);
    if(!output) return res.status(404).send("Output not found.");

    const data = JSON.parse(output.element);
    if (data.problemId !== problemId) return res.status(404).send("Output not found.");
    return res.status(200).json({
      status: data.output.status,
      message: data.output.message,
    });
  } catch (error) {
    console.error("Redis error:", error);
    res.status(500).send("Failed to check submission.");
  }
});

export default codeRouter;
