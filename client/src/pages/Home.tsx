import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProblems } from "../utils/problems";

type Problem = {
  id: string;
  name: string;
  difficulty: string;
  topics: string[];
};

export default function Home() {
  const [allProbs, setAllProbs] = useState<Problem[] | []>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProblems().then((res: Problem[]) => {
      setAllProbs(res);
    });
  });

  return (
    <div className="w-full h-full overflow-auto bg-white dark:bg-gray-400 p-5 pb-20">
      <table className="w-full lg:w-[80%] lg:rounded-2xl overflow-hidden mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
          <tr>
            <th scope="col" className="px-6 py-3 text-2xl">
              No.
            </th>
            <th scope="col" className="px-6 py-3 text-2xl">
              Title
            </th>
            <th scope="col" className="px-6 py-3 text-2xl">
              Difficuly
            </th>
            <th scope="col" className="px-6 py-3 text-2xl">
              Topic
            </th>
          </tr>
        </thead>
        <tbody className="overflow-auto">
          {allProbs.length != 0 ? (
            allProbs.map((prob, idx) => {
              let lightColor = "",
                darkColor = "";

              if (idx % 2 == 0) {
                lightColor = "gray-300";
                darkColor = "gray-800";
              } else {
                lightColor = "gray-100";
                darkColor = "gray-700";
              }

              return (
                <tr
                  key={idx}
                  onClick={() => navigate(`/${prob.id}`)}
                  className={`bg-${lightColor} dark:bg-${darkColor} hover:opacity-95 cursor-pointer`}
                >
                  <td className="px-6 py-4 text-lg">{idx + 1}</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-lg"
                  >
                    {prob.name}
                  </th>
                  <td className="px-6 py-4 text-lg">{prob.difficulty}</td>
                  <td className="px-6 py-4 text-lg">
                    {prob.topics.join(", ")}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr className="bg-gray-300 dark:bg-gray-800 hover:opacity-95 cursor-pointer">
              <td className="px-6 py-4 text-lg" colSpan={4}>
                <div className="w-full flex justify-center items-center">
                  <div className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 dark:text-white dark:invert flex space-x-2 justify-center items-center h-10">
                    <span className="sr-only">Loading...</span>
                    <div className="h-3 w-3 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="h-3 w-3 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="h-3 w-3 bg-black rounded-full animate-bounce"></div>
                  </div>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
