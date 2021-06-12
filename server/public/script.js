let inpt=document.querySelector(".input-box>input");
let chatwin=document.querySelector(".chat-window");

let username = prompt("Enter Your name");
document.querySelector(".user-name").textContent=username;
inpt.addEventListener("keypress",function(e){
    if(e.key=="Enter" && inpt.value!=""){
        let msg=inpt.value;
        inpt.value="";
        let div=document.createElement("div");
        div.classList.add("chat");
        div.classList.add("right-msg");
        div.textContent=username+ ": "+ msg;
        chatwin.append(div);

        socket.emit("chat",{username,"chat":msg});
        chatwin.scrollTop=chatwin.scrollHeight;
    }
})