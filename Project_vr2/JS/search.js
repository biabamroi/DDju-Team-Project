// search-btn 눌렀을 때 input 값 없으면 alert 창 띄우고 submit 막기
$('.search-btn').on('click', function(e){
  if($('.search-word').val() == '') {
    e.preventDefault();
    alert('검색어를 입력하세요.');
  } else {
    $('.search-btn').submit();
  }
})


// place-menu를 눌렀을 때 this에 p태그 색 바꾸기, inputbox checked 속성 주기
$('.place .inputbox').on('click', function(e){
  $('.place .inputbox').removeClass('selected');
  $('.place .inputbox input[type="radio"]').prop('checked', false);
  $(this).addClass('selected');
  $(this).children('input[type="radio"]').prop('checked', true);
})

// order-menu를 눌렀을 때 this에 p태그 색 바꾸기, inputbox checked 속성 주기
$('.order .inputbox').on('click', function(e){
  $('.order .inputbox').removeClass('selected');
  $('.order .inputbox input[type="radio"]').prop('checked', false);
  $(this).addClass('selected');
  $(this).children('input[type="radio"]').prop('checked', true);

  let searchArray = <%- JSON.stringify(search) %>;
  let orderValue = $(this).children('input[type="radio"]').val();
  
  // this가 '제목순'일 때
  if(orderValue == 'title') {
    let orderArrray = searchArray.sort((a,b) => {
      if(a.title > b.title) return 1;
      if(a.title < b.title) return -1;
      return 0;
    });

    $('.place-list').empty();
    orderArrray.forEach(function(item, index){
      let placeItem = `
        <a href="/place-details/${item._id}">
                <div class="place-item">
                  <img src = "${item.img}" alt = "${item.title}">
                  <div class="text-box">
                    <h3>${item.title}</h3>
                    <p>${item.overview}</p>
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

        $('.place-list').append(placeItem);
    })
  
  // this가 '등록일순'일 때
  } else {
    let orderArrray = searchArray.sort((a,b) => (b.createdtime - a.createdtime));
    
    $('.place-list').empty();
    orderArrray.forEach(function(item, index){
      let placeItem = `
        <a href="/place-details/${item._id}">
                <div class="place-item">
                  <img src = "${item.img}" alt = "${item.title}">
                  <div class="text-box">
                    <h3>${item.title}</h3>
                    <p>${item.overview}</p>
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

        $('.place-list').append(placeItem);
    })
  }
})


// place-item 처음 10개만 보여주고 더보기 버튼을 눌렀을 때 5개씩 더 보여주기
$('.place-item').parent().hide();
$('.place-item').parent().slice(0, 10).show();

$('.place-item-btn').click(function(e){
  e.preventDefault();
  $('.place-item').parent('a:hidden').slice(0, 5).show();
    if($('.place-item').parent('a:hidden').length == 0){
    $('.place-item-btn').hide();
  }
})
