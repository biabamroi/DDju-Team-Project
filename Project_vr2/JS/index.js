$('.search-btn').on('click', function(e){
  if($('.search-word').val() == '') {
    e.preventDefault();
    alert('검색어를 입력하세요.');
  } else {
    $('.search-btn').submit();
  }
})

