import Todo from "../models/Todo.js"

export const GetTodo=async (req, res) => {
  const list = await Todo.find()
  res.json(list)
}

export const AddTodo= async (req, res) => {
  const { title } = req.body
  const todo = await Todo.create({ title })
  res.json(todo)
}

export const UpdateTodo=async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(todo)
}

export const DeleteTodo=async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id)
  res.sendStatus(204)
}