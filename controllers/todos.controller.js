import { request, response } from "express";
import * as todosModel from "../models/todos.model.js";

export const getTodos = (req = request, res = response) => {
    const todos = todosModel.getTodos();
    res.status(200).json(todos);
}

export const getTodoById = (req = request, res = response) => {
    const todo = todosModel.getTodoById(Number(req.params.id.trim()));

    if (todo) {
        return res.status(200).json(todo);        
    }

    return res.status(404).json({
        success: false,
        message: "Tarea no encontrada",
    });
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
    const found = todosModel.getTodoById(Number(req.params.id.trim()));

    if (!found) {
      return res.status(404).json({
            success: false,
            message: "Tarea no encontrada",
        });      
    }

    // Comprobamos que el título de la tarea no esté vacío, sino devolvemos un mensaje de error
    const newTitle = req.body.title?.trim();
    if (!newTitle) {
        return res.status(400).json({
            success: false,
            message: "El título de la tarea es requerido",
        });
    }
    // Actualizamos el título de la tarea encontrada con los datos del body de la petición
    todosModel.updateTodo(Number(req.params.id.trim()), newTitle);

    // Devolvemos la tarea actualizada
    return res.status(200).json({
        success: true,
        data: todosModel.getTodoById(Number(req.params.id.trim()))  ,
    });    
}

export const deleteTodo = (req = request, res = response) => {
    const found = todosModel.getTodoById(Number(req.params.id.trim()));

    // Sino encontramos la tarea, devolvemos un mensaje de error   
    if (!found) {
        return res.status(404).json({
            success: false,
            message: "Tarea no encontrada",
        });
    }

    // Eliminamos todos la tarea de la lista y devolvemos un mensaje de éxito
    const deletedTodo = todosModel.deleteTodo(Number(req.params.id.trim()));

    // Devolvemos la tarea eliminada y la lista actualizada
    return res.status(200).json({
        success: true,
        data: deletedTodo[0],
        todos: todosModel.getTodos(),
    });        
}