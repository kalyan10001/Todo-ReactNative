import express from 'express'
import { AddTodo, DeleteTodo, GetTodo, UpdateTodo } from '../controllers/todo.controller.js'
const router = express.Router()

router.get('/',GetTodo)

router.post('/',AddTodo)

router.put('/:id',UpdateTodo)

router.delete('/:id',DeleteTodo)

export default router
