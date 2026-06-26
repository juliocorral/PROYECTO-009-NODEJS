import express from 'express'


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

// Middelwares
app.set("view engine", "hbs");
app.set("views", "./views");
app.use(express.urlencoded({ extended: true }));



app.get("/", (request, response) => {
    console.log("GET [200] /");
    //response.send("Respuesta de la ruta /");
    /*
    response.json({
        message: "Hola desde ExpressJS ",
        query: request.query,
    });
    */
   response.render("home", { name: "Julio", todos });
});

app.get("/:id", (req, res) => {
    res.send(`ID: ${req.params.id}`);
});

// Crear ruta: /todos/id
// Buscar dentro de nuestra lista todos la tarea con el ID, sino la encontramos devolvemos msg de "tarea no encontrada"
app.get("/todos/:id", (req, res) => {
    const todo = todos.find((todo) => todo.id ===  Number(req.params.id));

    if (todo) {
        res.send(`Nombre: ${todo.title}`);
    } else {
        res.send("Tarea no encontrada");
    }
});

app.post("/todos/create", (req, res) => {
    const newTodo = {
        id: todos.length + 1,
        title: req.body.title
    }

    // Agregar una nueva tarea a la lista
    todos.push(newTodo);

    // Responder con nuestra plantilla home.hbs pasándole la lista actualizada
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Arrancando servidor en localhost:${port}`);
});

