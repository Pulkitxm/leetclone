import { createClient } from "redis";
import { executeCode } from "./util";
import { CodeType, CodeTypeZod } from "./types";
const client = createClient();

async function processSubmission(submission: string) {
  const obj: CodeType = CodeTypeZod.parse(JSON.parse(submission));
  const output = await executeCode(obj);
  console.log("Output:", output);
  return output;
}

async function startWorker() {
  try {
    await client.connect();
    console.log("Worker connected to Redis.");
    while (true) {
      try {
        const submission = await client.brPop("problems", 0);
        if (!submission) continue;
        await processSubmission(submission.element);
      } catch (error) {
        console.error("Error processing submission:", error);
      }
    }
  } catch (error) {
    console.error("Failed to connect to Redis", error);
  }
}
startWorker();
