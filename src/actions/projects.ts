'use server'

import { drizzle_db } from "@/lib/db"
import { projects, users } from "@/lib/schema"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { eq, count, desc } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function addProject(name: string, link: string) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
        throw new Error("Unauthorized")
    }

    if (!link.startsWith("https://github.com/")) {
        throw new Error("Only GitHub links are allowed")
    }

    const user = await drizzle_db.query.users.findFirst({
        where: eq(users.id, session.user.id)
    })

    if (!user) {
        throw new Error("User not found")
    }

    // Check for duplicate name
    const existingProject = await drizzle_db.query.projects.findFirst({
        where: (projects, { and, eq }) => and(
            eq(projects.userId, session.user.id),
            eq(projects.name, name)
        )
    })

    if (existingProject) {
        throw new Error("You already have a project with this name")
    }

    // Check limits
    const userProjects = await drizzle_db.select({ count: count() }).from(projects).where(eq(projects.userId, session.user.id))
    const projectCount = userProjects[0].count

    let limit = 1
    if (user.role === 'admin') {
        limit = Infinity
    } else if (user.proStatus) {
        limit = 3
    }

    if (projectCount >= limit) {
        throw new Error(`You have reached your project limit of ${limit}.`)
    }

    await drizzle_db.insert(projects).values({
        userId: session.user.id,
        name,
        link,
    })

    revalidatePath('/projects')
    revalidatePath(`/users/${session.user.id}`)
}

export async function deleteProject(projectId: number) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
        throw new Error("Unauthorized")
    }

    const project = await drizzle_db.query.projects.findFirst({
        where: eq(projects.id, projectId)
    })

    if (!project) {
        throw new Error("Project not found")
    }

    // Check ownership or admin
    const user = await drizzle_db.query.users.findFirst({
        where: eq(users.id, session.user.id)
    })

    if (project.userId !== session.user.id && user?.role !== 'admin') {
        throw new Error("Unauthorized")
    }

    await drizzle_db.delete(projects).where(eq(projects.id, projectId))

    revalidatePath('/projects')
    revalidatePath(`/users/${project.userId}`)
}

export async function getUserProjects(userId: string) {
    return await drizzle_db.query.projects.findMany({
        where: eq(projects.userId, userId),
        orderBy: [desc(projects.createdAt)]
    })
}

export async function getAllProjects() {
    return await drizzle_db.query.projects.findMany({
        with: {
            user: true // Assuming relation is set up, otherwise we might need to join manually or update schema relations
        },
        orderBy: [desc(projects.createdAt)]
    })
}
