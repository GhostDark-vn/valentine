const canvas = document.getElementById("stage");
const ctx = canvas.getContext("2d");
const gift = document.getElementById("gift");
const music = document.getElementById("music");

resize();
addEventListener("resize", resize);

function resize(){
canvas.width = innerWidth;
canvas.height = innerHeight;
}

/* ================= PARTICLE ================= */

let particles=[];
let state="idle";
let messageIndex=0;

const messages=[
"Không phải anh vô tình",
"Chỉ là anh chọn nhẹ nhàng hơn một chút",
"Để nếu em không thích",
"Mọi thứ vẫn còn tự nhiên",
"Nhưng nếu em cảm nhận được",
"Thì chắc em hiểu rồi đó"
];

/* create falling star */
function spawnStar(x,y){
particles.push({
x,y,
vx:(Math.random()-0.5)*0.8,
vy:Math.random()*1+0.5,
size:Math.random()*2+1,
alpha:1,
char:"Gia Như"
});
}

/* explosion */
function explode(){
for(let i=0;i<800;i++){
spawnStar(canvas.width/2,canvas.height/2);
}
state="falling";
}

/* gather text */
function formText(text){
particles=[];
const gap=14;
const startX=canvas.width/2 - text.length*gap/2;

for(let i=0;i<text.length;i++){
particles.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
tx:startX+i*gap,
ty:canvas.height/2,
vx:0,
vy:0,
size:2,
alpha:1,
char:text[i],
lock:true
});
}
state="forming";
}

/* heart */
function formHeart(){
particles=[];
const cx=canvas.width/2;
const cy=canvas.height/2;

for(let t=0;t<Math.PI*2;t+=0.02){
const x=16*Math.pow(Math.sin(t),3);
const y=-(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t));

particles.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
tx:cx+x*14,
ty:cy+y*14,
size:2,
char:"✦",
lock:true
});
}
state="heart";
}

/* ================= DRAW ================= */

function draw(){
ctx.fillStyle="rgba(7,11,23,0.25)";
ctx.fillRect(0,0,canvas.width,canvas.height);

particles.forEach(p=>{

if(p.lock){
p.x+=(p.tx-p.x)*0.05;
p.y+=(p.ty-p.y)*0.05;
}else{
p.x+=p.vx;
p.y+=p.vy;
if(p.y>canvas.height) p.y=0;
}

ctx.fillStyle="rgba(255,180,220,.9)";
ctx.font=p.size*10+"px sans-serif";
ctx.fillText(p.char,p.x,p.y);

});

requestAnimationFrame(draw);
}
draw();

/* ================= FLOW ================= */

gift.onclick=async()=>{
gift.style.display="none";

await music.play();
explode();

setTimeout(nextMessage,4000);
};

function nextMessage(){
if(messageIndex<messages.length){
formText(messages[messageIndex++]);
setTimeout(nextMessage,3500);
}else{
formHeart();
}
}
