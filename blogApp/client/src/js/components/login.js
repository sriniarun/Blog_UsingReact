var React = require('react');
var Router = require('react-router');
var Link = require('react-router').Link;
var Reflux = require('reflux');



var store = require('../stores/store');
var actions = require('../Actions/actions');


var LoginBox = React.createClass({

 mixins : [
   Router.Navigation,
   Reflux.listenTo(store,'onStoreUpdate')],

  onStoreUpdate : function(data) {
    console.log('inside onStoreUpdate.');
   if(data.registered==true && data.logged==false)
   {
     console.log("Registration done");
     this.clear();
   }

   if(data.registered==true && data.logged==true )
   {
       window.localStorage.setItem('user',data.user);
       window.localStorage.setItem('token',data.token);
        this.loginSuccess();
   }

 },

 clear : function()
 {
   $('#registerForm')[0].reset();
 },

loginSuccess()
{
    this.transitionTo('/home');
},


  doLogin : function(e) {
   e.preventDefault();
   console.log('DoLogin called.');
   var data = $('#loginForm').serialize();
   actions.login(data);
 },


 doRegister:function(e) {
  e.preventDefault();
  console.log('Register is called.');
  var data = $('#registerForm').serialize();
  actions.register(data);
 },
  render:function()
  {
    return(


      <div className="form">

                <h1>Know about Mobiles </h1>

                <ul className="tab-group">
                  <li className="tab active"><a href="#login">Log In </a></li>
                  <li className="tab"><a href="#signup">Sign Up</a></li>
                </ul>

                <div className="tab-content">



                  <div id="login">
                          <h3>Welcome Back!</h3>

                          <form id="loginForm" >

                                <div className="field-wrap">
                                  <label id="labels">
                                    Email Address<span className="req">*</span>
                                  </label>
                                  <input type="email" required autocomplete="off" name="email" id="inputBoxes"/>
                                </div>

                                <div className="field-wrap">
                                  <label id="labels">
                                    Password<span className="req">*</span>
                                  </label>
                                  <input type="password"required autocomplete="off" name="password" id="inputBoxes" />
                                </div>


                                </form>
                                <button className="button button-block" id="loginButton" onClick={this.doLogin} >Log In</button>



                    </div>


                    <div id="signup">
                        <h3>Sign Up for Free</h3>

                        <form  id="registerForm">

                          <div className="top-row">
                              <div className="field-wrap">
                                    <label id="labels">
                                          First Name<span className="req">*</span>
                                    </label>
                                    <input type="text" name="fname" required autocomplete="off" id="inputBoxes" />
                              </div>

                              <div className="field-wrap">
                                    <label id="labels">
                                      Last Name<span className="req">*</span>
                                    </label>
                                    <input type="text" name="lname" required autocomplete="off"  id="inputBoxes"/>
                              </div>

                            </div>

                              <div className="field-wrap">
                                    <label id="labels">
                                      Email Address<span className="req">*</span>
                                    </label>
                                    <input type="email" name="email" required autocomplete="off" id="inputBoxes" />
                              </div>

                              <div className="field-wrap">
                                    <label id="labels">
                                      Set A Password<span className="req">*</span>
                                    </label>
                                    <input type="password" name="password" required autocomplete="off" id="inputBoxes" />
                              </div>

                            </form>

                              <button className="button button-block" id="submitButton" onClick={this.doRegister} >Get Started</button>



                      </div>

                  </div>

            </div>
      );
  }
});


module.exports = LoginBox;
