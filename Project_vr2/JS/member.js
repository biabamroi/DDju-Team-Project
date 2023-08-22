let profile = [
  {
    img : 'https://avatars.githubusercontent.com/u/132882346?v=4',
    name : 'SEOWOO CHOI',
    txt : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? Repellendus deleniti saepe eum ipsum explicabo porro. Laborum rerum maxime odio, blanditiis molestias aliquam labore.',
    git : 'https://github.com/choiseowu',
    email : 'chldjtn95@nate.com',
  },
  {
    img : 'https://avatars.githubusercontent.com/u/132882429?v=4',
    name : 'JI EUN KO',
    txt : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? Repellendus deleniti saepe eum ipsum explicabo porro. Laborum rerum maxime odio, blanditiis molestias aliquam labore.',
    git : 'https://github.com/Ji2unKo',
    email : 'wldnjs4983@naver.com',
  },
  {
    img : 'https://avatars.githubusercontent.com/u/132882278?v=4',
    name : 'HANNA OH',
    txt : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? Repellendus deleniti saepe eum ipsum explicabo porro. Laborum rerum maxime odio, blanditiis molestias aliquam labore.',
    git : 'https://github.com/hanna0115',
    email : 'wldnjs4983@naver.com',
  },
  {
    img : 'https://avatars.githubusercontent.com/u/132882475?v=4',
    name : 'JI EUN PRAK',
    txt : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? Repellendus deleniti saepe eum ipsum explicabo porro. Laborum rerum maxime odio, blanditiis molestias aliquam labore.',
    git : 'https://github.com/biabamroi',
    email : 'wldnjs4983@naver.com',
  },
]

let boxItems = document.querySelectorAll('.profile');

boxItems.forEach(function(item, index){
  item.querySelector('img').src = profile[index].img;
  item.querySelector('.profile h1').innerHTML = profile[index].name;
  document.querySelector('.txt p').innerHTML = profile[index].txt;

  let liTag = document.querySelectorAll('.contact li');
  document.querySelector('.contact a').href = profile[index].git;
  liTag[1].querySelector('span').innerHTML = profile[index].email;
})

let othersBtn = document.querySelectorAll('.others button');

othersBtn.forEach(function(btn){
  btn.addEventListener('click',function(item, index){
  })
})