import 'dotenv/config';
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL!;
const sql = postgres(connectionString);

async function main() {
    try {
        console.log("Creating content_playlists table...");

        // Check if table exists
        const tableExists = await sql`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_name = 'content_playlists'
            );
        `;

        if (tableExists[0].exists) {
            console.log("Table content_playlists already exists.");
        } else {
            await sql`
                CREATE TABLE IF NOT EXISTS "content_playlists" (
                    "id" serial PRIMARY KEY NOT NULL,
                    "title" text NOT NULL,
                    "playlist_id" text NOT NULL,
                    "description_id" text NOT NULL,
                    "category" text NOT NULL,
                    "created_at" timestamp DEFAULT now() NOT NULL,
                    CONSTRAINT "content_playlists_playlist_id_unique" UNIQUE("playlist_id")
                );
            `;
            console.log("Table content_playlists created successfully.");
        }

        await sql.end();
        process.exit(0);
    } catch (err) {
        console.error("Error creating table:", err);
        await sql.end();
        process.exit(1);
    }
}

main();
