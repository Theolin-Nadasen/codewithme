import { NextResponse } from "next/server";

// This endpoint initiates the OAuth flow and redirects to Google
export async function GET(req: Request) {
    const callbackUrl = `/api/mobile/auth/callback`;

    return NextResponse.redirect(
        `https://codewithme.co.za/api/auth/signin/google?callbackUrl=${encodeURIComponent(callbackUrl)}`
    );
}
