const express=require("express")
const cors=require("cors")
const { connection } = require("./db")
const {usersRouter}=require("./router/user.route")
const {postsRouter}=require("./router/post.route")
const {auth}=require("./middleware/auth.middleware")
require("dotenv").config()
const app=express()
app.use(express.json())
app.use(cors())
app.use("/users",usersRouter)
app.use(auth)
app.use("/post",postsRouter)

//servere
app.listen(process.env.port,async(res,err)=>{
    try{
        await connection
        console.log("Connected to the database")
    
    }catch(err){
        console.log(err)
    }
    console.log(`Server are running at port ${process.env.port} `)
})