import express from 'express';
import { logger } from './middlewares/logger.js';
import { todosRouter } from './routes/todos.route.js';
import { homeRouter } from './routes/home.route.js';

// Creamos la instancia
const app = express();
const port = process.env.PORT;


// MIDDLEWARES
app.set("view engine", "hbs");
app.set("views", "./views");
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
// Regisytrar el middleware logger para que se ejecute en todas las rutas
app.use(logger);


// RUTAS
app.use("/todos", todosRouter);
app.use("/", homeRouter);


// Iniciar el servidor y escuchar en el puerto especificado
app.listen(port, () => {
    console.log(`Arrancando servidor en localhost:${port}`);
});

