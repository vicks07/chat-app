const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const {generateMessage,generateLocationMessage} = require('./utils/message.js');
const {isRealString} = require('./utils/validation.js');
const {Users} = require('./utils/users.js');

const app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();
const publicPath = path.join(__dirname,'../public');
// console.log(__dirname+'/../public');
// console.log(publicPath);
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

   
    
    // socket.emit('newMessage',{
    //     from:'Server',
    //     text:'See You',
    //     createdAt: Date.now()
    // });


    socket.on('join',(params,callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and Room name are required');
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id,params.name,params.room);
        //socket.leave(params.room);

        io.to(params.room).emit('updateUserList',users.getUserList(params.room));
        //io.emit -> io.to(room Name).emit();
        //socket.broadcast.emit -> socket.broadcast.to(room name).emit()
        socket.emit('newMessage',generateMessage('Admin','Welcome to the Chat App'));
        socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined`));
        callback();
    });
    
    socket.on('createMessage',(message,callback)=>{
        //console.log('createMessage',message);

        let user = users.getUser(socket.id);

        if(user && isRealString(message.text)){
            io.to(user.room).emit('newMessage',generateMessage(user.name,message.text));
        }
        callback();
        
        //Send this to everbody but me.
        // socket.broadcast.emit('newMessage',{
        //     from:message.from,
        //     text:message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('createLocationMessage',(coords)=>{
        let user = users.getUser(socket.id);
        if(user){
            io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,coords.latitude,coords.longitude));
        }
    });

    socket.on('disconnect',()=>{
        let user = users.removeUser(socket.id);
        //console.log(`${user} was disconnected`);

        if (user){
            //console.log('User Removed',user);
            io.to(user.room).emit('updateUserList',users.getUserList(user.room));
            io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left`));
        }
        console.log('User was disconnected');
    });
}); //Web sockets are persistant
server.listen(port,()=>{
    console.log(`Server is up and running on ${port}`);
});

app.use(express.static(path.join(__dirname, "../public")));