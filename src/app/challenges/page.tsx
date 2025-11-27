"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import PageTutorial from "@/components/page_tutorial";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

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
    createdAt: Date;
}

export default function ChallengesListingPage() {
    const { data: session } = useSession();
    const isPro = session?.user?.proStatus || session?.user?.role === 'admin';
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchChallenges() {
            try {
                const response = await fetch('/api/challenges');
                const data = await response.json();
                setChallenges(data);
            } catch (error) {
                console.error("Error fetching challenges:", error);
                toast.error("Failed to load challenges");
            } finally {
                setLoading(false);
            }
        }

        fetchChallenges();
    }, []);

    const easyChallenges = challenges.filter(c => c.difficulty === 'Easy');
    const mediumChallenges = challenges.filter(c => c.difficulty === 'Medium');
    const hardChallenges = challenges.filter(c => c.difficulty === 'Hard');

    const ChallengeCard = ({ challenge }: { challenge: Challenge }) => {
        const isLocked = challenge.proOnly && !isPro;

        const CardContent = () => (
            <div className={`bg-gray-900/50 border border-gray-800 rounded-xl p-6 transition-all duration-300 h-full flex flex-col relative overflow-hidden ${isLocked ? 'opacity-75 cursor-not-allowed' : 'hover:border-green-500/50 hover:bg-gray-800'
                }`}>
                {challenge.proOnly && (
                    <div className="absolute top-0 right-0 bg-gradient-to-l from-yellow-500 to-yellow-600 text-black text-xs font-bold px-3 py-1 rounded-bl-lg z-10 shadow-lg">
                        PRO ONLY
                    </div>
                )}

                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                        {challenge.title}
                    </h3>
                    <span className="text-xs font-mono text-gray-500 bg-gray-900 px-2 py-1 rounded border border-gray-800">
                        {challenge.language}
                    </span>
                </div>
                <p className="text-gray-400 text-sm mb-4 flex-1">
                    {challenge.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                    {!isLocked ? (
                        <div className="flex items-center text-green-500 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0">
                            Start Challenge
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    ) : (
                        <div className="flex items-center text-yellow-500 text-sm font-semibold">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            Locked
                        </div>
                    )}
                </div>
            </div>
        );

        if (isLocked) {
            return (
                <div onClick={() => toast.error("This challenge is for Pro members only!")} className="block group h-full">
                    <CardContent />
                </div>
            );
        }

        return (
            <Link href={`/challenges/${challenge.id}`} className="block group h-full">
                <CardContent />
            </Link>
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading challenges...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-4 sm:p-6 lg:p-8">
            <PageTutorial tutorialId="challenges" delay={1500} />

            <header className="mb-12 text-center max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-extrabold text-green-400 mb-4 pb-1 tracking-tight">
                    Coding Challenges
                </h1>
                <p className="text-gray-400 text-lg">
                    Sharpen your coding skills with our collection of interactive challenges.
                    Test your logic, algorithms, and problem-solving abilities.
                </p>
            </header>

            <div className="max-w-7xl mx-auto space-y-12 pb-20">

                {/* Easy Section */}
                {easyChallenges.length > 0 && (
                    <section>
                        <div className="flex items-center gap-4 mb-6">
                            <h2 className="text-2xl font-bold text-green-400">Easy</h2>
                            <div className="h-px bg-gray-800 flex-1"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {easyChallenges.map(c => (
                                <ChallengeCard key={c.id} challenge={c} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Medium Section */}
                {mediumChallenges.length > 0 && (
                    <section>
                        <div className="flex items-center gap-4 mb-6">
                            <h2 className="text-2xl font-bold text-yellow-400">Medium</h2>
                            <div className="h-px bg-gray-800 flex-1"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {mediumChallenges.map(c => (
                                <ChallengeCard key={c.id} challenge={c} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Hard Section */}
                {hardChallenges.length > 0 && (
                    <section>
                        <div className="flex items-center gap-4 mb-6">
                            <h2 className="text-2xl font-bold text-red-400">Hard</h2>
                            <div className="h-px bg-gray-800 flex-1"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {hardChallenges.map(c => (
                                <ChallengeCard key={c.id} challenge={c} />
                            ))}
                        </div>
                    </section>
                )}

                {challenges.length === 0 && !loading && (
                    <div className="text-center text-gray-400 py-12">
                        <p>No challenges available yet.</p>
                    </div>
                )}

            </div>
        </div>
    );
}
