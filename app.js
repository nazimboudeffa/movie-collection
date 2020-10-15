const express = require('express');
const ejs = require('ejs');

const fs = require('fs');
const axios = require('axios');

const app = express();
app.set('view engine', 'ejs');

app.use('/', express.static(__dirname + '/public'));

let apiKey = process.env.APIKEY;

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/movie', function (req, res) {
  res.render('movie');
});

app.get('/movies', function (req, res) {
  fs.readdir('D:/FILMS', (err, files) => {
    files.forEach(file => {
      getMovies((file.split('.').shift()));
    });
  });
  movies = [{
            Title: 'Pulp Fiction',
            Year: '1994',
            imdbID: 'tt0110912',
            Type: 'movie',
            Poster: 'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg'
          },
          {
            Title: 'Germinal',
            Year: '1993',
            imdbID: 'tt0107002',
            Type: 'movie',
            Poster: 'https://m.media-amazon.com/images/M/MV5BMjViOGU4ZjctMjQ1Mi00MzliLTk2ZDgtYWU3ZGZlMjNjNGMzXkEyXkFqcGdeQXVyMjQzMzQzODY@._V1_SX300.jpg'
          }]
  res.render('movies', {'movies' : movies});
});

function getMovies(searchText){
    //Get and show data for all movies using omdbapi.com for a search query
    let apiKey = 'thewdb';
    let x = `http://www.omdbapi.com?s=${searchText}&apikey=${apiKey}`;
    axios.get(`http://www.omdbapi.com?s=${searchText}&apikey=${apiKey}`)
        .then((response) => {
            if (response.data.Response == "False"){
              console.log("N/A");
            } else {

            let movies = response.data.Search;
            console.log(movies[0]);
            return movies[0];
        }

        })
        .catch((err) => {
            console.log(err);
        });
}


function getMovie(){
  //Get and show data for an individual movie using omdbapi.com
  let movieId = sessionStorage.getItem('movieId');
  let apiKey = 'thewdb';
  axios.get(`http://www.omdbapi.com?i=${movieId}&apikey=${apiKey}`)
  .then((response) => {
      let movie = response.data;
    })
    .catch((err) => {
        console.log(err);
    });
};

var port = process.env.PORT || 3000;

app.listen(port, function () {

  console.log('Movie collection listening on port 3000!')

})
