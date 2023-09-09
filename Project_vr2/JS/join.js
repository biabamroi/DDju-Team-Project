$('input').focusin(function(){
  $(this).parent('.inputbox').addClass('border-act');
})

$('input').focusout(function(){
  $(this).parent('.inputbox').removeClass('border-act');
})



let idveri = pwveri = pwchkveri = nameveri = bitrhveri = genderveri = phoneveri = addressveri = false;
let mailveri = true;



// 아이디
$('.userid input').focusout(function(){
  let userId = $(this).val();
  let idExp= /^[a-z0-9]{5,8}$/

  if(userId.length == 0) {
    $('.userid .warn').html('<span class="text-red">아이디를 입력해 주세요.</span>');
    $('.userid .inputbox button i').attr({
      class : 'fa-solid fa-id-card',
      style : 'color: #6f86ae; font-size: 20px;'
    });
  } else if(!idExp.test(userId)) {
    $('.userid .warn').html('<span class="text-red">5~8자의 영문 소문자, 숫자만 사용 가능합니다.</span>');
    $('.userid .inputbox button i').attr({
      class : 'fa-solid fa-id-card',
      style : 'color: red; font-size: 20px;'
    });
  } else {
    idveri = true;
    $('.userid .inputbox button i').attr({
      class : 'fa-solid fa-id-card',
      style : 'color: #0077FF; font-size: 20px;'
    });
  }
})

// 아이디 중복 검사 함수
function id_check() {
  let id_input = document.querySelector('input[name="userid"]');
  let userID = id_input.value; 

  $('.useridinp').change(function () {
    $('.userid .inputbox button i').attr({
      class : 'fa-solid fa-id-card',
      style : 'color: #6f86ae; font-size: 20px;'
    });
    $('.useridinp').attr("check_result", "fail");
  })

  if (userID == '') {
    $('.userid .warn').html('<span class="text-red">아이디를 입력해 주세요.</span>');
    return;
  }


  $.ajax({
    url: "/id_check",
    method: 'post',
    data: {
      'userid': userID
    },
    datatype: 'json',
    success: function (data) {
      if (data.exists) {
        $('.userid .warn').html('<span class="text-red">존재하는 아이디입니다.</span>');
        id_input.focus();
        return;
      } else {
        $('.userid .warn').html('<span class="text-green">사용할 수 있는 아이디입니다.</span>');
        $('.useridinp').attr("check_result", "success");
        $('.userid .inputbox button i').attr({
          class : 'fa-solid fa-id-card',
          style : 'color: #0077FF; font-size: 20px;'
        });
        return;
      }
    }
  });
}



