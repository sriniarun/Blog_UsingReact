var React = require('react');
var Link = require('react-router').Link;
var NavigationBar=require('./NavigationBar');

var FullPostBox = React.createClass({
  getInitialState: function () {
    return {
      postObj: {}
    };
  },

  loadPost: function(){
    $.ajax({
      type: 'GET',
      url: '/api/blog/' + this.props.params.Title,
      cache: false,
      success: function (result) {
        if(result.message=='blog not found')
        {
          alert('Blog not found');
        }
        else{
        this.setState({postObj: result});
      }
      }.bind(this)

    })
  },

  componentDidMount: function () {
    this.loadPost();
      },

  render: function(){
      return(
        <div className="container" id="fullPostBox">
          <NavigationBar />
          <div className="row" id="postElement">
            <div>
              <center> <img id="poster" alt="Bootstrap Image Preview" src={this.state.postObj.Poster} className="img-responsive"
               />
               </center>
            </div>
            <br />
            <br />
            <div>
              <div className="list-group" id="list-group">
                <div className="list-group-item" id="list-group-item">
                  <ul className="list-unstyled" id="ulist">
                    <li id="title">
                      {this.state.postObj.Title}
                    </li>

                    <li id="text">
                      {this.state.postObj.LongDes}
                    </li>

                    <li id="author">
                      <span>Posted by :  </span> {this.state.postObj.Username}
                    </li>
                  </ul>
                  <input type="text" id="postID" value={this.state.postObj._id} hidden readOnly />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
});

module.exports = FullPostBox;
