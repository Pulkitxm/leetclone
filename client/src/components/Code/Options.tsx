import { Dispatch, SetStateAction } from "react";

export default function Options({
  language,
  setLanguage,
}: {
  language: string;
  setLanguage: Dispatch<
    SetStateAction<"javascript" | "python" | "java" | "cpp">
  >;
}) {
  return (
    <div className="flex dark:bg-[#1e1e1e] bg:[rgb(255 255 254)] border-b-2 dark:border-white dark:text-white ">
      <select
        id="countries"
        className="w-[50%] bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={language}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          setLanguage(
            e.target.value as "javascript" | "python" | "java" | "cpp"
          );
          localStorage.setItem("language", e.target.value);
        }}
      >
        <option value="javascript">Javascript</option>
        <option value="cpp">CPP</option>
        <option value="java">Java</option>
        <option value="python">Python</option>
      </select>
      <button className="w-[25%] bg-gray-800 flex items-center justify-center border-x-2 hover:opacity-80">
        Run
      </button>
      <button className="w-[25%] bg-gray-800 flex items-center justify-center">
        Save
      </button>
    </div>
  );
}
