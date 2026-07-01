import express from 'express';
import { logger } from './middlewares/logger.js';

// Creamos la instancia
const app = express();
const port = process.env.PORT;

const todos = [
    {
        id: 1,
        title: "Tarea 1"
    },
    {
        id: 2,
        title: "Tarea 2"
    },
    {
        id: 3,
        title: "Tarea 3"
    },
];

// MIDDLEWARES
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.use(logger);


// RUTAS
app.get("/", (request, response) => {
    //response.send("Respuesta de la ruta /");
    /*
    response.json({
        message: "Hola desde ExpressJS ",
        query: request.query,
    });
    */
   response.render("home", { name: "Julio", todos });
});

// READ
app.get("/todos", (req, res) => {
    res
    .status(200)
    .json(todos);
});

app.get("/:id", (req, res) => {
    res.send(`ID: ${req.params.id}`);
});

app.get("/todos/:id", (req, res) => {
    const todo = todos.find((todo) => todo.id ===  Number(req.params.id));

    if (todo) {
        return res
        .status(200)
        .json(todo);        
    }

    return res
    .status(404)
    .json({
        success: false,
        message: "Tarea no encontrada",
    });
});

// CREATE
app.post("/todos/create", (req, res) => {
    const newTodo = {
        id: todos.length + 1,
        title: req.body.title
    }

    // Agregar una nueva tarea a la lista
    todos.push(newTodo);

    res
        .status(201)
        .json({
            success: true,
            data: newTodo,
        });
});

// UPDATE
app.put("/todos/:id", (req, res) => {
    const found = todos.findIndex((todo) => todo.id ===  Number(req.params.id));

    if (found === -1) {
      return res
        .status(404)
        .json({
            success: false,
            message: "Tarea no encontrada",
        });      
    }

    // Comprobamos que el título de la tarea no esté vacío, sino devolvemos un mensaje de error
    const newTitle = req.body.title?.trim();
    if (!newTitle) {
        return res
            .status(400)
            .json({
                success: false,
                message: "El título de la tarea es requerido",
            });
    }
    // Actualizamos el título de la tarea encontrada con los datos del body de la petición
    todos[found].title = newTitle;

    // Devolvemos la tarea actualizada
    return res
        .status(200)
        .json({
            success: true,
            data: todos[found],
        });    
});

// DELETE
app.delete("/todos/:id", (req, res) => {
    const found = todos.findIndex((todo) => todo.id ===  Number(req.params.id));

    // Sino encontramos la tarea, devolvemos un mensaje de error   
    if (found === -1) {
        return res
        .status(404)
        .json({
            success: false,
            message: "Tarea no encontrada",
        });
    }

    // Eliminamos todos la tarea de la lista y devolvemos un mensaje de éxito
    const deletedTodo = todos.splice(found, 1);

    // Devolvemos la tarea eliminada y la lista actualizada
    return res.status(200).json({
            success: true,
            data: deletedTodo[0],
            todos,
        });        
    }
);

app.listen(port, () => {
    console.log(`Arrancando servidor en localhost:${port}`);
});

