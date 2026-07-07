const todoIdValidator = (req, res, next, value) => {
    const id = Number(value?.trim());

    if (!Number.isSafeInteger(id) || id <= 0) {
        return res.status(400).json({
            success: false,
            message: "ID de la tarea no válido, debe ser número entero positivo",
        });
    }

    // Asignar el ID validado a req.params.
    req.params.id = id; 
    
    // Llamar a next() para continuar con la ejecución de la ruta o el siguiente middleware
    next();
};

export default todoIdValidator;