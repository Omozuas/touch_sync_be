const User=require("../models/user_model");
const jwt=require('jsonwebtoken');
const asynchandler=require('express-async-handler');


class Auth{
   static authmiddleware =asynchandler(async(req,res,next)=>{
    //middleware logic will be ritten here 
    let token;
    if(!req?.headers?.authorization?.startsWith('Bearer')){
      throw new Error('Not authorized. No token');
    }
    if(req?.headers?.authorization?.startsWith('Bearer')){
       token = req.headers.authorization.split(' ')[1];
       try{
         if(token){
            const decode=  jwt.verify(token, process.env.JWT_SECRET)
            const user = await User.findById(decode.id);
            req.user = user;
            next();
         }
        
       }catch(err){
         throw new Error('Wrong or expired token');
       }
      }
   
   });

   static authIsActivated =asynchandler(async(req,res,next)=>{
      //middleware logic will be ritten here 
      const {email}=req.user;
      const admin=await User.findOne({email});
      if(admin.isActivated == false){
         throw new Error('Activate your account');
      }
      
      next(); 
     
     });


}

module.exports=Auth;