const jwt=require("jsonwebtoken")

const auth = (req,res,next)=>{
    const token =req.headers.authorization
    if(token){
        jwt.verify(token,"chandan",(err,decode)=>{
            if(decode){
                req.body.userId=decoe.userId
                next()
            }else{
                res.send('login required')
            }
        })
    
    }else{
        res.send('Login Required')
    }
}

module.exports={auth}
