const express = require('express');
const Route=express.Router();
const authRoter=require('../controller/userController')
const errorHandler=require('../middlewares/errorhandler')
const Auth=require('../middlewares/Auth');


Route.post('/signup',authRoter.createUser);
Route.post('/logIn',authRoter.loginUser);
Route.post('/forgot-password-token',authRoter.forgotPassword);
Route.post('/reset-password',authRoter.resetPassword);
Route.post('/verify-otp',Auth.authmiddleware,authRoter.verifyToken);

Route.get('/getUser',authRoter.getUsers);
Route.get('/logout',Auth.authmiddleware,authRoter.logout);
Route.get('/refreshToken',Auth.authmiddleware,authRoter.genRefreshToken);
Route.get('/',Auth.authmiddleware,authRoter.getaUserbyId);

Route.put('/password',Auth.authmiddleware,authRoter.updateUserPasswordbyId);
Route.delete('/:id',Auth.authmiddleware,authRoter.deleteaUserbyId);
Route.put('/edit-user',Auth.authmiddleware,authRoter.updateUserbyId);



Route.use(errorHandler.notfound);
Route.use(errorHandler.errorHandler);
// Route.get('/home',IndexController.home);


module.exports=Route;