// const mysql = require('mysql2/promise');
// const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = global.APP_CONFIG;
// const logger = require('../utils/logger');

// const pool = mysql.createPool({
//   host: DB_HOST,
//   user: DB_USER,
//   password: DB_PASS,
//   database: DB_NAME,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// pool.getConnection()
//   .then(conn => {
//     logger.logInfo('✅ Database connected successfully');
//     conn.release();
//   })
//   .catch(err => {
//     logger.logError('❌ Database connection failed: ' + err.message);
//   });

// module.exports = pool;


//==============================================================================================
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // required for Supabase SSL
  },
});

pool.connect()
  .then(() => console.log("✅ Connected to Supabase PostgreSQL"))
  .catch((err) => console.error("❌ Database connection failed:", err.message));

export default pool;
