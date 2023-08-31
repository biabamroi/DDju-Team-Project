const express = require('express');
const app = express();
const path = require('path');

// 데이터를 저장할 변수
let db;

// 포트 3000 연결
app.listen(3000, function(){
  console.log('Server listening on port 3000');
})

// bodyParser 사용 선언
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));

// MongoDB 연결
const MongoClient = require('mongodb').MongoClient;

// .ejs 사용 세팅
app.set('view engine', 'ejs');

// 모든 정적 파일 제공
app.use(express.static(__dirname));

// Database : Data
// 저장소 DDju
// 콜렉션 user (회원)
// 콜렉션 zzim (좋아요) 

// Database ID admin PW zbJIiHYEKSsLa6Jg
MongoClient.connect('mongodb+srv://admin:zbJIiHYEKSsLa6Jg@data.faox2rv.mongodb.net/?retryWrites=true&w=majority', function(error, client){
  if(error){
    return console.log(error);
  }

  db = client.db('DDju');
  app.listen('3000', function(){
    console.log('success');
  });
})


// 회원가입, 로그인 수정 중 --------------------------------------------------------------------
app.post('/add', function(requests, response){

  db.collection('total').findOne({name:'dataLength'}, function(error, result){
    console.log(result.totalData);
    let totalDataLength = result.totalData;

    db.collection('user').insertOne({
      _id : totalDataLength+1, 
      아이디 : requests.body.userid, 
      비밀번호 : requests.body.userpw, 
      이름 : requests.body.username,
      생년월일 : requests.body.year + requests.body.month + requests.body.date,
      성별 : requests.body.gender,
      이메일 : requests.body.usermail,
      휴대전화 : requests.body.country + requests.body.phonenum + requests.body.veritext,
      주소 : requests.body.adress
      }, function(error, result){
      console.log('가입하기');
    })

    db.collection('total').updateOne({name : 'dataLength'},
    {$inc : {totalData:1}},
    function(error, result){
      if(error){
        return console.log(error);
      }
    })
  })
})


// data 꺼내오는 ------------------------------------------------------------------------------
app.get('/user', function(requests, response){
  db.collection('user').find().toArray(function(error, result){
    console.log(result);
    response.render('보여줄 곳', {log : result})
  })
})

// join 값을 데이터베이스에 전송 -> login/find에서 데이터를 찾아서 꺼내오기
// login 상태에서 zzim 값을 데이터베이스에서 받아서 -> zzim 페이지에서 꺼내오기




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


