document.addEventListener("DOMContentLoaded",()=>{

const audio=document.getElementById("bgm");
const intro=document.getElementById("intro");

function unlock(){
 audio.muted=true;
 audio.play().then(()=>{
   audio.muted=false;
   let v=0;audio.volume=0;
   const fade=setInterval(()=>{v+=0.02;audio.volume=v;if(v>=0.8)clearInterval(fade);},60);
   intro.style.opacity=0;setTimeout(()=>intro.remove(),800);
 });
}
