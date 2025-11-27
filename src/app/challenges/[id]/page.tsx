"use client";
import Editor from "@monaco-editor/react";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import PageTutorial from "@/components/page_tutorial";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { completeChallenge } from "@/app/actions/challenges";
import { useSession } from "next-auth/react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

interface Challenge {
    id: string;
    title: string;
    description: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    language: string;
    starterCode: string;
    solutionCode: string;
    testCode: string;
    expectedOutput: string;
    proOnly: boolean;
}

export default function ChallengePage() {
    const params = useParams();
    const router = useRouter();
    const { id } = params;
    const { data: session } = useSession();
    const { width, height } = useWindowSize();

    const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
    const [code, setCode] = useState("");
    const [output, setOutput] = useState("");
    const [isRunning, setIsRunning] = useState(false);
    const [showSolution, setShowSolution] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'failure'>('idle');
    const [showConfetti, setShowConfetti] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [rankIncrease, setRankIncrease] = useState(0);

    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        async function fetchChallenge() {
            if (id) {
                try {
                    const response = await fetch('/api/challenges');
                    const challenges = await response.json();
                    const challenge = challenges.find((c: Challenge) => c.id === id);

                    if (challenge) {
                        // Check pro access if trying to access directly via URL
                        if (challenge.proOnly) {
                            const isPro = session?.user?.proStatus || session?.user?.role === 'admin';
                            if (session && !isPro) {
                                toast.error("This challenge is for Pro members only!");
                                router.push("/challenges");
                                return;
                            }
                        }
                        setSelectedChallenge(challenge);
                        setCode(challenge.starterCode);
                    } else {
                        toast.error("Challenge not found");
                        router.push("/challenges");
                    }
                } catch (error) {
                    console.error("Error fetching challenge:", error);
                    toast.error("Failed to load challenge");
                    router.push("/challenges");
                }
            }
        }

        fetchChallenge();
    }, [id, router, session]);

    const runCode = async () => {
        if (!buttonRef.current || !selectedChallenge) return;

        setIsRunning(true);
        buttonRef.current.disabled = true;
        setStatus('idle');
        setOutput("Running tests...");
        setShowConfetti(false);
        setShowModal(false);

        try {
            // Combine user code with test code
            const fullCode = `${code}\n\n${selectedChallenge.testCode}`;

            // Determine file extension based on language
            let fileName = "test.py";
            if (selectedChallenge.language === "javascript") fileName = "test.js";
            if (selectedChallenge.language === "typescript") fileName = "test.ts";
            if (selectedChallenge.language === "c") fileName = "test.c";

            const res = await axios.post("https://emkc.org/api/v2/piston/execute/", {
                language: selectedChallenge.language,
                version: "*", // Use latest available
                files: [{
                    name: fileName,
                    content: fullCode,
                }],
            });

            const runOutput = res.data.run.stdout.trim();
            const stderr = res.data.run.stderr;

            if (stderr) {
                setOutput(stderr);
                setStatus('failure');
                toast.error("Error in code execution");
            } else {
                setOutput(runOutput);

                // Compare output with expected output
                // Normalize newlines for comparison
                const normalizedOutput = runOutput.replace(/\r\n/g, '\n').trim();
                const normalizedExpected = selectedChallenge.expectedOutput.replace(/\r\n/g, '\n').trim();

                if (normalizedOutput === normalizedExpected) {
                    setStatus('success');
                    setShowConfetti(true);

                    // Call server action to record completion and give rewards
                    const result = await completeChallenge(selectedChallenge.id);
                    if (result.success) {
                        if (result.rankIncrease > 0) {
                            setRankIncrease(result.rankIncrease);
                            setShowModal(true);
                        } else {
                            toast.success("Challenge Passed! (Already completed)", { duration: 3000 });
                        }
                    } else {
                        toast.success("Challenge Passed! (Not logged in)", { duration: 3000 });
                    }

                } else {
                    setStatus('failure');
                    toast.error("Challenge Failed. Output does not match expected.");
                }
            }

        } catch (err) {
            setOutput("Error running code.");
            console.error(err);
            toast.error("Something went wrong");
        }

        setIsRunning(false);
        buttonRef.current.disabled = false;
    };

    const toggleSolution = () => {
        if (!selectedChallenge) return;

        if (showSolution) {
            setCode(selectedChallenge.starterCode);
        } else {
            setCode(selectedChallenge.solutionCode);
        }
        setShowSolution(!showSolution);
    };

    if (!selectedChallenge) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading challenge...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-4 sm:p-6 lg:p-8 flex flex-col relative overflow-hidden">
            {showConfetti && <Confetti width={width} height={height} recycle={false} numberOfPieces={500} />}
            <PageTutorial tutorialId="challenges" delay={1500} />
            <Toaster position="bottom-right" toastOptions={{ style: { background: '#333', color: '#fff' } }} />

            {/* Congratulations Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-green-500 rounded-2xl p-8 max-w-md w-full text-center relative animate-in fade-in zoom-in duration-300">
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                            <div className="bg-green-500 rounded-full p-4 shadow-lg shadow-green-500/50">
                                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>

                        <h2 className="text-3xl font-extrabold text-green-400 mt-8 mb-4">Congratulations!</h2>
                        <p className="text-xl text-white mb-2">You completed</p>
                        <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-6">
                            {selectedChallenge.title}
                        </p>

                        <div className="bg-gray-800/50 rounded-xl p-4 mb-6">
                            <p className="text-gray-400 text-sm mb-2">Rank Points Earned</p>
                            <p className="text-4xl font-extrabold text-green-400">+{rankIncrease}</p>
                        </div>

                        <button
                            onClick={() => setShowModal(false)}
                            className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-green-500/30"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            )}

            <header className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10">
                <div>
                    <div className="flex items-center gap-4 mb-2">
                        <Link href="/challenges" className="text-gray-400 hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </Link>
                        <h1 className="text-3xl font-extrabold text-green-400 tracking-tight">
                            {selectedChallenge.title}
                        </h1>
                        {selectedChallenge.proOnly && (
                            <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">PRO</span>
                        )}
                    </div>
                    <p className="text-gray-400 text-sm ml-10">
                        {selectedChallenge.difficulty} • {selectedChallenge.language}
                    </p>
                </div>
            </header>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
                {/* Editor Section */}
                <div className="lg:col-span-2 flex flex-col space-y-4">

                    {/* Challenge Description */}
                    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
                        <h2 className="text-xl font-bold text-white mb-2">Problem Description</h2>
                        <p className="text-gray-300">{selectedChallenge.description}</p>
                    </div>

                    <div id="code-editor" className="flex-1 rounded-2xl overflow-hidden shadow-2xl shadow-green-900/20 border border-gray-800 relative group min-h-[400px]">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 pointer-events-none" />
                        <Editor
                            height="100%"
                            defaultLanguage={selectedChallenge.language}
                            language={selectedChallenge.language}
                            theme="vs-dark"
                            value={code}
                            onChange={(value) => setCode(value || "")}
                            options={{
                                minimap: { enabled: false },
                                fontSize: 14,
                                padding: { top: 20 },
                                scrollBeyondLastLine: false,
                                smoothScrolling: true,
                                readOnly: showSolution,
                            }}
                        />
                    </div>
                </div>

                {/* Controls & Output Section */}
                <div className="flex flex-col space-y-6">

                    {/* Run Button */}
                    <button
                        id="run-button"
                        ref={buttonRef}
                        onClick={runCode}
                        disabled={isRunning || showSolution}
                        className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg ${isRunning || showSolution
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
                                Running Tests...
                            </span>
                        ) : (
                            "Run Code"
                        )}
                    </button>

                    {/* Solution Button */}
                    <button
                        onClick={toggleSolution}
                        className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 border ${showSolution
                            ? "bg-red-500/10 border-red-500/50 text-red-400 hover:bg-red-500/20"
                            : "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
                            }`}
                    >
                        {showSolution ? "Hide Solution (Reset Code)" : "Give Up & Show Solution"}
                    </button>

                    {/* Status & Output */}
                    <div id="preview-window" className={`flex-1 rounded-xl border p-4 flex flex-col font-mono text-sm shadow-inner overflow-hidden transition-colors ${status === 'success' ? 'bg-green-900/10 border-green-500/30' :
                        status === 'failure' ? 'bg-red-900/10 border-red-500/30' :
                            'bg-black border-gray-800'
                        }`}>
                        <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-800">
                            <span className="text-gray-500 text-xs uppercase tracking-wider">Test Results</span>
                            <div className="flex space-x-1.5">
                                <div className={`w-2.5 h-2.5 rounded-full ${status === 'failure' ? 'bg-red-500' : 'bg-red-500/20'}`}></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20"></div>
                                <div className={`w-2.5 h-2.5 rounded-full ${status === 'success' ? 'bg-green-500' : 'bg-green-500/20'}`}></div>
                            </div>
                        </div>

                        {status === 'success' && (
                            <div className="mb-4 p-3 bg-green-500/20 rounded border border-green-500/30 text-green-400 font-bold text-center animate-pulse">
                                All Tests Passed! 🎉
                            </div>
                        )}

                        {status === 'failure' && (
                            <div className="mb-4 p-3 bg-red-500/20 rounded border border-red-500/30 text-red-400 font-bold text-center">
                                Tests Failed
                            </div>
                        )}

                        <div className="flex-1 overflow-auto custom-scrollbar">
                            <div className="text-xs text-gray-500 mb-1">Output:</div>
                            <pre className={`whitespace-pre-wrap ${status === 'failure' ? 'text-red-400' : 'text-green-400/90'}`}>
                                {output || <span className="text-gray-600 italic">Ready to execute...</span>}
                            </pre>

                            {status === 'failure' && selectedChallenge && (
                                <div className="mt-4 pt-4 border-t border-gray-800">
                                    <div className="text-xs text-gray-500 mb-1">Expected Output:</div>
                                    <pre className="whitespace-pre-wrap text-yellow-400/90">
                                        {selectedChallenge.expectedOutput}
                                    </pre>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
