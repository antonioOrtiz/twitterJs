const express = require('express');
const path = require('path');
const router = express.Router();

const tweetBank = require('../tweetBank');

router.get('/', function(req, res) {
  var allTheTweets = tweetBank.list();
  res.render('index', {
    title: 'Twitter.js',
    tweets: allTheTweets,
    showForm: true
  });
});

router.get('/users/:username', function(req, res, next) {
  var tweetsForName = tweetBank.find({ name: req.params.username });
  var username = { name: req.params.username };
  res.render('index', {
    title: 'Twitter.js',
    tweets: tweetsForName,
    showForm: true,
    username: username
  });
});

router.get('/tweets/:id', function(req, res, next) {
  var tweetsWithThatId = tweetBank.find({ id: Number(req.params.id) });
  res.render('index', {
    title: 'Twitter.js',
    tweets: tweetsWithThatId
  });
});

router.post('/tweets', function(req, res) {
  tweetBank.add(req.body.name, req.body.text);
  res.redirect('/');
});
// router.get('/stylesheets/style.css', function(req, res) {
//   res.sendFile(path.join(__dirname, '../public/stylesheets/style.css'));
// });

module.exports = router;
