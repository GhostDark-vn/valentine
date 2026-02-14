const canvas = document.getElementById("stage");
const ctx = canvas.getContext("2d");
const gift = document.getElementById("gift");
const music = document.getElementById("music");

let W,H,DPR;
function resize(){
DPR = window.devicePixelRatio || 1;
W = canvas.width = innerWidth*DPR;
H = canvas.height = innerHeight*DPR;
canvas.style.width=innerWidth+"px";
canvas.style.height=innerHeight+"px";
ctx.setTransform(DPR,0,0,DPR,0,0);
}
resize();
addEventListener("resize",resize);

//////////////////////////////////////////////////
// STATE MACHINE (giải quyết 90% bug bản cũ)
//////////////////////////////////////////////////

const STATE={
IDLE:0,
RAIN:1,
FORM_TEXT:2,
BREAK:3,
HEART:4
}
let state=STATE.IDLE;
let stateTime=0;

//////////////////////////////////////////////////
// PARTICLE
//////////////////////////////////////////////////

class Star{
constructor(x,y){
this.x=x;this.y=y;
this.vy=0.6+Math.random()*0.8;
this.alpha=.2+Math.random()*.8;
this.size=8+Math.random()*6;
}
update(){
this.y+=this.vy;
if(this.y>innerHeight+20) this.y=-20;
}
draw(){
ctx.globalAlpha=this.alpha;
ctx.fillStyle="#fff";
ctx.font=this.size+"px sans-serif";
ctx.fillText("Gia\nNhư",this.x,this.y);
}
}

let rain=[];
function createRain(){
rain=[];
for(let i=0;i<90;i++){
rain.push(new Star(Math.random()*innerWidth,Math.random()*innerHeight));
}
}

//////////////////////////////////////////////////
// TEXT FORMATION PARTICLES
//////////////////////////////////////////////////

class P{
constructor(x,y){
this.x=Math.random()*innerWidth;
this.y=Math.random()*innerHeight;
this.tx=x;this.ty=y;
this.v=0.07;
}
update(){
this.x+=(this.tx-this.x)*this.v;
this.y+=(this.ty-this.y)*this.v;
}
draw(){
ctx.fillStyle="#fff";
ctx.fillRect(this.x,this.y,2,2);
}
}

let particles=[];
let messageIndex=0;

const messages=[
"Anh không biết nên gọi đây là gì",
"Chỉ là mỗi ngày đều muốn nói chuyện với em",
"Có những lúc rất bình thường",
"Nhưng lại nhớ em rất nhiều",
"Và chắc em cũng cảm nhận được rồi"
];

function textToPoints(text){
let off=document.createElement("canvas");
let octx=off.getContext("2d");
off.width=innerWidth;
off.height=200;

octx.fillStyle="#fff";
octx.textAlign="center";
octx.font="40px sans-serif";
octx.fillText(text,off.width/2,100);

let data=octx.getImageData(0,0,off.width,200).data;
let pts=[];
for(let y=0;y<200;y+=6)
for(let x=0;x<off.width;x+=6){
if(data[(y*off.width+x)*4+3]>150)
pts.push([x,innerHeight/2-100+y]);
}
return pts;
}

function formText(text){
particles=[];
let pts=textToPoints(text);
for(let p of pts) particles.push(new P(p[0],p[1]));
state=STATE.FORM_TEXT;
stateTime=0;
}

//////////////////////////////////////////////////
// HEART
//////////////////////////////////////////////////

function formHeart(){
particles=[];
for(let i=0;i<1200;i++){
let t=Math.random()*Math.PI*2;
let x=16*Math.pow(Math.sin(t),3);
let y=13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t);
x*=15;y*=-15;
particles.push(new P(innerWidth/2+x,innerHeight/2+y));
}
state=STATE.HEART;
stateTime=0;
}

//////////////////////////////////////////////////
// CLICK START
//////////////////////////////////////////////////

gift.onclick=()=>{
gift.style.display="none";
music.play().catch(()=>{});
createRain();
state=STATE.RAIN;
};

//////////////////////////////////////////////////
// LOOP
//////////////////////////////////////////////////

function update(dt){
stateTime+=dt;

if(state===STATE.RAIN && stateTime>3){
formText(messages[0]);
}

if(state===STATE.FORM_TEXT && stateTime>2.5){
state=STATE.BREAK;
stateTime=0;
}

if(state===STATE.BREAK && stateTime>1){
messageIndex++;
if(messageIndex<messages.length)
formText(messages[messageIndex]);
else formHeart();
}
}

function draw(){
ctx.fillStyle="rgba(0,0,0,.25)";
ctx.fillRect(0,0,innerWidth,innerHeight);

if(state>=STATE.RAIN){
for(let s of rain){s.update();s.draw();}
}

if(state>=STATE.FORM_TEXT){
for(let p of particles){p.update();p.draw();}
}

if(state===STATE.HEART){
ctx.fillStyle="#fff";
ctx.font="30px sans-serif";
ctx.textAlign="center";
ctx.fillText("Happy Valentine's Day",innerWidth/2,innerHeight/2+120);
}
}

let last=0;
function loop(t){
let dt=(t-last)/1000;
last=t;
update(dt);
draw();
requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
