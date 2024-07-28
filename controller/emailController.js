const nodemailer = require("nodemailer");



 async function sendEmail(params,cb)  {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.MAIL_ID,
                pass: process.env.MP
            }
        });

        await transporter.sendMail({
            from: {
                name: "TouchSync",
                address: process.env.MAIL_ID
            },
            to:params.to,
            subject:params.subject,
            text:params.text || '',
            html:params.body
        },(err,result)=>{
            if(err){
                console.log({emCont:err})
              return  cb(err)
            }else if(result){
                // console.log({result:result.})
                console.log({messageSent:result.messageId})
                cb(null,result.messageId)
            }
        }
    );
      
    };


module.exports ={ sendEmail};
