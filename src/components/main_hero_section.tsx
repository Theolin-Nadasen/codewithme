'use client'
import { TypeAnimation } from "react-type-animation"

export default function Main_Hero_Section() {
    return (
        <>
            <style jsx>{`
                @keyframes outline-glow {
                    0%, 100% {
                        text-shadow: 
                            0 0 10px rgba(74, 222, 128, 0.3),
                            0 0 20px rgba(74, 222, 128, 0.2),
                            0 0 30px rgba(74, 222, 128, 0.1);
                    }
                    50% {
                        text-shadow: 
                            0 0 20px rgba(74, 222, 128, 0.5),
                            0 0 30px rgba(74, 222, 128, 0.3),
                            0 0 40px rgba(74, 222, 128, 0.2);
                    }
                }
                .animate-outline-glow {
                    animation: outline-glow 2s ease-in-out infinite;
                }
            `}</style>
            <div className="hidden md:grid grid-cols-2 h-96 bg-gray-900/50 backdrop-blur-sm border-b border-gray-700/50 flex-row place-items-center relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.02] bg-[length:30px_30px] pointer-events-none" />
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="z-10 pl-10">
                    <h1 className="text-6xl font-extrabold text-green-400 drop-shadow-lg animate-outline-glow">
                        CODE WITH ME
                    </h1>
                </div>

                <div className="z-10 pr-10">
                    <div className="bg-gray-800/80 border border-gray-600 rounded-lg p-6 shadow-2xl font-mono text-green-400">
                        <span className="mr-2 text-gray-500">$</span>
                        <TypeAnimation
                            sequence={[
                                'building engaging digital worlds through websites',
                                1000,
                                'building engaging digital worlds through apps',
                                1000,
                                'building engaging digital worlds through games',
                                1000,
                                'building engaging digital worlds through digital content',
                                1000
                            ]}
                            wrapper="span"
                            speed={50}
                            style={{ fontSize: '1.2em', display: 'inline-block' }}
                            repeat={Infinity}
                        />
                        <span className="animate-pulse">_</span>
                    </div>
                </div>

            </div>

            <div className="flex md:hidden h-64 bg-gray-900/50 backdrop-blur-sm border-b border-gray-700/50 items-center justify-center relative overflow-hidden p-4">
                <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.02] bg-[length:20px_20px] pointer-events-none" />

                <div className="bg-gray-800/80 border border-gray-600 rounded-lg p-4 shadow-xl font-mono text-green-400 w-full max-w-sm z-10">
                    <span className="mr-2 text-gray-500">$</span>
                    <TypeAnimation
                        sequence={[
                            'building engaging digital worlds through websites',
                            1000,
                            'building engaging digital worlds through apps',
                            1000,
                            'building engaging digital worlds through games',
                            1000,
                            'building engaging digital worlds through digital content',
                            1000
                        ]}
                        wrapper="span"
                        speed={50}
                        style={{ fontSize: '1em', display: 'inline-block' }}
                        repeat={Infinity}
                    />
                    <span className="animate-pulse">_</span>
                </div>

            </div>
        </>
    )
}