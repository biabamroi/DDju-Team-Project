// .like-btn 눌렀을 때 on class toggle
$('.like-btn').on('click', function(){
  $(this).toggleClass('on');
})

// .share-btn 눌렀을 때 현재 페이지 url 복사하기
$('.share-btn').on('click', function(){
  let currentUrl = window.document.location.href;
  window.navigator.clipboard.writeText(currentUrl)
  .then(() => {
    alert('url이 복사되었습니다');
  });
})

let course = [
  {
    title : '성심당',
    img : 'https://mblogthumb-phinf.pstatic.net/MjAyMDA1MjBfMjY2/MDAxNTg5OTQwNDQzMzcz.WNFQCRWTCDUoNQEXc0h9mVPJC_cjIwtbCzX322TVgREg.Kx8PyT1upSyT2AmWpi4RqcRZ8K1exVNH6Y3AttUOLPkg.JPEG.haram4th/work-029137.jpg?type=w800',
    p: '성심당은 대전광역시에 위치한 베이커리 전문점',
    location :'대전광역시 중구 대종로 480번길 15(은행동)',
    time : '08:00 ~ 22:00(월~일)',
    call : '042-220-4120',
    page : 'https://www.sungsimdangmall.co.kr/cscenter/search_market.asp'
  },
  {
    title : '김화칼국수',
    img : 'https://img.siksinhot.com/place/1618466073809481.jpg?w=307&h=300&c=Y',
    p: '대표 메뉴로는 칼국수, 비빔국수, 수육',
    location :'대전광역시 동구 중동 22-1',
    time : '매일 09:00 ~ 20:00',
    call : '042-220.4120',
    page : 'https://www.instagram.com/explore/locations/1024345229/'
  },
  {
    title : '인터뷰<br>(Interview)',
    img : 'https://mblogthumb-phinf.pstatic.net/MjAxNzA1MDNfMzQg/MDAxNDkzNzg0NjA1NDE0._-_G986A4olByoZql0HyqyOCK_THPGs4uKvMN66fUpsg.Zs7dIZF5mE1OiUTzW6qBuIWYi1zHDczEqSQgwf0-iywg.JPEG.ki__chin/IMG_9158.jpg?type=w800',
    p: '휴양지에 온 듯한 기분을 느낄 수 있는 대전 카페 ',
    location :'대전광역시 유성구 한밭대로371번길 25-3',
    time : '10:00 ~ 22:00',
    call : '042-823-3712',
    page : 'https://www.instagram.com/explore/locations/1024345229/'
  },
  {
    title : '한영식당',
    img : 'https://mblogthumb-phinf.pstatic.net/MjAxODA0MjdfNjQg/MDAxNTI0ODEwMDY0Nzc4.qhfbbTyHHC055qsoJBdhqwRvhRLpwsepfZAvkZ4mNigg.cOZGHn2NeRQvo79Cu8YUXbtfloW9bKcVWwVRVytNyK8g.JPEG.tearshn77/image_2129270281524810051657.jpg?type=w800',
    p: '감자, 야채, 매콤한 특제 양념소스를 넣어 만든 닭도리탕',
    location :'대전광역시 중구 계룡로874번길 6 (오류동)',
    time : '11:00 ~ 21:30',
    call : '042-533-2644',
    page : 'https://map.naver.com/p/entry/place/13571357?c=15.00,0,0,0,dh'
  },
  {
    title : '코스후기',
    img : 'https://i.namu.wiki/i/cwi4ESQRt6rJQoY77ZMfpBIdhDRgngoHrVK-rKChiKs-rh8BgFbZm18U0GAfFMBOg0P9NlWHYZnCX9S-nyRBZObuzauKg1_LGEgZKYH2YfNSYbxBarQzaktjEpKt01b9FKAbZhEPS7ytLqLtNqYs2A.webp',
  },
]


let detailList = document.querySelectorAll('.place-detail-box');
let mapList = document.querySelector('.map-list');

course.forEach(function(item, i){
  let mapItem = `
    <div class="map-item">
      <p>${item.title}</p>
    </div>
  `
  mapList.insertAdjacentHTML('beforeend', mapItem);
})

let mapItem = document.querySelectorAll('.map-item')

mapItem.forEach(function(post, i){
  post.style.backgroundImage = `url(${course[i].img})`
})

mapItem.forEach(function(item, index){
  item.addEventListener('click', function(){
    document.querySelector('.txt-wrap h2').innerHTML = course[index].title;
    document.querySelector('.place-detail-box img').src = course[index].img;
    document.querySelector('.place-detail-txt p').innerHTML = course[index].p;
    document.querySelector('.place-detail-item .location').innerHTML = course[index].location;
    document.querySelector('.place-detail-item .time').innerHTML = course[index].time;
    document.querySelector('.place-detail-item .call').innerHTML = course[index].call;
    document.querySelector('.place-detail-item .page a').innerHTML = course[index].page;
    document.querySelector('.place-detail-item .page a').setAttribute('href', course[index].page)
  })
})

// title : '장태산자연휴양림',
// txt : '대전시 서남에 위치한 장태산은 형제바위 위에 있는 전망대에서 바라보는 석양의 노을은 붉은 낙조가 산아래 용태를 저수지와 어우러져 가히 형용할 수 없는 장관을 이루어 감탄을 자아내게 한다.<br>특히, 장태산 일대의 침엽수 및 활엽수림 25만여평의 휴양림은 각종 편의 시설과 산림욕장, 야영장, 방갈로, 체육시설 등이 갖추어져 있어 시민들은 물론 사계절 전국에서 많은 사람들이 즐겨 찾는 휴식처이기도 하다.',
// img : 'https://www.jangtaesan.or.kr:454/index.asp',
// p: '국내 유일의 메타세쿼이아 숲이 울창하게 형성되어 있어 이국적인 경관과 더불어 가족 단위 산림욕을 즐기기에 적합한곳!',
// location :'대전광역시 서구 장안로 461',
// time : '09시~19시',
// call : '042)583.0094',
// page : 'https://www.sungsimdangmall.co.kr/cscenter/search_market.asp'