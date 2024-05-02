import { supportedLangsVersions } from "./config";
import { CodeType } from "./types";

export const executeCode = async (obj: CodeType) => {
  
  const lang = obj.language;
  const langVersions = supportedLangsVersions;
  if (!langVersions[`${lang}`]) throw new Error("Language not supported");
  const version = langVersions[`${lang}`];
  const resp: any = await fetch("https://emkc.org/api/v2/piston/execute", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      language: obj.language,
      version,
      files: [
        {
          content: obj.code,
        },
      ],
    }),
  });
  const data = await resp.json();
  return data;
};
