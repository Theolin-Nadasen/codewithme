import 'dotenv/config';
import { drizzle_db } from "./db";
import { sql } from "drizzle-orm";

async function main() {
    try {
        console.log("Creating projects table...");
        await drizzle_db.execute(sql`
      CREATE TABLE IF NOT EXISTS "projects" (
        "id" serial PRIMARY KEY NOT NULL,
        "user_id" text NOT NULL,
        "name" text NOT NULL,
        "link" text NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL
      );
    `);

        console.log("Adding foreign key constraint...");
        // Check if constraint exists first to avoid error
        await drizzle_db.execute(sql`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'projects_user_id_user_id_fk') THEN
          ALTER TABLE "projects" ADD CONSTRAINT "projects_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
        END IF;
      END $$;
    `);

        console.log("Migration applied successfully.");
        process.exit(0);
    } catch (err) {
        console.error("Migration failed:", err);
        process.exit(1);
    }
}

main();
