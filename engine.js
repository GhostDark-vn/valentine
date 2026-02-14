const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
const gift = document.querySelector('.box');
const dialog = document.getElementById('dialog');
const music = document.getElementById('music');

canvas.width = innerWidth;
canvas.height = innerHeight;

// falling name particles
const particles = [];

class StarText{
  constructor(){
    this.x = Math.random()*canvas.width;
    this.y = -20;
    this.speed = 0.3 + Math.random()*0.7;
    this.size = 10 + Math.random()*6;
    this.alpha = Math.random()*0.8+0.2;
  }
  update(){ this.y += this.speed; }
  draw(){
    ctx.fillStyle = `rgba(255,255,255,${this.alpha})`;
    ctx.font = `${this.size}px Arial`;
    ctx.fillText('Gia Như',this.x,this.y);
  }
}

function animateBG(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  if(Math.random()<0.12 && particles.length<120)
    particles.push(new StarText());

  particles.forEach((p,i)=>{
    p.update();
    p.draw();
    if(p.y>canvas.height) particles.splice(i,1);
  });

  requestAnimationFrame(animateBG);
}
animateBG();

// dialogue story
const story=[
"Anh đã chuẩn bị cái này khá lâu rồi...",
"Không phải thứ gì lớn lao đâu",
"Chỉ là vài điều anh luôn muốn nói",
"Ở bên em, mọi thứ đều dịu lại",
"Cảm giác rất bình yên",
"Và anh nhận ra...",
"Anh thích em mất rồi 💗"
];

function showStory(i=0){
  if(i>=story.length){heartExplosion();return;}
  dialog.style.opacity=1;
  dialog.textContent=story[i];
  setTimeout(()=>showStory(i+1),2800);
}

// hearts
function heartExplosion(){
  dialog.textContent="Valentine này làm người yêu anh nhé ❤️";
  for(let i=0;i<40;i++){
    setTimeout(()=>{
      const h=document.createElement('div');
      h.className='heart';
      h.innerText='❤';
      h.style.left=Math.random()*100+'%';
      h.style.bottom='10%';
      document.body.appendChild(h);
      setTimeout(()=>h.remove(),4000);
    },i*120);
  }
}

// click gift
gift.onclick=()=>{
  gift.parentElement.remove();
  music.volume=.6;
  music.play().catch(()=>{});
  showStory();
};

// resize
window.onresize=()=>{
  canvas.width=innerWidth;
  canvas.height=innerHeight;
};
