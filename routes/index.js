const express = require('express');
const path = require('path');
const router = express.Router();

const tweetBank = require('../tweetBank');

router.get('/', function(req, res) {
  var tweets = tweetBank.list();
  res.render('index', { tweets: tweets });
});

router.get('/stylesheets/style.css', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/stylesheets/style.css'));
});

module.exports = router;
