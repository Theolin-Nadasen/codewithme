import { getServerSession } from "next-auth"; // Note: updated from unstable_getServerSession
import { authOptions } from "@/lib/auth";
import ShareAndBackButton from "@/components/share_and_back_button";
import MarkdownRenderer from "@/components/markdown_renderer";
import { drizzle_db } from "@/lib/db";
import { news } from "@/lib/schema";
import { eq } from "drizzle-orm";

// 1. Update the interface to wrap params in Promise
interface NewsArticleProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function NewsArticle({ params }: NewsArticleProps) {
    // 2. Await the params to get the slug
    const { slug } = await params;
    
    let article;
    try {
        const result = await drizzle_db.select().from(news).where(eq(news.slug, slug));
        if (result.length > 0) {
            article = result[0];
        }
    } catch (error) {
        console.error("Failed to fetch article:", error);
    }

    // Recommended: Update unstable_getServerSession to getServerSession if you are on NextAuth v4+
    const session = await getServerSession(authOptions);
    const isAdmin = session?.user?.role === 'admin';

    return (
        <div className="h-full">
            {article ? (
                <div className="m-5 p-5 h-[80%] bg-black border border-green-300 rounded-2xl overflow-y-auto custom-scrollbar">
                    <h1 className="text-center font-extrabold text-3xl">{article.title}</h1>
                    <hr className="my-4" />
                    <div className="max-w-none text-center text-lg">
                        <MarkdownRenderer content={article.content} />
                    </div>
                </div>
            ) : (
                <h1>Article not found</h1>
            )}

            <ShareAndBackButton articleTitle={article?.title || ""} articleSlug={slug} isAdmin={isAdmin} />
        </div>
    );
}