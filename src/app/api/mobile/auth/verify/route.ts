import { NextResponse } from "next/server";
import { drizzle_db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";

// Verify the mobile token and return user data
export async function GET(req: Request) {
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.replace("Bearer ", "");

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

    return NextResponse.json({
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            rank: user.rank,
            proStatus: user.proStatus,
            dailyApiUses: user.dailyApiUses,
            role: user.role,
        },
    });
}
