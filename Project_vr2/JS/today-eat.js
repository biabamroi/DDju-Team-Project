let url = 'https://apis.data.go.kr/B551011/KorService1/areaBasedList1?numOfRows=10&pageNo=1&MobileOS=ect&MobileApp=DDju&_type=json&arrange=O&contentTypeId=39&areaCode=3&serviceKey=K3ffxC1oIoWzYskEUMHmA3hfplXmJTt08QidPS9Br4fcnakaukocNyaP5ADWFtSMQUivJzOwjmKlnqVUEADYXQ%3D%3D';

// 지역기반 api 가져오는 함수
function api(url){
  document.querySelector('.place-list').innerHTML = '';
  
  fetch(url)
  .then((res) => res.json())
  .then((json) => {
    let areaBasedList = json.response.body.items.item;
    areaBasedList.forEach((item, index) => {
      let placeItem = `
      <a href="/place-details/${item.contentid}">
        <div class="place-item">
          <img src = "${item.firstimage}" alt = "${item.title}">
          <div class="text-box">
            <h3>${item.title}</h3>
          </div>
        </div>
      </a>
    `

      document.querySelector('.place-list').insertAdjacentHTML('beforeend' , placeItem)

      
      // overview api
      let contentId = areaBasedList[index].contentid;
      let CommonUrl = 'https://apis.data.go.kr/B551011/KorService1/detailCommon1?MobileOS=ect&MobileApp=DDju&_type=json&contentId=' + contentId + '&defaultYN=Y&firstImageYN=Y&overviewYN=Y&serviceKey=K3ffxC1oIoWzYskEUMHmA3hfplXmJTt08QidPS9Br4fcnakaukocNyaP5ADWFtSMQUivJzOwjmKlnqVUEADYXQ%3D%3D';

      fetch(CommonUrl)
      .then((res) => res.json())
      .then((json) => {
        let detailCommon = json.response.body.items.item;
        let overview = detailCommon[0].overview.replace('<br />', ' ')
        let newOverview = overview.replace('<br>', ' ')

        let placeOverview = `
        <p>${newOverview}</p>
        <ul class="keywords-list">
          <li>#키워드</li>
          <li>#키워드</li>
          <li>#키워드</li>
          <li>#키워드</li>
          </ul>
          `

        let placeItems = document.querySelectorAll('.place-item')
        placeItems[index].querySelector('.text-box').insertAdjacentHTML('beforeend' , placeOverview)
      })
    })
  })
}

api(url);

// 페이지네이션
// 페이지네이션에 필요한 변수 선언
const district = document.getElementById('district');
const order = document.querySelectorAll('.order li');
let currentPage = 1;
let arrange = 'O';
let sigunguCode = '';

// 총 페이지 개수 구하기
let totalCount = 20;
const limit = 10

let totalPage = Math.ceil(totalCount / limit);

// 현재 페이지의 그룹 구하기
let pageCount = 2;

let pageGroup = Math.ceil(currentPage / pageCount);

// 현재 페이지 그룹의 첫번째, 마지막 숫자 구하기
let lastNumber = pageGroup * pageCount
if (lastNumber > totalPage) {
  lastNumber = totalPage
}

let firstNumber = lastNumber - (pageCount - 1)

// 페이지네이션 그리기
document.querySelector('.number-btn').innerHTML = '';
for (let i = firstNumber; i <= lastNumber; i++) {
  document.querySelector('.number-btn').innerHTML += `<button type="button">${i}</button>`
}


// 페이지네이션 번호 눌렀을 때 해당 페이지로 이동하기
let numBtns = document.querySelectorAll('.number-btn button');
numBtns[0].classList.add('selected')
numBtns.forEach(function(item){
  item.addEventListener('click', function(item){
    numBtns.forEach(function(item){
      item.classList.remove('selected')
    })
    item.target.classList.add('selected')

    // 현재 페이지 번호
    currentPage = item.target.innerText

    // 선택된 정렬 값
    if(order[0].classList.contains('selected')) {
      arrange = 'O'
    } else if(order[1].classList.contains('selected')) {
      arrange = 'R'
    }

    // 선택된 '구' 값
    sigunguCode = district.value;

    url = 'https://apis.data.go.kr/B551011/KorService1/areaBasedList1?numOfRows=10&pageNo=' + currentPage + '&MobileOS=ect&MobileApp=DDju&_type=json&arrange=' + arrange + '&contentTypeId=39&areaCode=3' + sigunguCode + '&serviceKey=K3ffxC1oIoWzYskEUMHmA3hfplXmJTt08QidPS9Br4fcnakaukocNyaP5ADWFtSMQUivJzOwjmKlnqVUEADYXQ%3D%3D';

    api(url)
  })
})


// '정렬'을 눌렀을 때 선택한 순서로 정렬하기
order.forEach(function(item){
  item.addEventListener('click', function(){
    numBtns.forEach(function(item){
      item.classList.remove('selected')
    })
    numBtns[0].classList.add('selected')
    
    order.forEach(function(item){
      item.classList.remove('selected')
    })
    item.classList.add('selected')

    // 선택된 정렬 값
    if(order[0].classList.contains('selected')) {
      arrange = 'O'
    } else if(order[1].classList.contains('selected')) {
      arrange = 'R'
    }

    // 선택된 '구' 값
    sigunguCode = district.value;

    url = 'https://apis.data.go.kr/B551011/KorService1/areaBasedList1?numOfRows=10&pageNo=1&MobileOS=ect&MobileApp=DDju&_type=json&arrange=' + arrange + '&contentTypeId=39&areaCode=3&' + sigunguCode + '&serviceKey=K3ffxC1oIoWzYskEUMHmA3hfplXmJTt08QidPS9Br4fcnakaukocNyaP5ADWFtSMQUivJzOwjmKlnqVUEADYXQ%3D%3D';

    api(url);
  })
})


// '구'를 선택했을 때 해당하는 '구'의 api 가져오는 이벤트 추가
district.addEventListener('change', function(){
  order.forEach(function(item){
    item.classList.remove('selected')
  })
  order[0].classList.add('selected')

  numBtns.forEach(function(item){
    item.classList.remove('selected')
  })
  numBtns[0].classList.add('selected')

  // 선택된 '구' 값
  sigunguCode = this.value;

  url = 'https://apis.data.go.kr/B551011/KorService1/areaBasedList1?numOfRows=10&pageNo=1&MobileOS=ect&MobileApp=DDju&_type=json&arrange=O&contentTypeId=39&areaCode=3' + sigunguCode + '&serviceKey=K3ffxC1oIoWzYskEUMHmA3hfplXmJTt08QidPS9Br4fcnakaukocNyaP5ADWFtSMQUivJzOwjmKlnqVUEADYXQ%3D%3D';
  
  api(url);
})