import { useRecoilValue } from "recoil";
import { allProbsAtom } from "../state/code";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const allProbs = useRecoilValue(allProbsAtom);
  const navigate = useNavigate();
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
          {allProbs.map((prob, idx) => {
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
                <td className="px-6 py-4 text-lg">{prob.topics.join(", ")}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
