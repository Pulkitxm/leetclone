import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { executeCode } from "../../utils/code";

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
    dispOutput: string;
  }[];
  setShowExecution: Dispatch<SetStateAction<boolean>>;
}) {
  const [show, setShow] = useState(1);
  const [testCaseConfig, setTestCaseConfig] = useState<
    {
      input: string;
      output: string;
      isCompleted: {
        status: boolean;
        message: string;
      };
      isRunning: boolean;
    }[]
  >([]);
  const [status, setStatus] = useState<
    {
      status: boolean;
      message: string;
    }[]
  >([]);
  useEffect(() => {
    setTestCaseConfig(
      testCases.map((_, index) => {
        return {
          input: testCases[index].input,
          output: testCases[index].output,
          isCompleted: {
            status: false,
            message: "",
          },
          isRunning: false,
        };
      })
    );
    setStatus(
      Array(testCases.length).fill({
        status: false,
        message: "",
      })
    );
  }, [testCases]);
  useEffect(() => {
    let isFetched = false;
    for (let i = 0; i < testCaseConfig.length; i++) {
      if (!testCaseConfig[i].isCompleted) {
        isFetched = false;
        break;
      }
      isFetched = true;
    }

    if (isFetched || !testCases.length) return setRunFetching(false);
    const run = async () => {
      for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i];
        setTestCaseConfig((prev) => {
          prev[i].isRunning = true;
          return [...prev];
        });
        const res = await executeCode(
          value,
          language,
          JSON.parse(testCase.input)
        );
        setStatus((prev) => {
          prev[i] = {
            status: true,
            message: res.status === "error" ? "error" : res.message,
          };
          return [...prev];
        });
        setTestCaseConfig((prev) => {
          prev[i].isRunning = false;
          prev[i].isCompleted = {
            status: true,
            message:
              res.status === "error"
                ? "error"
                : res.message == testCase.output
                ? "success"
                : "error",
          };
          return [...prev];
        });
      }
      setRunFetching(false);
      // setAlert()
    };
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testCases]);
  return (
    <div className="w-[47%] h-[400px] text-2xl pt-1 fixed bottom-0 bg-[#262626] z-50 p-5 dark:text-white overflow-auto">
      <div className="flex justify-between pr-5">
        <p className="my-5">Execution</p>
        <p className="my-5">
          <svg
            onClick={() => {
              setShowExecution(false);
              setRunFetching(false);
            }}
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
        {testCaseConfig.length
          ? testCaseConfig.map((testCaseConfig, index) => {
              return (
                <div
                  onClick={() => {
                    setShow(index + 1);
                  }}
                  key={index}
                  className={`${
                    testCaseConfig.isRunning ? "animate-pulse" : ""
                  } text-lg bg-gray-700 text-white inline-flex items-center justify-center mx-4 px-3 py-1 rounded-xl select-none cursor-pointer hover:opacity-80`}
                >
                  <div
                    className={`w-2 h-2 mr-2 rounded-full bg-${
                      status[index].status
                        ? status[index].message === "error"
                          ? "red-500"
                          : "green-500"
                        : "white"
                    }`}
                  ></div>
                  Case {index + 1}
                </div>
              );
            })
          : null}
      </div>
      {testCases.length ? (
        show ? (
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
                {testCases[show - 1].dispOutput}
              </p>
              <p className="text-lg mr-2"></p>
            </div>
          </div>
        ) : null
      ) : null}
    </div>
  );
}
