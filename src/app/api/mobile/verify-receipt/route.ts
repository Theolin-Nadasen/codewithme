import { NextResponse } from "next/server";
import { drizzle_db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";

// Mock verification for now as we don't have Google Play credentials set up
// In production, use 'googleapis' to verify the purchase token
export async function POST(req: Request) {
    const { token, purchaseToken, productId } = await req.json();

    if (!token || !purchaseToken || !productId) {
        return new NextResponse("Missing data", { status: 400 });
    }

    const [user] = await drizzle_db
        .select()
        .from(users)
        .where(eq(users.mobileToken, token));

    if (!user) {
        return new NextResponse("Invalid user token", { status: 401 });
    }

    // TODO: Verify purchaseToken with Google Play Developer API
    // const isValid = await verifyWithGoogle(purchaseToken, productId);
    const isValid = true; // Mocking success

    if (isValid) {
        await drizzle_db
            .update(users)
            .set({ proStatus: true })
            .where(eq(users.id, user.id));

        return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false }, { status: 400 });
}
