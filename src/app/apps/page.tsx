import Image from "next/image"
import Link from "next/link"

const apps = [
    {
        id: "pdf-builder",
        name: "PDF Builder",
        description: "Create engaging PDF files with text, shapes, and SVG",
        url: "https://pdf.codewithme.co.za",
        image: "/pdf_builder.png",
        tags: ["PDF", "Design", "Tools"]
    }
]

export default function AppsPage() {
    return (
        <main className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl md:text-6xl font-bold text-green-400">
                        My Apps
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        A collection of tools and applications I have built to help you create and build amazing things.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {apps.map((app) => (
                        <Link 
                            href={app.url} 
                            key={app.id}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group"
                        >
                            <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl overflow-hidden hover:border-green-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-green-900/20 hover:-translate-y-1">
                                <div className="relative h-48 bg-gray-900/50 overflow-hidden">
                                    <Image
                                        src={app.image}
                                        alt={app.name}
                                        fill
                                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {app.tags.map((tag) => (
                                            <span 
                                                key={tag} 
                                                className="text-xs font-semibold px-3 py-1 bg-green-500/20 text-green-400 rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                                        {app.name}
                                    </h2>
                                    <p className="text-gray-400 mb-4">
                                        {app.description}
                                    </p>
                                    <div className="flex items-center text-green-400 font-medium group-hover:text-green-300">
                                        Open App
                                        <svg 
                                            className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                        >
                                            <path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth={2} 
                                                d="M14 5l7 7m0 0l-7 7m7-7H3" 
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <p className="text-gray-500">
                        More apps coming soon...
                    </p>
                </div>
            </div>
        </main>
    )
}
