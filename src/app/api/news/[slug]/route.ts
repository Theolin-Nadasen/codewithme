import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { drizzle_db } from "@/lib/db";
import { news } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function DELETE(request: Request, { params }: any) { // Using 'any' as a workaround
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== 'admin') {
        return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

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
