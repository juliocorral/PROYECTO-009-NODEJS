import { Router } from "express";
import { todos } from "../data/todos.js";
import { getTodos, getTodoById, createTodo, updateTodo, deleteTodo } from "../controllers/todos.controller.js";

export const todosRouter = Router();

// READ
todosRouter.get("/", getTodos); 

todosRouter.get("/:id", getTodoById);

// CREATE
todosRouter.post("/", createTodo);

// UPDATE
todosRouter.put("/:id", updateTodo);

// DELETE
todosRouter.delete("/:id", deleteTodo);