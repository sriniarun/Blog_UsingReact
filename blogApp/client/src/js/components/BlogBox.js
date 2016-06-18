var React = require('react');
var Link = require('react-router').Link;
var NavigationBar=require('./NavigationBar');


var BlogList = React.createClass({

       render: function () {
    var blogrows = [];

   this.props.blogs.forEach(function(blog) {

     blogrows.push(<BlogItem blog={blog} key={blog.Title}  />);

   }.bind(this));


       return (
      <div>
        {blogrows}
      </div>
        );
   }
});

var BlogItem = React.createClass({


  render: function() {
    return(
      <div className="container">

            <div className="row" id="blogThing">
                <div className="col-md-8" >

                  <center><h2>
                  {this.props.blog.Title}
                  </h2></center>

                  <center><p className="lead">
                  Posted by &nbsp;{this.props.blog.Username}&nbsp;on {this.props.blog.writtenDate}
                  </p></center>
                  <hr />

                  <p className="descr">
                  {this.props.blog.ShortDes}
                  </p>

                  <button className="btn btn-primary"><Link to={'/fullPost/' +this.props.blog.Title}> Read More <span className="glyphicon glyphicon-chevron-right"></span></Link></button>

              </div>
          </div>
        </div>

    );
  }
});

var BlogBox=React.createClass({
    loadBlogs:function(){
    $.ajax({
      type:'GET',
      url: '/api/blogs',
      datatype:'json',
      success: function(data) {
          this.setState({
            blogInput:data
          });

        }.bind(this)
    });
  },

  componentDidMount: function() {
        this.loadBlogs();
       setInterval(this.loadBlogs,1000);
  },
  getInitialState: function() {
   return {

      blogInput: []
     };
  },


  render: function()
  {

    return(

    <div className="container">
      <NavigationBar />

       <BlogList  blogs={this.state.blogInput} />
      </div>
    );
  }
});







module.exports=BlogBox;
