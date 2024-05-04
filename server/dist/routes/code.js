"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const redis_1 = require("../redis");
const client_1 = require("@prisma/client");
const codeRouter = (0, express_1.Router)();
codeRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prisma = new client_1.PrismaClient();
        const problems = yield prisma.problem.findMany();
        const allProbs = problems.map((prob) => {
            return {
                name: prob.name,
                topics: prob.topics,
                difficulty: prob.difficulty,
                id: prob.id,
            };
        });
        return res.status(200).json(allProbs);
    }
    catch (error) {
        res.status(500).send("Failed to fetch problems.");
    }
}));
codeRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prisma = new client_1.PrismaClient();
        const problem = yield prisma.problem.findUnique({
            where: {
                id: req.params.id,
            },
        });
        if (!problem)
            return res.status(404).send("Problem not found.");
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
    }
    catch (error) {
        res.status(500).send("Failed to fetch problems.");
    }
}));
codeRouter.post("/submit", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.body.code;
    const language = req.body.language;
    const problemId = req.body.problemId;
    try {
        yield redis_1.client.lPush(`problems`, JSON.stringify({ code, language, problemId }));
        return res.status(200).send("Submission received and stored.");
    }
    catch (error) {
        console.error("Redis error:", error);
        res.status(500).send("Failed to store submission.");
    }
}));
codeRouter.get("/check/problem/:problemId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const problemId = req.params.problemId;
    try {
        // redis
        const output = yield redis_1.client.brPop(`solutions`, 0);
        if (!output)
            return res.status(404).send("Output not found.");
        const data = JSON.parse(output.element);
        if (data.problemId !== problemId)
            return res.status(404).send("Output not found.");
        return res.status(200).json({
            status: data.output.status,
            message: data.output.message,
        });
    }
    catch (error) {
        console.error("Redis error:", error);
        res.status(500).send("Failed to check submission.");
    }
}));
exports.default = codeRouter;
