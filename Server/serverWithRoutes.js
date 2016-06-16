var { Router, Route, IndexRoute, Link, browserHistory } = ReactRouter
​
var MainLayout = React.createClass({
render: function()
{
  return(
    <div className="container" id="main">
    <Navbar/>
    <main>
          {this.props.children}
    </main>
    </div>
    )
}
​
})
​
var Navbar = React.createClass({
  render: function() {
    return (
      <div className="navbar navbar-fixed-top">
      <div className="container">
        <button className="navbar-toggle" data-target=".navbar-responsive-collapse" data-toggle="collapse" type="button">
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <div className="nav-collapse collapse navbar-responsive-collapse">
          <ul className="nav navbar-nav">
​
          <li className="active"><Link to="/home">Home</Link></li>
          <li className=""><Link to="/movies">Movies</Link></li>
          <li className=""><Link to="/add">Add Movies</Link></li>
          <li className=""><Link to="/login">Login</Link></li>
          </ul>
        </div>
      </div>
    </div>
      )
  }
})
​
//Login form
​
var LoginForm = React.createClass({
  getInitialState: function() {
   return {UserName: '',Password:''};
  },
 handleUserNameChange: function(e) {
   this.setState({UserName: e.target.value});
 },
 handlePasswordChange: function(e) {
   this.setState({Password: e.target.value});
 },
 handleLogin: function(e) {
    // TO do
  },
​
  render : function(){
    return(
      <div className="search-form" >
          <h1 className="text-center">Login Here</h1>
          <form onSubmit={this.handleLogin}>
              <div className="form-group">
                  <input  name="UserName" type="text" className="form-control" ref="username"
                  placeholder="Enter a User Name..."  value={this.state.UserName}
                  onChange={this.handleUserNameChange} />
               </div>
               <div className="form-group">
                   <input  name="Password" type="password" className="form-control" ref="password"
                   placeholder="Enter a Password..."  value={this.state.Password}
                   onChange={this.handlePasswordChange} />
                </div>
              <input className="btn btn-primary btn-block" type="submit" value="Login" />
          </form>
      </div>
    );
  }
});
​
//Home Component
var Home = React.createClass({
  render: function() {
    return (
    <div className="well">
        <div className="page-header">
            <h1>The BEST  movies you should watch before you die..</h1>
        </div>
        <p className="lead"><small>If you've spent your lifetime cribbing about never getting to watch good movies, it is the right time to watch because you won't be around for too long.</small></p>
    </div>
  );
  }
})
​
//Create Movie Box Component
var MovieBox = React.createClass({
  // Load movie data from Mongo DB.
  loadMoviesFromServer: function(){
    $.ajax({
      url: "http://localhost:8080/api/movies",
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("http://localhost:8080/api/movies", status, err.toString());
      }.bind(this)
    });
  },
  // Search movie and save in Mongo DB and refresh the movie list
  handleMovieSubmit: function(movie) {
      $.ajax({
      url: "http://localhost:8080/api/movies",
      dataType: 'json',
      type: 'POST',
      data: movie,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("http://localhost:8080/api/movies", status, err.toString());
      }.bind(this)
    });
 },
// Delete movie from Mongo DB.
 handleMovieDelete: function(Movieid){
     $.ajax({
       url: "http://localhost:8080/api/movies"+'/'+Movieid,
       data: {"id" : Movieid},
       type: 'DELETE',
       dataType: 'json',
       success: function (data) {
         this.setState({data: data});
       }.bind(this),
       error: function(xhr, status, err) {
         console.error("http://localhost:8080/api/movies", status, err.toString());
       }.bind(this)
       });
   },
  getInitialState: function() {
    return {data: []};
  },
​
  componentDidMount: function() {
    this.loadMoviesFromServer();
    setInterval(this.loadMoviesFromServer, 2000);
  },
​
  render : function(){
    return(
      <div className="movieBox">
      <MovieForm onMovieSubmit={this.handleMovieSubmit} />
      <MovieList  onMovieDelete={this.handleMovieDelete} data={this.state.data}/>
​
      </div>
    );
  }
});
​
//MovieList Component
​
var MovieList = React.createClass({
  handleDelete: function(Movieid){
      return this.props.onMovieDelete(Movieid);
    },
    render: function() {
      var movieNodes = this.props.data.map(function(movie) {
​
        return (
          <Movie
          Title={movie.Title}
          key={movie._id}
          Movieid={movie._id}
          Poster={movie.Poster}
          Year={movie.Year}
          imdbID={movie.imdbID}
          onDelete = {this.handleDelete}
          >
          </Movie>
        );
  }.bind(this));
  return (
    <div className="movieList">
      {movieNodes}
    </div>
  );
      }
  });
