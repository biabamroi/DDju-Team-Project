const express = require('express');
const app = express();
const path = require('path');

app.listen(3000, function(){
  console.log('Server listening on port 3000');
})

app.get('/index', function(requests, response){
  response.sendFile(__dirname + '/index.html');
})

app.get('/map', function(requests, response){
  response.sendFile(__dirname + '/map.html');
})

