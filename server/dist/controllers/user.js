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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSignupRoute = exports.handleLoginRoute = void 0;
const user_1 = require("../types/user");
const zod_1 = require("zod");
const pass_1 = require("../utils/pass");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const handleLoginRoute = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prisma = new client_1.PrismaClient();
        const data = user_1.LoginType.parse(req.body);
        const user = yield prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const userPass = (0, pass_1.unHashPass)(jsonwebtoken_1.default.verify(user.password, process.env.JWT_SECRET));
        if (userPass !== data.password) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const hashedPass = (0, pass_1.hashPass)(data.password);
        const token = jsonwebtoken_1.default.sign({ email: data.email, password: hashedPass }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES,
        });
        res.cookie("token", token, {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        });
        res.status(200).json({
            message: "User logged in successfully",
        });
    }
    catch (err) {
        if (err instanceof zod_1.z.ZodError) {
            res.status(400).json({ error: err.issues });
        }
        else {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
});
exports.handleLoginRoute = handleLoginRoute;
const handleSignupRoute = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prisma = new client_1.PrismaClient();
        const data = user_1.SignupType.parse(req.body);
        const hashedPass = (0, pass_1.hashPass)(data.password);
        const passowrd = jsonwebtoken_1.default.sign(hashedPass, process.env.JWT_SECRET);
        const userExists = yield prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });
        if (userExists) {
            return res.status(400).json({ mesage: "User already exists" });
        }
        const resp = yield prisma.user.create({
            data: {
                email: data.email,
                password: passowrd,
                name: data.email.split("@")[0],
            },
        });
        res.status(200).json({
            message: "User signed up successfully",
            resp,
        });
    }
    catch (err) {
        if (err instanceof zod_1.z.ZodError) {
            res.status(400).json({ error: err.issues });
        }
        else {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
});
exports.handleSignupRoute = handleSignupRoute;
