import express from "express"
import mongoose from "mongoose"

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unqiue:true
    },
    password:{
        type:String,
        required:true
    }
})

const User=mongoose.model("User",userSchema)

export default User