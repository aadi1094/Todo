import express from "express"
import bcrypt from "bcrypt"
import User from "../model/user.schema.js"
import jwt from "jsonwebtoken"
import dotenv, { config } from "dotenv"

dotenv.config()

export const signup=async (req,res)=>{
    const {username,email,password}=req.body
    try {
        const hash=await bcrypt.hash(password,5)
        const user=await User.create({
            email:email,
            password:hash,
            username
        })

        if(!user){
            return res.status(404).json({
                message:"User not created"
            })
        }

        const token= await jwt.sign({
            id:user._id,
            
        },process.env.JWT_SECRET)

        res.status(200).json({
            message:"User created successfully",
            token
        })

        
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"Something went wrong"
        })
    }
}

export const login=async (req,res)=>{
    const {email,password}=req.body
    
    try {
        const user=await User.findOne({
            email:email
        })

        if(!user){
            return res.status(404).json({
                message:"User not found"
            })
        }
        console.log(user.password);
        
        const isPasswordMatched= await bcrypt.compare(password, user.password)
        if(!isPasswordMatched){
            return res.status(403).json({
                message:"Invalid password"
            })
        }

        const token= await jwt.sign({
            id:user._id,
            
        },process.env.JWT_SECRET)

        res.status(200).json({
            message:"User login successfully",
            token
        })
        
    } catch (error) {
        console.log(error)
    }
}

export const getuserinfo= async (req,res)=>{
    try {
        const id=req.user.id
        const user=await User.findById(id)
        if(!user){
            return res.status(404).send("No user found")
        }

        res.status(200).json({
            message:"Sucessfull ",
            user
        })

    } catch (error) {
        console.log(error)
    }
}