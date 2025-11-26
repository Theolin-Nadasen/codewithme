'use client'

import { useState } from 'react'
import { addPlaylist, deletePlaylist } from '@/actions/content'
import toast from 'react-hot-toast'
import { FaTrash, FaPlus } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

interface Playlist {
    id: number
    title: string
    playlistId: string
    descriptionId: string
    category: string
}

interface PlaylistManagerProps {
    playlists: {
        languages: Playlist[]
        frameworks: Playlist[]
        tools: Playlist[]
    }
}

export default function PlaylistManager({ playlists }: PlaylistManagerProps) {
    const router = useRouter()
    const [isAdding, setIsAdding] = useState(false)
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState('')
    const [playlistId, setPlaylistId] = useState('')
    const [descriptionId, setDescriptionId] = useState('')
    const [category, setCategory] = useState('language')

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!title || !playlistId || !descriptionId) return

        setLoading(true)
        try {
            await addPlaylist(title, playlistId, descriptionId, category)
            toast.success('Playlist added successfully!')
            setTitle('')
            setPlaylistId('')
            setDescriptionId('')
            setCategory('language')
            setIsAdding(false)
            router.refresh()
        } catch (err: any) {
            toast.error(err.message || 'Failed to add playlist')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: number, title: string) => {
        if (!confirm(`Are you sure you want to delete "${title}"?`)) return

        try {
            await deletePlaylist(id)
            toast.success('Playlist deleted successfully!')
            router.refresh()
        } catch (err: any) {
            toast.error(err.message || 'Failed to delete playlist')
        }
    }

    const allPlaylists = [
        ...playlists.languages.map(p => ({ ...p, categoryLabel: 'Language' })),
        ...playlists.frameworks.map(p => ({ ...p, categoryLabel: 'Framework' })),
        ...playlists.tools.map(p => ({ ...p, categoryLabel: 'Tool' }))
    ]

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-300">Manage Playlists</h2>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    <FaPlus /> Add Playlist
                </button>
            </div>

            {isAdding && (
                <form onSubmit={handleAdd} className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-green-500 outline-none"
                            placeholder="Learn Python Programming"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">YouTube Playlist ID</label>
                        <input
                            type="text"
                            value={playlistId}
                            onChange={(e) => setPlaylistId(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-green-500 outline-none"
                            placeholder="PLJyFRzU1s7WMjVtgf_2l_GqdOmtDMILpD"
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">The ID from the YouTube playlist URL</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Description ID</label>
                        <input
                            type="text"
                            value={descriptionId}
                            onChange={(e) => setDescriptionId(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-green-500 outline-none"
                            placeholder="python"
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">Key for description lookup (must exist in descriptions.tsx)</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-green-500 outline-none"
                        >
                            <option value="language">Language</option>
                            <option value="framework">Framework</option>
                            <option value="tool">Tool</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => setIsAdding(false)}
                            className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Adding...' : 'Save Playlist'}
                        </button>
                    </div>
                </form>
            )}

            <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-300 mb-4">All Playlists ({allPlaylists.length})</h3>
                <div className="space-y-3">
                    {allPlaylists.map((playlist) => (
                        <div
                            key={playlist.id}
                            className="bg-gray-900/50 border border-gray-700 p-4 rounded-lg flex justify-between items-center group hover:border-green-500/30 transition-all"
                        >
                            <div>
                                <h4 className="font-medium text-white">{playlist.title}</h4>
                                <p className="text-sm text-gray-500">
                                    {playlist.categoryLabel} • ID: {playlist.playlistId} • Desc: {playlist.descriptionId}
                                </p>
                            </div>
                            <button
                                onClick={() => handleDelete(playlist.id, playlist.title)}
                                className="text-gray-500 hover:text-red-500 p-2 transition-colors opacity-0 group-hover:opacity-100"
                                title="Delete Playlist"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
