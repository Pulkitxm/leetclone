import { useState } from "react";
import Editor from "../components/Code/Editor";

export default function Prroblems() {
  const [language, setLanguage] = useState();
  return (
    <div className="w-full h-full grid grid-cols-2">
      <div className="w-full bg-red-100"></div>
      <Editor lang="javascript"/>
    </div>
  );
}