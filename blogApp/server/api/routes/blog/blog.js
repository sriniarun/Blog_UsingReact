var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');
var passport=require('passport');



var Blog = require('../../../models/blog/blog');


router.route('/add')
      .post(function(req,res)
    {

      var post=new Blog();
      post.Title=req.body.Title;
      post.ShortDes=req.body.shortDesc;
      post.LongDes=req.body.fullDesc;
      post.Username=req.body.userName;
      post.Poster=req.body.Poster;
      post.writtenDate=Date();

      post.save(function(err)
    {
      if(err)
     {
       return err;
     }
     else
     {
       res.json({message:'Blog Added'});
     }
    });


  });






router.route('/blogs')
      .get(function(req,res)
    {
      Blog.find(function(err, blogs) {
          if (err)
              res.send(err);
          res.json(blogs);
      });
    });


router.route('/blog/:Title')
    .get(function(req,res)
  {
    Blog.findOne({'Title':req.params.Title},function(err,blog)
  {
    if(err) return err;
    if(!blog)
    {
      res.json({message:'blog not found'});
    }
    else {
    res.json(blog);
    }
  })
});


module.exports= router;
