const http=require("http");
const express=require("express");
const path=require('path');
const {Server}=require("socket.io")
const app=express();
const server=http.createServer(app);
const io=new Server(server);
//socket.io
io.on("connection",(socket)=>{
    let userName=socket.id;
    console.log("a new  user connected name:- ", userName);
    socket.on('user-message',(message)=>{
        console.log(userName);
        console.log(userName,"A new user message", message);
        io.emit('message',{userName,message});
    })
})

app.use(express.static(path.resolve('./public')));
app.get('/',(req,res)=>{
    return res.sendFile("/public/index.html")
})
server.listen(8080,()=>console.log(`server started`))
