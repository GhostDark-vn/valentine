/* =========================
   CINEMATIC VALENTINE ENGINE
   stable mobile version
========================= */

const canvas = document.getElementById("stage");
const ctx = canvas.getContext("2d");
const gift = document.getElementById("gift");
const music = document.getElementById("music");

let DPR = window.devicePixelRatio || 1;
let W, H;

function resize(){
    W = canvas.width = innerWidth * DPR;
    H = canvas.height = innerHeight * DPR;
    canvas.style.width = innerWidth+"px";
    canvas.style.height = innerHeight+"px";
}
resize();
addEventListener("resize", resize);


/* =========================
   PARTICLE SYSTEM
========================= */

class Particle{
    constructor(x,y){
        this.x=x; this.y=y;
        this.tx=x; this.ty=y;
        this.vx=0; this.vy=0;
        this.life=1;
        this.size=1+Math.random()*1.5;
    }
    update(){
        let dx=this.tx-this.x;
        let dy=this.ty-this.y;
        this.vx+=dx*0.02;
        this.vy+=dy*0.02;
        this.vx*=0.88;
        this.vy*=0.88;
        this.x+=this.vx;
        this.y+=this.vy;
    }
    draw(){
        ctx.fillStyle="rgba(255,180,220,0.9)";
        ctx.fillRect(this.x,this.y,this.size,this.size);
    }
}

let particles=[];
for(let i=0;i<1600;i++){
    particles.push(new Particle(Math.random()*W,Math.random()*H));
}

/* =========================
   TEXT → POINTS
========================= */

function getTextPoints(text,size){
    const off=document.createElement("canvas");
    const octx=off.getContext("2d");
    off.width=W; off.height=H;

    octx.fillStyle="#fff";
    octx.textAlign="center";
    octx.font=`bold ${size}px sans-serif`;
    octx.fillText(text,W/2,H/2);

    const data=octx.getImageData(0,0,W,H).data;
    let pts=[];
    for(let y=0;y<H;y+=6){
        for(let x=0;x<W;x+=6){
            if(data[(y*W+x)*4+3]>150) pts.push([x,y]);
        }
    }
    return pts;
}

/* =========================
   HEART SHAPE
========================= */

function getHeartPoints(){
    let pts=[];
    let scale=Math.min(W,H)/40;

    for(let t=0;t<Math.PI*2;t+=0.02){
        let x=16*Math.pow(Math.sin(t),3);
        let y=-(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t));
        pts.push([W/2+x*scale, H/2+y*scale]);
    }
    return pts;
}

/* =========================
   MORPH FUNCTION
========================= */

function morphTo(points){
    for(let i=0;i<particles.length;i++){
        let p=particles[i];
        let pt=points[i%points.length];
        p.tx=pt[0];
        p.ty=pt[1];
    }
}

/* =========================
   METEOR RAIN "GIA NHƯ"
========================= */

function meteorRain(){
    setInterval(()=>{
        let x=Math.random()*W;
        let y=-50;

        for(let i=0;i<16;i++){
            let idx=Math.floor(Math.random()*particles.length);
            let p=particles[idx];
            p.x=x;
            p.y=y-i*18;
            p.vy=3+Math.random()*2;
            p.vx=-1;
        }
    },120);
}

/* =========================
   STORY TIMELINE
========================= */

const lines=[
"Chúc em một ngày thật dịu dàng",
"Mong những điều tốt đẹp sẽ tìm đến em",
"Có những người đến không ồn ào",
"Nhưng ở lại rất lâu"
];

async function story(){
    meteorRain();

    for(let line of lines){
        morphTo(getTextPoints(line,80));
        await wait(4200);

        explode();
        await wait(1200);
    }

    morphTo(getHeartPoints());
    await wait(3500);

    morphTo(getTextPoints("Happy Valentine's Day",90));
}

/* =========================
   EXPLOSION
========================= */

function explode(){
    for(let p of particles){
        p.vx+=(Math.random()-0.5)*25;
        p.vy+=(Math.random()-0.5)*25;
    }
}

/* =========================
   LOOP
========================= */

function loop(){
    ctx.fillStyle="rgba(0,0,0,0.25)";
    ctx.fillRect(0,0,W,H);

    particles.forEach(p=>{
        p.update();
        p.draw();
    });

    requestAnimationFrame(loop);
}
loop();

/* =========================
   START
========================= */

gift.addEventListener("click",async ()=>{
    gift.style.display="none";
    await music.play().catch(()=>{});
    story();
});

function wait(t){return new Promise(r=>setTimeout(r,t));}
