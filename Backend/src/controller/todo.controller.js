import todos from "../model/todo.schema.js"

export const add=async(req,res)=>{
    try {
        const userID=req.user.id
        const {title,time}=req.body

        const addTodo=await todos.create({
            title,
            time,
            userID
        }
        )

        res.status(200).json({
            message:"todo created",
            addTodo
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send("Can't Add Todo")
    }
}

export const getAllTodo=async(req,res)=>{
    try {
        const userID=req.user.id

        const addTodo=await todos.find({
            userID
        }
        )

        res.status(200).json({
            addTodo
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send("Don't have Todos")
    }
}