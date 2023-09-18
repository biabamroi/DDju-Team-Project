const express = require('express');
const app = express();
// const path = require('path');
// const static = require('serve-static');
// const errorHandler = require('errorhandler');

// Database : Data
// 저장소 DDju
// 콜렉션 user (회원)
// 콜렉션 zzim (좋아요) 
// 콜렉션 review (리뷰)
// 콜렉션 api (API)

// MongoDB 연결
// npm install mongoose --save ★ 설치 ★
// Database ID admin PW zbJIiHYEKSsLa6Jg
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://admin:zbJIiHYEKSsLa6Jg@data.faox2rv.mongodb.net/?authSource=admin&retryWrites=true&w=majority';
// const url = 'mongodb://admin:zbJIiHYEKSsLa6Jg@global.aws.realm.mongodb.com:27020/?authMechanism=PLAIN&authSource=%24external&ssl=true&appName=triggers-lsyub:Data:local-userpass';
// const mongoose = require('mongoose');
// mongoose.connect("mongodb+srv://admin:zbJIiHYEKSsLa6Jg@data.faox2rv.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true}).then(()=>
// console.log('connected')).catch(() => console.log('failed'))

// 데이터를 저장할 변수
let db;

// 콜렉션 연결 - 서버가 못 읽음 
// const collection = db.Collection("Data");
// const collection = context.services.get(data).db("Data").collection("coll_name");

MongoClient.connect(url, function(error, client){
  if(error){
    return console.log('MongoDB 연결 오류: ', error);
  }
  db = client.db('DDju');
  global.db = client.db('DDju');
  console.log('MongoDB 연결 성공'+db);
  app.listen('8080');
})


// .ejs 사용 세팅
app.set('view engine', 'ejs');
app.set('views', 'views');

// npm install express-ejs-layouts ★ 설치 ★
// const expressLayouts = require('express-ejs-layouts');
// app.use(expressLayouts);
// app.set('layout','layout');
// app.set('layout extractScripts', true);


// 모든 정적 파일 제공
app.use(express.static(__dirname));

// npm install method-override 라이브러리 ★ 설치 ★
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// npm install -g nodemon ★ 전역 설치 ★ -------------------------- test 쉽게 하려면 필수 설치

// npm install body-parser  ★ 설치 ★
// bodyParser 사용 선언
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));

// 라우터 객체 설정
const router = express.Router();
app.use('/', router);

// 세션  ★ 설치 ★
// npm install passport   
// npm install passport-local   
// npm install express-session  
// npm install -s express-session 

const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// 세션 시크릿 키 설정 (환경 변수로 설정하는 것이 안전)
const sessionSecretKey = process.env.SESSION_SECRET_KEY || 'defaultSecretKeyDDju';

router.use(session({
  secret : sessionSecretKey, 
  resave : true, 
  saveUninitialized : false
}));

// 초기화 세팅 : 반드시 세션 설정 뒤로 순서 
router.use(passport.initialize());
router.use(passport.session());

// cookieParser
// npm install cookie-parser --save  ★ 설치 ★
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get('/', function (requests, response) {
  // Cookies that have not been signed 서명되지 않은 쿠키
  console.log('Cookies: ', requests.cookies)

  // Cookies that have been signed 서명된 쿠키
  console.log('Signed Cookies: ', requests.signedCookies)
});

// 로그인 상태 판별 ----------------------------------------------------------------------

router.post('/login', passport.authenticate('local', {
  failureRedirect : '/fail'
}), function(requests, response){
  response.redirect('/');
})

passport.use(new LocalStrategy({
  usernameField : 'userid',
  passwordField : 'userpw',
  session : true,
  passReqToCallback : false
}, function(userID, userPW, done){
  db.collection('user').findOne({ID : userID}, function(error, user){
    if(error) return done(error);
    
    if(!user){
      return done(null, false, {message : '존재하지 않는 아이디입니다.'})
    }
    if(userPW == user.PW){
      return done(null, user)
    }else{
      return done(null, false, {message : '비밀번호가 일치하지 않습니다.'})
    }
  })
}))

passport.serializeUser(function(user, done){
  done(null, user.ID)
})

passport.deserializeUser(function(id, done){
  db.collection('user').findOne({ID : id}, function(error, result){
    done(null, result)
  })
})


// 로그인 상태를 판단하여 userLoggedIn 값을 전달
router.get('/', function(requests, response){
  const userName = requests.cookies && requests.cookies.userName ? requests.cookies.userName : '';
  // 로그인 상태 판별 (Passport와 세션을 사용하여 userLoggedIn 설정)
  const userLoggedIn = requests.isAuthenticated(); // Passport를 통한 인증 상태 확인
  response.render('index.ejs', { userLoggedIn, userName });
})
router.get('/index', function(requests, response){
  const userLoggedIn = requests.isAuthenticated();
  response.render('index.ejs', { userLoggedIn });
})

