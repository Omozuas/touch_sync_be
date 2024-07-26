const express = require('express');
const bodyPerser=require('body-parser')
const dotenv = require('dotenv').config()
const cors =require('cors');
const dbConnect =require('./config/dbConnect');
const morgan=require('morgan');
const cron = require("node-cron");
const axios=require('axios');
const authRoter=require('./routes/authRoutes');
const contactRoter=require('./routes/contactRoute');
const Router=require('./routes/index');
dbConnect();

const app=express();

//router
app.use(cors());
app.use(morgan('dev'))
app.use(bodyPerser.json())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/',Router);
app.use('/api/user',authRoter);
app.use('/api/contact',contactRoter);

cron.schedule("*/10 * * * *", async () => {
    try {
      const currentTime = new Date();
      console.log(`Current time: ${currentTime}`);
      
      const response = await axios.get('https://touch-sync-be.onrender.com/');
      console.log('API Response:', response.data);
    } catch (error) {
      console.error('Error fetching API:', error);
    }
  });

//start server
app.listen(process.env.PORT ,()=>{
    console.log(`server is running on ${process.env.PORT}`)
})