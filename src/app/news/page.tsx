import MarkdownRenderer from "@/components/markdown_renderer";
import { drizzle_db } from "@/lib/db";
import { news } from "@/lib/schema";
import Link from "next/link";
import { getUser } from "@/lib/auth";
import { desc, InferSelectModel } from "drizzle-orm";

export default async function News() {
    const session = await getUser();
    let articles: InferSelectModel<typeof news>[] = [];
    let error: string | null = null;

    try {
        articles = await drizzle_db.select().from(news).orderBy(desc(news.createdAt));
    } catch (e) {
        if (e instanceof Error) {
            console.error("Database Query Failed: ", e)
        } else {
            console.error("An uknown error occured:", e)
        }
        error = "failed to load articles from database"
    }

    return (
        <main className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
                    <h1 className="text-4xl font-extrabold text-green-400 mb-4 sm:mb-0">
                        News Articles
                    </h1>
                    {session?.role === 'admin' && (
                        <Link href="/news/create">
                            <button className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 transition duration-300 shadow-lg hover:shadow-indigo-500/50">
                                Create Article
                            </button>
                        </Link>
                    )}
                </div>

                {error && (
                    <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded relative mb-8" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                {articles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.map((article) => (
                            <Link href={`/news/${article.slug}`} key={article.id} className="group">
                                <article className="h-full flex flex-col bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden hover:border-green-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-green-900/20 hover:-translate-y-1">
                                    <div className="p-6 flex-1 flex flex-col">
                                        <h2 className="text-xl font-bold mb-3 text-gray-100 group-hover:text-green-400 transition-colors line-clamp-2">
                                            {article.title}
                                        </h2>
                                        <div className="text-sm text-gray-400 mb-4">
                                            {new Date(article.createdAt).toLocaleDateString(undefined, {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </div>
                                        <div className="prose prose-invert prose-sm max-w-none text-gray-300 mb-4 line-clamp-3 flex-1">
                                            <MarkdownRenderer content={article.content.replace(/!\[.*?\]\(.*?\)/g, '').substring(0, 150) + '...'} />
                                        </div>
                                        <div className="mt-auto pt-4 border-t border-gray-800 flex items-center text-green-400 font-medium group-hover:text-green-300">
                                            Read more
                                            <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                ) : (
                    !error && (
                        <div className="text-center py-20">
                            <p className="text-gray-400 text-xl">No articles found. Check back later!</p>
                        </div>
                    )
                )}
            </div>
        </main>
    );
}

