var serverURL = "http://localhost:4567"

var getStory = function(id, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', encodeURI(serverURL + "/stories/" + id));
  xhr.onload = function() {
    if (xhr.status === 200) {
      return cb(JSON.parse(xhr.responseText));
    }
    else {
      alert('Request failed.  Returned status of ' + xhr.status);
    }
  };
  xhr.send();
}

var getIdFromUrl = function() {
  return window.location.search.split("=")[1];
}

var setFields = function(story) {
  document.getElementById("location").innerText = story.location;
  document.getElementById("text").innerText = story.text;
  document.getElementById("view").innerText = story.view;
}

var id = getIdFromUrl();

getStory(id, function(story) {
  setFields(story);
});

