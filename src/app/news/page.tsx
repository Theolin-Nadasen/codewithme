import { db } from "@/lib/db";

interface Article {
    id: number;
    title: string;
    content: string;
    created_at: Date;
}

export default async function News() {
    let articles: Article[] = []
    let error: string | null = null

    try {
        const result = await db.query("SELECT * FROM articles ORDER BY created_at DESC")
        articles = result.rows
    } catch (e) {
        if (e instanceof Error){
            console.error("Database Query Failed: ", e.message)
        } else {
            console.error("An uknown error occured:", e)
        }
        error = "failed to load articles from database"
    }

    return (
        <main style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
            <h1>News Articles</h1>
            <hr />

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {articles.length > 0 ? (
                <ul>
                    {articles.map((article) => (
                        <li key={article.id} className="my-5 border-2 border-green-300 p-2 rounded-2xl bg-black">
                            <h2 className="font-extrabold">{article.title}</h2>
                            <p className="mb-2">{article.content.substring(0, 200)}...</p>
                            <small>Published on: {new Date(article.created_at).toLocaleDateString()}</small>
                        </li>
                    ))}
                </ul>
            ) : (
                !error && <p>No articles found. Try adding some to your database!</p>
            )}
        </main>
    );
}

