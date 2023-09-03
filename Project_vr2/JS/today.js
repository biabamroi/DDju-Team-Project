let url = 'https://apis.data.go.kr/B551011/KorService1/areaBasedList1?MobileOS=ect&MobileApp=DDju&_type=json&areaCode=3&serviceKey=K3ffxC1oIoWzYskEUMHmA3hfplXmJTt08QidPS9Br4fcnakaukocNyaP5ADWFtSMQUivJzOwjmKlnqVUEADYXQ%3D%3D';

// 지역기반 api 가져오는 함수
function api(url){
  document.querySelector('.place-list').innerHTML = '';
  
  fetch(url)
  .then((res) => res.json())
  .then((json) => {
    let areaBasedList = json.response.body.items.item;
    areaBasedList.forEach((item, index) => {
      let placeItem = `
      <a href="/place-details">
        <div class="place-item">
          <img src = "${item.firstimage}" alt = "${item.title}">
          <div class="text-box">
            <h3>${item.title}</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum, repellendus.</p>
            <ul class="keywords-list">
              <li>#키워드</li>
              <li>#키워드</li>
              <li>#키워드</li>
              <li>#키워드</li>
            </ul>
            </div>
          </div>
        </a>
      `

      document.querySelector('.place-list').insertAdjacentHTML('beforeend' , placeItem)
    });
    })
}

api(url);


// '구'를 선택했을 때 해당하는 '구'의 api 가져오는 이벤트 추가
document.getElementById('district').addEventListener('change', function(){
  let sigunguCode = this.value;

  url = 'https://apis.data.go.kr/B551011/KorService1/areaBasedList1?MobileOS=ect&MobileApp=DDju&_type=json&areaCode=3' + sigunguCode + '&serviceKey=K3ffxC1oIoWzYskEUMHmA3hfplXmJTt08QidPS9Br4fcnakaukocNyaP5ADWFtSMQUivJzOwjmKlnqVUEADYXQ%3D%3D';
  
  api(url);
})


// 공통정보 - 개요, 홈페이지 정보
let contentId = item.contentid;
let CommonUrl = 'https://apis.data.go.kr/B551011/KorService1/detailCommon1?MobileOS=ect&MobileApp=DDju&_type=json&contentId=' + contentId + '&defaultYN=Y&firstImageYN=Y&overviewYN=Y&serviceKey=K3ffxC1oIoWzYskEUMHmA3hfplXmJTt08QidPS9Br4fcnakaukocNyaP5ADWFtSMQUivJzOwjmKlnqVUEADYXQ%3D%3D';

fetch(CommonUrl)
.then((res) => res.json())
.then((json) => {
  let detailCommon = json.response.body.items.item;


})