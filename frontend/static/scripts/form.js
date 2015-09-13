var serverURL = "http://localhost:4567"

var getFormInJson = function() {
  return {
    "location": document.getElementById("location").value,
    "text": document.getElementById("text").value,
    "view": document.getElementById("view").value,
  }
}

var postJsonToBackend = function(story, cb) {
  xhr = new XMLHttpRequest();
  xhr.open('POST', encodeURI(serverURL + "/stories"));
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
      if (xhr.status === 200) {
        return cb(JSON.parse(xhr.responseText));
      }
      else if (xhr.status !== 200) {
        return false
      }
  };
  xhr.send(JSON.stringify({"story": story}));
  return true;
}

var submitForm = function(event) {
  var json = getFormInJson();
  postJsonToBackend(json, function(response) {
    console.log(response);
    window.location.replace("http://localhost:3000/story.html?id=" + response.id);
  });
};

document.getElementById("submit").onclick = submitForm;
