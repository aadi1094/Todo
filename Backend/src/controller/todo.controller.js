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

export const completeTodo=async(req,res)=>{
    try {
       const id=req.params.id
       const existingTodo=await todos.findById(id) 
       await todos.findByIdAndUpdate(id,{
        complete:!existingTodo.complete  
       })
       return res.status(200).json({
        message:"Todo completed"
       })
    } catch (error) {
        console.log(error)
    }
}

export const deleteTodo=async(req,res)=>{
    try {
       const id=req.params.id
       await todos.findByIdAndDelete(id)
       return res.status(200).json({
        message:"Todo Deleted"
       })
    } catch (error) {
        console.log(error)
    }
}