// 서버에서 로그인 상태를 반환하는 엔드포인트 생성
router.get('/get-user-status', function(requests, response){
  const userLoggedIn = requests.isAuthenticated();
  response.json({ userLoggedIn })
});

router.get('/get-user-status-html', function(requests, response) {
  const userLoggedIn = requests.isAuthenticated();
  response.render('user-status.ejs', { userLoggedIn });
});


// 로그인 페이지
router.get('/login', function(requests, response){
  const userLoggedIn = requests.isAuthenticated();
  response.render('login.ejs', { userLoggedIn });
})

// /fail
router.post('/login', passport.authenticate('local', {
  failureRedirect : '/fail'
}), function(requests, response){
  response.redirect('/')
})

router.get('/fail', function(requests, response){
  response.send('로그인 정보가 일치하지 않습니다.')
})


// 로그인 체크
function getLogin(requests, response, next){
  if (requests.isAuthenticated()) { // passport를 통한 인증 상태 확인
    next()
  }else{
    response.send('로그인이 필요한 페이지입니다.');
  }
}

// 마이페이지---------------------------------------------------------------------------------
router.get('/mypage', getLogin, function(requests, response){
  const currentUser = requests.user;
  const userLoggedIn = requests.isAuthenticated();
  response.render('mypage.ejs', { userLoggedIn, user : currentUser });
})

// 로그아웃
router.post('/logout', function(requests, response, next){
  requests.logOut(err => {
    if (err) {
      return next(err);
    } else {
      response.redirect('/');
    }
  });
})

// 회원정보 수정, 탈퇴--------------------------------------------------------------------------

router.put('/edit', function(requests, response){
  db.collection('user').updateOne({_id : parseInt(requests.body._id)},
    {$set:{ID : requests.body.id, PW : requests.body.pw}}, function(error, result){
      const updatedUserId = requests.body.id; // 수정된 사용자 아이디
      const updatedPassword = requests.body.pw; // 수정된 비밀번호
    requests.isAuthenticated() = {updatedUserId, updatedPassword};
    response.redirect('/mypage');
  })
})

router.post('/delete', function(requests, response){
  console.log(requests.body.delete)
  requests.body.delete = parseInt(requests.body.delete)

  db.collection('user').deleteOne({_id : requests.body.delete}, function(error, result){
    if(error){
      console.log(error)
    }
    console.log('회원탈퇴')
  })
  response.redirect('/');
})



// 회원가입 --------------------------------------------------------------------

router.get('/join', function(requests, response){
  const userLoggedIn = requests.isAuthenticated();
  response.render('join.ejs', { userLoggedIn });
})

router.post('/id_check', (requests, response) => {
  let userid = requests.body.userid; // 클라이언트에서 전달된 아이디 값

  db.collection('user').findOne({ ID: userid }, function (error, user) {
    if (error) {
      console.error("에러 발생:", error);
      response.status(500).json({ error: "서버 오류" });
    } else {
      if (user) {
        // 아이디가 이미 존재하는 경우
        response.json({ exists: true });
      } else {
        // 아이디가 사용 가능한 경우
        response.json({ exists: false });
      }
    }
  });
});

router.post('/join', function(requests, response){
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
      phone : requests.body.country + requests.body.phonenum,
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
  response.redirect('/login');
})





