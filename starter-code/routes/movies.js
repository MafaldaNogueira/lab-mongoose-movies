
const express = require('express');
const router  = express.Router();
const Movie = require('../models/Movie');



router.get('/movies', (req,res) => {
  Movie.find()
  .then((moviesFromDB) => {
    res.render('movies/index.hbs', {movies: moviesFromDB})
  })
  .catch((err) =>  {
    res.render('error', {err});
  })
});
 

router.get('/movies/new', (req,res) => {
  res.render('movies/new');
});



router.post('/movies', (req,res) => {
  let { title, plot, genre } = req.body;
  Movie.create({
    title,
    plot,
    genre
  }).then(() => {
    res.redirect('movies/')
  })
  .catch((err) =>  {
    res.render('error', {err});
  })
});


router.get('/movies/:movieId', (req,res) => {
  let movieId = req.params.movieId;
  Movie.findById(movieId)
  .then((theMovieFound) => {
      res.render('movies/show', {movie: theMovieFound});
    })
  .catch((err) => {
    res.render('error',{err});
  })
  });

  router.post('/movies/:movieId/delete', (req,res) => {
    let movieId = req.params.movieId;
    Movie.findByIdAndDelete(movieId)
  .then(() => {
      res.redirect('/movies');
    });
  });



  router.get('/movies/:movieId/edit', (req,res) => {
    let movieId = req.params.movieId;
    Movie.findById(movieId)
    .then((theMovieFound) => {
        res.render('movies/edit', {movie: theMovieFound});
      })
    })

    router.post('/movies/:movieId/edit', (req,res) => {
      let movieId = req.params.movieId;
      let { title, plot, genre } = req.body;
      Movie.findByIdAndUpdate(movieId, {
       title,
       genre,
       plot
      }).then(() => {
        res.redirect('/movies');
      });
    });



module.exports = router;

