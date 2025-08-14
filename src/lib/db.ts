import { Pool } from "pg";

const pool = new Pool({
    connectionString : process.env.DATABASE_URL,
});

export const db = {
    query : (text: string, params? : (string | number | boolean | null)[]) => pool.query(text, params),
};