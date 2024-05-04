import axios from "axios";
import { baseUrl } from "../config";
import { v4 as uuid } from "uuid";

export const executeCode = async (
  code: string,
  language: string,
  testCase: any
) => {
  const problemId = uuid();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const replacable: { [key: string]: any } = testCase;
  let newCode = code;
  Object.keys(replacable).forEach((key) => {
    newCode = newCode.replace(new RegExp(`{{{${key}}}}`, "g"), replacable[key]);
  });
  newCode = newCode.replace(/\\n/g, " ");
  try {
    await axios.post(baseUrl + "/api/_v1/codes/submit", {
      code: newCode,
      language:language==="cpp"?"c++":language,
      problemId,
    });
    const res = await axios.get(
      baseUrl + "/api/_v1/codes/check/problem/" + problemId
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Failed to execute code.",
    };
  }
};