// 전체 페이지 userLoggedIn 연결
router.get('/map', function(requests, response){
  const userLoggedIn = requests.isAuthenticated();
  response.render('map.ejs', { userLoggedIn });
})
router.get('/about', function(requests, response){
  const userLoggedIn = requests.isAuthenticated();
  response.render('about.ejs', { userLoggedIn });
})
router.get('/contact', function(requests, response){
  const userLoggedIn = requests.isAuthenticated();
  response.render('contact.ejs', { userLoggedIn });
})
router.get('/course-daejeon', function(requests, response){
  const userLoggedIn = requests.isAuthenticated();
  response.render('course-daejeon.ejs', { userLoggedIn });
})
router.get('/course-details', function(requests, response){
  const userLoggedIn = requests.isAuthenticated();
  response.render('course-details.ejs', { userLoggedIn });
})
router.get('/member-info', function(requests, response){
  const userLoggedIn = requests.isAuthenticated();
  response.render('member-info.ejs', { userLoggedIn });
})
router.get('/today-all', function(requests, response){
  const userLoggedIn = requests.isAuthenticated();

  db.collection('api').find().toArray(function(error, result){
    response.render('today-all.ejs', {api : result, userLoggedIn });
  })
})
router.get('/today-do', function(requests, response){
  const userLoggedIn = requests.isAuthenticated();
  
  db.collection('api').find({contenttypeid : '12'}).toArray(function(error, result){
    response.render('today-do.ejs', {api : result, userLoggedIn });
  })
})
router.get('/today-eat', function(requests, response){
  const userLoggedIn = requests.isAuthenticated();
  
  db.collection('api').find({contenttypeid : '39'}).toArray(function(error, result){
    response.render('today-eat.ejs', {api : result, userLoggedIn });
  })
})
router.get('/today-see', function(requests, response){
  const userLoggedIn = requests.isAuthenticated();
  
  db.collection('api').find({contenttypeid : '15'}).toArray(function(error, result){
    response.render('today-see.ejs', {api : result, userLoggedIn });
  })
})
router.get('/zzim', function(requests, response){
  const userLoggedIn = requests.isAuthenticated();
  response.render('zzim.ejs', { userLoggedIn });
})
router.get('/policy', function(requests, response){
  const userLoggedIn = requests.isAuthenticated();
  response.render('policy.ejs', { userLoggedIn });
})
router.get('/privacy', function(requests, response){
  const userLoggedIn = requests.isAuthenticated();
  response.render('privacy.ejs', { userLoggedIn });
})
router.get('/sitemap', function(requests, response){
  const userLoggedIn = requests.isAuthenticated();
  response.render('sitemap.ejs', { userLoggedIn });
})
router.get('/find-idpw', function(requests, response){
  const userLoggedIn = requests.isAuthenticated();
  response.render('find-idpw.ejs', { userLoggedIn });
})








// 장소 상세설명 페이지
router.get('/place-details/:id', function(requests, response){
  const userLoggedIn = requests.isAuthenticated();

  db.collection('api').find({_id : requests.params.id}).toArray(function(error, result){
    let apiResult = result;
    
    db.collection('review').find({name : parseInt(requests.params.id)}).toArray(function(error, result){
      response.render('place-details.ejs', {api : apiResult, review : result, userLoggedIn});
    })
  })
})

// 장소 상세설명 페이지에서 작성된 후기 review DB에 저장
router.post('/place-details/:id', function(requests, response){
  let today = new Date()
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let date = today.getDate();
  let reviewDate = year + '년 ' + month + '월 ' + date + '일';

  db.collection('review').insertOne({name : parseInt(requests.params.id), 'star' : parseInt(requests.body.star), 'review' : requests.body.reviewTxt, date : reviewDate}, function(error, result){
    console.log('review DB에 저장 완료!')
  })

  response.redirect('/place-details/'+ requests.params.id);
})

// 검색 화면
router.post('/search', function(requests, response){
  const userLoggedIn = requests.isAuthenticated();

  // 검색어가 있는 데이터 찾기
  let creatIndex = [
    {
      $search: {
        index: "search",
        text: {
          query: requests.body.search,
          path: {
            wildcard: "*"
          }
        }
      }
    }
  ]

  db.collection('api').aggregate(creatIndex).toArray(function(error, result){
    let placeMenu = requests.body.placeMenu
    let district = requests.body.district
    
    // 콘텐츠 타입, 시군구코드가 비어있을 경우 ejs 파일에 보내야하는 데이터 필터링
    if(placeMenu == undefined || (!placeMenu && !district)) {
      response.render('search.ejs', {search : result, searchWord : requests.body, userLoggedIn})
    } else if(placeMenu && !district) {
      let search = result.filter((item) => item.contenttypeid == placeMenu)  
      response.render('search.ejs', {search : search, searchWord : requests.body, userLoggedIn})
    } else if(!placeMenu && district) {
      let search = result.filter((item) => item.sigungucode == district)
      response.render('search.ejs', {search : search, searchWord : requests.body, userLoggedIn})
    } else {
      let search = result.filter((item) => item.contenttypeid == placeMenu && item.sigungucode == district)
      response.render('search.ejs', {search : search, searchWord : requests.body, userLoggedIn})
    }
  })
})









// api 데이터 파싱 --------------------------------------------------------------------------

// 1. 기본정보(콘텐츠id, 제목, 관광타입, 시군구코드, 이미지, 주소, 우편번호, 지도좌표, 등록일)
// let url = "https://apis.data.go.kr/B551011/KorService1/areaBasedList1?numOfRows=785&MobileOS=ect&MobileApp=DDju&_type=json&areaCode=3&serviceKey=K3ffxC1oIoWzYskEUMHmA3hfplXmJTt08QidPS9Br4fcnakaukocNyaP5ADWFtSMQUivJzOwjmKlnqVUEADYXQ%3D%3D";

