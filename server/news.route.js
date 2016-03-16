var request = require('request');
var express = require('express');
var router = express.Router();
var q = require('q');




var topic = ''; 
// create getter to be able to grab the value topic
function getTopic() {
  return topic;
}

// create setter to set the value.. the user input
// will need to use a promise to ensure that our global variable topic has a value before sending the request.
function setTopic(val) {
  var deferred = q.defer();
  topic = val;
  deferred.resolve(topic);
  return deferred.promise;
}

// the following is our request
router.post('/topic', function(req, res) {

  // setTopic is executed first and since we're using a promise it becomes 'thenable'
  setTopic(req.body.input).then(requestFeed).then(function(data) {
    res.send(data);
  }).catch(function(error){
    throw error;
  });

  function requestFeed() {
    
    var articles = [];
    var deferred = q.defer();

      request.get("https://ajax.googleapis.com/ajax/services/search/news?v=1.0&q="+ getTopic(), function(error, response, body) {

        if (!error && response.statusCode == 200) {
          var data = JSON.parse(body);
          var key;
          for (key in data) {
            if (data[key] === null || data[key] === Number || data[key].results === undefined) {
              continue;  
            }
            deferred.resolve(data[key].results);  
          }
          
        }
        
      });
    
    return deferred.promise;
  }
    
});

module.exports = router;