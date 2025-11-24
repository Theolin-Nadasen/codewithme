"use client";
import Editor from "@monaco-editor/react";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Languages } from "./languages";
import toast, { Toaster } from "react-hot-toast";

interface Sample {
  id: number;
  language: string;
  name: string;
  content: string;
  inputs: string;
}

export default function CodeRunner() {

  const [code, setCode] = useState(`console.log("Code With Me")`);
  const [output, setOutput] = useState("");

  const [selectedLanguage, setSelectedLanguage] = useState(Languages[0]);
  const [selectedSample, setSelectedSample] = useState("");

  const [samples, setSamples] = useState<Sample[]>([]);

  useEffect(() => {
    const fetchAndFilterSamples = () => {
      axios.get("/api/sample_code")
        .then((response) => {
          const filteredSamples = response.data.rows.filter((item: Sample) => {
            return item.language === selectedLanguage.name;
          });

          setSamples(filteredSamples);
        })
        .catch(error => {
          console.error("Error fetching samples:", error);
        });
    };

    fetchAndFilterSamples();
  }, [selectedLanguage]);

  useEffect(() => {
    const loadCodeFromStorage = () => {
      const codeData = localStorage.getItem('code-data');
      if (codeData) {
        try {
          const { code, language } = JSON.parse(codeData);
          setCode(code);
          const langObject = Languages.find(l => l.name.toLowerCase() === language.toLowerCase());
          if (langObject) {
            setSelectedLanguage(langObject);
          } else {
            setSelectedLanguage(Languages[0]);
          }
        } catch (error) {
          console.error("Error parsing code data from localStorage:", error);
        } finally {
          localStorage.removeItem('code-data');
        }
      }
    };

    // Load code when the component mounts
    loadCodeFromStorage();

    // Add event listener for when code is sent from the chatbox on the same page
    window.addEventListener('new-code-to-try', loadCodeFromStorage);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('new-code-to-try', loadCodeFromStorage);
    };
  }, []);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isRunning, setIsRunning] = useState(false);

  const [inputs, setInputs] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = Languages.find(l => l.name === e.target.value);
    if (lang) setSelectedLanguage(lang);
  };

  const handleSampleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sampleName = e.target.value;
    setSelectedSample(sampleName);

    if (sampleName === "") {
      setCode("");
      setInputs("");
      return;
    }

    const sample = samples.find((s) => s.name === sampleName);
    if (sample) {
      setCode(sample.content);
      setInputs(sample.inputs);
    }
  }

  const runCode = async () => {
    if (!buttonRef.current) return;

    setIsRunning(true);
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
        toast.error("errors in code");
      } else {
        toast.success("ran code");
      }


    } catch (err) {
      setOutput("Error running code.");
      console.error(err);
      toast.error("something went wrong");
    }

    setIsRunning(false);
    buttonRef.current.disabled = false;
  };

  const addInput = () => {
    setInputs(inputs + "\\n");
    console.log(inputs);
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 lg:p-8 flex flex-col">
      <Toaster position="bottom-right" toastOptions={{ style: { background: '#333', color: '#fff' } }} />

      <header className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-extrabold text-green-400 tracking-tight">
          Code Playground
        </h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select
              value={selectedLanguage.name}
              onChange={handleChange}
              className="appearance-none bg-gray-900 border border-gray-700 text-white py-2 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all cursor-pointer hover:bg-gray-800"
            >
              {Languages.map(lang => (
                <option key={lang.name} value={lang.name}>
                  {lang.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </div>
          </div>

          <div className="relative">
            <select
              value={selectedSample}
              onChange={handleSampleChange}
              className="appearance-none bg-gray-900 border border-gray-700 text-white py-2 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all cursor-pointer hover:bg-gray-800"
            >
              <option value="">Select Sample</option>
              {samples.map(sample => (
                <option key={sample.name} value={sample.name}>
                  {sample.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Editor Section */}
        <div className="lg:col-span-2 flex flex-col">
          <div className="flex-1 rounded-2xl overflow-hidden shadow-2xl shadow-green-900/20 border border-gray-800 relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 pointer-events-none" />
            <Editor
              height="100%"
              defaultLanguage={selectedLanguage.name}
              language={selectedLanguage.name}
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || "")}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                padding: { top: 20 },
                scrollBeyondLastLine: false,
                smoothScrolling: true,
              }}
            />
          </div>
        </div>

        {/* Controls & Output Section */}
        <div className="flex flex-col space-y-6">

          {/* Run Button */}
          <button
            ref={buttonRef}
            onClick={runCode}
            disabled={isRunning}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg ${isRunning
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white shadow-green-500/30"
              }`}
          >
            {isRunning ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Running...
              </span>
            ) : (
              "Run Code"
            )}
          </button>

          {/* Inputs */}
          <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-gray-300">Standard Input (stdin)</label>
              <button
                onClick={addInput}
                className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-2 py-1 rounded transition-colors"
                title="Add newline"
              >
                + New Line
              </button>
            </div>
            <textarea
              className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-sm font-mono text-gray-300 focus:outline-none focus:border-green-500 transition-colors resize-none"
              rows={3}
              value={inputs}
              onChange={(e) => setInputs(e.currentTarget.value)}
              placeholder="Enter inputs here..."
            />
          </div>

          {/* Output Terminal */}
          <div className="flex-1 bg-black rounded-xl border border-gray-800 p-4 flex flex-col font-mono text-sm shadow-inner overflow-hidden">
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-800">
              <span className="text-gray-500 text-xs uppercase tracking-wider">Terminal Output</span>
              <div className="flex space-x-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/20"></div>
              </div>
            </div>
            <div className="flex-1 overflow-auto custom-scrollbar">
              <pre className="whitespace-pre-wrap text-green-400/90">
                {output || <span className="text-gray-600 italic">Ready to execute...</span>}
              </pre>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
