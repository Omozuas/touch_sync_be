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
   static authIsAdmin =asynchandler(async(req,res,next)=>{
      //middleware logic will be ritten here 
      const {email}=req.user;
      const admin=await User.findOne({email});
      if(admin.role !=="isAdmin"){
         console.log(admin.role)
         throw new Error('Users not Authorized');
         
      }
      console.log(admin.role)
      next(); 
     
     });

     static authIsVendor = asynchandler(async (req, res, next) => {
      const { email } = req.user;
      const user = await User.findOne({ email });
  
      if (!user || (user.role !== "isAdmin" && user.role !== "isVendor")) {
          console.log(user ? user.role : "No user found");
          return res.status(403).json({ message: 'User not authorized' });
      }
  
      console.log(user.role);
      next();
  });
}

module.exports=Auth;