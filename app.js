const express = require('express');
const ejs = require('ejs');

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

var port = process.env.PORT || 3000;

app.listen(port, function () {

  console.log('Movie collection listening on port 3000!')

})
