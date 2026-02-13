document.addEventListener("DOMContentLoaded",()=>{

const audio=document.getElementById("bgm"); const intro=document.getElementById("intro");

function unlock(){ audio.muted=true; audio.play().then(()=>{ audio.muted=false; let v=0;audio.volume=0; const fade=setInterval(()=>{v+=0.02;audio.volume=v;if(v>=0.8)clearInterval(fade);},60); intro.style.opacity=0;setTimeout(()=>intro.remove(),800); }); } document.addEventListener("click",unlock,{once:true}); document.addEventListener("touchstart",unlock,{once:true});

const starCanvas=document.getElementById("stars"); const ctx=starCanvas.getContext("2d"); function resize(){starCanvas.width=innerWidth;starCanvas.height=innerHeight;}resize();window.onresize=resize;

const stars=[...Array(60)].map(()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()1.5+.2,speed:Math.random()0.02+.005,phase:Math.random()Math.PI2})); function drawStars(){ctx.clearRect(0,0,starCanvas.width,starCanvas.height);stars.forEach(s=>{s.phase+=s.speed;const alpha=(Math.sin(s.phase)+1)/2;ctx.globalAlpha=.15+alpha.85;ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI2);ctx.fillStyle="white";ctx.fill();});requestAnimationFrame(drawStars);}drawStars();

const lines=["Hôm nay chắc em cũng mệt rồi nhỉ.","Không cần trả lời đâu.","Chỉ mong hôm nay của em dễ chịu hơn một chút.","Vậy là đủ rồi."]; const bubble=document.getElementById("bubble");let i=0;

function typeLine(text,cb){bubble.classList.add("show");bubble.innerHTML="";let n=0;const t=setInterval(()=>{bubble.innerHTML+=text[n];n++;if(n>=text.length){clearInterval(t);setTimeout(cb,2400);}},40);} function nextLine(){if(i<lines.length){typeLine(lines[i],()=>{i++;nextLine();});}else{setTimeout(showHeart,1000);}} setTimeout(nextLine,1200);

function heartPos(t){return{x:16Math.pow(Math.sin(t),3),y:-(13Math.cos(t)-5Math.cos(2t)-2Math.cos(3t)-Math.cos(4*t))};}

function showHeart(){const total=30;const centerX=window.innerWidth/2;const centerY=window.innerHeight/2;const size=Math.min(window.innerWidth,window.innerHeight)/28;for(let k=0;k<total;k++){const img=document.createElement("img");img.src=assets/photos/${k+1}.jpg;img.className="photo";document.body.appendChild(img);const t=(k/total)Math.PI2;const p=heartPos(t);const x=centerX+p.xsize-35;const y=centerY+p.ysize-35;img.style.left=x+"px";img.style.top=y+"px";setTimeout(()=>img.classList.add("show"),70*k);}createGlow(centerX,centerY);setTimeout(showEnding,2800);}

function createGlow(x,y){const glow=document.createElement("div");glow.className="heartGlow";glow.style.left=x+"px";glow.style.top=y+"px";document.body.appendChild(glow);}

function showEnding(){const text=document.createElement("div");text.id="ending";text.innerText="Happy Valentine's Day";document.body.appendChild(text);}

});
