let today = new Date();
let year = today.getFullYear(); 
var month = ("0" + (1 + today.getMonth())).slice(-2);
var day = ("0" + today.getDate()).slice(-2);

let result = year + month + day;
// console.log(result)

var xhr = new XMLHttpRequest();
var url = 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst'; /*URL*/
var queryParams = '?' + encodeURIComponent('serviceKey') + '='+'6h06MN4YuByhKlHD6J5K5LnZ%2FAc1yC%2FvV3Z0aEAnC4UCGHZ%2FROI337GENBAQ3l7yr5ZO61wNNG%2F6G%2BS3d5M4fA%3D%3D'; /*Service Key*/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1000'); /**/
queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /**/
queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(result); /**/
queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent('0600'); /**/
queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent('55'); /**/
queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent('127'); /**/
xhr.open('GET', url + queryParams);
xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      if(this.status === 200) {  // HTTP 상태 코드가 200(성공)
        // 서버로부터 받은 JSON 형식의 문자열 데이터를 Javascript 객체로 변환
        // responseText : 객체가 서버로부터 응답 받은 문자열이 담긴 변수 
        let responsData = JSON.parse(this.responseText);

        // responsData에서 원하는 데이터만 추출해서 html 표기
        if(responsData.response.body.items) {
          let items = responsData.response.body.items;
          // console.log(typeof(items.item[0].obsrValue));
          // console.log(items.item[3].obsrValue);

          let we = document.querySelector('.we .info');
          if(items.item[0].obsrValue == '0') {
            we.innerHTML = '<i class="fa-solid fa-sun"></i>';
          } else if(items.item[0].obsrValue == '1', '2', '4', '5', '6') {
            // 0 = 맑음, 1,2,4,5,6 = 비, 3,7 = 눈
            we.innerHTML = '<i class="fa-solid fa-cloud-rain"></i>';
          } else {
            we.innerHTML = '<i class="fa-solid fa-snowflake"></i>';
          }

          let temp = document.querySelector('.temp .info');
          temp.innerHTML = items.item[3].obsrValue;

          
        } else {
          console.log('데이터 구조 다시 확인바람')
        }
      } else {
        console.log('HTTP 요청 실패' + this.status)
      }
    }
};

xhr.send('');
