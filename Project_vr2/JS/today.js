let sigunguCode = '';
const url =
"https://apis.data.go.kr/B551011/KorService1/areaBasedList1?MobileOS=ect&MobileApp=DDju&_type=json&areaCode=3" + sigunguCode + "&serviceKey=K3ffxC1oIoWzYskEUMHmA3hfplXmJTt08QidPS9Br4fcnakaukocNyaP5ADWFtSMQUivJzOwjmKlnqVUEADYXQ%3D%3D";

document.getElementById('district').addEventListener('change', function(e){
  sigunguCode = this.value;
  console.log(sigunguCode)

})





fetch(url)
.then((res) => res.json())
.then((myJson) => {
  let daejeon = myJson.response.body.items.item;
  daejeon.forEach((item, index) => {
    let placeItem = `
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
    `
    document.querySelector('.place-list').insertAdjacentHTML('beforeend' , placeItem)
  });
  })
