const intro = document.getElementById("intro");
const audio = document.getElementById("bgm");
const textBox = document.getElementById("textBox");
const heart = document.getElementById("heartCanvas");

let started = false;

/* ================= CLICK MỞ TRANG ================= */

intro.addEventListener("click", async () => {
  if (started) return;
  started = true;

  // play nhạc NGAY trong user gesture (quan trọng)
  try {
    audio.currentTime = 0;
    audio.volume = 1;
    await audio.play();
    audio.loop = true;
  } catch (e) {
    console.log("Autoplay blocked:", e);
  }

  // ẩn intro
  intro.classList.add("fade-out");

  setTimeout(() => {
    intro.style.display = "none";
    startShow();
  }, 700);
});


/* ================= CHẠY TOÀN BỘ TRẢI NGHIỆM ================= */

async function startShow() {
  await typeStory();
  revealHeart();
}


/* ================= HIỆU ỨNG GÕ CHỮ ================= */

const messages = [
  "Hôm nay chỉ là một ngày bình thường...",
  "nhưng anh nghĩ vẫn nên gửi em điều gì đó.",
  "Không phải tỏ tình.",
  "Cũng không phải làm em khó xử.",
  "Chỉ là muốn em biết...",
  "có một người vẫn luôn âm thầm quan tâm em.",
  "Vậy thôi."
];

async function typeStory() {
  textBox.style.opacity = 1;

  for (let msg of messages) {
    await typeLine(msg);
    await wait(1400);
    textBox.innerHTML = "";
  }

  // câu cuối
  await typeLine("Happy Valentine's Day");
}

function typeLine(text) {
  return new Promise(resolve => {
    let i = 0;
    textBox.innerHTML = "";

    const typing = setInterval(() => {
      textBox.innerHTML += text.charAt(i);
      i++;
      if (i >= text.length) {
        clearInterval(typing);
        resolve();
      }
    }, 38);
  });
}

function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}


/* ================= TRÁI TIM ẢNH ================= */

function revealHeart() {
  heart.classList.add("show");
  createHeartParticles();
}


/* ================= GHÉP ẢNH THÀNH TRÁI TIM ================= */

function createHeartParticles() {
  const container = heart;
  const images = 30; // số ảnh bạn upload: 1.jpg -> 30.jpg

  const width = window.innerWidth;
  const height = window.innerHeight;

  const scale = Math.min(width, height) / 35;

  for (let i = 0; i < 420; i++) {
    const t = Math.PI * 2 * (i / 420);

    // công thức trái tim
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t);

    const img = document.createElement("img");
    img.src = `images/${(i % images) + 1}.jpg`;
    img.className = "heart-img";

    img.style.left = width / 2 + x * scale + "px";
    img.style.top = height / 2 - y * scale + "px";

    img.style.animationDelay = (i * 0.008) + "s";

    container.appendChild(img);
  }
}const lines=["Hôm nay chắc em cũng mệt rồi nhỉ.","Không cần trả lời đâu.","Chỉ mong hôm nay của em dễ chịu hơn một chút.","Vậy là đủ rồi."]; const bubble=document.getElementById("bubble");let i=0;

function typeLine(text,cb){bubble.classList.add("show");bubble.innerHTML="";let n=0;const t=setInterval(()=>{bubble.innerHTML+=text[n];n++;if(n>=text.length){clearInterval(t);setTimeout(cb,2400);}},40);} function nextLine(){if(i<lines.length){typeLine(lines[i],()=>{i++;nextLine();});}else{setTimeout(showHeart,1000);}} setTimeout(nextLine,1200);

function heartPos(t){return{x:16Math.pow(Math.sin(t),3),y:-(13Math.cos(t)-5Math.cos(2t)-2Math.cos(3t)-Math.cos(4*t))};}

function showHeart(){const total=30;const centerX=window.innerWidth/2;const centerY=window.innerHeight/2;const size=Math.min(window.innerWidth,window.innerHeight)/28;for(let k=0;k<total;k++){const img=document.createElement("img");img.src=assets/photos/${k+1}.jpg;img.className="photo";document.body.appendChild(img);const t=(k/total)Math.PI2;const p=heartPos(t);const x=centerX+p.xsize-35;const y=centerY+p.ysize-35;img.style.left=x+"px";img.style.top=y+"px";setTimeout(()=>img.classList.add("show"),70*k);}createGlow(centerX,centerY);setTimeout(showEnding,2800);}

function createGlow(x,y){const glow=document.createElement("div");glow.className="heartGlow";glow.style.left=x+"px";glow.style.top=y+"px";document.body.appendChild(glow);}

function showEnding(){const text=document.createElement("div");text.id="ending";text.innerText="Happy Valentine's Day";document.body.appendChild(text);}

});background:rgba(255,255,255,.06);
backdrop-filter:blur(14px);
border-radius:18px;
padding:18px 22px;
line-height:1.6;
font-size:15px;
opacity:0;
transform:translateY(20px);
transition:1s;
}

#bubble.show{
opacity:1;
transform:translateY(0);
}

/* tim */
#heartCanvas{
position:fixed;
inset:0;
pointer-events:none;
}

/* ảnh tim */
.photo{
position:absolute;
width:70px;
height:70px;
object-fit:cover;
border-radius:12px;
opacity:0;
transform:scale(.3);
transition:1.8s cubic-bezier(.19,1,.22,1);
box-shadow:0 10px 30px rgba(0,0,0,.5);
}

.photo.show{
opacity:1;
transform:scale(1);
}

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

 const centerX = window.innerWidth/2;
 const centerY = window.innerHeight/2;

 const size = Math.min(window.innerWidth, window.innerHeight) / 28;

 for(let k=0;k<total;k++){

   const img=document.createElement("img");
   img.src=`assets/photos/${k+1}.jpg`;
   img.className="photo";

   document.body.appendChild(img);

   const t=(k/total)*Math.PI*2;
   const p=heartPos(t);

   const x=centerX + p.x*size -35;
   const y=centerY + p.y*size -35;

   img.style.left=x+"px";
   img.style.top=y+"px";

   setTimeout(()=>{
     img.classList.add("show");
   },70*k);
 }

 createGlow(centerX,centerY);
}
 function createGlow(x,y){
 const glow=document.createElement("div");
 glow.className="heartGlow";
 glow.style.left=x+"px";
 glow.style.top=y+"px";
 document.body.appendChild(glow);
}
 
});
console.log("script loaded");
