'use strict';

var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();

process.env.DEBUG = 'actions-on-google:*';
const Assistant = require('actions-on-google').ApiAiAssistant;

exports.testAction = (req, res) => {
  const assistant = new Assistant({request: req, response: res});
  console.log('Request headers: ' + JSON.stringify(req.headers));
  console.log('Request body: ' + JSON.stringify(req.body));

  // Fulfill action business logic
  function responseHandler (assistant) {
    // Complete your fulfillment logic and send a response
    assistant.tell('Hello, World!');
  }

  const actionMap = new Map();
  actionMap.set('testAction', responseHandler);

  assistant.handleRequest(actionMap);
};

app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
  response.send(cool());
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
