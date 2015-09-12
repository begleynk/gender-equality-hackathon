var fs = require('fs');
var async = require('async');

var Database = {

  saveNewStory: function(story, callback) {
    guid = this.generateGuid();

    fs.writeFile("./database/" + guid, JSON.stringify(story), function(err) {
      if(err) {
        return callback(null, err);
      } else {
        return callback(guid, null);
      }
    }); 
  },

  fetchStory: function(guid, callback) {
    fs.readFile('./database/' + guid, 'utf8', function (err, raw_story) {
      if (err) {
        return callback(null, err);
      } else {
        return callback(JSON.parse(raw_story), null);
      }
    });
  },

  allStories: function(callback) {
    fs.readdir('./database/', function(err, files) { 
      var filtered = files.filter(function(name) { return name !== ".DS_Store" });


      var cb = function(story) {
        return story;
      }

      async.map(filtered, function(guid) {
        Database.fetchStory(guid, cb)
      }, function(err, stories) {
        return callback(stories);
      });
    });
  },

  generateGuid: function() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }
}

module.exports = Database;
