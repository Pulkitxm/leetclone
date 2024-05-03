import { Request, Response } from "express";
import { LoginType, SignupType } from "../types/user";
import { z } from "zod";
import { hashPass, unHashPass } from "../utils/pass";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

export const handleLoginRoute = async (req: Request, res: Response) => {
  try {
    const prisma = new PrismaClient();
    const data = LoginType.parse(req.body);

    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const userPass = unHashPass(
      jwt.verify(user.password, process.env.JWT_SECRET as string) as string
    );

    if (userPass !== data.password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const hashedPass = hashPass(data.password);

    const token = jwt.sign(
      { email: data.email, password: hashedPass },
      process.env.JWT_SECRET as string,
      {
        expiresIn: process.env.JWT_EXPIRES,
      }
    );

    res.cookie("token", token, {
      expires: new Date(Date.now() + 30 * 60 * 1000),
      httpOnly: true,
      secure: true,
    });

    res.status(200).json({
      message: "User logged in successfully",
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: err.issues });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export const handleSignupRoute = async (req: Request, res: Response) => {
  try {
    const prisma = new PrismaClient();
    const data = SignupType.parse(req.body);

    const hashedPass: string = hashPass(data.password);
    const passowrd = jwt.sign(hashedPass, process.env.JWT_SECRET as string);

    const userExists = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userExists) {
      return res.status(400).json({ mesage: "User already exists" });
    }

    const resp = await prisma.user.create({
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
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: err.issues });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
