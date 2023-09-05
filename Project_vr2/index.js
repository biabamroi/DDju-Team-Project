const express = require('express');
const app = express();
const path = require('path');

// 데이터를 저장할 변수
let db;

// .ejs 사용 세팅
app.set('view engine', 'ejs');

// 모든 정적 파일 제공
app.use(express.static(__dirname));

// npm install method-override 라이브러리 ★ 설치 ★
const methodOverride = require('method-override');
app.use(methodOverride('_method'));



// MongoDB 연결
const MongoClient = require('mongodb').MongoClient;

// Database : Data
// 저장소 DDju
// 콜렉션 user (회원)
// 콜렉션 zzim (좋아요) 
// 콜렉션 review (리뷰)
// 콜렉션 api (API)

// Database ID admin PW zbJIiHYEKSsLa6Jg
MongoClient.connect('mongodb+srv://admin:zbJIiHYEKSsLa6Jg@data.faox2rv.mongodb.net/?retryWrites=true&w=majority', function(error, client){
  if(error){
    return console.log(error);
  }

  db = client.db('DDju');
  // 포트 3000 연결
  app.listen('3000');
})



// npm install body-parser  ★ 설치 ★
// bodyParser 사용 선언
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));

// cookieParser
// npm install cookie-parser --save  ★ 설치 ★
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get('/', function (req, res) {
  // Cookies that have not been signed 서명되지 않은 쿠키
  console.log('Cookies: ', req.cookies)

  // Cookies that have been signed 서명된 쿠키
  console.log('Signed Cookies: ', req.signedCookies)
});

// 세션
// npm install -s express-session  ★ 설치 ★
const session = require('express-session');



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




// 회원가입 시 아이디 중복체크 - 추후 업데이트


// 회원가입 --------------------------------------------------------------------
app.post('/join', function(requests, response){
  db.collection('total').findOne({name:'dataLength'}, function(error, result){
    console.log(result.totalData);
    let totalDataLength = result.totalData;

    db.collection('user').insertOne({
      _id : totalDataLength+1, 
      ID : requests.body.userid, 
      PW : requests.body.userpw, 
      name : requests.body.username,
      birth : requests.body.year + requests.body.month + requests.body.date,
      gender : requests.body.gender,
      email : requests.body.usermail,
      phone : requests.body.country + requests.body.phonenum + requests.body.veritext,
      adress : requests.body.sample6_postcode + requests.body.sample6_address + requests.body.sample6_detailAddress + requests.body.sample6_extraAddress
    }, function(error, result){
      if(error){
        return console.log(error);
      }
    })

    db.collection('total').updateOne({name : 'dataLength'},
    {$inc : {totalData:1}},
    function(error, result){
      if(error){
        return console.log(error);
      }
    })
  })
  response.redirect("/login.html");
})


// 세션 환경세팅 ---------------------------작업중--------------------
// app.use(
//   ({
//     secret: "my key",
//     resave: true,
//     saveUninitialized: true
//   })
// );

// app.use(session({
//   resave: false,
//   saveUninitialized: false,
//   secret: process.env.COOKIE_SECRET,
//   cookie: {
//     // httpOnly: true 쿠키 접근 불가
//     httpOnly: true,
//     // secure: HTTPS일 경우만 쿠키 전송
//     secure: false,
//   },
// }));

// app.get('/delete', (req, res) => {
//   res.clearCookie('user').redirect('/')
// })

// 참조용 코드
// const morgan = require('morgan');
// const nunjucks = require('nunjucks');

// app.use(morgan('dev'));
// app.use(cookieParser());
// app.set('view engine', 'html');
// nunjucks.configure('views', {
//   express: app,
//   watch: true,
// });
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// app.get('/', (req, res) => {
//     const { user } = req.cookies;
//     if(user){
//         res.render('login', { user });
//         return;
//     }
    
//     res.render('index')
// })

// app.post('/', (req, res) => {
//     const { name } = req.body;
//     res.cookie('user', name).redirect('/');
// })



// 로그인 --------------------------------------------------------------------

// const userID = req.body.userid || req.query.userid;
// const userPW = req.body.userpw || req.query.userpw;

app.post('/login', function(requests, response){
  db.collection('user').findOne({
    ID : requests.body.userid, 
    PW : requests.body.userpw 
  }, (function(error, users){
    if(error){
      return console.log(error);
    }
    if(!users){
      return response.redirect('/login.html');
      // response.send("<script>alert('아이디와 비밀번호를 다시 한 번 확인해 주세요.');</script>");
    }
    // 로그인 세션 또는 쿠키, 토큰 유지 기능 구현 필요
    // requests.
    return response.redirect('/index.html');
  }))
})

app.post('/logout', function(requests, response){

})



// login 상태에서 zzim 값을 데이터베이스에서 받아서 -> zzim 페이지에서 꺼내오기


