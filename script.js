
const intro = document.getElementById("intro");
const music = document.getElementById("music");
const msg = document.getElementById("message");
const heart = document.getElementById("heart");
const ending = document.getElementById("ending");

/* ---------------- START SHOW ---------------- */
intro.addEventListener("click", async () => {
    intro.style.display="none";

    music.volume = 0.85;
    await music.play();

    startStars();
    startMessages();
});

/* ---------------- TYPING ---------------- */
const texts = [
"Anh không giỏi nói chuyện lắm...",
"Nhưng mỗi lần nhìn thấy em",
"Ngày bình thường cũng trở nên dễ chịu hơn",
"Có lẽ em không nhận ra",
"Nhưng em thật sự rất đặc biệt",
"Chúc em một Valentine thật dịu dàng 🌙"
];

async function typeLine(text){
    msg.textContent="";
    for(let i=0;i<text.length;i++){
        msg.textContent += text[i];
        await new Promise(r=>setTimeout(r,35));
    }
}

async function startMessages(){
    for(let t of texts){
        await typeLine(t);
        await new Promise(r=>setTimeout(r,2200));
    }

    createHeart();
    heart.classList.add("show");

    setTimeout(()=>{
        ending.classList.add("show");
    },4000);
}

/* ---------------- HEART ---------------- */
function createHeart(){
    const total = 30;
    const size = heart.clientWidth/2;

    for(let i=0;i<total;i++){
        const t = Math.PI*2*i/total;

        const x = 16*Math.pow(Math.sin(t),3);
        const y = -(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t));

        const img = document.createElement("img");
        img.src=`./assets/photos/${i+1}.jpg`;
        img.className="heart-img";

        const px = size + x*size/18 - 30;
        const py = size + y*size/18 - 30;

        img.style.left=px+"px";
        img.style.top=py+"px";

        heart.appendChild(img);
    }
}

/* ---------------- STARS ---------------- */
function startStars(){
const canvas=document.getElementById("stars");
const ctx=canvas.getContext("2d");

let w,h;
function resize(){
w=canvas.width=window.innerWidth;
h=canvas.height=window.innerHeight;
}
resize();
window.onresize=resize;

const stars=[];
for(let i=0;i<120;i++){
stars.push({
x:Math.random()*w,
y:Math.random()*h,
r:Math.random()*1.2,
o:Math.random(),
v:Math.random()*0.02
});
}

function draw(){
ctx.clearRect(0,0,w,h);
for(let s of stars){
s.o+=s.v;
if(s.o>1||s.o<0)s.v*=-1;
ctx.globalAlpha=s.o;
ctx.beginPath();
ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
ctx.fillStyle="white";
ctx.fill();
}
requestAnimationFrame(draw);
}
draw();
}
