import { Router } from "express";
import { dbQueries } from "../DB/queries.js";
import { checkSchema } from "../Middleware/checkSchema.js";
import { todoSchema } from "../Schema/todolistSchema.js";
const db = dbQueries();
export const todoRoute = Router();
//                                       ---------> (Chain route) <----------
// get all TODO
todoRoute.route("/").
    get(async (req, res) => {
        const { search } = req.query
        if (search) {
            const todo_search = await db.search(search);
            return res.status(200).json({
                data: todo_search
            })
        }
        // get all data from DB
        const data = await db.getAll();
        // return response
        return res.status(200).json({
            data: data
        })
    })
    // Created New Todo in DB
    .post(checkSchema(todoSchema), async (req, res) => {
        // get data from body
        const { title, body } = req.body
        // craete new Todo in db
        const data = await db.create(title, body);
        if (data) {
            return res.status(201).json({
                message: "TODO created Successfuly",
            })
        }
    })
todoRoute.route("/:id").
    get(async (req, res) => {
        // get id from params
        const { id } = req.params;
        // find the todo by id
        const existing = await db.getbyid(id);
        if (!existing) {
            return res.status(404).json({
                error: "This Todo is not existing"
            })
        }
        return res.status(200).json({
            data: existing
        })
    })
    .patch(checkSchema(todoSchema.partial()), async (req, res) => {
        // get the id from params
        const { id } = req.params
        // get Specific todo from all todos by id
        const existing = await db.getbyid(id);
        //checking if existing or not
        if (!existing) {
            return res.status(404).json({
                error: "This Todo not exist to Update it."
            })
        }
        // get data from body
        const { title, body } = req.body;
        await db.update(id, title ?? existing.title, body ?? existing.body);
        return res.status(200).json({
            message: "Todo is Updated Successfuly"
        })
    })
    .delete(async (req, res) => {
        // get the id from params
        const { id } = req.params;
        // get Specific todo from all todos by id
        const existing = await db.getbyid(id);
        if (!existing) {
            return res.status(404).json({
                message: "Sorry can't find the Todo to Delete it"
            })
        }
        await db.Delete(id);
        return res.status(200).json({
            message: "Todo deleted successfully"
        });
    })
