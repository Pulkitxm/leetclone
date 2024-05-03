import { z } from "zod";

export const LoginType = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const SignupType = z.object({
  email: z.string().email(),
  password: z.string(),
  rePassword: z.string().min(8),
});