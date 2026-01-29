import { NextResponse } from "next/server";
import { getUser } from "@/lib/auth";
import { drizzle_db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { randomBytes } from "crypto";

export async function POST() {
    const session = await getUser();
    if (!session || !session.id) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const token = randomBytes(32).toString("hex");

    await drizzle_db
        .update(users)
        .set({ mobileToken: token })
        .where(eq(users.id, session.id));

    return NextResponse.json({ token });
}
