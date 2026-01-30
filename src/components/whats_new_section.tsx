'use client';

import { BsGrid3X3GapFill } from "react-icons/bs";
import Link from "next/link";

export default function WhatsNewSection() {
  return (
    <section className="my-16 p-8 bg-gray-800/40 backdrop-blur-md border border-gray-700/50 text-white rounded-2xl shadow-2xl max-w-4xl mx-auto relative overflow-hidden group hover:border-green-500/30 transition-colors duration-500">
      {/* Background Glow */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-green-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-green-500/20 transition-colors duration-500" />

      <div className="relative z-10">
        <h2 className="text-4xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
          New Apps Section! 🚀
        </h2>
        <p className="text-xl text-center mb-8 text-gray-300 leading-relaxed max-w-2xl mx-auto">
          Check out the new <span className="text-green-400 font-semibold">Apps</span> section featuring tools I&apos;ve built!
          Start with the <span className="text-green-400 font-semibold">PDF Builder</span> — create engaging PDFs with text, shapes, and SVG.
          More apps coming soon!
        </p>
        <div className="text-center">
          <Link href="/apps">
            <button
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-green-500 text-white px-8 py-4 rounded-full text-lg font-bold hover:from-green-500 hover:to-green-400 transition-all duration-300 shadow-lg hover:shadow-green-500/50 transform hover:-translate-y-1"
            >
              <BsGrid3X3GapFill className="w-6 h-6 animate-pulse" />
              <span>View Apps</span>
              <div className="absolute inset-0 rounded-full bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
