"use server";

import { getUser } from "@/lib/auth";
import { drizzle_db } from "@/lib/db";
import { users, userCompletedChallenges, challenges } from "@/lib/schema";
import { eq, and } from "drizzle-orm";

export async function completeChallenge(challengeId: string) {
    const session = await getUser();

    if (!session?.id) {
        return { success: false, message: "Unauthorized" };
    }

    const userId = session.id;

    // Fetch challenge from database
    const [challenge] = await drizzle_db.select().from(challenges).where(eq(challenges.id, challengeId));

    if (!challenge) {
        return { success: false, message: "Challenge not found" };
    }

    // Check if user has already completed this challenge
    const existingCompletion = await drizzle_db.select()
        .from(userCompletedChallenges)
        .where(and(
            eq(userCompletedChallenges.userId, userId),
            eq(userCompletedChallenges.challengeId, challengeId)
        ));

    if (existingCompletion.length > 0) {
        return { success: true, message: "Challenge already completed", rankIncrease: 0 };
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
            userId: userId,
            challengeId: challengeId,
        });

        // Update user rank
        const [currentUser] = await drizzle_db.select().from(users).where(eq(users.id, userId));

        if (currentUser) {
            await drizzle_db.update(users)
                .set({ rank: currentUser.rank + rankIncrease })
                .where(eq(users.id, userId));
        }

        return { success: true, message: "Challenge completed!", rankIncrease };

    } catch (error) {
        console.error("Error completing challenge:", error);
        return { success: false, message: "Failed to record completion" };
    }
}
