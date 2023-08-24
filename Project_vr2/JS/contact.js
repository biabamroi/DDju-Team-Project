let profile = [
  {
    img : 'https://avatars.githubusercontent.com/u/132882346?v=4',
    name : 'SEOWOO CHOI',
    txt : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? Repellendus deleniti saepe eum ipsum explicabo porro. Laborum rerum maxime odio, blanditiis molestias aliquam labore.',
    git : 'https://github.com/choiseowu',
    email : 'chldjtn95@nate.com',
    // color : 'rgb(154, 214, 255)',
    // shadow : 'rgba(142, 174, 243, 0.8)'
  },
  {
    img : 'https://avatars.githubusercontent.com/u/132882429?v=4',
    name : 'JI EUN KO',
    txt : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? Repellendus deleniti saepe eum ipsum explicabo porro. Laborum rerum maxime odio, blanditiis molestias aliquam labore.',
    git : 'https://github.com/Ji2unKo',
    email : 'wldnjs4983@naver.com',
    // color : 'rgb(252, 207, 214)',
    // shadow : 'rgba(243, 195, 203, 0.8)'
  },
  {
    img : 'https://avatars.githubusercontent.com/u/132882278?v=4',
    name : 'HANNA OH',
    txt : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? Repellendus deleniti saepe eum ipsum explicabo porro. Laborum rerum maxime odio, blanditiis molestias aliquam labore.',
    git : 'https://github.com/hanna0115',
    email : 'hanna0115@naver.com',
    // color : 'rgb(139, 212, 123)',
    // shadow : 'rgba(162, 223, 148, 0.8)'
  },
  {
    img : 'https://avatars.githubusercontent.com/u/132882475?v=4',
    name : 'KAI',
    txt : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? Repellendus deleniti saepe eum ipsum explicabo porro. Laborum rerum maxime odio, blanditiis molestias aliquam labore.',
    git : 'https://github.com/biabamroi',
    email : 'biabamroi@gmail.com',
    // color : 'rgb(164, 130, 184)',
    // shadow : 'rgba(204, 167, 226, 0.8)'
  },
]

let othersBtn = document.querySelectorAll('.others button');

othersBtn.forEach(function(btn, index){
  btn.addEventListener('click', function(){
    othersBtn.forEach(function(item){
      item.classList.remove('on');
    })
    btn.classList.add('on');
    // document.querySelector('.wrapper').style.backgroundColor = profile[index].color
    document.querySelector('.first h1').style.display = 'none'
    document.querySelector('.profile-wrapper').style.display = 'block'

    document.querySelector('.profile img').src = profile[index].img;
    document.querySelector('.profile img').alt = profile[index].title;
    // document.querySelector('.profile img').style.boxShadow = `5px 15px 30px ${profile[index].shadow}`
    document.querySelector('.profile h1').innerHTML = profile[index].name;
    document.querySelector('.txt p').innerHTML = profile[index].txt;

    let liTag = document.querySelectorAll('.contact li');
    liTag[0].querySelector('a').href = profile[index].git;
    liTag[1].querySelector('span').innerHTML = profile[index].email;
  })
})



document.querySelector('.others').addEventListener('click', function(){
  this.classList.add('active');
  // document.querySelector('video').style.display = 'none'
})