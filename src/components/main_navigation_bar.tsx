"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Code_With_Me_Logo from "./code_with_me_logo";
import { useSession, signIn, signOut } from "next-auth/react"; // Import useSession, signIn, signOut

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { data: session } = useSession(); // Use the useSession hook

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if (!isMounted) {
        return (
            <h1>loading...</h1>
        )
    }

    return (
        <nav className="h-16 w-full bg-gray-800">
            <div className="flex justify-between items-center h-full px-4">
                <Link href={"/"}>
                    <Code_With_Me_Logo />
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex gap-6 items-center h-full">

                    <Link
                        href="/learn"
                        className="hover:bg-gray-700 px-5 hover:font-extrabold hover:text-green-300 hover:shadow shadow-green-400 h-full flex items-center"
                    >
                        Learn
                    </Link>
                    
                    <Link
                        href="/news"
                        className="hover:bg-gray-700 px-5 hover:font-extrabold hover:text-green-300 hover:shadow shadow-green-400 h-full flex items-center"
                    >
                        News
                    </Link>

                    <Link
                        href="/projects"
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
                        href="/about"
                        className="hover:bg-gray-700 px-5 hover:font-extrabold hover:text-green-300 hover:shadow shadow-green-400 h-full flex items-center"
                    >
                        About
                    </Link>

                    {session ? (
                        <>
                            <span className="text-white">Welcome, {session.user?.name || "User"}!</span>
                            <button
                                onClick={() => signOut()}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => signIn("google")} // Specify Google provider
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Login
                        </button>
                    )}

                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-white cursor-pointer font-extrabold" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
            </div>

            {/* Mobile Dropdown */}
            {menuOpen && (
                <div className="md:hidden flex flex-col bg-gray-700 px-4 py-2 space-y-2 absolute left-0 right-0 z-50">

                    <Link href="/learn" className="text-white hover:text-green-300">
                        Learn
                    </Link>
                    
                    <Link href="/news" className="text-white hover:text-green-300">
                        News
                    </Link>

                    <Link href="/projects" className="text-white hover:text-green-300">
                        Projects
                    </Link>

                    <Link href="/content" className="text-white hover:text-green-300">
                        Content
                    </Link>

                    <Link href="/about" className="text-white hover:text-green-300">
                        About
                    </Link>

                    {session ? (
                        <>
                            <span className="text-white">Welcome, {session.user?.name || "User"}!</span>
                            <button
                                onClick={() => signOut()}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full text-left"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => signIn("google")} // Specify Google provider
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full text-left"
                        >
                            Login
                        </button>
                    )}

                </div>
            )}
        </nav>
    );
}
