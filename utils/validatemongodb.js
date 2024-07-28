const mongoose=require('mongoose');

class Validate{
  static  validateMongodbId (id){
     const isValid=mongoose.Types.ObjectId.isValid(id);
     if(!isValid) throw new Error('not valid')

  }
}

module.exports=Validate;