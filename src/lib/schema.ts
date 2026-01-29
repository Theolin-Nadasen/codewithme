import {
    timestamp,
    pgTable,
    text,
    integer,
    boolean,
    serial,
    uuid
} from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

export const users = pgTable("user", {
    id: uuid("id").primaryKey().defaultRandom(), // Supabase Auth ID
    name: text("name"),
    email: text("email").notNull(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
    rank: integer("rank").default(0).notNull(),
    proStatus: boolean("pro_status").default(false).notNull(),
    dailyApiUses: integer("daily_api_uses").default(0).notNull(),
    lastApiUseDate: timestamp("last_api_use_date", { mode: "date" }).defaultNow().notNull(),
    role: text("role").default('user').notNull(),
    mobileToken: text("mobile_token"),
})

export const news = pgTable("news", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    slug: text("slug").unique(),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    authorId: uuid("author_id").references(() => users.id),
})

export const code_examples = pgTable("code_examples", {
    id: serial("id").primaryKey(),
    language: text("language").notNull(),
    name: text("name").notNull(),
    content: text("content").notNull(),
    inputs: text("inputs"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const projects = pgTable("projects", {
    id: serial("id").primaryKey(),
    userId: uuid("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    link: text("link").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const challenges = pgTable("challenges", {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    difficulty: text("difficulty").notNull(),
    language: text("language").notNull(),
    starterCode: text("starter_code").notNull(),
    solutionCode: text("solution_code").notNull(),
    testCode: text("test_code").notNull(),
    expectedOutput: text("expected_output").notNull(),
    proOnly: boolean("pro_only").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const userCompletedChallenges = pgTable("user_completed_challenges", {
    id: serial("id").primaryKey(),
    userId: uuid("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    challengeId: text("challenge_id")
        .notNull()
        .references(() => challenges.id, { onDelete: "cascade" }),
    completedAt: timestamp("completed_at").defaultNow().notNull(),
})

export const usersRelations = relations(users, ({ many }) => ({
    projects: many(projects),
    completedChallenges: many(userCompletedChallenges),
}))

export const projectsRelations = relations(projects, ({ one }) => ({
    user: one(users, {
        fields: [projects.userId],
        references: [users.id],
    }),
}))

export const challengesRelations = relations(challenges, ({ many }) => ({
    completions: many(userCompletedChallenges),
}))

export const completedChallengesRelations = relations(userCompletedChallenges, ({ one }) => ({
    user: one(users, {
        fields: [userCompletedChallenges.userId],
        references: [users.id],
    }),
    challenge: one(challenges, {
        fields: [userCompletedChallenges.challengeId],
        references: [challenges.id],
    }),
}))

export const contentPlaylists = pgTable("content_playlists", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    playlistId: text("playlist_id").notNull().unique(),
    descriptionId: text("description_id").notNull(),
    category: text("category").notNull(), // "language", "framework", or "tool"
    createdAt: timestamp("created_at").defaultNow().notNull(),
})
