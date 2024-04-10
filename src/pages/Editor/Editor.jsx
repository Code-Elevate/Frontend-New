import CodeEditor from "../../components/CodeEditor";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Editor = () => {
  const location = useLocation();

  const { contestId, problemId } = location.state;

  const [problem, setProblem] = useState(null);
  const [currentTestCase, setCurrentTestCase] = useState(0);
  const [output, setOutput] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProblem = () => {
      fetch(`https://code-elevate.onrender.com/api/problems/${problemId}`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error("Problem not found");
        })
        .then((data) => {
          console.log(data);
          setProblem(data);
        })
        .catch((error) => {
          console.error("Error fetching problem:", error);
        });
    };

    localStorage.removeItem("output");
    localStorage.removeItem("error");

    fetchProblem();
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-row">
      <div className="w-1/2 h-full flex flex-col py-4 px-6">
        <div className="w-full h-full ">
          {problem && (
            <div className="flex flex-col h-full">
              <h1 className="text-2xl font-bold mb-4">{problem.title}</h1>

              <div className="mb-2">
                <h2 className="text-lg font-semibold">Statement:</h2>
                <p>{problem.statement}</p>
              </div>

              <div className="mb-2">
                <h2 className="text-lg font-semibold">Constraints:</h2>
                <p>{problem.constraints}</p>
              </div>

              <div className="mb-2">
                <h2 className="text-lg font-semibold">Input:</h2>
                <p>{problem.input}</p>
              </div>

              <div className="mb-2">
                <h2 className="text-lg font-semibold">Output:</h2>
                <p>{problem.output}</p>
              </div>

              <div className="mb-2 flex flex-row gap-1">
                <h2 className="text-lg font-semibold">Tags:</h2>
                <div className="flex flex-row gap-2">
                  {problem.tags.map((tag, index) => (
                    <div className="bg-gray-200 px-2 py-1 rounded" key={index}>
                      {tag}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-2">
                <h2 className="text-lg font-semibold">
                  Difficulty:{" "}
                  <span className="font-normal">{problem.difficulty}</span>
                </h2>
              </div>

              <div className="mb-2">
                <h2 className="text-lg font-semibold">Test Cases:</h2>
                <div className="flex flex-row gap-2">
                  {problem.samples.map((testCase, index) => (
                    <div
                      onClick={() => setCurrentTestCase(index)}
                      className="bg-gray-200 px-2 py-1 rounded"
                      key={index}
                    >
                      TestCase-0{index + 1}
                    </div>
                  ))}
                </div>
                <div className="mt-2">
                  <h4 className="text-lg font-semibold">
                    Input:{" "}
                    <span className="text-sm font-normal">
                      {problem.samples[currentTestCase].input}
                    </span>
                  </h4>
                  <h4 className="text-lg font-semibold">
                    Output:{" "}
                    <span className="text-sm font-normal">
                      {problem.samples[currentTestCase].output}
                    </span>
                  </h4>
                  <h4 className="text-lg font-semibold">
                    Explanation:{" "}
                    <span className="text-sm font-normal">
                      {problem.samples[currentTestCase].explanation}
                    </span>
                  </h4>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="w-full h-1/2"></div>
      </div>
      <div className="w-1/2 h-full">
        <CodeEditor
          width="100%"
          height="60%"
          problem={problem}
          setOutput={setOutput}
          setError={setError}
        />
        <div className="w-full h-[40%]">
          <h1 className="text-2xl font-bold mb-4">Output</h1>
          {output && output?.run.length > 0 && (
            <div className="flex flex-col h-full">
              <h2 className="text-lg font-semibold">Test Cases:</h2>
              <div className="flex flex-row gap-2">
                {problem.samples.map((testCase, index) => (
                  <div
                    onClick={() => setCurrentTestCase(index)}
                    className="bg-gray-200 px-2 py-1 rounded cursor-pointer"
                    key={index}
                  >
                    TestCase-0{index + 1}
                  </div>
                ))}
              </div>
              <div className="mt-2">
                <h4 className="text-lg font-semibold">
                  Input:{" "}
                  <span className="text-sm font-normal">
                    {problem.samples[currentTestCase].input}
                  </span>
                </h4>
                <h4 className="text-lg font-semibold">
                  Expected Output:{" "}
                  <span className="text-sm font-normal">
                    {problem.samples[currentTestCase].output}
                  </span>
                </h4>
                <h4 className="text-lg font-semibold">
                  Actual Output:{" "}
                  <span
                    className={`text-sm font-normal ${
                      output.run[currentTestCase]?.output ===
                      problem.samples[currentTestCase].output
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {output.run[currentTestCase]?.output}
                  </span>
                </h4>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Editor;
