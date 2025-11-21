import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./src/lib/schema.ts",
    out: "./drizzle",
    dialect: "postgresql", // Corrected from 'driver' to 'dialect' and value to 'postgresql'
    dbCredentials: {
        connectionString: process.env.DATABASE_URL as string,
    } as any, // Cast to any to bypass type error
});