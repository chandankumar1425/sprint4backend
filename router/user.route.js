const express=require("express")
const usersRouter=express.Router()
const {UserModel}=require("../model/user.module")
const {auth}=require("../middleware/auth.middleware")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")



//to see all the data
usersRouter.get("/alldata",async(req,res)=>{
    try{
        const users= await UserModel.find();
        res.status(200).send(users)
    }catch(error){
        res.status(400).send({"msg":error.message})
    }
})

// //register
usersRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password,age,city,is_married}=req.body

    try{
        bcrypt.hash(password ,5 ,async(req , hash)=>{
            const users= new UserModel({name, email,gender, password:hash, age,city,is_married})
            await users.save()
            res.status(200).send({"msg":"Register Has Been Done"})
        })

    }catch(err){
        res.status(400).send({"msg":"chandan"})

    }
   })
///login
usersRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body

    try{
        const users =await UserModel.findOne({email})
        if(users){
            bcrypt.compare(password,users.password,(err,resualt)=>{
                if(resualt){
                    res.status(200).send({"msg":"LogIn Sucessfull","token":jwt.sign({"userId":users._id},"chandan")})
                }else{
                    res.status(200).send("LogIn Failed")
                }
            })
        }
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
   })







module.exports={usersRouter}
