import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

console.log("DATABASE_URL:", process.env.DATABASE_URL ? "Defined" : "Undefined");

export default defineConfig({
    schema: "./src/lib/schema.ts",
    out: "./drizzle",
    dialect: "postgresql", // Corrected from 'driver' to 'dialect' and value to 'postgresql'
    dbCredentials: {
        url: process.env.DATABASE_URL as string,
    },
});