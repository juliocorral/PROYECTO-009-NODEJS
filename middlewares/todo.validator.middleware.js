const todoValidator = (req, res, next) => {
    const title = req.body.title?.trim();

    // Comprobamos que el título de la tarea no esté vacío, sino devolvemos un mensaje de error
    if (!title) {
        return res.status(400).json({
            success: false,
            message: "El título de la tarea es requerido",
        });
    }

    // Asignamos el título validado al body de la petición
    req.body.title = title;

    // Si la tarea existe, continuamos con la ejecución de la ruta o el siguiente middleware
    next();
}

export default todoValidator;