import express from "express";
import { add, getAllTodo } from "../controller/todo.controller.js";

const todoRouter=express.Router()

todoRouter.post("/add",add)
todoRouter.get("/getAllTodo",getAllTodo)

export default todoRouter