"use client";
import { useState } from "react";
import Link from "next/link";
import Code_With_Me_Logo from "./code_with_me_logo";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="h-16 w-full bg-gray-800">
            <div className="flex justify-between items-center h-full px-4">
                <Link href={"/"}>
                    <Code_With_Me_Logo />
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex gap-6 items-center h-full">

                    <Link
                        href="#"
                        className="hover:bg-gray-700 px-5 hover:font-extrabold hover:text-green-300 hover:shadow shadow-green-400 h-full flex items-center"
                    >
                        Projects
                    </Link>

                    <Link
                        href="/content"
                        className="hover:bg-gray-700 px-5 hover:font-extrabold hover:text-green-300 hover:shadow shadow-green-400 h-full flex items-center"
                    >
                        Content
                    </Link>

                    <Link
                        href="#"
                        className="hover:bg-gray-700 px-5 hover:font-extrabold hover:text-green-300 hover:shadow shadow-green-400 h-full flex items-center"
                    >
                        About
                    </Link>

                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-white cursor-pointer font-extrabold" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
            </div>

            {/* Mobile Dropdown */}
            {menuOpen && (
                <div className="md:hidden flex flex-col bg-gray-700 px-4 py-2 space-y-2 absolute left-0 right-0 z-50">

                    <Link href="#" className="text-white hover:text-green-300">
                        Projects
                    </Link>

                    <Link href="/content" className="text-white hover:text-green-300">
                        Content
                    </Link>

                    <Link href="#" className="text-white hover:text-green-300">
                        About
                    </Link>

                </div>
            )}
        </nav>
    );
}
