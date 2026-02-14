const canvas = document.getElementById("stage");
const ctx = canvas.getContext("2d");
const gift = document.getElementById("gift");
const music = document.getElementById("music");

let W,H;
function resize(){
  W = canvas.width = innerWidth;
  H = canvas.height = innerHeight;
}
resize();
addEventListener("resize", resize);

/* ====================== CONFIG ====================== */

const messages = [
"Không phải anh vô tình",
"Chỉ là anh chọn nhẹ nhàng hơn một chút",
"Để nếu em không thích",
"Mọi thứ vẫn còn tự nhiên",
"Nhưng nếu em cảm nhận được",
"Thì chắc em hiểu rồi đó"
];

const photoImgs=[...document.querySelectorAll("#photos img")];
let photoData=[];
let phase="idle";
let msgIndex=0;
let phaseTime=0;

/* ====================== STAR RAIN ====================== */

function spawnStar(){
  stars.push({
    x:Math.random()*W,
    y:-20,
    speed:0.4+Math.random()*0.7,
    size:10,
    text:"Gia\nNhư",
    alpha:.7+Math.random()*.3
  });
}

setInterval(()=>{
 if(phase!=="idle") spawnStar();
},140);

function drawStars(){
  ctx.font="12px monospace";
  ctx.fillStyle="white";

  stars.forEach(s=>{
    s.y+=s.speed;
    ctx.globalAlpha=s.alpha;
    ctx.fillText("Gia",s.x,s.y);
    ctx.fillText("Như",s.x,s.y+12);
  });

  ctx.globalAlpha=1;
  stars=stars.filter(s=>s.y<H+20);
}

/* ====================== PARTICLE ====================== */

function explode(x,y,count=220){
  for(let i=0;i<count*0.6;i++){
    particles.push({
      x,y,
      vx:(Math.random()-.5)*4,
      vy:(Math.random()-.5)*4,
      life:1
    });
  }
}

function updateParticles(){
  particles.forEach(p=>{
    p.x+=p.vx;
    p.y+=p.vy;
    p.vx*=.98;
    p.vy*=.98;
    p.life-=.015;
  });
  particles=particles.filter(p=>p.life>0);
}

function drawParticles(){

  particles.forEach(p=>{

    if(p.mode==="photo"){
      ctx.drawImage(p.img,p.x-p.size/2,p.y-p.size/2,p.size,p.size);
      return;
    }

    ctx.globalAlpha=p.life??1;
    ctx.fillStyle="rgba(255,180,220,.85)";
    ctx.fillRect(p.x,p.y,2,2);
  });

  ctx.globalAlpha=1;
}

/* ====================== FORM TEXT ====================== */

let textPoints=[];

function createTextPoints(text){
  textPoints=[];
  const off=document.createElement("canvas");
  const octx=off.getContext("2d");
  off.width=W;
  off.height=H;

  octx.fillStyle="white";
  octx.font="bold 46px sans-serif";
  octx.textAlign="center";
  octx.fillText(text,W/2,H/2);

  const data=octx.getImageData(0,0,W,H).data;

  for(let y=0;y<H;y+=6){
    for(let x=0;x<W;x+=6){
      if(data[(y*W+x)*4+3]>150){
        textPoints.push({x,y});
      }
    }
  }

  particles=[];
  textPoints.forEach(p=>{
    particles.push({
      x:Math.random()*W,
      y:Math.random()*H,
      tx:p.x,
      ty:p.y,
      life:1,
      mode:"text"
    });
  });
}

function updateTextFormation(){
  let done=true;
  particles.forEach(p=>{
    p.x+=(p.tx-p.x)*0.06;
    p.y+=(p.ty-p.y)*0.06;
    if(Math.abs(p.tx-p.x)>0.5) done=false;
  });
  return done;
}

/* ====================== HEART ====================== */

function createHeart(){
  particles=[];
  const cx=W/2;
  const cy=H/2;

  let id=0;

  for(let t=0;t<Math.PI*2;t+=0.025){
    const x=16*Math.pow(Math.sin(t),3);
    const y=-(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t));

    const img = photoImgs[id%photoImgs.length];

    particles.push({
      x:Math.random()*W,
      y:Math.random()*H,
      tx:cx+x*13,
      ty:cy+y*13,
      img:img,
      size:22,
      mode:"photo"
    });

    id++;
  }
}

let heartGlow=0;

/* ====================== LOOP ====================== */

function loop(){
  ctx.fillStyle="rgba(5,7,15,.35)";
  ctx.fillRect(0,0,W,H);

  drawStars();

  if(phase==="explode"){
    updateParticles();
    drawParticles();
    if(performance.now()-phaseTime>1400){
      phase="text";
      createTextPoints(messages[msgIndex]);
    }
  }

  else if(phase==="text"){
    if(updateTextFormation()){
      if(performance.now()-phaseTime>2800){
        explode(W/2,H/2,200);
        msgIndex++;
        phaseTime=performance.now();

        if(msgIndex>=messages.length){
          phase="heart";
          createHeart();
        }else{
          createTextPoints(messages[msgIndex]);
        }
      }
    }
    drawParticles();
  }

  else if(phase==="heart"){
    updateTextFormation();
    heartGlow+=0.02;

    ctx.shadowBlur=25+Math.sin(heartGlow)*10;
    ctx.shadowColor="pink";
    ctx.fillStyle="rgba(255,170,210,.9)";
    drawParticles();

    ctx.shadowBlur=0;
    ctx.fillStyle="white";
    ctx.save();
    ctx.shadowBlur=40;
    ctx.shadowColor="#ff7eb6";
    ctx.fillStyle="#ffd6ec";
    ctx.font="56px 'Great Vibes'";
    ctx.textAlign="center";
    ctx.fillText("Happy Valentine's Day",W/2,H/2+140);
    ctx.restore();
  }

  requestAnimationFrame(loop);
}
loop();

/* ====================== START ====================== */

gift.addEventListener("pointerdown", startShow, {once:true});
gift.addEventListener("touchstart", startShow, {once:true});
gift.addEventListener("click", startShow, {once:true});

function startShow(e){

  // ép browser hiểu đây là user gesture
  const p = music.play();
  if(p!==undefined){
    p.then(()=>{}).catch(()=>{});
  }

  music.currentTime = 0;
  music.volume = 1;

  gift.style.display="none";

  explode(W/2,H/2,220);
  phase="explode";
  phaseTime=performance.now();
}
