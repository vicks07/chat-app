let socket = io();

socket.on('connect',function(){
    console.log('Connected to the server');
    // socket.emit('createEmail',{
    //     email:'vikram@v.com',
    //     test: `I'm good. How are you?`
    // });
    socket.emit('createMessage',{
        from:'Vikram',
        text:'Yup. This Works!'
    });
});

socket.on('disconnect',function(){
    console.log('Disconnected from server');
});  

//Custom Events without data
// socket.on('newEmail',function(){
//     console.log('New Email');
// });

//Custome Event with data
// socket.on('newEmail',function(data){
//     console.log(data);
// });

socket.on('newMessage',function(message){
    console.log('newMessage',message);
});

