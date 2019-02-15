const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
let server = http.createServer(app);
let io = socketIO(server);
const publicPath = path.join(__dirname,'../public');
console.log(__dirname+'/../public');
console.log(publicPath);
//console.log(config);
const port = process.env.PORT || 5000;

io.on('connection',(socket)=>{ //Individual Socket
    console.log('New User Connected');

    //Custom Event Trigger
    //socket.emit('newEmail'); //Without Data
 
    // socket.emit('newEmail',{
    //     from:'vikram.january@gmail.com',
    //     test:'Hey. Whatsup?',
    //     createAt:123
    // });

    socket.emit('newMessage',{
        from:'Server',
        text:'See You',
        createdAt: Date.now()
    })

    socket.on('createMessage',(message)=>{
        console.log('createMessage',message);
        io.emit('newMessage',{
            from:message.from,
            text:message.text,
            createdAt:new Date.getTime()
        });
    });

    socket.on('disconnect',()=>{
        console.log('User was disconnected');
    });
}); //Web sockets are persistant
server.listen(port,()=>{
    console.log(`Server is up and running on ${port}`);
});

app.use(express.static(path.join(__dirname, "../public")));