// .like-btn을 눌렀을 때 on class toggle
$('.like-btn').on('click', function(){
  $(this).toggleClass('on');
})


// 리뷰 작성 칸 별점 체크
$('.star-rating label').on('click', function(){
  $('.star-rating label').removeClass('on');
  // this 전에 있는 label에 on class add
  $(this).addClass('on').prevAll('label').addClass('on');
  
  $('.star-rating input[type="radio"]').prop('checked', false);
  $(this).children('input[type="radio"]').prop('checked', true);
})