// 비밀번호
$('.userpw input').focusout(function(){
  let userPw = $(this).val();
  let pwExp = /^[A-Za-z0-9`~!@#\$%\^&\*\(\)\{\}\[\]\-_=\+\\|;:'"<>,\./\?]{8,20}$/

  if(userPw.length == 0) {
    $('.userpw .warn').html('<span class="text-red">비밀번호를 입력해 주세요.</span>');
    // $('.userpw .inputbox span').empty();
    $('.userpw .inputbox iconify-icon').attr({
      icon : 'solar:heart-lock-bold',
      style : 'color: #6f86ae; font-size: 24px;'
    });
  } else if(!pwExp.test(userPw)) {
    $('.userpw .warn').html('<span class="text-red">8~20자 영문 대/소문자, 숫자, 특수문자를 사용하세요.</span>')
    $('.userpw .inputbox p').html('<span class="text-red">사용불가</span>');
    $('.userpw .inputbox iconify-icon').attr({
      icon : 'solar:heart-lock-bold',
      style : 'color: red; font-size: 24px;'
    });
  } else {
    pwveri = true;
    $('.userpw .warn').empty();
    $('.userpw .inputbox p').html('<span class="text-green">안전</span>');
    $('.userpw .inputbox iconify-icon').attr({
      icon : 'solar:heart-lock-bold-duotone',
      style : 'color: #0077FF; font-size: 24px;'
    });
  }
})



// 비밀번호 재확인
$('.userpw-chk input').focusout(function(){
  let userPwChk = $(this).val();

  if(userPwChk.length == 0) {
    $('.userpw-chk .warn').html('<span class="text-red">비밀번호를 입력해 주세요.</span>');
    $('.userpw-chk .inputbox p').html('<span class="text-red">사용불가</span>');
    $('.userpw-chk .inputbox iconify-icon').attr({
      icon : 'solar:heart-lock-bold',
      style : 'color: red; font-size: 24px;'
    });
  } else if(userPwChk == $('.userpw input').val()) {
    pwchkveri = true;
    $('.userpw-chk .warn').empty();
    $('.userpw-chk .inputbox iconify-icon').attr({
      icon : 'solar:heart-lock-bold-duotone',
      style : 'color: #0077FF; font-size: 24px;'
    });
  } else {
    $('.userpw-chk .warn').html('<span class="text-red">비밀번호가 일치하지 않습니다.</span>');
    $('.userpw-chk .inputbox p').html('<span class="text-red">사용불가</span>');
    $('.userpw-chk .inputbox iconify-icon').attr({
      icon : 'solar:heart-lock-bold',
      style : 'color: #6f86ae; font-size: 24px;'
    });
  }
})



// 이름 
$('.username input').focusout(function(){
  let userName = $('.username input').val();
  let nameExp = /^[가-힣]{2,5}$/;

  if(userName.length == 0) {
    $('.username .warn').html('<span class="text-red">필수 정보입니다.</span>');
  } else if(!nameExp.test(userName)) {
    $('.username .warn').html('<span class="text-red">2~5글자 사이의 한글로 입력하세요.</span>');
  } else {
    nameveri = true;
    $('.username .warn').empty();
  }
})


// 생년월일
$('#year, #month, #date').focusout(function(){
  let year = $('#year').val();
  let month = $('#month').val();
  let date = $('#date').val();

  // 한국 날짜 및 시간 (한국 표준시)
  let now = new Date();
  let nowStamp = now.getTime();
  now = now.getFullYear();

  let birth = new Date(year, month, date);
  birth = birth.getTime();

  if(year.length != 4) {
    $('.birth .warn').html('<span class="text-red">태어난 년도 4자리를 정확하게 입력하세요.</span>');
  } else if(month.length == 0) {
    $('.birth .warn').html('<span class="text-red">태어난 월을 선택하세요.</span>');
  } else if(date.length == 0 || date > 31 || date <= 0) {
    $('.birth .warn').html('<span class="text-red">태어난 일(날짜) 2자리를 정확하게 입력하세요.</span>');
  } else if(isNaN(year * month * date)) {
    // is Not a Number
    $('.birth .warn').html('<span class="text-red">생년월일을 다시 확인해 주세요.</span>');
  } else if(now - year > 100) {
    $('.birth .warn').html('<span class="text-red">과거에서 오셨나요?</span>');
  } else if(nowStamp < birth) {
    $('.birth .warn').html('<span class="text-red">미래에서 오셨군요!</span>');
  } else {
    bitrhveri = true;
    $('.birth .warn').empty();
  }
})


// 성별
$('.gender .inputbox').on('click', function(){
  $('.gender .inputbox').removeClass('btn-primary');
  $('.gender .inputbox input[type="radio"]').prop('checked', false);
  $(this).addClass('btn-primary');
  $(this).children('input[type="radio"]').prop('checked', true);
  genderveri = true;
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


// 주소
// 카카오에서 제공하는 주소찾기 API 활용
function sample6_execDaumPostcode() {
  addressveri = true;
  new daum.Postcode({
      oncomplete: function(data) {
          // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

          // 각 주소의 노출 규칙에 따라 주소를 조합한다.
          // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
          var addr = ''; // 주소 변수
          var extraAddr = ''; // 참고항목 변수

          //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
          if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
              addr = data.roadAddress;
          } else { // 사용자가 지번 주소를 선택했을 경우(J)
              addr = data.jibunAddress;
          }

          // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
          if(data.userSelectedType === 'R'){
              // 법정동명이 있을 경우 추가한다. (법정리는 제외)
              // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
              if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                  extraAddr += data.bname;
              }
              // 건물명이 있고, 공동주택일 경우 추가한다.
              if(data.buildingName !== '' && data.apartment === 'Y'){
                  extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
              }
              // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
              if(extraAddr !== ''){
                  extraAddr = ' (' + extraAddr + ')';
              }
              // 조합된 참고항목을 해당 필드에 넣는다.
              document.getElementById("sample6_extraAddress").value = extraAddr;
          
          } else {
              document.getElementById("sample6_extraAddress").value = '';
          }

          // 우편번호와 주소 정보를 해당 필드에 넣는다.
          document.getElementById('sample6_postcode').value = data.zonecode;
          document.getElementById("sample6_address").value = addr;
          // 커서를 상세주소 필드로 이동한다.
          document.getElementById("sample6_detailAddress").focus();
      }
  }).open();
}



// 가입하기
$('#joinbtn').on('click', function(e){
  if(idveri && pwveri && pwchkveri && nameveri && bitrhveri && genderveri && phoneveri && addressveri && mailveri){
    if ($('.useridinp').attr("check_result") == "fail"){
      alert("아이디 중복체크를 해주세요.");
      $('.useridinp').focus();
      return false;
    }
    $('#join-form').submit();
  } else {
    e.preventDefault();
    $('input').trigger('focusout');
  }
})