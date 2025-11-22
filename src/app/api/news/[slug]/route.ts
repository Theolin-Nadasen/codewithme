import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse, NextRequest } from "next/server";
import { drizzle_db } from "@/lib/db";
import { news } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function DELETE(request: NextRequest, { params }) { // Removed explicit type annotation for params
    // @ts-ignore
    const slug = params.slug; // Access slug via params directly

    if (!slug) {
        return NextResponse.json({ message: "Slug is required" }, { status: 400 });
    }

    try {
        const deletedArticles = await drizzle_db.delete(news).where(eq(news.slug, slug)).returning();

        if (deletedArticles.length === 0) {
            return NextResponse.json({ message: "Article not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Article deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting article:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
