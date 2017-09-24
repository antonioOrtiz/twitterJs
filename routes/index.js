const express = require('express');
const path = require('path');
const router = express.Router();

const tweetBank = require('../tweetBank');

router.get('/', function(req, res) {
  var tweets = tweetBank.list();
  console.log('tweets', tweets);
  res.render('index', { title: 'Twitter.js', tweets: tweets });
});

router.get('/users/:username', function(req, res, next) {
  var tweetsForName = tweetBank.find({ name: req.params.username });
  console.log('tweetsForName', tweetsForName);
  res.render('index', {
    title: 'Twitter.js',
    tweets: tweetsForName,
    showForm: true,
    username: req.params.username
  });
});

// router.get('/stylesheets/style.css', function(req, res) {
//   res.sendFile(path.join(__dirname, '../public/stylesheets/style.css'));
// });

module.exports = router;
