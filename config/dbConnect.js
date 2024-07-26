const mongoose=require('mongoose');
const dotenv = require('dotenv').config()

const uri= process.env.MONG_URL

async function connect(){
  try {
    await mongoose.connect(uri,
      {
      // useNewUrlParser:true,
      // useUnifiedTopology: true,
     
    }
    );
    console.log('connected to db')
    
  } catch (error) {
    console.log('error db')
    console.error(error)
  }
}


module.exports= connect;