import Link from "next/link"
import { FaArrowRight } from "react-icons/fa"

interface Iparams {
    title: string
    description: string
    link?: string
}

export default function Homepage_Cards({ title, description, link }: Iparams) {
    return (
        <div className="group relative bg-gray-800/40 backdrop-blur-sm w-[90%] md:w-[45%] text-center rounded-2xl border border-gray-700/50 p-6 transition-all duration-300 hover:scale-105 hover:bg-gray-800/60 hover:border-green-500/50 hover:shadow-2xl hover:shadow-green-500/20">
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <h1 className="font-extrabold text-2xl my-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 group-hover:from-green-400 group-hover:to-blue-400 transition-all duration-300">
                {title}
            </h1>

            <div className="h-1 w-20 mx-auto bg-gradient-to-r from-green-500 to-blue-500 rounded-full my-4 opacity-70 group-hover:w-32 transition-all duration-300" />

            <p className="my-4 text-gray-300 group-hover:text-white transition-colors duration-300 leading-relaxed">
                {description}
            </p>

            {link && (
                <Link href={link}>
                    <button className="mt-4 py-2 px-6 rounded-full bg-gray-700/50 border border-gray-600 text-white font-semibold flex items-center justify-center gap-2 mx-auto hover:bg-green-600 hover:border-green-500 transition-all duration-300 group-hover:shadow-lg">
                        <span>View</span>
                        <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                </Link>
            )}
        </div>
    )
}