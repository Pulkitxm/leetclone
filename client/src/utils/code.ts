import axios from "axios";
import { baseUrl } from "../config";
import { v4 as uuid } from "uuid";

export const executeCode = async (code: string, language: string) => {
  const problemId = uuid();
  console.log("Problem ID:", problemId);

  const res = await axios.post(baseUrl + "/api/_v1/codes/submit", {
    code,
    language,
    problemId,
  });
  console.log(res.data);

  let isExecuted = false;
  while (!isExecuted) {
    try {
      console.log("Checking...");
      const res = await axios.get(
        baseUrl + "/api/_v1/codes/check/problem/" + problemId
      );
      console.log(res.data);
      isExecuted = true;
    } catch (error) {
      console.log("Error:", error);
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
};
