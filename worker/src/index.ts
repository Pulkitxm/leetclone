import { createClient } from "redis";
import { executeCode } from "./util";
import { CodeType, CodeTypeZod } from "./types";
const client = createClient();

async function processSubmission(submission: string) {
  const obj: CodeType = CodeTypeZod.parse(JSON.parse(submission));

  console.log("Processing submission:", obj);

  const output = await executeCode({
    code: obj.code,
    language: obj.language,
  });
  // console.log("Output:", output);

  const customOutput = {
    output: output.run.stdout,
    error: output.run.code !== 0 ? true : false,
  };

  console.log("Problem ID:", obj.problemId);
  console.log("Custom Output:", customOutput);
  console.log(JSON.stringify({ output: customOutput,problemId: obj.problemId}));
  

  await client.lPush(
    `solutions`,
    JSON.stringify({ output: customOutput,problemId: obj.problemId})
  );

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
