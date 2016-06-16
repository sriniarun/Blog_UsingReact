var express = require('express');
var router = express.Router();

var imdbObj = require('node-movie');
var Movie = require('../../../models/movies/movie');
// Route to get all movies and save a movie
router.route('/movies')
// Get all movies
    .get(function(req, res){
      console.log("getting in movies Get");
      Movie.find(function(err, movies) {
            if (err)
                res.send(err);
            res.json(movies);
        });
    });

  router.route('/movies/:Title/:Year/:Rated/:Released/:Runtime/:Genre/:Director/:Writer/:Actors/:Plot/:Language/:Country/:Awards/:Metascore/:imdbRating/:imdbVotes/:imdbID/:Type/:Response')
// Search and save the movie
  .get(function(req, res) {
    console.log("getting in movies post \n");
    console.log(req.url);

    imdbObj(req.params.Title, function (err, data) {
      if (data){
        var movie = new Movie();
        movie.Poster = data.Poster;
        movie.Title = req.params.Title;
        movie.Year =  req.params.Year;
        movie.Rated = req.params.Rated;
        movie.Released = req.params.Released;
        movie.Runtime = req.params.Runtime;
        movie.Genre = req.params.Genre;
        movie.Director = req.params.Director;
        movie.Writer = req.params.Writer;
        movie.Actors = req.params.Actors;
        movie.Plot = req.params.Plot;
        movie.Language = req.params.Language;
        movie.Country = req.params.Country;
        movie.Awards = req.params.Awards;
        movie.Metascore = req.params.Metascore;
        movie.imdbRating = req.params.imdbRating;
        movie.imdbVotes = req.params.imdbVotes;
        movie.imdbID = req.params.imdbID;
        movie.Type = req.params.Type;
        movie.Response = req.params.Response;
        movie.save(function(err) {
          if (err)
              res.send(err);
          res.json({ message: 'Movie added!' });
        });
      }
    });
  });
// Route to get all movies and save a movie
    router.route('/movies/:movie_id')
// Get the movie by id
          .get(function(req, res) {
            Movie.findById(req.params.movie_id, function(err, movie) {
                if (err)
                    res.send(err);
                res.json(movie);
            });
        })
//search and send the movie
        .post(function(req, res) {
          console.log("getting in movies/moviesid post");
              imdbObj(req.params.movie_id, function (err, data) {
                if (data){
                  res.json(data);
                } else {
                  res.send(err);
                }
              });
          })
// Update the movie by id
        .put(function(req, res) {
        Movie.findById(req.params.movie_id, function(err, movie) {
            if (err)
                res.send(err);
            movie.Title = 'Hello';
            movie.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Movie updated!' });
            });
        });
    })
// Delete the movie by id
    .delete(function(req, res) {
      console.log("in delete");
        Movie.remove({
            Title: req.params.movie_id
        }, function(err, movie) {
            if (err)
                res.send(err);
            console.log("deleted movie" + movie);
        });
    });

module.exports= router;
