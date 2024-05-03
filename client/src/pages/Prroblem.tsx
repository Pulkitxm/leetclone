import { useEffect, useState } from "react";
import EditorMonaco from "@monaco-editor/react";
import Editor from "../components/Code/Editor";
import defaultLanguages from "../data/defaultLanguages";
import { useParams } from "react-router-dom";
import RightOptions from "../components/Code/RightOptions";
import Description from "../components/Code/Description";
import LeftOptions from "../components/Code/LeftOptions";
import { getProblem } from "../utils/problems";
import { themeAtom } from "../state/theme";
import { useRecoilValue } from "recoil";

type Problem = {
  name: string;
  topics: string[];
  difficulty: string;
  id: string;
  constraints: string[];
  testCases: string[];
  description: string;
  solutions: {
    javascript: string;
    python: string;
    java: string;
    cpp: string;
  };
};

export default function Problems() {
  const theme = useRecoilValue(themeAtom);
  const [rightSection, setRightSection] = useState<"problem" | "solution">(
    "problem"
  );
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

  const [details, setDetails] = useState<Problem>({
    name: "",
    topics: [],
    difficulty: "",
    id: "",
    constraints: [""],
    testCases: [],
    description: "",
    solutions: {
      javascript: "",
      python: "",
      java: "",
      cpp: "",
    },
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getProblem(problemId).then((res) => {
      const obj = {
        ...res,
        solutions: JSON.parse(res.solutions) as string[],
      };
      setDetails(obj);
      setLoading(false);
    });
  }, [problemId]);

  const [selectedRightLanguage, setselectedRightLanguage] = useState<
    "cpp" | "java" | "python"
  >("cpp");

  const [userInputLang, setUserInputLang] = useState<AllProbs>(defaultValue);
  return (
    <div className="w-full h-full flex justify-center dark:bg-[#0f0f0f]">
      <div className="h-[91%] w-[48%] rounded-xl m-2 overflow-hidden">
        <LeftOptions
          rightSection={rightSection}
          setRightSection={setRightSection}
          selectedRightLanguage={selectedRightLanguage}
          setselectedRightLanguage={setselectedRightLanguage}
        />
        {rightSection === "problem" ? (
          <Description details={details} loading={loading} />
        ) : (
          <EditorMonaco
            className="w-[1000px] h-full text-2xl pt-1"
            language={selectedRightLanguage}
            value={details.solutions[selectedRightLanguage]}
            onChange={() => {}}
            theme={theme == "dark" ? "vs-dark" : "vs-light"}
            options={{
              fontSize: 20,
              mouseWheelZoom: true,
            }}
          />
        )}
      </div>
      <div className="h-[91%] w-[48%] rounded-xl m-2 overflow-hidden">
        <RightOptions
          language={language}
          setLanguage={setLanguage}
          value={userInputLang[language]}
        />
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
