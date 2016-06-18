var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
//var DefaultRoute = Router.DefaultRoute;
//var IndexRoute=Router.IndexRoute;

//var MainLayout=require('./components/MainLayout').MainLayout;
var Home=require('./components/Home');

var BlogBox=require('./components/BlogBox');
var NewBlog=require('./components/newBlog');

var LoginBox=require('./components/login');
var FullBlog=require('./components/fullblog');

// var Hello=require('./components/hello');

module.exports = (
  <Route>
      <Route path="/" handler={LoginBox} />
      <Route path="/login" handler={LoginBox} />
      <Route path="/home" handler={Home} />
      <Route path="/blogs" handler={BlogBox} />
      <Route path='/fullPost/:Title' handler={FullBlog} />
      <Route path="/newBlog" handler={NewBlog} />


    </Route>
);
