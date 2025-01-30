'use server';
import { createPool, Pool } from 'mysql2/promise';


let pool: Pool | undefined = undefined;

export async function connectToDatabase() {
  try {
    if (!pool) {
      pool = createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
      });
    }

    return pool;
  } catch (err) {
    console.error('Error connecting to the database: ', err)
    throw new Error('Failed to connect to the database.')
  }
}
