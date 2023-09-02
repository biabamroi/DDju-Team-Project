let profile = [
  {
    img : 'https://avatars.githubusercontent.com/u/132882346?v=4',
    name : 'SEOWOO CHOI',
    txt : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? RepellendusUt pariatur fugit saepe possimus accusamus facere? Repellendus deleniti saepe eum ipsum explicabo porro. Laborum rerum maxime odio, blanditiis molestias aliquam labore.',
    github : 'https://github.com/choiseowu',
    email : 'chltjdn95@nate.com',
  },
  {
    img : 'https://avatars.githubusercontent.com/u/132882429?v=4',
    name : 'JIEUN KO',
    txt : '저는 디디쥬에서 section3, today, contact, 코스대전, api를 맡아서 했습니다초반 기획을 나눠서 기획을 하면서 만들고 오류도 생겨서 잡고 같이 구현하면서 시간을 보냈습니다 api를 할 때 힘들었지만 다 같이 머리를 맞대면서 했습니다 프로젝트 특성상 기간도 짧고 기획도 하고 변동도 많아서 서로 게속 카톡도 수시로 대화도하고 일찍 나와서 회의도 하고 코드도 짜봤습니다 노션에 팀과 나눠서 할 코드도 올려보고 깃허브에서 머지를 할때는 참 어려웠습니다팀프로젝트를 하면서 가장 많이 성장할수 있어서 기억에 남습니다팀원들과 원할게 소통도 잘되어서 기쁩니다 부족한 부분
    ',
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

