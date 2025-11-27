"use client";

import { useState } from "react";
import { FaMobileAlt, FaEye, FaEyeSlash, FaCopy } from "react-icons/fa";
import { toast } from "react-hot-toast";

interface MobileTokenManagerProps {
    initialToken?: string | null;
}

export default function MobileTokenManager({ initialToken }: MobileTokenManagerProps) {
    const [token, setToken] = useState(initialToken);
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const generateToken = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/user/generate-token", { method: "POST" });
            if (!res.ok) throw new Error("Failed to generate token");
            const data = await res.json();
            setToken(data.token);
            toast.success("Mobile token generated!");
        } catch (error) {
            toast.error("Error generating token");
        } finally {
            setIsLoading(false);
        }
    };

    const copyToken = () => {
        if (token) {
            navigator.clipboard.writeText(token);
            toast.success("Token copied to clipboard");
        }
    };

    return (
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-8 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
                <FaMobileAlt className="text-green-400 w-6 h-6" />
                <h2 className="text-2xl font-bold text-white">Mobile App Access</h2>
            </div>

            <p className="text-gray-400 mb-6">
                Use this token to log in to the CodeWithMe mobile app. Keep it secret!
            </p>

            <div className="flex flex-col md:flex-row gap-4 items-center">
                {token ? (
                    <div className="relative flex-1 w-full">
                        <input
                            type={isVisible ? "text" : "password"}
                            value={token}
                            readOnly
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-gray-300 font-mono focus:outline-none focus:border-green-500 transition-colors"
                        />
                        <button
                            onClick={() => setIsVisible(!isVisible)}
                            className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                        >
                            {isVisible ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        <button
                            onClick={copyToken}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                        >
                            <FaCopy />
                        </button>
                    </div>
                ) : (
                    <div className="flex-1 text-gray-500 italic">No token generated yet</div>
                )}

                <button
                    onClick={generateToken}
                    disabled={isLoading}
                    className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                    {isLoading ? "Generating..." : token ? "Regenerate Token" : "Generate Token"}
                </button>
            </div>
        </div>
    );
}
