var Reflux=require('reflux');
var actions = require('../Actions/actions');

var store = Reflux.createStore({
  listenables : actions,
  data : {
    user : null,
    token : null,
    registered:false,
    logged:false

  },
  onRegister : function(data) {
    console.log('inside Register Data : ' + data);
    //register the user
    $.ajax({
      type : 'POST',
      url : '/api/user/register',
      data : data,
      dataType : 'json',
      cache : false,
      error : function(err) {
        console.log('Error occurred : ' + err);

      }.bind(this),
      success : function(response) {

        console.log(response);
        if(response.success==false && response.message=='User already registered')
        {
          alert('User already exists');
          this.data.user = null;
          this.data.token = null;
          this.data.registered=false;
          this.data.logged=false;

        }
        if(response.success==true && response.message=='inserted')
        {
          alert('User Registered.. Please login again');
          this.data.user = null;
          this.data.token = null;
          this.data.registered=true;
          this.data.logged=false;

        }
        this.trigger(this.data);
      }.bind(this)
    });
  },

  onLogout:function()
  {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('token');
    this.trigger();
  },


  onLogin : function(data) {
    console.log('Inside onLogin');
    //authenticate the user and store jwt token in local storage
    $.ajax({
      type : 'POST',
      url : '/api/user/login',
      data : data,
      dataType : 'json',
      cache : false,
      error : function(err) {
        console.log('Error occurred : ' + err);

      }.bind(this),
      success : function(response) {
        if(response && response.success === false) {
          alert(response.message);
          this.data.user = null;
          this.data.token = null;
          this.data.registered=false;
          this.data.logged=false;

        } else if(response && response.hasOwnProperty('token')) {
          this.data.user = response.user;
          this.data.token = response.token;
          this.data.registered=true;
          this.data.logged=true;

        }
        console.log('triggering data');
        console.log(this.data);
        this.trigger(this.data);
      }.bind(this)
    });
  }

});


module.exports=store;
