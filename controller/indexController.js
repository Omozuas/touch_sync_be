const cron = require("node-cron");
class IndexController{
    static  index(req,res){
        res.send('hello from shope-express controller')
    }
    static home(req,res){
        res.send('hello from home Product controller')
    }
}

module.exports=IndexController;