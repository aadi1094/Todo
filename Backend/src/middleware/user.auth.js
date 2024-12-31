import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export const authenticate=async(req,res,next)=>{
    const token=req.headers.token
    if(!token){
        res.status(404).json({
            message:"No token"
        })
    }
    
    const data=  jwt.decode(token,process.env.JWT_SECRET)
    if(!data){
        return res.status(403).send("Invalid token ")
    }

    req.user=data

    next()

}