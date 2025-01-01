import express from "express";
import { add, completeTodo, deleteTodo, getAllTodo } from "../controller/todo.controller.js";

const todoRouter=express.Router()

todoRouter.post("/add",add)
todoRouter.get("/getAllTodo",getAllTodo)
todoRouter.post("/completeTodo/:id",completeTodo)
todoRouter.delete("/deleteTodo/:id",deleteTodo)


export default todoRouter