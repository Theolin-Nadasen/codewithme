import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle_db } from "./db";

async function main() {
  await migrate(drizzle_db, { migrationsFolder: "./drizzle" });
  console.log("Migration complete!");
  process.exit(0);
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
