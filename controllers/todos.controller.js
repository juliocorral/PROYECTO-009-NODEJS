import { request, response } from "express";
import * as todosModel from "../models/todos.model.js";

export const getTodos = (req = request, res = response) => {
    const todos = todosModel.getTodos();
    res.status(200).json(todos);
}

export const getTodoById = (req = request, res = response) => {
    const todo = todosModel.getTodoById(req.params.id);
    return res.status(200).json(todo);        
}

export const createTodo = (req = request, res = response) => {
    const title = req.body.title?.trim();

    // Comprobamos que el título de la tarea no esté vacío, sino devolvemos un mensaje de error
    if (!title) {
        return res.status(400).json({
            success: false,
            message: "El título de la tarea es requerido",
        });
    }

    const newTodo = todosModel.createTodo(title);

    res.status(201).json({
        success: true,
        data: newTodo,
    });
}

export const updateTodo = (req = request, res = response) => {
    const found = todosModel.getTodoById(req.params.id);

    // Comprobamos que el título de la tarea no esté vacío, sino devolvemos un mensaje de error
    const newTitle = req.body.title?.trim();
    if (!newTitle) {
        return res.status(400).json({
            success: false,
            message: "El título de la tarea es requerido",
        });
    }
    // Actualizamos el título de la tarea encontrada con los datos del body de la petición
    const updatedTodo = todosModel.updateTodo(req.params.id, newTitle);

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

export const deleteTodo = (req = request, res = response) => {
    const found = todosModel.getTodoById(req.params.id);

    // Eliminamos todos la tarea de la lista y devolvemos un mensaje de éxito
    const deletedTodo = todosModel.deleteTodo(req.params.id);
    if (!deletedTodo) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar la tarea",
        });
    }

    // Devolvemos la tarea eliminada y la lista actualizada
    return res.status(200).json({
        success: true,
        data: deletedTodo[0],
        todos: todosModel.getTodos(),
    });        
}