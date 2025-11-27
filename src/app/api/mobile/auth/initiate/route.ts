import { NextResponse } from "next/server";

// This endpoint initiates the OAuth flow and redirects to Google
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const redirectUri = searchParams.get('redirect_uri');

    if (!redirectUri) {
        return new NextResponse("Missing redirect_uri", { status: 400 });
    }

    // Pass the mobile redirect URI to the callback via the callbackUrl query param
    const callbackUrl = `/api/mobile/auth/callback?redirect_uri=${encodeURIComponent(redirectUri)}`;

    return NextResponse.redirect(
        `https://codewithme.co.za/api/auth/signin/google?callbackUrl=${encodeURIComponent(callbackUrl)}`
    );
}
