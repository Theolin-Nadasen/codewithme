import {
    timestamp,
    pgTable,
    text,
    primaryKey,
    integer,
    boolean,
    serial
} from "drizzle-orm/pg-core"
import type { AdapterAccount } from "next-auth/adapters"

export const users = pgTable("user", {
    id: text("id").notNull().primaryKey(),
    name: text("name"),
    email: text("email").notNull(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
    rank: integer("rank").default(0).notNull(),
    proStatus: boolean("pro_status").default(false).notNull(),
    dailyApiUses: integer("daily_api_uses").default(0).notNull(),
    lastApiUseDate: timestamp("last_api_use_date", { mode: "date" }).defaultNow().notNull(),
    role: text("role").default('user').notNull(),
})

export const accounts = pgTable(
    "account",
    {
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: text("type").$type<AdapterAccount["type"]>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account) => ({
        compositePk: primaryKey({ columns: [account.provider, account.providerAccountId] }),
    })
)

export const sessions = pgTable("session", {
    sessionToken: text("sessionToken").notNull().primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const verificationTokens = pgTable(
    "verificationToken",
    {
        identifier: text("identifier").notNull(),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (vt) => ({
        compositePk: primaryKey({ columns: [vt.identifier, vt.token] }),
    })
)

export const news = pgTable("news", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    slug: text("slug").unique(),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    authorId: text("author_id").references(() => users.id),
})
