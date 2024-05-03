import Editor from "@monaco-editor/react";
import { useRecoilValue } from "recoil";
import { themeAtom } from "../../state/theme";

export default function CodeEditor({ lang }: { lang: string }) {
  const theme = useRecoilValue(themeAtom);
  return (
    <Editor
      className="w-full h-full text-2xl"
      defaultLanguage={lang}
      defaultValue="// some comment"
      theme={theme == "dark" ? "vs-dark" : "vs-light"}
      options={{
        scrollBeyondLastLine:false,
        fontSize:20,
        fastScrollSensitivity: 1,
        mouseWheelScrollSensitivity: 1,
        smoothScrolling: true,
        mouseWheelZoom: true,
    }}
    />
  );
}
