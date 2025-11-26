'use client'

import { useState } from 'react'
import { FaGithub, FaTrash, FaPlus } from 'react-icons/fa'
import { addProject, deleteProject } from '@/actions/projects'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface Project {
    id: number
    name: string
    link: string
}

interface ProjectManagerProps {
    projects: Project[]
    isOwner: boolean
    canAddMore: boolean
}

export default function ProjectManager({ projects, isOwner, canAddMore }: ProjectManagerProps) {
    const [isAdding, setIsAdding] = useState(false)
    const [name, setName] = useState('')
    const [link, setLink] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!name || !link) return

        if (!link.startsWith("https://github.com/")) {
            toast.error("Only GitHub links are allowed")
            return
        }

        setLoading(true)
        try {
            await addProject(name, link)
            toast.success('Project added successfully')
            setIsAdding(false)
            setName('')
            setLink('')
            router.refresh()
        } catch (error: any) {
            toast.error(error.message || 'Failed to add project')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this project?')) return

        try {
            await deleteProject(id)
            toast.success('Project deleted')
            router.refresh()
        } catch (error: any) {
            toast.error(error.message || 'Failed to delete project')
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-300">Projects</h2>
                {isOwner && canAddMore && (
                    <button
                        onClick={() => setIsAdding(!isAdding)}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        <FaPlus /> Add Project
                    </button>
                )}
            </div>

            {isAdding && (
                <form onSubmit={handleAdd} className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 space-y-4 animate-in fade-in slide-in-from-top-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Project Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-green-500 outline-none"
                            placeholder="My Awesome Project"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">GitHub Link</label>
                        <input
                            type="url"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-green-500 outline-none"
                            placeholder="https://github.com/username/repo"
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">Must be a valid GitHub repository URL.</p>
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
                            {loading ? 'Adding...' : 'Save Project'}
                        </button>
                    </div>
                </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project) => (
                    <div key={project.id} className="bg-gray-800/30 border border-gray-700/50 p-4 rounded-xl flex justify-between items-center group hover:border-green-500/30 transition-all">
                        <div className="flex items-center gap-3">
                            <div className="bg-gray-700/50 p-2 rounded-lg">
                                <FaGithub className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">{project.name}</h3>
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-green-400 hover:underline truncate max-w-[200px] block"
                                >
                                    View Repository
                                </a>
                            </div>
                        </div>
                        {isOwner && (
                            <button
                                onClick={() => handleDelete(project.id)}
                                className="text-gray-500 hover:text-red-500 p-2 transition-colors opacity-0 group-hover:opacity-100"
                                title="Delete Project"
                            >
                                <FaTrash />
                            </button>
                        )}
                    </div>
                ))}

                {projects.length === 0 && !isAdding && (
                    <div className="col-span-full text-center py-8 text-gray-500">
                        No projects added yet.
                    </div>
                )}
            </div>
        </div>
    )
}
