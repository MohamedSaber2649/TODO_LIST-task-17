import { pool } from "./db.js";
export function dbQueries() {
    async function getAll() {
        const result = await pool.query("SELECT * FROM TODO ORDER BY id ASC");
        return result.rows;
    }
    async function getbyid(id) {
        const result = await pool.query("SELECT * FROM TODO WHERE id =$1", [id])
        return result.rows[0]
    }
    // The different between (LIKE & ILIKE)
    // LIKE: searches for a pattern in a specific column and is case-sensitive.
    // ILIKE: searches for a pattern in a specific column and is case-insensitive.
    async function search(title) {
        const result = await pool.query("SELECT * FROM TODO WHERE title ILIKE $1 OR body ILIKE $1 ", [`%${title}%`])
        return result.rows;
    }
    async function create(title, body) {
        const result = await pool.query(
            "INSERT INTO TODO (title, body) VALUES ($1, $2)",
            [title, body]
        );
        return result.rowCount;
    }
    async function update(id, title, body) {
        const result = await pool.query("UPDATE TODO SET title = $1, body = $2 WHERE id = $3", [title, body, id]
        );
        return result.rowCount;
    }
    async function Delete(id) {
        const result = await pool.query("DELETE FROM TODO WHERE id = $1", [id]);
        return result.rowCount;
    }
    async function toggleDone(id) {
        const result = await pool.query("UPDATE TODO SET done = NOT done WHERE id = $1", [id]
        );
        return result.rowCount;
    }
    return { getAll, search, getbyid, create, update, Delete, toggleDone };
}