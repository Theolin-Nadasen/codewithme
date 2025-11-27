import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { randomBytes } from "crypto";
import { drizzle_db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";

// This endpoint initiates the OAuth flow and redirects to Google
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const redirectUri = searchParams.get('redirect_uri') || 'exp://localhost:8081/auth/callback';

    // Store the redirect URI in a session or temporary storage
    // For now, we'll redirect to the standard next-auth signin
    const callbackUrl = `/api/mobile/auth/callback?redirect_uri=${encodeURIComponent(redirectUri)}`;

    return NextResponse.redirect(
        `https://codewithme.co.za/api/auth/signin/google?callbackUrl=${encodeURIComponent(callbackUrl)}`
    );
}
