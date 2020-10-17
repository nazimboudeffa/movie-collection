const express = require('express');
const ejs = require('ejs');

const fs = require('fs');
const axios = require('axios');
const rp = require('request-promise');
const async = require('async');

const app = express();
app.set('view engine', 'ejs');

app.use('/', express.static(__dirname + '/public'));

//let apiKey = process.env.APIKEY;

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/movie', function (req, res) {
  res.render('movie');
});

app.get('/movies', function (req, res) {
  let apiKey = 'thewdb';
  var titles = [];
  var movies = [];
  var folder = 'D:/FILMS';

  var files = fs.readdirSync(folder);

  files.forEach(file => {
    let fileStat = fs.statSync(folder + '/' + file).isDirectory();
    if(!fileStat) {
      titles.push(file.split('.').shift());
    }
  });

  console.log(titles);
  var ps = [];
  titles.forEach(title => {
    ps.push(axios.get(`http://www.omdbapi.com?s=${title}&apikey=${apiKey}`))
  });
  Promise.all(ps).then((results)=>{
    results.forEach(result => {
      if (!(result.data['Search'] == undefined)){
        movies.push(result.data['Search'][0]);
        console.log(result.data['Search'][0]);
      }
    })
  }).finally(()=>res.render('movies', {'movies' : movies}));
  /*
    titles.forEach(title => {
      axios.get(`http://www.omdbapi.com?s=${title}&apikey=${apiKey}`)
        .then((response) => {
            if (response.data.Response == "False"){
              console.log("N/A");
            } else {
              let search = response.data.Search;
              //console.log(search[0]);
              movies.push(search[0]);
              console.log(movies);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    });
  */

  /*
    titles.forEach(title => {
      var options = {
          uri: 'http://www.omdbapi.com',
          qs: {
              s: title,
              apikey: apiKey
          },
          json: true
      };
      rp(options).then(body => {
        if (!(body.Response == 'False')){
          movies.push(body['Search'][0]);
          console.log(body['Search'][0]);
        }
      });
    });

    console.log(movies);
  */
  /*
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
  */
});

function getMoviesRequest(searchText){
  //Get and show data for all movies using omdbapi.com for a search query
  let apiKey = 'thewdb';
  r(`http://www.omdbapi.com?s=${searchText}&apikey=${apiKey}`, function(error, response, body){
  if(!error && response.statusCode == 200){
        var parseData = JSON.parse(body);
        console.log(parseData['Search'][0]);
        }
    });
}

function getMovies(searchText){
  //Get and show data for all movies using omdbapi.com for a search query
  let apiKey = 'thewdb';
  let x = `http://www.omdbapi.com?s=${searchText}&apikey=${apiKey}`;
  axios.get(`http://www.omdbapi.com?s=${searchText}&apikey=${apiKey}`)
    .then((response) => {
        if (response.data.Response == "False"){
          console.log("N/A");
        } else {

        let search = response.data.Search;
        console.log(search[0]);
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
