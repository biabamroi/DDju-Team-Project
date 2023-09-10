// .gnb-item hover시 sub-menu slide up & down
$('.gnb-item').hover(function(){
  $(this).find('.sub').stop().slideDown(500);
  $(this).find('a').addClass('on');
}, function(){
  $(this).find('.sub').stop().slideUp(500);
  $(this).find('a').removeClass('on');
})



// 로그인 
window.addEventListener('DOMContentLoaded', () => {
  // 로그인 상태를 가져오는 비동기 함수 호출
  getUserLoggedInStatus()
    .then((userLoggedIn) => {
      // 가져온 로그인 상태에 따라 버튼을 숨기거나 표시
      // const mymenu = $('.mymenu');
      // const loginBtn = $('.login-btn');

      if (userLoggedIn) {
        $('.user-menu-btn').addClass('login');
        // mymenu.css('display', 'flex');
        // loginBtn.css('display', 'none');
      } else {
        $('.user-menu-btn').removeClass('login');
        // mymenu.css('display', 'none');
        // loginBtn.css('display', 'block');
      }
    })
    .catch((error) => {
      console.error('로그인 상태를 가져오는 중에 오류 발생:', error);
    });
});

// 서버로부터 로그인 상태를 가져오는 비동기 함수
async function getUserLoggedInStatus() {
  try {
    const response = await fetch('/get-user-status'); // 서버에서 로그인 상태를 반환하는 엔드포인트
    
    if (!response.ok) {
      // 서버에서 오류 응답을 받았을 경우 처리
      throw new Error(`서버 응답 오류: ${response.status}`);
    }

    const data = await response.json();
    return data.userLoggedIn; // 서버에서 반환한 로그인 상태를 반환
  } catch (error) {
    throw error;
  }
}