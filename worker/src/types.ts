import { z } from "zod";

export const CodeTypeZod = z.object({
  code: z.string(),
  language: z.string(),
  problemId: z.string(),
});

export type CodeType = z.infer<typeof CodeTypeZod>;