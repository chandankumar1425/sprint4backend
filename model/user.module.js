const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
     name:String,
     email : String,
     gender : String,
     password : String,
     age : Number,
     city : String,
     is_married :String
},{
    versionKey:false})
const UserModel=mongoose.model("lnuser",userSchema)

module.exports={UserModel}