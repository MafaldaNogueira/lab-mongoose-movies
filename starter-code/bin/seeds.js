const mongoose = require('mongoose');
const Celebrity = require('../models/Celebrity');
const Movie = require('../models/Movie');

const DB_NAME = 'starter-code';

mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const movies = [
  {
    title: 'harry potter',
    genre: 'fantasy',
    plot: 'fantasy'
  }
]

/*
const celebrities = [
  {
    name: 'KimKardashian',
    occupation: 'unknown',
    catchPhrase:'wtv'
  },
 { name: 'nameb',
    occupation: 'unknown',
    catchPhrase: 'wtv'
   },
   {
    name: 'namec',
    occupation: 'unknown',
    catchPhrase: 'wtv'
   }
 ];

 Celebrity.create(celebrities)
  .then(celebritiesFromDB => {
    console.log(`Created ${celebritiesFromDB.length}`);
    mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred while creating celerbities from the DB: ${err}`));

  */

  Movie.create(movies)
  .then((moviesFromDb) => {
    mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred while creating movies from the DB: ${err}`));
