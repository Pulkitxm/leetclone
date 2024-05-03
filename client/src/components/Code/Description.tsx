import Loader from "../Loader";

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

export default function Description({
  details,
  loading,
}: {
  details: Problem;
  loading: boolean;
}) {
  return (
    <div
      className={`overflow-y-auto w-full h-full rounded-xl m-2 overflow-hidden p-5 dark:text-white dark:bg-[#1e1e1e] ${
        loading ? "flex justify-center items-center" : ""
      }`}
    >
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="flex items-center my-2">
            <h1 className="text-2xl font-bold mr-2 cursor-text select-none">
              {details.name}
            </h1>
            <p className="text-lg font-semibold h-full bg-[#3c3c3c] text-[#46c6c2] p-1 px-2 rounded-lg cursor-text select-none shadow-[0_10px_100px_rgba(255,255,255,_0.2)]">
              {details.difficulty}
            </p>
          </div>
          <div className="flex my-5">
            {details.topics.map((topic, idx) => {
              return (
                <div
                  key={idx}
                  className="text-lg font-semibold h-10 bg-[#3c3c3c] text-white p-1 px-2 rounded-lg cursor-text select-none mx-2 z-10"
                >
                  {topic}
                </div>
              );
            })}
          </div>
          <div className="text-lg font-semibold">{details.description}</div>
          <div className="text-lg font-semibold my-10">
            Test Cases:
            {details.testCases.map((testCase, idx) => {
              const { input, output } = JSON.parse(testCase);
              return (
                <div key={idx} className="pl-5 my-5">
                  <div className="my-0.5">
                    <p className="inline-block mr-5">Input:</p>
                    <p className="inline-block opacity-70">{input}</p>
                  </div>
                  <div className="my-0.5">
                    <p className="inline-block mr-5">Output:</p>
                    <p className="inline-block opacity-70">{output}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            Constrains
            <ul>
              {details.constraints.map((constraint, idx) => {
                return (
                  <li key={idx} className="m-5 flex items-center">
                    <div className="h-2 w-2 rounded-full bg-white mr-3"></div>
                    <p className="inline-block bg-gray-700 p-1 rounded-md">
                      {constraint}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="h-[50px]"></div>
        </div>
      )}
    </div>
  );
}
