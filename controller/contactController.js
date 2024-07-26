const User=require('../models/user_model');
const asynchandler=require('express-async-handler');
const Contact= require('../models/contact_model');
const { validateMongodbId } = require('../utils/validatemongodb');

class ContactController{
    static  createConact = asynchandler(async (req,res)=>{
        const { id } = req.user;
        validateMongodbId(id);
        const user = await User.findById(id);
       
        if (!user) {
            throw new Error('User not found');
          }
          const contact = await Contact.findOne( {email:req.body.email});
        
          if (contact) {
            throw new Error('contact already exist');
          }
        const newContact=new Contact({
        userId: id,
        name:req.body.name,
        phone:req.body.phone,
        email:req.body.email,
        url:req?.body?.url
       });
       await newContact.save();
       return res.status(200).json({newContact,message:'contacted added',success:true});

    });
    static getallcontacts = asynchandler(async(req,res)=>{

        const { id } = req.user;
        validateMongodbId(id);
        const contact = await Contact.find({userId:id}).populate( 'userId');
   
      if (!contact) {
        throw new Error('no Contact found');
      }
        res.status(200).json(contact);
    });
    static getaContactbyId = asynchandler(async(req,res)=>{

        const {id}=req.params
        const contact = await Contact.findById(id);
   
      if (!contact) {
        throw new Error('no Contact found');
      }
        res.status(200).json(contact);
    });
    static deleteaContactbyId = asynchandler(async(req,res)=>{
        const {id}=req.params
     
        const contact = await Contact.findByIdAndDelete(id);
   
      if (!contact ) {
        throw new Error('contact not found');
      }
      res.status(200).json({message:'contact  deleted'});
    });
    static updateContactbyId = asynchandler(async(req,res)=>{
        const {id}=req.params
      const contact = await Contact.findByIdAndUpdate(id,{
            name:req?.body?.name,
            url:req?.body?.url,
            mobile:req?.body?.mobile,
            email:req?.body?.email,
        },{new:true});
   
      if (!contact) {
        throw new Error('contact not found');
      }
        res.status(200).json({contact,message:'contact Updated',success:true});
    });
   
}
module.exports=ContactController;