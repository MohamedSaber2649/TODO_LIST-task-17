import { Router } from "express";
import { dbQueries } from "../DB/queries.js";
const db = dbQueries();
export const toggleRoute = Router();
toggleRoute.patch("/:id/toggle", async (req, res) => {
    // get the id from params
    const { id } = req.params;
    // get specific todo by id
    const existing = await db.getbyid(id);
    // check if exist or not
    if (!existing) {
        return res.status(404).json({
            error: "This Todo does not exist"
        });
    }
    //update the toggle in database
    await db.toggleDone(id);
    return res.status(200).json({
        message: "Todo status toggled successfully"
    });
});