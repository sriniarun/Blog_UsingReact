var React = require('react');
var Link = require('react-router').Link;
var NavigationBar=require('./NavigationBar');




var NewBlog=React.createClass({



  doInsert : function()
  {
    $.ajax({
      type:'POST',
      url:'/api/add',
      data:$('#newBlogForm').serialize(),
      datatype:'json',
      error:function(err)
      {
        alert("Blog not added");
      },
      success:function(response)
      {
        if(response.message=='Blog Inserted')
        {
          alert("Blog Added");
          $('#newBlogForm')[0].reset();
        }
      }
    })
  },

  render:function()
  {
    return(
      <div className="container">

          <NavigationBar />

          <div className="container-fluid" id="newBlog">
	               <div className="row">
		                  <div className="col-md-3">
		                  </div>

		                  <div className="col-md-6">
			                   <form role="form" id="newBlogForm">
                         <div className="form-group">

                              <label>
                                    Author
                              </label>

                              <input type="text" className="form-control" name="userName" value={window.localStorage.getItem('user')} readOnly/>
                  </div>

				                     <div className="form-group">

					                        <label>
						                            Title
					                        </label>

                                  <input type="text" className="form-control" name="Title" />
				              </div>


                      <div className="form-group">

              					<label>
              						Description(in Few Words)
              					</label>

                        <textarea className="form-control" rows="5" cols="10" name="shortDesc" ></textarea>
				              </div>

                      <div className="form-group">

              					<label>
              						Complete Description
              					</label>

                        <textarea className="form-control" rows="20" cols="10" name="fullDesc" ></textarea>
				              </div>

                      <div className="form-group">

              					<label>
              						Please provide  Image
              					</label>

                        <input type="text" name="Poster" className="form-control" />

				              </div>
                  </form>
				              <button  className="btn btn-info" id="insertButton" onClick={this.doInsert} className="form-control" >
					                 Add this
				              </button>

		        </div>
  		<div className="col-md-3">
  		</div>
	    </div>
    </div>


  </div>




    );
  }
});


module.exports=NewBlog;
