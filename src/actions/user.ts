'use server'

import { getUser } from "@/lib/auth"
import { drizzle_db } from "@/lib/db"
import { users } from "@/lib/schema"
import { eq } from "drizzle-orm"

export async function getCurrentUserProfile() {
    const authUser = await getUser()
    if (!authUser) return null

    const userProfile = await drizzle_db.query.users.findFirst({
        where: eq(users.id, authUser.id)
    })

    return userProfile
}
