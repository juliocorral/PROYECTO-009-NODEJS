import { request, response } from "express";
import * as todosModel from "../models/todos.model.js";

export const getTodos = async (req = request, res = response) => {
    const todos = await todosModel.getTodos();
    res.status(200).json(todos);
}

export const getTodoById = async (req = request, res = response) => {
    const todo = await todosModel.getTodoById(req.params.id);
    return res.status(200).json(todo);        
}

export const createTodo = async (req = request, res = response) => {
    const newTodo = await todosModel.createTodo(req.body.title);

    res.status(201).json({
        success: true,
        data: newTodo,
    });
}

export const updateTodo = async (req = request, res = response) => {
    const id = req.params.id;
    const title = req.body.title;
    const completed = req.body.completed ?? req.todo.completed;

    // Actualizamos el título de la tarea encontrada con los datos del body de la petición
    const updatedTodo = await todosModel.updateTodo(id, title, completed);

    if (!updatedTodo) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar la tarea",
        });
    }

    // Devolvemos la tarea actualizada
    return res.status(200).json({
        success: true,
        data: updatedTodo,
    });    
}

export const deleteTodo = async (req = request, res = response) => {
   // Eliminamos todos la tarea de la lista y devolvemos un mensaje de éxito
    const deletedTodo = await todosModel.deleteTodo(req.todo);

    if (!deletedTodo) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar la tarea",
        });
    }

    // Devolvemos la tarea eliminada y la lista actualizada
    return res.status(200).json({
        success: true,
        data: deletedTodo
    });        
}