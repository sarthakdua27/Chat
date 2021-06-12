//send a message to server
socket.emit("onuserconnected", username);

//get the broadcast msg
socket.on("joinedthechat", function (obj) {
    //<div class="chat joined">Joined the chat</div>
    let div = document.createElement("div");
    div.classList.add("chat");
    div.classList.add("joined");
    div.textContent = `${obj.username} joined the chat`
    chatwin.append(div);
    chatwin.scrollTop=chatwin.scrollHeight;
    AddmetoOthers(obj); // as it is broadcasted
})

socket.on("leftthechat", function (obj) {
    let div = document.createElement("div");
    div.classList.add("chat");
    div.classList.add("left-chat");
    div.textContent = `${obj.username} left the chat`
    chatwin.append(div);
    chatwin.scrollTop=chatwin.scrollHeight;
    Deletemefromonlinelist(obj.id);
})

socket.on("uploadleftmsg", function (obj) {
    // <div class="chat left-msg">Ji</div>
    let div = document.createElement("div");
    div.classList.add("chat");
    div.classList.add("left-msg");
    div.setAttribute("id",`${obj.id}`);
    div.textContent = `${obj.username}: ${obj.chat}`;
    chatwin.append(div);
})
let ol = document.querySelector(".online-list");
socket.on("updatemylist", function (list) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].id != socket.id) {
            let div = document.createElement("div");
            div.classList.add("user");
            div.classList.add("flex");
            div.setAttribute("id",`${list[i].id}`);
            div.innerHTML = `
            <div class="user-img flex"> <img src=https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcOLQ265qQjUpwBYttcpeUY0TPTa4h_54RkA&usqp=CAU"" alt=""> </div>
            <div class="user-name">${list[i].username}</div>
            `;
            ol.append(div);
        }
    }
})

function AddmetoOthers(obj) {
    let div = document.createElement("div");
    div.classList.add("user");
    div.classList.add("flex");
    div.setAttribute("id", obj.id);
    div.innerHTML = `
        <div class="user-img flex"> <img src=https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcOLQ265qQjUpwBYttcpeUY0TPTa4h_54RkA&usqp=CAU"" alt=""> </div>
        <div class="user-name">${obj.username}</div>
    `;
    ol.append(div);
}
function Deletemefromonlinelist(id){
    document.querySelector(`#${id}`).remove();
}