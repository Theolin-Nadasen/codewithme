import { Pool } from "pg";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const pool = new Pool({
    connectionString : process.env.DATABASE_URL,
});

export const db = {
    query : (text: string, params? : (string | number | boolean | null)[]) => pool.query(text, params),
};

const client = postgres(process.env.DATABASE_URL as string);
export const drizzle_db = drizzle(client);