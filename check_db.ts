import 'dotenv/config';
import { drizzle_db } from './src/lib/db';
import { users } from './src/lib/schema';
import { sql } from 'drizzle-orm';

async function checkDb() {
    try {
        console.log('Checking database schema and users...');

        // Check if columns exist by trying to select them
        const result = await drizzle_db.select({
            email: users.email,
            proStatus: users.proStatus,
            subscriptionReference: users.subscriptionReference,
            subscriptionStatus: users.subscriptionStatus
        }).from(users).limit(5);

        console.log('Users found:', result);

        // Check column information from information_schema
        const columns = await drizzle_db.execute(sql`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'user';
        `);

        console.log('Columns in user table:', columns);

    } catch (error) {
        console.error('Error checking DB:', error);
    }
    process.exit(0);
}

checkDb();
