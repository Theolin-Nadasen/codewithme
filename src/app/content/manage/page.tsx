import { getAllPlaylists } from "@/actions/content"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import PlaylistManager from "@/components/playlist_manager"
import Link from "next/link"

export default async function ManagePlaylists() {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== 'admin') {
        redirect('/content')
    }

    const playlists = await getAllPlaylists()

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <Link href="/content" className="text-gray-400 hover:text-green-400 transition-colors mb-4 inline-block">
                        ← Back to Content
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                        Playlist Management
                    </h1>
                    <p className="text-gray-400 mt-2">Add, edit, or remove learning playlists</p>
                </div>

                <PlaylistManager playlists={playlists} />
            </div>
        </div>
    )
}
