import { NextResponse } from "next/server";
import { drizzle_db } from "@/lib/db";
import { users, projects } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";

export async function GET(req: Request) {
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

    const userProjects = await drizzle_db
        .select()
        .from(projects)
        .where(eq(projects.userId, user.id))
        .orderBy(desc(projects.createdAt));

    return NextResponse.json(userProjects);
}
