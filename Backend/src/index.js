import express from "express" 
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRouter from "./routes/userRouter.js"
import cors from "cors"
import todoRouter from "./routes/todo.router.js"
import { authenticate } from "./middleware/user.auth.js"


dotenv.config()

const app=express()

app.use(express.json())

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Database connected")
    }catch(err){
        console.log(err)
    }
}

connectDB()

app.use(cors())
app.use("/user",userRouter)
app.use("/todo",authenticate,todoRouter)

app.get("/", (req, res)=>{
    res.send("Hello")
})


app.listen(6969,()=>{
    console.log("Started on localhost 6969");
})