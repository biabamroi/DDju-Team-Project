
let idveri = phoneveri = mailveri = false;


// 아이디
$('.userid input').focusout(function(){
  let userId = $(this).val();
  let idExp= /^[a-z0-9]{5,8}$/

  if(userId.length == 0) {
    $('.userid .warn').html('<span class="text-red">아이디를 입력해 주세요.</span>');
    $('.userid .inputbox i').attr({
      class : 'fa-solid fa-id-card',
      style : 'color: #6f86ae; font-size: 20px;'
    });
  } else if(!idExp.test(userId)) {
    $('.userid .warn').html('<span class="text-red">5~8자의 영문 소문자, 숫자만 사용 가능합니다.</span>');
    $('.userid .inputbox i').attr({
      class : 'fa-solid fa-id-card',
      style : 'color: red; font-size: 20px;'
    });
  } else {
    idveri = true;
    $('.userid .warn').html('<span class="text-green">사용할 수 있는 아이디입니다.</span>');
    $('.userid .inputbox i').attr({
      class : 'fa-solid fa-id-card',
      style : 'color: #0077FF; font-size: 20px;'
    });
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
    $('.phone .warn').html('<span class="text-green">인증번호를 발송했습니다. (유효시간 30분)<br>인증번호가 오지 않으면 입력한 정보를 다시 확인해 주세요. 이미 가입된 번호거나 가상전화번호는 인증번호를 받을 수 없습니다.</span>');
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



// 본인 확인 이메일
$('.usermail input').focusout(function(){
  let mail = $(this).val();
  let mailExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  if(mail.length == 0) {
    $('.usermail .warn').empty();
  } else if(!mailExp.test(mail)) {
    mailveri = false;
    $('.usermail .warn').html('<span class="text-red">이메일 주소를 다시 확인해 주세요.</span>')
  } else {
    $('.usermail .warn').empty();
  }
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