​
​
//MovieForm
var MovieForm = React.createClass({
  getInitialState: function() {
   return {Title: ''};
  },
 handleTitleChange: function(e) {
   this.setState({Title: e.target.value});
 },
 handleSubmit: function(e) {
    e.preventDefault();
    var Title = this.state.Title.trim();
    if (!Title) {
      return;
    }
    this.props.onMovieSubmit({Title: Title});
    this.setState({Title: ''});
  },
​
  render : function(){
    return(
      <div className="search-form" >
          <h1 className="text-center">Search For a Movie </h1>
          <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                  <input  name="Title"  type="text"
                  className="form-control"
                  ref="title"
                  placeholder="Enter a Movie Title..."
                  value={this.state.Title}
                  onChange={this.handleTitleChange} />
               </div>
              <input className="btn btn-primary btn-block" type="submit" value="Search and Save" />
​
          </form>
      </div>
​
    );
  }
});
// Add MovieForm
var AddForm = React.createClass({
  getInitialState: function() {
   return {Title: '',
           Year: '',
           imdbID: '',
           Poster: ''};
  },
 handleTitleChange: function(e) {
   this.setState({Title: e.target.value});
 },
 handleYearChange: function(e) {
   this.setState({Year: e.target.value});
 },
 handleIMDBIDChange: function(e) {
   this.setState({imdbID: e.target.value});
 },
 handlePosterChange: function(e) {
   this.setState({Poster: e.target.value});
 },
 handleSubmit: function(e) {
    e.preventDefault();
    var Title = this.state.Title.trim();
    var Year = this.state.Year.trim();
    var imdbID = this.state.imdbID.trim();
    var Poster = this.state.Poster.trim();
    if (!Title || !Year || !imdbID || !Poster) {
      return;
    }
    $.ajax({
    url: "http://localhost:8080/api/movies/add",
    dataType: 'json',
    type: 'POST',
    data: this.state,
    success: function(data) {
      this.setState({Title: '',
              Year: '',
              imdbID: '',
              Poster: ''});
    }.bind(this),
    error: function(xhr, status, err) {
      console.error("http://localhost:8080/api/movies/add", status, err.toString());
    }.bind(this)
  });
  },
​
  render : function(){
    return(
      <div className="search-form" >
          <h1 className="text-center">Add Movie </h1>
          <form className="form-horizontal" onSubmit={this.handleSubmit} >
              <div className="form-group">
                  <input name="Title" type="text" className="form-control" ref="title"
                  placeholder="Enter a Movie Title..." value={this.state.Title} onChange={this.handleTitleChange} />
              </div>
              <div className="form-group">
                  <input name="Year" type="text" className="form-control" ref="year"
                  placeholder="Enter a Movie Release Year..." value={this.state.Year} onChange={this.handleYearChange} />
              </div>
              <div className="form-group">
                  <input name="imdbID" type="text" className="form-control" ref="imdb"
                  placeholder="Enter a Movie IMDB ID..." value={this.state.imdbID} onChange={this.handleIMDBIDChange} />
              </div>
              <div className="form-group">
                  <input name="Poster" type="text" className="form-control" ref="poster"
                  placeholder="Enter a Movie Poster name..." value={this.state.Poster} onChange={this.handlePosterChange} />
               </div>
              <input className="btn btn-primary btn-block" type="submit" value="Login" />
          </form>
      </div>
​
    );
  }
});
//Movie Component
var Movie = React.createClass({
  handleClick: function(e){
      e.preventDefault();
      var Movieid = this.props.Movieid;
      return this.props.onDelete(Movieid);
    },
    getInitialState(){
          	return {view: {showModal: false}}
        },
        handleHideModal(){
        	this.setState({view: {showModal: false}})
        },
        handleShowModal(){
        	this.setState({view: {showModal: true}})
        },
  render : function(){
    return(
​
      <div className="movie">
        <h2 className="movieName"> </h2>
        <div className="well">
            <div className="row">
                <div className="col-2">
                    <img className="thumbnail" src={this.props.Poster}/>
                </div>
                  <div className="col-10">
                      <h4>{this.props.Title}</h4>
                      <ul className='list-group'>
                          <li className='list-group-item'>Year Released : {this.props.Year}</li>
                          <li className='list-group-item'>IMDB Id : {this.props.imdbID}</li>
                      </ul>
                      <a className="btn btn-primary" href={"http://www.imdb.com/title/"+this.props.imdbID} > View on IMDB</a>
                      <a className="btn btn-danger" onClick={this.handleClick} >Delete</a>
​
                  </div>
            </div>
        </div>
    </div>
    );
  }
});
​
var browserHistory = ReactRouter.browserHistory;
ReactDOM.render(
  (
  <Router history={browserHistory}>
    <Route path="/ co"mponent={MainLayout}>
    <IndexRoute component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/movies" component={MovieBox} />
       <Route path="/add" component={AddForm} />
       <Route path="/login" component={LoginForm} />
   </Route>
 </Router>
),
 document.getElementById('content')
);
