const express = require('express');
const Route=express.Router();
const ContactRoter=require('../controller/contactController')
const errorHandler=require('../middlewares/errorhandler')
const Auth=require('../middlewares/Auth');


Route.post('/',Auth.authmiddleware,ContactRoter.createConact);

Route.get('/',Auth.authmiddleware,ContactRoter.getallcontacts);
Route.get('/:id',Auth.authmiddleware,ContactRoter.getaContactbyId);

Route.put('/:id',Auth.authmiddleware,ContactRoter.updateContactbyId);
Route.delete('/:id',Auth.authmiddleware,ContactRoter.deleteaContactbyId);

Route.use(errorHandler.notfound);
Route.use(errorHandler.errorHandler);
// Route.get('/home',IndexController.home);


module.exports=Route;