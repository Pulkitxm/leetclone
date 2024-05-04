import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { executeCode } from "../../utils/code";
import { alertAtom } from "../../state/alert";
import { useSetRecoilState } from "recoil";

export default function Execution({
  value,
  language,
  setRunFetching,
  testCases,
  setShowExecution,
}: {
  value: string;
  language: string;
  setRunFetching: Dispatch<SetStateAction<boolean>>;
  testCases: {
    input: string;
    output: string;
    dispInput: string;
  }[];
  setShowExecution: Dispatch<SetStateAction<boolean>>;
}) {
  const setAlert = useSetRecoilState(alertAtom);
  const [activeRunning, setActiveRunning] = useState(0);
  const [show, setShow] = useState(1);
  const [completed, setCompleted] = useState(
    Array(testCases.length).fill({
      completed: false,
      type: "error",
    })
  );
  useEffect(() => {
    setCompleted(
      Array(testCases.length).fill({
        completed: false,
        type: "error",
      })
    );
  }, [testCases]);
  useEffect(() => {
    const run = async () => {
      if (!testCases.length) return;
      for (let i: number = 0; i < testCases.length; i++) {
        if (completed[i] && completed[i].completed) continue;
        const testCase = testCases[i];
        {
          setActiveRunning(i);
          const res = await executeCode(
            value,
            language,
            JSON.parse(testCase.input)
          );
          if (res.status == "error") {
            setAlert({
              type: "error",
              message: res.message,
              position: "bottom-left",
              show: true,
            });
            setCompleted((prev) => {
              const newCompleted = [...prev];
              newCompleted[i].completed = true;
              newCompleted[i].type = "error";
              return newCompleted;
            });
          } else {
            setCompleted((prev) => {
              const newCompleted = [...prev];
              newCompleted[i].completed = true;
              newCompleted[i].type = "success";
              return newCompleted;
            });
          }
          setRunFetching(false);
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      setActiveRunning(-1);
    };
    run().then(() => {
      if (testCases.length)
        setAlert({
          type: "success",
          message: "Code executed successfully",
          position: "bottom-left",
          show: true,
        });
    });
  }, [completed, language, setAlert, setRunFetching, testCases, value]);
  return (
    <div
      className="w-[47%] h-[400px] text-2xl pt-1 fixed bottom-0 bg-[#262626] z-50 p-5 dark:text-white overflow-auto"
      // onClick={run}
    >
      <div className="flex justify-between pr-5">
        <p className="my-5">Execution</p>
        <p className="my-5">
          <svg
            onClick={() => setShowExecution(false)}
            fill="#fff"
            version="1.1"
            id="Capa_1"
            viewBox="0 0 490 490"
            className="w-4 h-4 cursor-pointer"
          >
            <polygon
              points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490 
	489.292,457.678 277.331,245.004 489.292,32.337 "
            />
          </svg>
        </p>
      </div>
      <div className="w-full my-5 text-green-500">Analyzing your code</div>
      <div className="my-5">
        {testCases.map((_, index) => {
          return (
            <div
              onClick={() => {
                setShow(index + 1);
              }}
              key={index}
              className={`${
                activeRunning === index ? "animate-pulse" : ""
              } text-lg bg-gray-700 text-white inline-flex items-center justify-center mx-4 px-3 py-1 rounded-xl select-none cursor-pointer hover:opacity-80`}
            >
              <div
                className={`w-2 h-2 mr-2 rounded-full bg-${
                  completed[index] && completed[index].completed
                    ? completed[index].type == "error"
                      ? "red-100"
                      : "green-400"
                    : "white"
                }`}
              ></div>
              Case {index + 1}
            </div>
          );
        })}
      </div>
      {testCases.length
        ? show && (
            <div className="my-5">
              <div className="flex flex-col">
                <p className="text-lg mr-2">Input:</p>
                {Object.keys(JSON.parse(testCases[show - 1].input)).map(
                  (key, idx) => (
                    <p
                      key={idx}
                      className="text-lg opacity-50 bg-gray-600 my-2 p-3 rounded-xl"
                    >
                      {key}: {JSON.parse(testCases[show - 1].input)[key]}
                    </p>
                  )
                )}
              </div>
              <div className="flex flex-col my-6">
                <p className="text-lg mr-2">Output:</p>
                <p className="text-lg opacity-50 bg-gray-600 my-2 p-3 rounded-xl">
                  {testCases[show - 1].output}
                </p>
                <p className="text-lg mr-2"></p>
              </div>
            </div>
          )
        : null}
    </div>
  );
}
