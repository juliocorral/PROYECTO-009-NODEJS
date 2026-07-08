import * as todosModel from "../models/todos.model.js";

const existsTodo = async(req, res, next) => {
    const found = await todosModel.getTodoById(req.params.id);

    if (!found) {
        return res.status(404).json({
            success: false,
            message: "Tarea no encontrada",
        });
    }
    
    // Si la tarea existe, continuamos con la ejecución de la ruta o el siguiente middleware
    req.todo = found; // Guardamos la tarea encontrada en el objeto req para que esté disponible en los siguientes middlewares o controladores
    next();
}

export default existsTodo;
