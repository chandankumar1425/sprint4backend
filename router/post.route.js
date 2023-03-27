const express=require("express")
const postsRouter=express.Router()
const {PostModel}=require("../model/post.module")
const jwt=require("jsonwebtoken")


//add
postsRouter.post("/add",async(req,res)=>{
    const payload =req.body;

    try{
        const posts=new PostModel (payload);
        res.status(200).send(await posts.save());
    }catch(err){
        res.status(400).send({msg:"Post is not created",err:err.message});
    }
});
//update

postsRouter.patch("/update/:id",async(req,res)=>{
    const id =req.params.body;
    const change =req.body;
    const note=await PostModel.findOne({_id:id});
    const useridpost=note.userId;
    const useridreq=req.body.userId;

    try{
        if(useridreq!==useridpost){
            res.send({msg:"You are not Eligible to do this"});
        }else{
            await PostModel.findByIdAndUpdate({_id:id},change);
            res.send("Updateed sucesfully");
        }
    }catch(err){
        res.status(400).send({msg:"wrong",err:err.message});
        console.log(err)
    }
});
//delete
postsRouter.delete("/delete/:id",async(req,res)=>{
    const id =req.params.body;
    const change =req.body;
    const note=await PostModel.findOne({_id:id});
    const useridpost=note.userID;
    const useridreq=req.body.userID;
    try{
        if(useridreq!==useridpost){
            res.send({msg:"You are not Eligible to do this"});
        }else{
            await PostModel.findByIdAndDelete({_id:id},change);
            res.send("Deleted sucesfully");
        }
    }catch(err){
        res.status(400).send({msg:"wrong",err:err.message});
        console.log(err)
    }
})
//maximum post
postsRouter.get("/top",async (req,res)=>{
    try{
        const posts=await PostModel.find({});
        const sort=posts.sort((a,b)=>b.no_of_comments -a.no_of_comments);
    }catch(err){
        console.log(err);
        res.status(400).send({error:"Error"})
    }
})



///filter

postsRouter.get("/",async (req,res)=>{
    const {device,device1,device2}=req.query
    try{
        let query={};
        if(device){
            query.device ={$regex: new RegExp(device,"i")};
        }
        const data =await PostModel.find(query);
        res.send(data);    
    }catch(err){
        console.log(err);
        res.status(400).send({error:"Error"})
    }
})

module.exports={postsRouter}
