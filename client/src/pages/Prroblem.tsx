import { useState } from "react";
import Editor from "../components/Code/Editor";
import defaultLanguages from "../data/defaultLanguages";
import { useParams } from "react-router-dom";
import Options from "../components/Code/Options";
import Description from "../components/Code/Description";

export default function Problems() {
  const problemId = useParams<{ id: string }>().id;

  if (!problemId) throw new Error("Problem ID not found");

  let defaultValue;
  const localState = JSON.parse(localStorage.getItem(problemId) || "{}");

  if (localState) {
    if (
      "javascript" in localState &&
      "python" in localState &&
      "java" in localState &&
      "cpp" in localState
    ) {
      defaultValue = localState;
    } else {
      defaultValue = defaultLanguages;
    }
  }

  let defaultSelected = localStorage.getItem("language");

  if (!defaultSelected) {
    defaultSelected = "javascript";
  } else if (
    defaultSelected !== "javascript" &&
    defaultSelected !== "python" &&
    defaultSelected !== "java" &&
    defaultSelected !== "cpp"
  ) {
    defaultSelected = "javascript";
  }

  const [language, setLanguage] = useState<
    "cpp" | "java" | "python" | "javascript"
  >(defaultSelected as "cpp" | "java" | "python" | "javascript");
  interface AllProbs {
    javascript: string;
    python: string;
    java: string;
    cpp: string;
  }
  const [userInputLang, setUserInputLang] = useState<AllProbs>(defaultValue);

  return (
    <div className="w-full h-full flex">
      <Description problemId={problemId} />
      <div className="h-full w-[50%]">
        <Options language={language} setLanguage={setLanguage} value={userInputLang[language]} />
        <Editor
          lang={language}
          value={userInputLang}
          changeValue={setUserInputLang}
          problemId={problemId}
        />
      </div>
    </div>
  );
}
