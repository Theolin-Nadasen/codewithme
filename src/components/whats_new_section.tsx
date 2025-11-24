'use client';

import { FaRobot } from "react-icons/fa";

export default function WhatsNewSection() {
  return (
    <section className="my-16 p-8 bg-gray-800/40 backdrop-blur-md border border-gray-700/50 text-white rounded-2xl shadow-2xl max-w-4xl mx-auto relative overflow-hidden group hover:border-green-500/30 transition-colors duration-500">
      {/* Background Glow */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-green-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-green-500/20 transition-colors duration-500" />

      <div className="relative z-10">
        <h2 className="text-4xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
          What&apos;s New! ✨
        </h2>
        <p className="text-xl text-center mb-8 text-gray-300 leading-relaxed max-w-2xl mx-auto">
          We&apos;ve introduced a brand new <span className="text-green-400 font-semibold">AI Assistant</span> to help you with your coding journey!
          Ask questions, get code explanations, and even generate code snippets directly from our chat.
        </p>
        <div className="text-center">
          <button
            onClick={() => {
              // Dispatch event to open chat and send a demo prompt
              window.dispatchEvent(new CustomEvent('open-ai-chat', {
                detail: { prompt: "Write a simple 'Hello, World!' program in Python." }
              }));
            }}
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-green-500 text-white px-8 py-4 rounded-full text-lg font-bold hover:from-green-500 hover:to-green-400 transition-all duration-300 shadow-lg hover:shadow-green-500/50 transform hover:-translate-y-1"
          >
            <FaRobot className="w-6 h-6 animate-bounce" />
            <span>Try AI Now!</span>
            <div className="absolute inset-0 rounded-full bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}
