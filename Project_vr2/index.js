const express = require('express');
const app = express();
const path = require('path');

app.listen(3000, function(){
  console.log('Server listening on port 3000');
})

// 모든 정적 파일 제공
app.use(express.static(__dirname));

app.get('/', function(requests, response){
  response.sendFile(__dirname + '/index.html');
})