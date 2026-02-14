const intro = document.getElementById("intro");
const music = document.getElementById("bgMusic");
const bubble = document.getElementById("chatBox");
const ending = document.getElementById("ending");
const heartBox = document.getElementById("heartContainer");

let started=false;

intro.onclick = () =>{
if(started) return;
started=true;

intro.style.display="none";
music.play().catch(()=>{});

startSky();
startStory();
};

/* ================= SKY ================= */
function startSky(){
const canvas=document.getElementById("sky");
const ctx=canvas.getContext("2d");

function resize(){
canvas.width=innerWidth;
canvas.height=innerHeight;
}
resize();
addEventListener("resize",resize);

let stars=[];
for(let i=0;i<180;i++){
stars.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
r:Math.random()*1.5,
a:Math.random(),
d:Math.random()*0.02
});
}

function draw(){
ctx.fillStyle="#02030a";
ctx.fillRect(0,0,canvas.width,canvas.height);

stars.forEach(s=>{
s.a+=s.d;
if(s.a>1||s.a<0)s.d*=-1;
ctx.beginPath();
ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
ctx.fillStyle="rgba(255,255,255,"+s.a+")";
ctx.fill();
});

requestAnimationFrame(draw);
}
draw();
}

/* ================= STORY ================= */

const messages=[
"Hôm nay chắc mệt rồi ha ",
"Có thể em đã nhận quà hay nhiều lời chúc.",
"Chỉ là hôm nay hơi đặc biệt...",
"Anh chỉ muốn chúc em ngủ ngon.",
"Và có giấc mơ thậy đẹp.",
"Và nếu em đang mỉm cười...",
"Thì anh thấy đủ rồi."
];

async function startStory(){
for(const text of messages){
await showText(text);
await wait(1400);
}
showHeart();
}

function showText(text){
return new Promise(res=>{
bubble.style.opacity=1;
bubble.style.transform="translateY(0)";
let i=0;
bubble.innerHTML="";
let t=setInterval(()=>{
bubble.innerHTML+=text[i];
i++;
if(i>=text.length){
clearInterval(t);
setTimeout(res,900);
}
},35);
});
}

function wait(ms){return new Promise(r=>setTimeout(r,ms));}

/* ================= HEART ================= */

function showHeart(){
bubble.style.opacity=0;

const heart=document.createElement("div");
heart.className="heart";
heartBox.appendChild(heart);

const total=30;
const R=130;

for(let i=0;i<total;i++){
const t=Math.PI*2*i/total;
const x=16*Math.pow(Math.sin(t),3);
const y=-(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t));

const img=document.createElement("img");
img.src=`./assets/photos/${i+1}.jpg`;
img.style.left=160+x*7+"px";
img.style.top=160+y*7+"px";
heart.appendChild(img);
}

setTimeout(()=>{
heart.style.opacity=1;
heart.style.transform="scale(1)";
},200);

setTimeout(()=>{
ending.style.opacity=1;
},2500);
}
