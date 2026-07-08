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

app.use((req, res) => {
    return res.status(404).json({
        success: false,
        message: "Ruta no encontrada"
    });
});


// Iniciar el servidor y escuchar en el puerto especificado
app.listen(port, () => {
    console.log(`Arrancando servidor en localhost:${port}`);
});

// Closure: Función que recibe un parámetero y devuelve otra función que tiene acceso a ese parámetro.
/*
function sumar(a) {
    console.log("Valor de a:", a);
    return (b, c) => {
        console.log("Valor de a,b,c:", { a, b, c });
        return a + b + c;
    };
}
const sum1 = sumar(1);
sum1(2, 3); // 6
*/

