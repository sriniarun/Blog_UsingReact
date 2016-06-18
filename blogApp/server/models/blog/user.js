var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var userSchema=new Schema({
  fname:String,
  lname:String,
  email:String,
  password:String
});



userSchema.methods.comparePassword = function(pw,comparePassword,callback){
  console.log("Comparing password");
  console.log(pw);
    bcrypt.compare(pw,comparePassword,function(err,isMatch){

      if(err)
      {
        return callback(err);
      }
      callback(null,isMatch);
    });

};




module.exports = mongoose.model('User',userSchema,'Users');