// fetch(url)
// .then((res) => res.json())
// .then((myJson) => {
//   let daejeon = myJson.response.body.items.item;
//   for(let i = 0; i < daejeon.length; i++) {
//     db.collection('api').insert({_id : daejeon[i].contentid,
//       'title' : daejeon[i].title, 'contenttypeid' : daejeon[i].contenttypeid,
//       'sigungucode' : daejeon[i].sigungucode, 'img' : daejeon[i].firstimage,
//       'addr1' : daejeon[i].addr1, 'addr2' : daejeon[i].addr2, 'zipcode' : daejeon[i].zipcode,
//       'mapx' : daejeon[i].mapx, 'mapy' : daejeon[i].mapy,
//       'createdtime' : daejeon[i].createdtime}, function(error, result){
//       console.log('db에 저장완료!')
//     })
//   }
// })

// 2. 필요없는 데이터 삭제하기 : contenttypeid가 32(숙소)인 데이터
// app.get('/api', function(){
//   db.collection('api').deleteMany({contenttypeid : '32'}, function(error, result){
//     console.log('삭제 완료!')
//     if(error) {
//       console.log(error)
//     }
//   })
// })

// 3. Mongodb에서 데이터 가져와서 일치하는 id값에 필요한 Key값 추가하기
// (1) 개요, 홈페이지 주소
// app.get('/api', function(requests, response){
//   db.collection('api').find().toArray(function(error, result){
//     // console.log(result.length)
//     for(let i = 600; i < 767; i++) {
//       let url = 'https://apis.data.go.kr/B551011/KorService1/detailCommon1?MobileOS=ect&MobileApp=DDju&_type=json&contentId=' + result[i]._id + '&defaultYN=Y&overviewYN=Y&serviceKey=K3ffxC1oIoWzYskEUMHmA3hfplXmJTt08QidPS9Br4fcnakaukocNyaP5ADWFtSMQUivJzOwjmKlnqVUEADYXQ%3D%3D';

//       fetch(url)
//       .then((res) => res.json())
//       .then((json) => {
//         let text = json.response.body.items.item;
//         // console.log(text[0].overview, text[0].hmpg)
        
//         db.collection('api').update({_id : result[i]._id}, {$set : {'overview' : text[0].overview, 'hmpg' : text[0].hmpg}}, function(error, result){
//           if(error) {
//             return console.log(error)
//           } 
//           console.log('db에 저장완료!' + i)
//         })
//       })
//     }
//   })
// })

// (2) 이용시간, 쉬는날, 문의 및 안내 등
  // contenttypeid -> find, url 값 같게 설정
  // result.length 확인 후 i 설정
  // 데이터 한개 먼저 시범으로 확인 후 update 시작
  // 12 : {$set : {'usetime' : text[0].usetime, 'restdate' : text[0].restdate, 'infocenter' : text[0].infocenter}}
  // 14 : {$set : {'usetime' : text[0].usetimeculture, 'restdate' : text[0].restdateculture, 'infocenter' : text[0].infocenterculture}}
  // 행사 홈페이지 정보 필요한지 확인
  // 15 : {$set : {'startdate' : text[0].eventstartdate, 'enddate' : text[0].eventenddate, 'eventplace' : text[0].eventplace}}
  // 28 : {$set : {'usetime' : text[0].usetimeleports, 'restdate' : text[0].restdateleports, 'infocenter' : text[0].infocenterleports}}
  // 38 : {$set : {'opentime' : text[0].opentime, 'restdate' : text[0].restdateshopping, 'infocenter' : text[0].infocentershopping}}
  // 39 : {$set : {'opentime' : text[0].opentimefood, 'restdate' : text[0].restdatefood, 'infocenter' : text[0].infocenterfood}}
// app.get('/api', function(requests, response){
//   db.collection('api').find({contenttypeid : '39'}).toArray(function(error, result){
//     // console.log(result.length)
//     for(let i = 200; i < 417; i++) {
//       let url = 'https://apis.data.go.kr/B551011/KorService1/detailIntro1?MobileOS=ect&MobileApp=DDju&_type=json&contentId=' + result[i]._id + '&contentTypeId=39&serviceKey=SLJe0Elsk0DOYqHIPeUB7PP2WOW3J0LjCct3gZhtNfafIAU7cyzRTDGocxAQWuLvgm2cRPKIAJPkJmUJnWO%2FrA%3D%3D';
//       fetch(url)
//       .then((res) => res.json())
//       .then((json) => {
//         let text = json.response.body.items.item;

//         db.collection('api').update({_id : result[i]._id},
//           {$set : {'opentime' : text[0].opentimefood, 'restdate' : text[0].restdatefood, 'infocenter' : text[0].infocenterfood}}, function(error, result){
//             if(error) {
//               return console.log(error)
//             } 
//             console.log('db에 저장완료!' + i)
//         })
//       })
//     }
//   })
// })