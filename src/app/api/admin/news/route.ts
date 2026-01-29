import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { drizzle_db } from '@/lib/db';
import { news, users } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { title, slug, content } = await request.json();

    if (!title || !slug || !content) {
        return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Check admin role
    const dbUser = await drizzle_db.query.users.findFirst({
        where: eq(users.id, user.id)
    });

    if (dbUser?.role !== 'admin') {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    try {
        await drizzle_db.insert(news).values({
            title,
            slug,
            content,
            authorId: user.id,
        });

        return NextResponse.json({ message: 'Article created' }, { status: 201 });
    } catch (error) {
        console.error("Error creating article:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
