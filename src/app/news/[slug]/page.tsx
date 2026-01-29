import ShareAndBackButton from "@/components/share_and_back_button";
import MarkdownRenderer from "@/components/markdown_renderer";
import { drizzle_db } from "@/lib/db";
import { news } from "@/lib/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { getUser } from "@/lib/auth";
import { getCurrentUserProfile } from "@/actions/user";
import { notFound } from "next/navigation";

// 1. Define the props interface
interface NewsArticleProps {
    params: Promise<{
        slug: string;
    }>;
}

// 2. Use the interface for the component props
export default async function NewsArticle({ params }: NewsArticleProps) {
    // 3. Await params to access the slug (Next.js 15)
    const { slug } = await params;

    let article;
    let error: string | null = null;

    try {
        const result = await drizzle_db.select().from(news).where(eq(news.slug, slug));
        article = result[0];
    } catch (e) {
        console.error("Error fetching article:", e);
        error = "Failed to load article";
    }

    if (!article && !error) {
        notFound();
    }

    const session = await getUser();
    const userProfile = session ? await getCurrentUserProfile() : null;
    const isAdmin = userProfile?.role === 'admin';

    if (!article) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
                <h1 className="text-3xl font-bold mb-4 text-red-400">Article not found</h1>
                <p className="text-gray-400 mb-8">The article you are looking for does not exist or has been removed.</p>
                <ShareAndBackButton articleTitle="" articleSlug={slug} isAdmin={isAdmin} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
            <article className="max-w-4xl mx-auto">
                <header className="mb-8 text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-green-400">
                        {article.title}
                    </h1>
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
                        <time dateTime={new Date(article.createdAt).toISOString()}>
                            {new Date(article.createdAt).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </time>
                    </div>
                </header>

                <div className="prose prose-invert prose-lg max-w-none mx-auto bg-gray-900/50 p-6 sm:p-10 rounded-3xl border border-gray-800 shadow-2xl">
                    <MarkdownRenderer content={article.content} />
                </div>

                <div className="mt-12 flex justify-center">
                    <ShareAndBackButton articleTitle={article.title} articleSlug={slug} isAdmin={isAdmin} />
                </div>
            </article>
        </div>
    );
}