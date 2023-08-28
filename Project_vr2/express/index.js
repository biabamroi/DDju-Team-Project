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



// 참조용 사이트
// 카카오 맵 https://apis.map.kakao.com/web/guide/
// 폴더 기본 구조
// https://velog.io/@ldy290/nodejs-express-%EA%B8%B0%EB%B3%B8-%ED%8F%B4%EB%8D%94-%EA%B5%AC%EC%A1%B0
// node js 환경설정
// https://redballs.tistory.com/entry/Nodejs-Express-%ED%99%98%EA%B2%BD-%EC%84%A4%EC%A0%95

