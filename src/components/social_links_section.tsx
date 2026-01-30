'use client';

import { FaYoutube, FaXTwitter } from "react-icons/fa6";

const socialLinks = [
    {
        name: "YouTube",
        url: "https://www.youtube.com/@codewithme-theo",
        icon: FaYoutube,
        color: "hover:text-red-500",
        bgColor: "hover:bg-red-500/10",
        borderColor: "hover:border-red-500/50",
        description: "Subscribe for coding tutorials"
    },
    {
        name: "X",
        url: "https://x.com/NadasenTheolin",
        icon: FaXTwitter,
        color: "hover:text-white",
        bgColor: "hover:bg-white/10",
        borderColor: "hover:border-white/50",
        description: "Follow for updates and tips"
    }
];

export default function SocialLinksSection() {
    return (
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900/30 border-y border-gray-800/50">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-center mb-8 text-gray-300">
                    Connect With Me
                </h2>
                <div className="flex justify-center gap-6 flex-wrap">
                    {socialLinks.map((social) => {
                        const Icon = social.icon;
                        return (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`group flex items-center gap-3 px-6 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl transition-all duration-300 ${social.bgColor} ${social.borderColor}`}
                            >
                                <Icon className={`w-6 h-6 text-gray-400 transition-colors duration-300 ${social.color}`} />
                                <div className="flex flex-col">
                                    <span className={`font-semibold text-white transition-colors duration-300 ${social.color}`}>
                                        {social.name}
                                    </span>
                                    <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                                        {social.description}
                                    </span>
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
