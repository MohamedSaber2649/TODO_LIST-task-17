import z from "zod"
export const todoSchema = z.object({
    title: z.string().trim().min(3, "must contain at least 3 charchter"),
    body: z.string().optional()
})