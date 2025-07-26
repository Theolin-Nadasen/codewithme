"use client";
import Editor from "@monaco-editor/react";
import { useState, useRef } from "react";
import axios from "axios";

export default function CodeRunner() {
  const [code, setCode] = useState(`console.log("Hello world!")`);
  const [output, setOutput] = useState("");

  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isRunning, setIsRunning] = useState(false);

  const runCode = async () => {
    if (!buttonRef.current) return;

    setIsRunning(true)
    buttonRef.current.disabled = true;

    try {
      const res = await axios.post("https://emkc.org/api/v2/piston/execute/", {
        language: "js",
        version: "18.15.0",
        files: [{
          name: "test.js",
          content: code,
        }]
      });

      setOutput(res.data.run.stdout);
      if (res.data.run.stderr) {
        setOutput(res.data.run.stderr);
      }
    } catch (err) {
      setOutput("Error running code.");
      console.error(err);
    }

    setIsRunning(false)
    buttonRef.current.disabled = false;
  };

  return (
    <div className="p-5 space-y-5">
      <div className="rounded-2xl overflow-hidden shadow-lg shadow-green-400 border-4 border-amber-200">
        <Editor
          height="300px"
          defaultLanguage="javascript"
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || "")}
        />
      </div>

      <button
        ref={buttonRef}
        onClick={runCode}
        className={`px-4 py-2 bg-green-600 text-white rounded ${isRunning ? "opacity-50" : " "}`}
      >
        {isRunning ? "running..." : "run"}
      </button>

      <pre className="bg-black text-white p-3 rounded-2xl">
        {output || "Output will appear here..."}
      </pre>
    </div>
  );
}
