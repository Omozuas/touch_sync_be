const otpgen= require('otp-generator');
const crypto=require('crypto');
const key='test123';
const emailservice=require('../controller/emailController');

async function sendOtp(params,callback){
   
    const otp=otpgen.generate(
        4,{
            digits:true,
            upperCaseAlphabets:false,
            specialChars:false,
            lowerCaseAlphabets:false
        }
    );
    const ttl=5*60*1000;//5mins
    const expire =Date.now()+ttl;
     const data=`${params.email}.${otp}.${expire}`;
   const hash= crypto.createHmac('sha256',key).update(data).digest( 'hex');
   const fullHash=`${hash}.${expire}`;
   
   var otpMassage=`<p>Dear Customer, this is the onetime PIN for  registring <b>DO NOT DISCLOSE</b></p><p style="color:tomato; font-size:25px; letter-spacing:2px"><b>${otp}</b></p><p>this code<b>expires in 5min</b>.</p>`;

   var model={
    to:params.email,
    subject:'Confirm your OTP',
    body:otpMassage
   };
   emailservice.sendEmail(model,(err,result)=>{
    if(err){
        console.log({opt:err})
        return callback(err);
    }
    return callback(null,fullHash);
   });
}

async function verifyOtp(params,callback){

    let[hashvalue,expires]=params.hash.split('.');
    let now=Date.now();
    if(now > parseInt(expires))return callback("Otp expired");

    let data =`${params.email}.${params.otp}.${expires}`;

    let newCalculatedhash = crypto.createHmac("sha256",key).update(data).digest("hex");

    if(newCalculatedhash === hashvalue){
        return callback(null,"success");
    };
    // const matchotp= await otpgen.findone()
    return callback('invalit opt');
}


module.exports={
    sendOtp,verifyOtp};