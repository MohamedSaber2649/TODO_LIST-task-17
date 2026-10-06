import express from "express"
import { checkConnection } from "./DB/db.js";
import { todoRoute } from "./Routes/todo.routes.js";
import { toggleRoute } from "./Routes/toggle.routes.js";
const app = express();
const port = process.env.PORT;
app.use((req, res, next) => {
    console.log(new Date().toLocaleString(), req.method, req.url);
    next();
});
app.use(express.json());
app.use("/todo", todoRoute);
app.use("/todo", toggleRoute);
checkConnection();
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});