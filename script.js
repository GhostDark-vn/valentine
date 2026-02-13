// ================= UNLOCK MOBILE AUDIO =================
const audio = document.getElementById("bgMusic");
const intro = document.getElementById("intro");

let started = false;

function startShow() {
    if (started) return;
    started = true;

    intro.style.opacity = "0";
    setTimeout(()=> intro.style.display="none",800);

    // chạy nhạc
    audio.volume = 0.85;
    audio.play().catch(()=>{});

    startTyping();
    startStars();
}

// hỗ trợ mọi kiểu chạm mobile
["click","touchstart","pointerdown"].forEach(evt=>{
    window.addEventListener(evt, startShow, { once:true });
});


// ================= TYPEWRITER CHAT =================
const messages = [
"Chào em.",
"Anh không định làm phiền em đâu.",
"Chỉ là hôm nay là một ngày hơi đặc biệt...",
"Nên anh muốn để lại đây một điều nhỏ thôi.",
"Mong rằng dạo này em vẫn ổn.",
"Nếu có lúc mệt...",
"thì nhớ vẫn có người âm thầm quan tâm em.",
"...",
"Happy Valentine's Day"
];

const chatBox = document.getElementById("chatText");

function startTyping(){
    let i=0;
    function next(){
        if(i>=messages.length){
            revealHeart();
            return;
        }
        typeLine(messages[i], ()=>{
            i++;
            setTimeout(next, 1800);
        });
    }
    next();
}

function typeLine(text,done){
    chatBox.innerHTML="";
    let i=0;
    const speed=35;

    const t=setInterval(()=>{
        chatBox.innerHTML+=text[i];
        i++;
        if(i>=text.length){
            clearInterval(t);
            done();
        }
    },speed);
}


// ================= HEART APPEAR =================
function revealHeart(){
    const heart=document.getElementById("heart");
    heart.style.opacity="1";
    heart.style.transform="translate(-50%,-50%) scale(1)";
}


// ================= STARS =================
function startStars(){
    const canvas=document.getElementById("stars");
    const ctx=canvas.getContext("2d");

    function resize(){
        canvas.width=window.innerWidth;
        canvas.height=window.innerHeight;
    }
    resize();
    window.addEventListener("resize",resize);

    const stars=[];
    for(let i=0;i<60;i++){
        stars.push({
            x:Math.random()*canvas.width,
            y:Math.random()*canvas.height,
            r:Math.random()*1.5+0.3,
            a:Math.random(),
            d:Math.random()*0.02
        });
    }

    function draw(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        stars.forEach(s=>{
            s.a+=s.d;
            if(s.a<=0||s.a>=1)s.d*=-1;

            ctx.beginPath();
            ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
            ctx.fillStyle="rgba(255,255,255,"+s.a+")";
            ctx.fill();
        });
        requestAnimationFrame(draw);
    }
    draw();
}
