import { Router } from "express";
import { todos } from "../data/todos.js";
import { getTodos, getTodoById, createTodo, updateTodo, deleteTodo } from "../controllers/todos.controller.js";
import todoIdValidator from "../middlewares/todoId.validator.middleware.js";
import existsTodo from "../middlewares/existsTodo.middleware.js";
import todoValidator from "../middlewares/todo.validator.middleware.js";
import createTodoSchema from "../schemas/createTodo.schema.js";
import updateTodoSchema from "../schemas/updateTodo.schema.js";
import rateLimit from "express-rate-limit";

export const todosRouter = Router();

// Pipeline de middlewares para validar el ID de la tarea
todosRouter.param("id", todoIdValidator);

// Limitamos las peticiones de rutas a 100
const todosRateLimit = rateLimit({
    windowMs: 1 * 60 * 1000,
    limit: 100,
});

todosRouter.use(todosRateLimit);

// READ
todosRouter.get("/", getTodos); 

todosRouter.get("/:id", existsTodo, getTodoById);

// CREATE
todosRouter.post("/", todoValidator(createTodoSchema), createTodo);

// UPDATE
todosRouter.put("/:id", existsTodo, todoValidator(updateTodoSchema), updateTodo);

// DELETE
todosRouter.delete("/:id", existsTodo, deleteTodo);