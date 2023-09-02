const url =
"https://apis.data.go.kr/B551011/KorService1/areaBasedList1?MobileOS=ect&MobileApp=DDju&_type=json&areaCode=3&serviceKey=K3ffxC1oIoWzYskEUMHmA3hfplXmJTt08QidPS9Br4fcnakaukocNyaP5ADWFtSMQUivJzOwjmKlnqVUEADYXQ%3D%3D";

fetch(url)
.then((res) => res.json())
.then((myJson) => {
  let daejeon = myJson.response.body.items.item;
  daejeon.forEach((item, index) => {
    console.log(item, index)
    console.log(item.title)
  });
  })


// products.forEach(function(item){
//   let boxItem = `
//    <div class="box-item">
//      <img src = "${item.img}" alt = "${item.title}">
//      <div class = "sho-info">
//        <h3>${item.title}</h3>
//        <p>${item.price}</p>
//        <p>${item.size}</p>
//      </div>
//    </div>
//   `

//   document.querySelector('.box-list').insertAdjacentHTML('beforeend' , boxItem)
// })
