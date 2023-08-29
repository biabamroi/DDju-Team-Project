$('input').focusin(function(){
  $(this).parent('.inputbox').addClass('border-act');
})

$('input').focusout(function(){
  $(this).parent('.inputbox').removeClass('border-act');
})


let nameveri = phoneveri = false;


// 이름 
$('.username input').focusout(function(){
  let userName = $('.username input').val();
  let nameExp = /^[가-힣]{2,5}$/;

  if(userName.length == 0) {
    $('.username .warn').html('<span class="text-red">이름을 작성해 주세요.</span>');
  } else if(!nameExp.test(userName)) {
    $('.username .warn').html('<span class="text-red">2~5글자 사이의 한글로 입력하세요.</span>');
  } else {
    nameveri = true;
    $('.username .warn').empty();
  }
})



// 휴대전화
$('.phonenum input').focusout(function(){
  if($(this).val().length == 0) {
    $('.phone .warn').html('<span class="text-red">전화번호를 입력해 주세요.</span>');
  } else {
    $('.phone .warn').empty();
  }
}) 


$('#veribtn').on('click', function(){
  let phoneVal = $('.phonenum input').val();
  phoneVal = phoneVal.replace(/[^0-9]/g, '');
  $('.phonenum input').val(phoneVal);

  let phoneLeng;
  if(phoneVal.length < 10 || phoneVal.length > 11) {
    phoneLeng = false;
  } else {
    phoneLeng = true;
  }

  let phoneNum;
  if(isNaN(phoneVal)) {
    phoneNum = false;
  } else {
    phoneNum = true;
  }

  if(phoneLeng && phoneNum) {
    $('.phone .warn').html('<span class="text-green">인증번호를 발송했습니다.</span>');
    $('#veritext').attr('disabled', false);
    $('#veritext').parent('.inputbox').removeClass('disinput');
  } else {
    $('.phone .warn').html('<span class="text-red">형식에 맞지 않는 번호입니다.</span>')
    $('#veritext').attr('disabled', true);
    $('#veritext').parent('.inputbox').addClass('disinput');
  }

  $('#veritext').focusout(function(){
    if($(this).val() == "1234") {
      phoneveri = true;
      $('.phone .warn').html('<span class="text-green">인증되었습니다.</span>');
      $(this).next('div').empty();
      $(this).parent('.inputbox').removeClass('border-red');
    } else {
      $('.phone .warn').html('<span class="text-red">인증번호를 다시 확인해 주세요.</span>')
      $(this).next('div').html('<span class="text-red">불일치</span><span class="disagree"></span>')
      $(this).parent('.inputbox').addClass('border-red');
    }
  })
})





// 찾기
$('#joinbtn').on('click', function(e){
  if(idveri && pwveriidveri && pwchkveriidveri && nameveriidveri && bitrhveriidveri && genderveriidveri && phoneveriidveri && addressveri && mailveri){
    $('#join-form').submit();
  } else {
    e.preventDefault();
    $('input').trigger('focusout');
  }
})