import MarkdownRenderer from "@/components/markdown_renderer";
import { drizzle_db } from "@/lib/db";
import { news } from "@/lib/schema";
import Link from "next/link";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { desc } from "drizzle-orm";

export default async function News() {
    const session = await unstable_getServerSession(authOptions);
    let articles = [];
    let error: string | null = null;

    try {
        articles = await drizzle_db.select().from(news).orderBy(desc(news.createdAt));
    } catch (e) {
        if (e instanceof Error){
            console.error("Database Query Failed: ", e)
        } else {
            console.error("An uknown error occured:", e)
        }
        error = "failed to load articles from database"
    }

    return (
        <main style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">News Articles</h1>
                {session?.user?.role === 'admin' && (
                    <Link href="/news/create">
                        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                            Create Article
                        </button>
                    </Link>
                )}
            </div>
            <hr className="my-4" />

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {articles.length > 0 ? (
                <ul>
                    {articles.map((article) => (
                        <li key={article.id} className="my-5 border-2 border-green-300 p-2 rounded-2xl bg-black">
                            <h2 className="font-extrabold">{article.title}</h2>
                            <div className="max-w-none text-sm mb-2 bg-black p-2 rounded">
                                <MarkdownRenderer content={article.content.substring(0, 100)} />
                            </div>
                            <small>Published on: {new Date(article.createdAt).toLocaleDateString()}</small>
                            <Link href={`/news/${article.slug}`}>
                                <button className="block my-2 px-2 bg-blue-300 text-black font-bold rounded-2xl cursor-pointer">view</button>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                !error && <p>No articles found. Try adding some to your database!</p>
            )}
        </main>
    );
}

