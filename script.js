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
    }
};
