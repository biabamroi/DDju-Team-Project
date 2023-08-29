let slideList = document.querySelector('.slide-list');
let slideItems = document.querySelectorAll('.slide-item');

const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');

let currentSlide = 0;


prevBtn.addEventListener('click', function(){
  if(currentSlide > 0 ){
    currentSlide--;
    slideList.style.transform = 'translateX(-' + currentSlide * 800 + 'px)'
    slideList.style.transition = `${0.5}s ease-out`;
    nextBtn.style.display = 'block';
  }
  
  if(currentSlide === 0) {
    prevBtn.style.display = 'none';
  }
});



nextBtn.addEventListener('click', function(){
  if (currentSlide < slideItems.length - 1) {
    currentSlide++;
    slideList.style.transform = `translateX(-${currentSlide * 800}px)`;
    slideList.style.transition = `${0.5}s ease-out`;
    prevBtn.style.display = 'block';
  } 

  if (currentSlide === slideItems.length -1) {
    nextBtn.style.display = 'none';
  } 
});  

