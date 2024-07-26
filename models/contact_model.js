const mongoose = require('mongoose'); 
const contactSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId
    },
    name: {
        type:String
         
    },
    phone: {
        type:String
         
    },
    email: {
        type:String
         
    },
    url: {
        type:String
         
    },
});

module.exports = mongoose.model('Contact', contactSchema);
