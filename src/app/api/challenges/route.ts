import { NextResponse } from "next/server";
import { drizzle_db } from "@/lib/db";
import { challenges } from "@/lib/schema";

export async function GET() {
    try {
        const allChallenges = await drizzle_db.select().from(challenges);
        return NextResponse.json(allChallenges);
    } catch (error) {
        console.error("Error fetching challenges:", error);
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}
