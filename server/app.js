const express = require('express');
const { Server } = require("socket.io");
const app = express();  //1.server is created
const http = require('http');
const { on } = require('events');
const server = http.createServer(app);
const io = new Server(server);


// 6. Move my website to public index.html
app.use(express.static("public"));


let onlinelist=[];
//9. Connection event is attached on io, whenever io function is called to public html this function will be executed
io.on("connection" , function(socket){
    console.log(socket.id + " connected !!!");

    socket.on("onuserconnected",function(username){
        let userobj={"id":socket.id,"username":username};
        onlinelist.push(userobj);
        console.log(onlinelist);
        // update my online list with userlist
        socket.emit("updatemylist",onlinelist);
        //broadcast it to all other devices=> emit
        socket.broadcast.emit("joinedthechat",userobj);
    });

    socket.on("disconnect",function(){
        // on basis of key find disconnected user

        let userleft;
        let remaininguser=onlinelist.filter((obj)=>{
            if(obj.id==socket.id){
                userleft=obj;
            }
            return obj.id!=socket.id;
        })
        onlinelist=remaininguser;
        socket.broadcast.emit("leftthechat",userleft);
    })

    socket.on("chat",function(obj){
        socket.broadcast.emit("uploadleftmsg",obj);
    })
});

//3. define '/'
// app.get('/', (req, res) => {
//     //response => client to server and respond=>server to client
//     res.send("Hello")
// });
//5. start server
server.listen(5500, () => {
    console.log(`Server started @ 5500!`)
});
