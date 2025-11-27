import { NextResponse } from "next/server";
import { drizzle_db } from "@/lib/db";
import { users, userCompletedChallenges, challenges } from "@/lib/schema";
import { eq, and } from "drizzle-orm";

export async function POST(req: Request) {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const [user] = await drizzle_db
        .select()
        .from(users)
        .where(eq(users.mobileToken, token));

    if (!user) {
        return new NextResponse("Invalid token", { status: 401 });
    }

    const { challengeId } = await req.json();

    if (!challengeId) {
        return new NextResponse("Missing challengeId", { status: 400 });
    }

    // Fetch challenge from database
    const [challenge] = await drizzle_db.select().from(challenges).where(eq(challenges.id, challengeId));

    if (!challenge) {
        return new NextResponse("Challenge not found", { status: 404 });
    }

    // Check if user has already completed this challenge
    const existingCompletion = await drizzle_db.select()
        .from(userCompletedChallenges)
        .where(and(
            eq(userCompletedChallenges.userId, user.id),
            eq(userCompletedChallenges.challengeId, challengeId)
        ));

    if (existingCompletion.length > 0) {
        return NextResponse.json({ success: true, message: "Challenge already completed", rankIncrease: 0 });
    }

    // Calculate rank increase
    let rankIncrease = 0;
    switch (challenge.difficulty) {
        case 'Easy': rankIncrease = 1; break;
        case 'Medium': rankIncrease = 2; break;
        case 'Hard': rankIncrease = 3; break;
    }

    try {
        // Record completion
        await drizzle_db.insert(userCompletedChallenges).values({
            userId: user.id,
            challengeId: challengeId,
        });

        // Update user rank
        await drizzle_db.update(users)
            .set({ rank: user.rank + rankIncrease })
            .where(eq(users.id, user.id));

        return NextResponse.json({ success: true, message: "Challenge completed!", rankIncrease });

    } catch (error) {
        console.error("Error completing challenge:", error);
        return NextResponse.json({ success: false, message: "Failed to record completion" }, { status: 500 });
    }
}
