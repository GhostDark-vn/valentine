const tap = document.getElementById("tapToStart");
const audio = document.getElementById("bgm");

document.body.addEventListener("click", startAudio, { once:true });
document.body.addEventListener("touchstart", startAudio, { once:true });

function startAudio(){
    audio.volume = 80;
    audio.play();

    // fade in
    let v=0;
    const fade=setInterval(()=>{
        v+=0.02;
        audio.volume=v;
        if(v>=0.7) clearInterval(fade);
    },60);
}

const messages = [
"Hôm nay chắc em cũng mệt rồi nhỉ.",
"Không cần trả lời đâu.",
"Chỉ mong hôm nay của em dễ chịu hơn một chút.",
"Vậy là đủ rồi."
];

const msgEl = document.getElementById("message");
const btn = document.getElementById("nextBtn");
const card = document.getElementById("card");

let step = 0;

card.classList.add("show");
msgEl.innerText = messages[0];

btn.onclick = () => {
    step++;
    if(step < messages.length){
        msgEl.innerText = messages[step];
    }else{
        card.style.opacity = 0;
        btn.style.display="none";
        setTimeout(showHeart,800);
    }
};

/* ====== TRÁI TIM ====== */

function showHeart(){

    const positions = [
        {x:50,y:35},
        {x:35,y:55},
        {x:65,y:55},
        {x:50,y:75}
    ];

    for(let i=1;i<=4;i++){
        let img=document.createElement("img");
        img.src=`assets/photos/${i}.jpg`;
        img.className="photo";

        // vị trí bắt đầu ngoài màn hình
        img.style.left=Math.random()*100+"vw";
        img.style.top="-20vh";

        document.body.appendChild(img);

        setTimeout(()=>{
            img.classList.add("fly");
            img.style.left=positions[i-1].x+"vw";
            img.style.top=positions[i-1].y+"vh";
        },400*i);

        // ghép tim
        setTimeout(()=>{
            img.classList.add("heart");
        },2200);
    }

    // glow
    const glow=document.createElement("div");
    glow.className="glow";
    glow.style.left="calc(50vw - 130px)";
    glow.style.top="calc(55vh - 115px)";
    document.body.appendChild(glow);

    setTimeout(()=>glow.classList.add("show"),2600);
}
