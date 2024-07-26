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
dbConnect();

const app=express();

//router
app.use(cors());
app.use(morgan('dev'))
app.use(bodyPerser.json())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/api/user',authRoter);
app.use('/api/contact',contactRoter);

//start server
app.listen(process.env.PORT ,()=>{
    console.log(`server is running on ${process.env.PORT}`)
})