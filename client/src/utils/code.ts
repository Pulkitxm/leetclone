import axios from "axios";
import { baseUrl } from "../config";
import { v4 as uuid } from "uuid";

export const executeCode = async (code: string, language: string) => {
  const problemId = uuid();
  await axios.post(baseUrl + "/api/_v1/codes/submit", {
    code,
    language,
    problemId,
  });
  try {
    const res = await axios.get(
      baseUrl + "/api/_v1/codes/check/problem/" + problemId
    );
    console.log(res.data);
  } catch (error) {
    console.log("Error:", error);
  }
};