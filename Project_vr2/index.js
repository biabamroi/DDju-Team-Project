const express = require('express');
const app = express();
const path = require('path');


// 포트 3000 연결
app.listen(3000, function(){
  console.log('Server listening on port 3000');
})

// bodyParser 사용 선언
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));

// MongoDB 연결
const MongoClient = require('mongodb').MongoClient;

// 모든 정적 파일 제공
app.use(express.static(__dirname));

// Database : Data
// 저장소 DDju
// 콜렉션 user (회원)
// 콜렉션 zzim (좋아요) 


// 기본 홈페이지 첫 화면
app.get('/', function(requests, response){
  response.sendFile(__dirname + '/index.html');
})

// 외 페이지
app.get('/index', function(requests, response){
  response.sendFile(__dirname + '/index.html');
})
app.get('/map', function(requests, response){
  response.sendFile(__dirname + '/map.html');
})
app.get('/about', function(requests, response){
  response.sendFile(__dirname + '/about.html');
})
app.get('/contact', function(requests, response){
  response.sendFile(__dirname + '/contact.html');
})
app.get('/course-daejeon', function(requests, response){
  response.sendFile(__dirname + '/course-daejeon.html');
})
app.get('/course-details', function(requests, response){
  response.sendFile(__dirname + '/course-details.html');
})
app.get('/find-idpw', function(requests, response){
  response.sendFile(__dirname + '/find-idpw.html');
})
app.get('/join', function(requests, response){
  response.sendFile(__dirname + '/join.html');
})
app.get('/login', function(requests, response){
  response.sendFile(__dirname + '/login.html');
})
app.get('/member-info', function(requests, response){
  response.sendFile(__dirname + '/member-info.html');
})
app.get('/place-details', function(requests, response){
  response.sendFile(__dirname + '/place-details.html');
})
app.get('/today-all', function(requests, response){
  response.sendFile(__dirname + '/today-all.html');
})
app.get('/today-do', function(requests, response){
  response.sendFile(__dirname + '/today-do.html');
})
app.get('/today-eat', function(requests, response){
  response.sendFile(__dirname + '/today-eat.html');
})
app.get('/today-see', function(requests, response){
  response.sendFile(__dirname + '/today-see.html');
})
app.get('/zzim', function(requests, response){
  response.sendFile(__dirname + '/zzim.html');
})


