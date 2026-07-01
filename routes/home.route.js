import { Router } from "express";
import { todos } from "../data/todos.js";

export const homeRouter = Router();

homeRouter.get("/", (req, res) => {
   res.render("home", { name: "Julio", todos });
});