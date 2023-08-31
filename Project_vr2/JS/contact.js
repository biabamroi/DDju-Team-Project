let profile = [
  {
    img : 'https://avatars.githubusercontent.com/u/132882346?v=4',
    name : 'SEOWOO CHOI',
    txt : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? Repellendus deleniti saepe eum ipsum explicabo porro. Laborum rerum maxime odio, blanditiis molestias aliquam labore.',
    github : 'https://github.com/choiseowu',
    email : 'chldjtn95@nate.com',
  },
  {
    img : 'https://avatars.githubusercontent.com/u/132882429?v=4',
    name : 'JIEUN KO',
    txt : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? Repellendus deleniti saepe eum ipsum explicabo porro. Laborum rerum maxime odio, blanditiis molestias aliquam labore.',
    github : 'https://github.com/Ji2unKo',
    email : 'wldnjs4983@naver.com',
  },
  {
    img : 'https://avatars.githubusercontent.com/u/132882278?v=4',
    name : 'HANNA OH',
    txt : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? Repellendus deleniti saepe eum ipsum explicabo porro. Laborum rerum maxime odio, blanditiis molestias aliquam labore.',
    github : 'https://github.com/hanna0115',
    email : 'hanna0115@naver.com',
  },
  {
    img : 'https://avatars.githubusercontent.com/u/132882475?v=4',
    name : 'KAI',
    txt : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? Repellendus deleniti saepe eum ipsum explicabo porro. Laborum rerum maxime odio, blanditiis molestias aliquam labore.',
    github : 'https://github.com/biabamroi',
    email : 'biabamroi@gmail.com',
  },
]


let othersBtn = document.querySelectorAll('.others-btn button');

othersBtn.forEach(function(btn, index){
  btn.addEventListener('click', function(){
    othersBtn.forEach(function(item){
      item.classList.remove('on');
    })
    btn.classList.add('on');
    document.querySelector('.profile img').src = profile[index].img;
    document.querySelector('.profile img').alt = profile[index].title;
    document.querySelector('.profile h1').innerHTML = profile[index].name;
    document.querySelector('.txt p').innerHTML = profile[index].txt;

    let liTag = document.querySelectorAll('.contact li');
    liTag[0].querySelector('a').href = profile[index].github;
    liTag[1].querySelector('span').innerHTML = profile[index].email;
  })
})


document.querySelector('.profiles-btn').addEventListener('click', function(){
  document.querySelector('video').style.opacity = '.5'
  document.querySelector('video').muted = true;
  document.querySelector('.profile-wrapper').style.display = 'flex';
})

