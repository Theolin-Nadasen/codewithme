import { drizzle_db } from "@/lib/db";
import { code_examples } from "@/lib/schema";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const rows = await drizzle_db.select().from(code_examples);
        return NextResponse.json({ rows });
    } catch (error) {
        console.error("Error fetching code examples:", error);
        return NextResponse.json({ error: "Failed to fetch code examples" }, { status: 500 });
    }
}
