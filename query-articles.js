const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function queryArticles() {
  try {
    const result = await pool.query(
      `SELECT title, content FROM news WHERE title LIKE '%Kimi K2.5%' OR title LIKE '%Top 10 AI Coding Tools%'`
    );
    
    result.rows.forEach((row, index) => {
      console.log(`\n${'='.repeat(80)}`);
      console.log(`ARTICLE ${index + 1}: ${row.title}`);
      console.log(`${'='.repeat(80)}`);
      console.log('\nCONTENT:');
      console.log(row.content);
      console.log(`\n${'='.repeat(80)}\n`);
    });
    
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await pool.end();
  }
}

queryArticles();
