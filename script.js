const messages = [
    "Hôm nay chắc em cũng mệt rồi nhỉ.",
    "Nhớ nghỉ ngơi sớm một chút nhé.",
    "Không cần trả lời đâu.",
    "Chỉ là có người vẫn chúc em ngủ ngon thôi.",
    "Vậy là đủ rồi."
];

let i = 0;
const msg = document.getElementById("message");
const btn = document.getElementById("nextBtn");
const card = document.getElementById("card");

function showText(text){
    msg.classList.remove("visible");
    setTimeout(()=>{
        msg.innerText = text;
        msg.classList.add("visible");
    },250);
}

showText(messages[0]);

btn.onclick = ()=>{
    i++;
    card.classList.add("show");
    setTimeout(()=>card.classList.remove("show"),300);

    if(i < messages.length){
        showText(messages[i]);
    }else{
        btn.style.display="none";
        setTimeout(startHeart,1200);
    }
};



/* ================= HEART PHOTO EFFECT ================= */

const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const images = [];
const total = 30;

for(let j=1;j<=total;j++){
    const img = new Image();
    img.src = `assets/photos/${j}.jpg`;
    images.push(img);
}

function heartPosition(t){
    const x = 16 * Math.pow(Math.sin(t),3);
    const y = -(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t));
    return {x,y};
}

function startHeart(){
    card.style.opacity = 0;

    const particles = [];

    for(let i=0;i<images.length;i++){
        const t = Math.random()*Math.PI*2;
        const pos = heartPosition(t);

        particles.push({
            img:images[i],
            x:canvas.width/2,
            y:canvas.height/2,
            tx:canvas.width/2 + pos.x*20,
            ty:canvas.height/2 + pos.y*20,
            size:40+Math.random()*25
        });
    }

    animate(particles);
}

function animate(particles){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    particles.forEach(p=>{
        p.x += (p.tx - p.x)*0.04;
        p.y += (p.ty - p.y)*0.04;

        ctx.drawImage(p.img,p.x,p.y,p.size,p.size);
    });

    requestAnimationFrame(()=>animate(particles));
}
