import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { drizzle_db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";

export const authOptions: NextAuthOptions = {
    adapter: DrizzleAdapter(drizzle_db),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            // If user is present (initial sign-in), populate token from the user object directly.
            // The user object comes from the adapter and contains the latest DB data.
            if (user) {
                token.id = user.id;
                token.rank = user.rank;
                token.proStatus = user.proStatus;
                token.dailyApiUses = user.dailyApiUses;
                token.lastApiUseDate = user.lastApiUseDate;
                token.role = user.role;
            } 
            // Only fetch from DB if explicitly triggered for an update (e.g., update() call from client)
            // AND token.id exists. Otherwise, rely on the token's existing data for passive revalidations.
            // This prevents hitting the DB for every passive revalidation if the data hasn't changed.
            else if (token.id && trigger === "update") {
                const [dbUser] = await drizzle_db.select().from(users).where(eq(users.id, token.id as string));
                if (dbUser) {
                    token.rank = dbUser.rank;
                    token.proStatus = dbUser.proStatus;
                    token.dailyApiUses = dbUser.dailyApiUses;
                    token.lastApiUseDate = dbUser.lastApiUseDate;
                    token.role = dbUser.role;
                }
            }
            
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.rank = token.rank as number;
                session.user.proStatus = token.proStatus as boolean;
                session.user.dailyApiUses = token.dailyApiUses as number;
                session.user.lastApiUseDate = token.lastApiUseDate as Date;
                session.user.role = token.role as string;
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };