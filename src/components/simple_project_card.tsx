'use client'

import { FaGithub, FaUser } from 'react-icons/fa'
import Link from 'next/link'

interface SimpleProjectCardProps {
    title: string
    creator: string
    creatorId: string
    link: string
}

export default function SimpleProjectCard({ title, creator, creatorId, link }: SimpleProjectCardProps) {
    return (
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 flex flex-col gap-4 hover:border-green-500/50 transition-all hover:shadow-lg hover:shadow-green-500/10 group">
            <div className="flex items-start justify-between">
                <div className="bg-gray-700/50 p-3 rounded-lg group-hover:bg-green-500/20 transition-colors">
                    <FaGithub className="w-8 h-8 text-white group-hover:text-green-400 transition-colors" />
                </div>
            </div>

            <div>
                <h3 className="text-xl font-bold text-white mb-1 line-clamp-1" title={title}>{title}</h3>
                <Link href={`/users/${creatorId}`} className="flex items-center gap-2 text-sm text-gray-400 hover:text-green-400 transition-colors w-fit">
                    <FaUser className="w-3 h-3" />
                    <span>{creator}</span>
                </Link>
            </div>

            <Link
                href={link}
                target="_blank"
                className="mt-auto w-full bg-gray-700 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg text-center transition-all flex items-center justify-center gap-2 group-hover:translate-y-1"
            >
                View Project
            </Link>
        </div>
    )
}
