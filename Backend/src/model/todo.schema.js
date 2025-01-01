import mongoose, { model } from "mongoose";

const todoSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    userID:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    complete:{
        type:Boolean,
        default:false
    }

})

const todos=mongoose.model("todos",todoSchema)

export default todos