import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { drizzle_db } from "@/lib/db";
import { news } from "@/lib/schema";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const session = await unstable_getServerSession(req, res, authOptions);

    if (session?.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' });
    }

    try {
        const { title, slug, content } = req.body;

        if (!title || !slug || !content) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        await drizzle_db.insert(news).values({
            title,
            slug,
            content,
            authorId: session.user.id,
        });

        res.status(201).json({ message: 'Article created' });
    } catch (error) {
        console.error("Error creating article:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
