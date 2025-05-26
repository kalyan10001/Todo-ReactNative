import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
  userId: mongoose.Schema.Types.ObjectId,
})

export const Todo=mongoose.model('Todo', todoSchema)
