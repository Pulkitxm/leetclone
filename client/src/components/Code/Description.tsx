import { useEffect, useState } from "react";
import { getProblem } from "../../utils/problems";

type Problem = {
  name: string;
  topics: string[];
  difficulty: string;
  id: string;
  constraints: string;
  testCases: string[];
  description: string;
};

export default function Description({ problemId }: { problemId: string }) {
  const [details, setDetails] = useState<Problem>({
    name: "",
    topics: [],
    difficulty: "",
    id: "",
    constraints: "",
    testCases: [],
    description: "",
  });

  useEffect(() => {
    getProblem(problemId).then((res) => {
      setDetails(res);
    });
  }, [problemId]);

  return <div className="w-[50%] h-full dark:text-black">
    <div className="flex justify-between">
      <h1 className="text-2xl font-bold">{details.name}</h1>
      <p className="text-lg font-semibold">{details.difficulty}</p>
    </div>
    <div className="flex justify-between">
      <p className="text-lg font-semibold">{details.topics.join(", ")}</p>
      <p className="text-lg font-semibold">{details.constraints}</p>
    </div>
    <p className="text-lg font-semibold">{details.description}</p>
  </div>;
}
