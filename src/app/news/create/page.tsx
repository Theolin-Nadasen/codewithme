'use client'

import { createClient } from "@/lib/supabase/client";
import { getCurrentUserProfile } from "@/actions/user";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";

export default function CreateNewsArticle() {
    const [user, setUser] = useState<User | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);

            if (user) {
                const profile = await getCurrentUserProfile();
                if (profile?.role === 'admin') {
                    setIsAdmin(true);
                }
            }
            setLoading(false);
        };
        checkUser();
    }, []);

    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (loading) return <p>Loading...</p>;

    if (!isAdmin) {
        return <p>You are not authorized to view this page.</p>;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            const res = await fetch("/api/news", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, slug, content }),
            });

            if (res.ok) {
                router.push("/news");
            } else {
                const data = await res.json();
                setError(data.message || "Something went wrong.");
            }
        } catch (err) {
            setError("Something went wrong.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Create News Article</h1>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-black"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="slug" className="block text-sm font-medium">Slug</label>
                    <input
                        type="text"
                        id="slug"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-black"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="content" className="block text-sm font-medium">Content (Markdown)</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={10}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-black"
                        required
                    />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Creating..." : "Create Article"}
                </button>
            </form>
        </div>
    );
}
