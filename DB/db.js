import "dotenv/config";
import { Pool } from "pg"
export const pool = new Pool({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    port: process.env.PGPORT,
    database: process.env.PGDATEBASE,
    password: process.env.PGPASSWORD
})
export async function checkConnection() {
    try {
        const result = await pool.connect();
        console.log("PostgreSQL connected successfully");
        result.release();
    } catch (error) {
        console.log("PostgreSQL connected failed");
        console.log(error.message);
    }
}