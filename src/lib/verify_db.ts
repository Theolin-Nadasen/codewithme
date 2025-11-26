import 'dotenv/config';
import { drizzle_db } from "./db";
import { projects } from "./schema";

async function main() {
    try {
        const result = await drizzle_db.select().from(projects).limit(1);
        console.log("Projects table exists and is accessible.");
        process.exit(0);
    } catch (err) {
        console.error("Error accessing projects table:", err);
        process.exit(1);
    }
}

main();
