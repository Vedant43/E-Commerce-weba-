import express from 'express'
import { PrismaClient } from '@prisma/client'
import zod from "zod";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JSON_PASSWORD, ENCRYPT_PASSWORD } from '../config.js';

const router = express.Router()
const prisma = new PrismaClient()

const signUpBody = zod.object({
    name:zod.string(),
    email:zod.string().email({message: "Invalid email address"}),
    password:zod.string().min(6,{message: "Invalid password address"}),
})

const signInBody = zod.object({
    email:zod.string().email({message: "Invalid email address"}),
    password:zod.string().min(6,{message: "Invalid password address"}),
})

// router.post('/signup',async (req,res)=>{

//     const {success,error} = signUpBody.safeParse(req.body)

//     if(!success){
//         return res.status(411).json({
//             message: "incorrect credentials"
//         })
//     }
//     const hashed_password = await bcrypt.hash(req.body.password,10)

//     try{
//         const user = await prisma.user.create({
//             data:{
//                 name:req.body.name,
//                 email:req.body.email,
//                 password:hashed_password,
//             }
//         })    

//         const token = jwt.sign({id:user.id},JSON_PASSWORD)

//         res.json({"token":token})
//     }catch(e){
//         res.status(415).json({"error":"error while signing in"})
//     }
// })

router.post('/signup',async (req,res)=>{

    const {data, success} = signUpBody.safeParse(req.body)

    if(!success){
        return res.status(411).json({
            error: "incorrect credentials"
        })
    }

    try{
        const createdAt = new Date().toISOString(); // Create an ISO string representing the current date and time

        const hashed_password = await bcrypt.hash(req.body.password,10)
        const user = await prisma.user.create({
                data:{
                    name:data.name,
                    email:data.email,
                    password:hashed_password,
                    createdAt
                }
            })

        const token = jwt.sign({id:user.id},JSON_PASSWORD)
        res.json({"token":token})

    }catch(e){
        console.log(e)
        res.status(415).json({error:"error while signing in"})
    }
})


router.post('/signin',async (req,res)=>{
    const {success} = signInBody.safeParse(req.body)

    if(!success){
        return res.status(411).json(
            {error:"incorrect email or password"}
        )
    }

    try{
        const user = await prisma.user.findUnique({
            where:{
                email:req.body.email,
            },
        })    

        if(!user){
            return res.status(404).json({error:"User not found"})
        }

        const user_for_password = await prisma.user.findFirst({
            where:{
                email:req.body.email
            },
            select:{
                password:true
            }
        })

        
        if(user_for_password){
            const encrypted_password = user_for_password.password
            const isPasswordValid = await bcrypt.compare(req.body.password,encrypted_password)

            if(!isPasswordValid){
                return res.status(415).json({"error":"Incorrect password"})
            }
        }

        const token = jwt.sign({id:user.id},JSON_PASSWORD)

        res.json({"token":token})
    }
    catch(e){
        res.status(415).json({"error":"error while signing in"})
    }

})

export default router


