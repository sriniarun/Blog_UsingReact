var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;


var User = require('../models/blog/user');
var config=require('../Config/config');

module.exports = function(passport)
{
  var opts={};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts,function(jwt_payload,done){
    User.findOne({id : jwt_payload.id},function(err,user)
  {
    console.log(user);
    if(err){
        return done(err,false);
    }
    if(user)
    {
      return done(null,user);

    }
    else {
        return done(null,false);
    }
  });
}));
}
