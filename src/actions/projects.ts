'use server'

import { drizzle_db } from "@/lib/db"
import { projects, users } from "@/lib/schema"
import { getUser } from "@/lib/auth"
import { eq, count, desc } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function addProject(name: string, link: string) {
    const userAuth = await getUser()
    if (!userAuth?.id) {
        throw new Error("Unauthorized")
    }

    // We need to fetch the DB user to check roles/prostatus
    const session = { user: { id: userAuth.id } }

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
    const userAuth = await getUser()
    if (!userAuth?.id) {
        throw new Error("Unauthorized")
    }

    const session = { user: { id: userAuth.id } }

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
    // Get user to check Pro status
    const user = await drizzle_db.query.users.findFirst({
        where: eq(users.id, userId)
    });

    // Fetch all projects
    const allProjects = await drizzle_db.query.projects.findMany({
        where: eq(projects.userId, userId),
        orderBy: [desc(projects.createdAt)]
    });

    // If user is not Pro (or Pro expired), only show first project
    // This implements "soft delete" - projects are kept in DB but hidden
    if (!user?.proStatus && user?.role !== 'admin') {
        return allProjects.slice(0, 1); // Only show first project
    }

    // Pro users and admins see all their projects
    return allProjects;
}

export async function getAllProjects() {
    const allProjects = await drizzle_db.query.projects.findMany({
        with: {
            user: true
        },
        orderBy: [desc(projects.createdAt)]
    });

    // Filter projects based on each user's Pro status
    // Group projects by user
    const projectsByUser = new Map<string, typeof allProjects>();

    for (const project of allProjects) {
        if (!projectsByUser.has(project.userId)) {
            projectsByUser.set(project.userId, []);
        }
        projectsByUser.get(project.userId)!.push(project);
    }

    // For each user, only show projects they're allowed to see
    const visibleProjects = [];
    for (const [userId, userProjects] of projectsByUser.entries()) {
        const user = userProjects[0]?.user; // Get user from first project

        if (!user) continue;

        // If user is not Pro and not admin, only show first project
        if (!user.proStatus && user.role !== 'admin') {
            visibleProjects.push(userProjects[0]);
        } else {
            // Pro users and admins see all their projects
            visibleProjects.push(...userProjects);
        }
    }

    // Sort by creation date again after filtering
    return visibleProjects.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
}
