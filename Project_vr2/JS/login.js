let idveri = pwveri = false;


// 아이디
$('.userid input').focusout(function(){
  let userId = $(this).val();
  let idExp= /^[a-z0-9]{5,8}$/

  if(userId.length == 0) {
    $('.userid .warn').html('<span class="text-red">아이디를 입력해 주세요.</span>');
  } else if(!idExp.test(userId)) {
    $('.userid .warn').html('<span class="text-red">5~8자의 영문 소문자, 숫자만 사용 가능합니다.</span>');
  } else {
    idveri = true;
    $('.userid .warn').empty();
  }
})


// 비밀번호
$('.userpw input').focusout(function(){
  let userPw = $(this).val();
  let pwExp = /^[A-Za-z0-9`~!@#\$%\^&\*\(\)\{\}\[\]\-_=\+\\|;:'"<>,\./\?]{8,20}$/

  if(userPw.length == 0) {
    $('.userpw .warn').html('<span class="text-red">비밀번호를 입력해 주세요.</span>');
    // $('.userpw .inputbox span').empty();
  } else if(!pwExp.test(userPw)) {
    $('.userpw .warn').html('<span class="text-red">비밀번호를 확인해 주세요.</span>')
  } else {
    pwveri = true;
    $('.userpw .warn').empty();
  }
})

