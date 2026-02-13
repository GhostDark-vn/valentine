document.addEventListener("DOMContentLoaded", ()=>{
const audio = document.getElementById("bgm");

/* unlock audio */
function unlock(){
 audio.muted=true;
 audio.play().then(()=>{
   audio.muted=false;
   audio.volume=0;
   let v=0;
   const fade=setInterval(()=>{
     v+=0.02;
     audio.volume=v;
     if(v>=0.8) clearInterval(fade);
   },60);
 });
}
document.addEventListener("click",unlock,{once:true});
document.addEventListener("touchstart",unlock,{once:true});

/* ===== sao ===== */
const starCanvas=document.getElementById("stars");
const ctx=starCanvas.getContext("2d");

function resize(){
 starCanvas.width=innerWidth;
 starCanvas.height=innerHeight;
}
resize();
window.onresize=resize;

const stars=[...Array(40)].map(()=>({
 x:Math.random()*innerWidth,
 y:Math.random()*innerHeight,
 r:Math.random()*1.2,
 a:Math.random()
}));

function drawStars(){
 ctx.clearRect(0,0,starCanvas.width,starCanvas.height);
 stars.forEach(s=>{
   s.a+= (Math.random()-.5)*.02;
   ctx.globalAlpha=Math.max(.15,Math.min(.9,s.a));
   ctx.beginPath();
   ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
   ctx.fillStyle="white";
   ctx.fill();
 });
 requestAnimationFrame(drawStars);
}
drawStars();

/* ===== chat typing ===== */
const lines=[
"Hôm nay chắc em cũng mệt rồi nhỉ.",
"Không cần trả lời đâu.",
"Chỉ mong hôm nay của em dễ chịu hơn một chút.",
"Vậy là đủ rồi."
];

const bubble=document.getElementById("bubble");
let i=0;

function typeLine(text,cb){
 bubble.classList.add("show");
 bubble.innerHTML="";
 let n=0;
 const t=setInterval(()=>{
   bubble.innerHTML+=text[n];
   n++;
   if(n>=text.length){
     clearInterval(t);
     setTimeout(cb,2400);
   }
 },40);
}

function nextLine(){
 if(i<lines.length){
   typeLine(lines[i],()=>{i++;nextLine();});
 }else{
   setTimeout(showHeart,1000);
 }
}

setTimeout(nextLine,1200);

/* ===== HEART 30 PHOTOS ===== */
function heartPos(t){
 return {
  x:16*Math.pow(Math.sin(t),3),
  y:-(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t))
 };
}

function showHeart(){
 const total=30;
 for(let k=0;k<total;k++){
   const img=document.createElement("img");
   img.src=`assets/photos/${k+1}.jpg`;
   img.className="photo";

   document.body.appendChild(img);

   const t=(k/total)*Math.PI*2;
   const p=heartPos(t);

   const scale=12;
   const x=innerWidth/2 + p.x*scale -35;
   const y=innerHeight/2 + p.y*scale -35;

   img.style.left=x+"px";
   img.style.top=y+"px";

   setTimeout(()=>img.classList.add("show"),80*k);
 }
}
});
console.log("script loaded");
