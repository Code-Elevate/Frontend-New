import Editor from "@monaco-editor/react";
import React, { useRef, useState } from "react";
import { useData } from "../context/DataContext";

const languages = ["javascript", "python", "java", "cpp"];

const CodeEditor = ({ width, height, problem, setOutput, setError }) => {
  const editorRef = useRef(null);
  const [language, setLanguage] = useState("cpp");

  const [monaco, setMonaco] = useState(null);
  const [code, setCode] = useState(
    `#include <iostream> \nusing namespace std; \nint main() \n{ \n\tcout << "Hello World"; \n\treturn 0; \n}`
  );

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    setMonaco(monaco);
  }

  const handleEditorChange = (value, event) => {
    setCode(value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const showValue = () => {
    const value = editorRef.current.getValue();
    setCode(value);
  };

  const handleRun = () => {
    showValue();

    let data = {
      language: language,
      code: code,
      stdin: problem.samples.map((sample) => sample.input),
    };

    console.log(data);

    fetch(`https://code-elevate.onrender.com/api/problems/${problem.id}/run`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: language,
        code: code,
        stdin: ["40", "30"],
      }),
    })
      .then((res) => {
        res.json().then((data) => {
          console.log(data);
          setOutput(data);
        });
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  };

  const handleSubmit = () => {
    showValue();

    let data = {
      language: language,
      code: code,
      stdin: ["40", "30"],
    };

    console.log(data);

    fetch(
      `https://code-elevate.onrender.com/api/problems/${problem.problemId}/submit`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: language,
          code: code,
          stdin: ["40", "30"],
        }),
      }
    )
      .then((res) => {
        res.json().then((data) => {
          console.log(data);
          setOutput(data);
        });
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  };

  return (
    <div
      style={{ width: width, height: height }}
      className={`flex flex-col gap-2 border p-3 border-gray-300 bg-white`}
    >
      <div className={`flex w-full h-[50px] border-b border-gray-300`}>
        <select
          value={language}
          onChange={handleLanguageChange}
          className="w-auto h-[35px] px-2 bg-white text-gray-800 hover:bg-gray-200 rounded-md focus:outline-none transition duration-300 ease-in-out"
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
        <div className="flex items-center justify-end gap-4 w-full">
          <button
            onClick={handleRun}
            className="bg-green-500 text-white hover:bg-green-600 rounded-md px-4 py-1"
          >
            Run
          </button>
          {/* <button
        onClick={handleSubmit}
        className="bg-green-500 text-white hover:bg-green-600 rounded-md px-4 py-1"
      >
        Submit
      </button> */}
        </div>
      </div>
      <Editor
        theme="light"
        defaultLanguage="cpp"
        language={language}
        value={code}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        className="w-full h-full"
      />
    </div>
  );
};

export default CodeEditor;
