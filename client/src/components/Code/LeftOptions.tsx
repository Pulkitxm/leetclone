import { Dispatch, SetStateAction } from "react";
import { executeCode } from "../../utils/code";

export default function LeftOptions({
  selectedRightLanguage,
  setselectedRightLanguage,
  rightSection,
  setRightSection,
}: {
  selectedRightLanguage: string;
  rightSection: "problem" | "solution";
  setRightSection: Dispatch<SetStateAction<"problem" | "solution">>;
  setselectedRightLanguage: Dispatch<
    SetStateAction<"python" | "java" | "cpp">
  >;
}) {
  return (
    <div className="flex dark:bg-[#1e1e1e] bg:[rgb(255 255 254)] border-b-2 pl-4 dark:border-white dark:text-white ">
      <p
        className={`m-2 cursor-pointer ${
          rightSection == "problem" ? "text-red-200" : ""
        } `}
        onClick={() => setRightSection("problem")}
      >
        Problem
      </p>
      <p
        className={`m-2 cursor-pointer ${
          rightSection == "solution" ? "text-red-200" : ""
        } `}
        onClick={() => setRightSection("solution")}
      >
        Solution
      </p>
      {rightSection === "solution" && (
        <div className="flex items-center">
          <select
            id="countries"
            className="w-[200px] bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={selectedRightLanguage}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setselectedRightLanguage(
                e.target.value as "python" | "java" | "cpp"
              );
              localStorage.setItem("language", e.target.value);
            }}
          >
            <option value="cpp">CPP</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
          </select>
        </div>
      )}
    </div>
  );
}
