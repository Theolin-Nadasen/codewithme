import Link from "next/link"
import Course_Item_Book from "@/components/course_item_book"
import { getAllPlaylists } from "@/actions/content"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export const dynamic = 'force-dynamic'

export default async function Content() {
    const playlists = await getAllPlaylists()
    const session = await getServerSession(authOptions)
    const isAdmin = session?.user?.role === 'admin'

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl md:text-6xl font-bold text-green-400">
                        Learning Paths
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Master the technologies that power the web. Choose your path and start building today.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Languages Section */}
                    <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-sm">
                        <h2 className="text-2xl font-bold text-green-400 mb-6 flex items-center gap-2">
                            <span className="w-2 h-8 bg-green-500 rounded-full"></span>
                            Languages
                        </h2>
                        <ul className="space-y-4">
                            {playlists.languages.map((item) => (
                                <li key={item.id}>
                                    <Link href={"/content/" + item.playlistId + "/" + item.title + "/" + item.descriptionId}>
                                        <div className="group relative overflow-hidden rounded-xl bg-gray-900/50 border border-gray-700 hover:border-green-500/50 transition-all duration-300 p-4 hover:shadow-lg hover:shadow-green-500/10">
                                            <div className="relative z-10">
                                                <Course_Item_Book text={item.title} />
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Frameworks Section */}
                    <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-sm">
                        <h2 className="text-2xl font-bold text-blue-400 mb-6 flex items-center gap-2">
                            <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
                            Frameworks
                        </h2>
                        <ul className="space-y-4">
                            {playlists.frameworks.map((item) => (
                                <li key={item.id}>
                                    <Link href={"/content/" + item.playlistId + "/" + item.title + "/" + item.descriptionId}>
                                        <div className="group relative overflow-hidden rounded-xl bg-gray-900/50 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 p-4 hover:shadow-lg hover:shadow-blue-500/10">
                                            <div className="relative z-10">
                                                <Course_Item_Book text={item.title} />
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Tools Section */}
                    <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-sm">
                        <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-2">
                            <span className="w-2 h-8 bg-purple-500 rounded-full"></span>
                            Tools
                        </h2>
                        <ul className="space-y-4">
                            {playlists.tools.map((item) => (
                                <li key={item.id}>
                                    <Link href={"/content/" + item.playlistId + "/" + item.title + "/" + item.descriptionId}>
                                        <div className="group relative overflow-hidden rounded-xl bg-gray-900/50 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 p-4 hover:shadow-lg hover:shadow-purple-500/10">
                                            <div className="relative z-10">
                                                <Course_Item_Book text={item.title} />
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {isAdmin && (
                    <div className="mt-12 text-center">
                        <Link href="/content/manage" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors">
                            Manage Playlists
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}