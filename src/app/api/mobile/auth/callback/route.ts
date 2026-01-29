import { NextResponse } from "next/server";
import { getUser } from "@/lib/auth";
import { randomBytes } from "crypto";
import { drizzle_db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";

// This endpoint is called after Google OAuth succeeds
export async function GET(req: Request) {
    const session = await getUser();
    const { searchParams } = new URL(req.url);
    const redirectUri = searchParams.get('redirect_uri');

    if (!redirectUri) {
        return new NextResponse("Missing redirect_uri", { status: 400 });
    }

    if (!session || !session.id) {
        return NextResponse.redirect(`${redirectUri}?error=unauthorized`);
    }

    // Generate a temporary access token
    const accessToken = randomBytes(32).toString('hex');

    // Store it in the database
    await drizzle_db
        .update(users)
        .set({ mobileToken: accessToken })
        .where(eq(users.id, session.id));

    // Redirect back to the app with the token
    return NextResponse.redirect(`${redirectUri}?token=${accessToken}`);
}
