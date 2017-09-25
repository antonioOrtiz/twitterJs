const express = require('express');
const app = express();
const chalk = require('chalk');
var request = require('request');
var nunjucks = require('nunjucks');
var bodyParser = require('body-parser');

const routes = require('./routes');

const PORT = 8016;

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  noCache: true
});

// // manually-written static file middleware
// app.use(function(req, res, next) {
//   var mimeType = mime.lookup(req.path);
//   fs.readFile('./public' + req.path, function(err, fileBuffer) {
//     if (err) return next();
//     res.header('Content-Type', mimeType);
//     res.send(fileBuffer);
//   });
// });

app.set('view engine', 'html');

app.use(express.static('public'));

app.use(function(req, res, next) {
  if (res.headersSent) {
    console.log(chalk.green(req.method, req.url, res.statusCode));
  } else {
    res.on('finish', function() {
      console.log(chalk.green(req.method, req.url, res.statusCode));
    });
  }
  next();
});

// app.use('/stylesheets/style.css', function(req, res, next) {
//   if (res.headersSent) {
//     console.log('You hit the ' + req.url + '!');
//   } else {
//     res.on('finish', function() {
//       console.log('You hit the ' + req.url + '!');
//     });
//   }
//   next();
// });

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/', routes);

app.listen(PORT, function() {
  console.log('Server listening on ' + PORT + '!');
});
