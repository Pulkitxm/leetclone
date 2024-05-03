import Editor from "@monaco-editor/react";
import { useRecoilValue } from "recoil";
import { themeAtom } from "../../state/theme";

interface AllProbs {
  javascript: string;
  python: string;
  java: string;
  cpp: string;
}

export default function CodeEditor({
  lang,
  value,
  changeValue,
  problemId
}: {
  lang: "cpp" | "java" | "python" | "javascript";
  value: AllProbs;
  changeValue?: (_: AllProbs) => void;
  problemId: string;
}) {
  const theme = useRecoilValue(themeAtom);
  const handleChangeValue = (val: string) => {
    if (!changeValue) return;
    const newState = { ...value };
    newState[lang] = val;
    changeValue(newState);
    
    localStorage.setItem(problemId, JSON.stringify(newState));
  };
  return (
    <Editor
      className="w-[1000px] h-full text-2xl pt-1"
      language={lang}
      value={value[lang]}
      onChange={(val) => handleChangeValue(val ? val : "")}
      theme={theme == "dark" ? "vs-dark" : "vs-light"}
      options={{
        fontSize: 20,
        mouseWheelZoom: true,
      }}
    />
  );
}
