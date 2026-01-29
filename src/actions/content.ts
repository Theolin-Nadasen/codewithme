'use server'

import { drizzle_db } from "@/lib/db"
import { contentPlaylists, users } from "@/lib/schema"
import { getUser } from "@/lib/auth"
import { eq, asc } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function getAllPlaylists() {
    const playlists = await drizzle_db.query.contentPlaylists.findMany({
        orderBy: [asc(contentPlaylists.category), asc(contentPlaylists.createdAt)]
    })

    // Group by category
    const grouped = {
        languages: playlists.filter(p => p.category === 'language'),
        frameworks: playlists.filter(p => p.category === 'framework'),
        tools: playlists.filter(p => p.category === 'tool')
    }

    return grouped
}

export async function addPlaylist(title: string, playlistId: string, descriptionId: string, category: string) {
    const session = await getUser()
    if (!session?.id) {
        throw new Error("Unauthorized")
    }

    const user = await drizzle_db.query.users.findFirst({
        where: eq(users.id, session.id)
    })

    if (user?.role !== 'admin') {
        throw new Error("Admin access required")
    }

    // Validate category
    if (!['language', 'framework', 'tool'].includes(category)) {
        throw new Error("Invalid category. Must be 'language', 'framework', or 'tool'")
    }

    await drizzle_db.insert(contentPlaylists).values({
        title,
        playlistId,
        descriptionId,
        category,
    })

    revalidatePath('/content')
}

export async function deletePlaylist(id: number) {
    const session = await getUser()
    if (!session?.id) {
        throw new Error("Unauthorized")
    }

    const user = await drizzle_db.query.users.findFirst({
        where: eq(users.id, session.id)
    })

    if (user?.role !== 'admin') {
        throw new Error("Admin access required")
    }

    await drizzle_db.delete(contentPlaylists).where(eq(contentPlaylists.id, id))

    revalidatePath('/content')
}

export async function updatePlaylist(id: number, title: string, playlistId: string, descriptionId: string, category: string) {
    const session = await getUser()
    if (!session?.id) {
        throw new Error("Unauthorized")
    }

    const user = await drizzle_db.query.users.findFirst({
        where: eq(users.id, session.id)
    })

    if (user?.role !== 'admin') {
        throw new Error("Admin access required")
    }

    // Validate category
    if (!['language', 'framework', 'tool'].includes(category)) {
        throw new Error("Invalid category. Must be 'language', 'framework', or 'tool'")
    }

    await drizzle_db.update(contentPlaylists)
        .set({ title, playlistId, descriptionId, category })
        .where(eq(contentPlaylists.id, id))

    revalidatePath('/content')
}
