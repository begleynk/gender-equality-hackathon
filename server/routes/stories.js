var express = require('express');
var database = require('../lib/database');
var router = express.Router();
var bodyParser = require('body-parser')


// All in your.domain.com/stories

router.get('/:guid', function(req, res, next) {
  database.fetchStory(req.params.guid, function(story, error) {
    res.send(story);
  });
});

router.post('/', function(req, res) {
  database.saveNewStory(story, function(guid, error) {
    res.send({ guid: guid });
  });
});

router.get("/", function(req, res) {
  database.allStories(function(stories) {
    res.send(stories);
  });
});

module.exports = router;
