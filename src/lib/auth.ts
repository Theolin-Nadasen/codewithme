import { NextAuthOptions } from "next-auth";
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
            // If token.id exists (meaning a session is being revalidated or explicitly updated),
            // ALWAYS fetch fresh data from the database to ensure dailyApiUses is current.
            else if (token.id) {
                const [dbUser] = await drizzle_db.select().from(users).where(eq(users.id, token.id as string));
                if (dbUser) {
                    const today = new Date();
                    const lastUse = new Date(dbUser.lastApiUseDate || 0);

                    // Check if the last API use was before today
                    if (lastUse.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)) {
                        // If so, reset daily uses and update the date
                        const [updatedUser] = await drizzle_db.update(users)
                            .set({ dailyApiUses: 0, lastApiUseDate: new Date() })
                            .where(eq(users.id, dbUser.id))
                            .returning();
                        
                        // Use the updated user data for the token
                        if (updatedUser) {
                            token.dailyApiUses = updatedUser.dailyApiUses;
                            token.lastApiUseDate = updatedUser.lastApiUseDate;
                        }
                    } else {
                        // If not a new day, just use the data from the initial fetch
                        token.dailyApiUses = dbUser.dailyApiUses;
                        token.lastApiUseDate = dbUser.lastApiUseDate;
                    }

                    // Populate other user details
                    token.rank = dbUser.rank;
                    token.proStatus = dbUser.proStatus;
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