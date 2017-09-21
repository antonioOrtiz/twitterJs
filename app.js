const express = require('express');
const app = express();
const chalk = require('chalk');
var request = require('request');
var nunjucks = require('nunjucks');
const PORT = 8016;

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  noCache: true
});

app.set('view engine', 'html');

var locals = {
  title: 'An Example',
  people: [{ name: 'Gandalf' }, { name: 'Frodo' }, { name: 'Hermione' }]
};

const people = [{ name: 'Full' }, { name: 'Stacker' }, { name: 'Son' }];

app.use(function(req, res, next) {
  request('http:localhost:8016', function(error, response, body) {
    console.log(chalk.green(req.method, req.url, res && res.statusCode));
  });
  next();
});

app.get('/', function(req, res) {
  res.render('index', { title: 'Hall of Fame', people: people });
});

app.get('/news', function(req, res) {
  res.send('<h1>Hitting the news route</h1>');
});

app.listen(PORT, function() {
  console.log('Server listening on ' + PORT + '!');
});
