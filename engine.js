document.addEventListener("DOMContentLoaded",()=>{

const canvas=document.getElementById("scene");
const ctx=canvas.getContext("2d");
const gift=document.getElementById("gift");
const music=document.getElementById("bgm");

function resize(){
canvas.width=innerWidth;
canvas.height=innerHeight;
}
resize();
addEventListener("resize",resize);

/* ========= PARTICLE ENGINE ========= */

const COUNT=1400;
let particles=[];

for(let i=0;i<COUNT;i++){
particles.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
tx:Math.random()*canvas.width,
ty:Math.random()*canvas.height,
vx:0,vy:0,
size:1+Math.random()*2,
char:"Gia Như"
});
}

/* physics */
function update(){

ctx.fillStyle="rgba(7,11,23,0.12)";
ctx.fillRect(0,0,canvas.width,canvas.height);

particles.forEach(p=>{

let dx=p.tx-p.x;
let dy=p.ty-p.y;

p.vx+=dx*0.002;
p.vy+=dy*0.002;

p.vx*=0.92;
p.vy*=0.92;

p.x+=p.vx;
p.y+=p.vy;

ctx.fillStyle="rgba(255,170,210,1)";
ctx.shadowBlur=12;
ctx.shadowColor="#ff77aa";
ctx.font=p.size*10+"px sans-serif";
ctx.fillText(p.char,p.x,p.y);

});

requestAnimationFrame(update);
}
update();

/* ========= MORPH FUNCTIONS ========= */

function scatter(){
particles.forEach(p=>{
p.tx=Math.random()*canvas.width;
p.ty=Math.random()*canvas.height;
p.char="Gia Như";
p.size=1.6;
});
}

function textShape(text){

let gap=16;
let start=canvas.width/2-text.length*gap/2;

particles.forEach((p,i)=>{
let c=text[i%text.length];
p.tx=start+(i%text.length)*gap;
p.ty=canvas.height/2;
p.char=c;
p.size=2.6;
});
}

function heartShape(){

let cx=canvas.width/2;
let cy=canvas.height/2;

particles.forEach((p,i)=>{
let t=i/particles.length*Math.PI*2;

let x=16*Math.pow(Math.sin(t),3);
let y=-(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t));

p.tx=cx+x*18;
p.ty=cy+y*18;
p.char="✦";
p.size=2.2;
});
}

/* ========= STORY ========= */

const messages=[
"Không phải anh vô tình",
"Chỉ là anh chọn nhẹ nhàng hơn một chút",
"Để nếu em không thích",
"Mọi thứ vẫn còn tự nhiên",
"Nhưng nếu em cảm nhận được",
"Thì chắc em hiểu rồi đó"
];

const wait=t=>new Promise(r=>setTimeout(r,t));

async function story(){

await wait(1500);

for(let m of messages){
textShape(m);
await wait(3200);
scatter();
await wait(1200);
}

heartShape();
}

/* ========= START ========= */

gift.addEventListener("pointerup",()=>{
gift.style.display="none";
music.currentTime=0;
music.play().catch(()=>{});
story();
},{once:true});

});
