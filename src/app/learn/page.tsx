"use client";
import Editor from "@monaco-editor/react";
import { useState, useRef } from "react";
import axios from "axios";
import { Languages } from "./languages";

export default function CodeRunner() {
  const [code, setCode] = useState(`console.log("Code With Me")`);
  const [selectedLanguage, setSelectedLanguage] = useState(Languages[0]);
  const [output, setOutput] = useState("");

  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isRunning, setIsRunning] = useState(false);

  const [inputs, setInputs] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = Languages.find(l => l.name === e.target.value);
    if (lang) setSelectedLanguage(lang);
  };

  const runCode = async () => {
    if (!buttonRef.current) return;

    setIsRunning(true)
    buttonRef.current.disabled = true;

    console.log(`inputs: ${inputs}`);

    try {
      const res = await axios.post("https://emkc.org/api/v2/piston/execute/", {
        language: selectedLanguage.name,
        version: selectedLanguage.version,
        files: [{
          name: "test.js",
          content: code,
        }],
        stdin: inputs.replaceAll("\\n", "\n")
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

  const addInput = () => {
    setInputs(inputs + "\\n");
    console.log(inputs);
  }

  return (
    <div className="p-5 space-y-5">

      <label className="block mb-2 text-sm font-medium text-white">Language:</label>
      <select
        value={selectedLanguage.name}
        onChange={handleChange}
        className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-600"
      >
        {Languages.map(lang => (
          <option key={lang.name} value={lang.name}>
            {lang.name}
          </option>
        ))}
      </select>

      <button
        ref={buttonRef}
        onClick={runCode}
        className={`px-4 py-2 mx-2 bg-green-600 text-white rounded ${isRunning ? "opacity-50" : " "}`}
      >
        {isRunning ? "running..." : "run"}
      </button>

      <div className="rounded-2xl overflow-hidden shadow-lg shadow-green-400 border-4 border-amber-200">
        <Editor
          height="300px"
          defaultLanguage={selectedLanguage.name}
          language={selectedLanguage.name}
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || "")}
        />
      </div>

      <label className="block mb-2 text-sm font-medium text-white">Inputs:</label>
      <input type="text" className="bg-black p-2 font-bold" value={inputs} onChange={(e) => setInputs(e.currentTarget.value)}/>
      <button onClick={addInput}>➕</button>

      <pre className="bg-black text-white p-3 rounded-2xl">
        {output || "Output will appear here..."}
      </pre>
    </div>
  );
}
