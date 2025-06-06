import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import { ConnectToDb } from './db/ConnectToDb.js'
import router from './routes/todo.routes.js'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

const PORT=process.env.PORT || 5000

app.use("/api/todo",router)

app.listen(PORT,async()=>{
    await ConnectToDb();
    console.log(`Port running on ${PORT}`)
})
