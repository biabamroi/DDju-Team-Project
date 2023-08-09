let slideList = document.querySelector('.slide-item-box');
let slideItems = document.querySelectorAll('.slide-item');

let prevBtn = document.querySelector('#prev');
let nextBtn = document.querySelector('#next');

let currentSlide = 0;

nextBtn.addEventListener('click', function(){
  if(currentSlide < slideItems.length - 1){
    currentSlide++;
    slideList.style.transform = `translateX(-${currentSlide * 800}px)`
  }
})

prevBtn.addEventListener('click', function(){
  if(currentSlide > 0){
    currentSlide--;
    slideList.style.transform = 'translateX(-' + currentSlide * 800 + 'px)'
  }
})