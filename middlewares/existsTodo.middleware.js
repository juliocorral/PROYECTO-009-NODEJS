import * as todosModel from "../models/todos.model.js";

const existsTodo = (req, res, next) => {
    const found = todosModel.getTodoById(req.params.id);

    if (!found) {
        return res.status(404).json({
            success: false,
            message: "Tarea no encontrada",
        });
    }

    // Si la tarea existe, continuamos con la ejecución de la ruta o el siguiente middleware
    next();
}

export default existsTodo;
