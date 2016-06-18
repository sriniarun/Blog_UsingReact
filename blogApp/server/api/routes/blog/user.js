var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt=require('bcrypt');

var User = require('../../../models/blog/user');
var config = require('../../../Config/config');




router.route('/register')
.post(function(req,res)
{
  console.log("Inside register router");

  User.findOne({'email':req.body.email},function(err,user)
  {
  if(err) throw err;
  if(user)
  {
    res.json(
      {success:false,message:'User already registered'}
    );
  }
  else if(!user)
  {
  var newUserpassword="";
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
        newUserpassword = hash;
        console.log(newUserpassword);
        var post=new User();
        post.fname=req.body.fname;
        post.lname=req.body.lname;
        post.email=req.body.email;
        post.password=newUserpassword;
        post.save(function(err){
          if(err) throw err;
          else{
            res.json({success:true,message:'inserted'}) ;
            }
          });
        });
      });
    }
  })

});

router.route('/login')
  .post(function(req,res)
  {

    console.log("Inside login route");
    console.log(req.body.email);
  User.findOne({'email':req.body.email},function(err,user){
    console.log(user);
    if(err)
    {
      throw err;
    }
    if(!user){
      res.json({success:false,
      message : 'User not found'});
    }

    else {
      user.comparePassword(req.body.password,user.password,function(err,isMatch)
    {

      if(isMatch && !err)
      {
        var token=jwt.sign(user,config.secret,
        {
          expiresIn:10080
        });
        res.json({success:true,token:'JWT ' + token,user:user.fname});
      }
      else {
        res.send({success:false,message:'Password error'});
            }
    });
    }

  });
});




module.exports = router;
