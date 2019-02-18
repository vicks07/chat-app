const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const {generateMessage,generateLocationMessage} = require('./utils/message.js');

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

    socket.emit('newMessage',generateMessage('Admin','Welcome to the Chat App'));
    
    // socket.emit('newMessage',{
    //     from:'Server',
    //     text:'See You',
    //     createdAt: Date.now()
    // });

    socket.broadcast.emit('newMessage',generateMessage('Admin','New User Joined'));

    socket.on('createMessage',(message,callback)=>{
        console.log('createMessage',message);

        io.emit('newMessage',generateMessage(message.from,message.text));
        callback('This is from the server');
        
        //Send this to everbody but me.
        // socket.broadcast.emit('newMessage',{
        //     from:message.from,
        //     text:message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('createLocationMessage',(coords)=>{
        io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
    });

    socket.on('disconnect',()=>{
        console.log('User was disconnected');
    });
}); //Web sockets are persistant
server.listen(port,()=>{
    console.log(`Server is up and running on ${port}`);
});

app.use(express.static(path.join(__dirname, "../public")));