
import express from "express"
import { getuserinfo, login, signup } from "../controller/user.controller.js"
import { authenticate } from "../middleware/user.auth.js"


const userRouter=express.Router()

userRouter.post("/signup",signup)
userRouter.post("/login",login)
userRouter.get("/getuserinfo",authenticate,getuserinfo)

export default userRouter