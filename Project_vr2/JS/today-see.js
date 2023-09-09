let url = 'https://apis.data.go.kr/B551011/KorService1/areaBasedList1?numOfRows=10&pageNo=1&MobileOS=ect&MobileApp=DDju&_type=json&arrange=O&contentTypeId=15&areaCode=3&serviceKey=K3ffxC1oIoWzYskEUMHmA3hfplXmJTt08QidPS9Br4fcnakaukocNyaP5ADWFtSMQUivJzOwjmKlnqVUEADYXQ%3D%3D';

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
      // let contentId = areaBasedList[index].contentid;
      // let CommonUrl = 'https://apis.data.go.kr/B551011/KorService1/detailCommon1?MobileOS=ect&MobileApp=DDju&_type=json&contentId=' + contentId + '&defaultYN=Y&firstImageYN=Y&overviewYN=Y&serviceKey=K3ffxC1oIoWzYskEUMHmA3hfplXmJTt08QidPS9Br4fcnakaukocNyaP5ADWFtSMQUivJzOwjmKlnqVUEADYXQ%3D%3D';

      // fetch(CommonUrl)
      // .then((res) => res.json())
      // .then((json) => {
      //   let detailCommon = json.response.body.items.item;
      //   let overview = detailCommon[0].overview.replace('<br />', ' ')
      //   let newOverview = overview.replace('<br>', ' ')

      //   let placeOverview = `
      //   <p>${newOverview}</p>
      //   <ul class="keywords-list">
      //     <li>#키워드</li>
      //     <li>#키워드</li>
      //     <li>#키워드</li>
      //     <li>#키워드</li>
      //     </ul>
      //     `

      //   let placeItems = document.querySelectorAll('.place-item')
      //   placeItems[index].querySelector('.text-box').insertAdjacentHTML('beforeend' , placeOverview)
      // })
    })
  })
}

api(url);


// '정렬'을 눌렀을 때 선택한 순서로 정렬하기
const order = document.querySelectorAll('.order li');

order.forEach(function(item){
  item.addEventListener('click', function(){
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

    url = 'https://apis.data.go.kr/B551011/KorService1/areaBasedList1?numOfRows=10&pageNo=1&MobileOS=ect&MobileApp=DDju&_type=json&arrange=' + arrange + '&contentTypeId=15&areaCode=3&' + sigunguCode + '&serviceKey=K3ffxC1oIoWzYskEUMHmA3hfplXmJTt08QidPS9Br4fcnakaukocNyaP5ADWFtSMQUivJzOwjmKlnqVUEADYXQ%3D%3D';

    api(url);
  })
})


// '구'를 선택했을 때 해당하는 '구'의 api 가져오는 이벤트 추가
const district = document.getElementById('district');
district.addEventListener('change', function(){
  order.forEach(function(item){
    item.classList.remove('selected')
  })
  order[0].classList.add('selected')

  // 선택된 '구' 값
  sigunguCode = this.value;

  url = 'https://apis.data.go.kr/B551011/KorService1/areaBasedList1?numOfRows=10&pageNo=1&MobileOS=ect&MobileApp=DDju&_type=json&arrange=O&contentTypeId=15&areaCode=3' + sigunguCode + '&serviceKey=K3ffxC1oIoWzYskEUMHmA3hfplXmJTt08QidPS9Br4fcnakaukocNyaP5ADWFtSMQUivJzOwjmKlnqVUEADYXQ%3D%3D';
  
  api(url);
})