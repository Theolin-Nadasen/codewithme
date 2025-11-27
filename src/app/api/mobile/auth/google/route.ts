import { NextResponse } from "next/server";
import { drizzle_db } from "@/lib/db";
import { users, accounts } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
    const { email, name, image, googleId } = await req.json();

    if (!email || !googleId) {
        return new NextResponse("Missing required fields", { status: 400 });
    }

    try {
        // Check if user exists
        let [user] = await drizzle_db
            .select()
            .from(users)
            .where(eq(users.email, email));

        // If user doesn't exist, create them
        if (!user) {
            [user] = await drizzle_db
                .insert(users)
                .values({
                    id: `google_${googleId}`,
                    email,
                    name,
                    image,
                    emailVerified: new Date(),
                })
                .returning();

            // Create account link
            await drizzle_db.insert(accounts).values({
                userId: user.id,
                type: "oauth",
                provider: "google",
                providerAccountId: googleId,
            });
        }

        return NextResponse.json({ user });
    } catch (error) {
        console.error("Google auth error:", error);
        return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
    }
}
