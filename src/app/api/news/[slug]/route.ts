import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse, NextRequest } from "next/server";
import { drizzle_db } from "@/lib/db";
import { news } from "@/lib/schema";
import { eq } from "drizzle-orm";

// 1. Define the interface for the route context
interface RouteParams {
    params: Promise<{
        slug: string;
    }>;
}

// 2. Apply the type to the second argument
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    // 3. Await params to get the slug (Next.js 15 requirement)
    const { slug } = await params; 

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