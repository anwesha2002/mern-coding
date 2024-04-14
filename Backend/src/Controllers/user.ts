import {raw, RequestHandler} from "express";
import createHttpError from "http-errors";
import userModel from "../Models/users"

interface SignUpProps {
    username : string,
    email : string,
    password : string
}

export const SignUp : RequestHandler<unknown, unknown,SignUpProps,unknown> = async (req,res, next) => {
        const username = req.body.username
        const email = req.body.email
        const password = req.body.password
    try {
       if(!username || !email || !password){
           throw createHttpError("please fill all the field")
       }
       const newuser = await userModel.create({
           username : username,
           email: email,
           password : password
       })



        res.status(201).json(newuser)
    }catch (error){
        console.log(error)
    }
}

export function Login(){

}

export function Logout(){

}

export function signUp(){

}