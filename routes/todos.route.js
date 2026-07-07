import { Router } from "express";
import { todos } from "../data/todos.js";
import { getTodos, getTodoById, createTodo, updateTodo, deleteTodo } from "../controllers/todos.controller.js";
import todoIdValidator from "../middlewares/todoId.validator.middleware.js";
import existsTodo from "../middlewares/existsTodo.middleware.js";
import todoValidator from "../middlewares/todo.validator.middleware.js";

export const todosRouter = Router();

// Pipeline de middlewares para validar el ID de la tarea
todosRouter.param("id", todoIdValidator);

// READ
todosRouter.get("/", getTodos); 

todosRouter.get("/:id", existsTodo, getTodoById);

// CREATE
todosRouter.post("/", todoValidator, createTodo);

// UPDATE
todosRouter.put("/:id", existsTodo, todoValidator, updateTodo);

// DELETE
todosRouter.delete("/:id", existsTodo, deleteTodo);