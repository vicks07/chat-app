let socket = io();

socket.on('connect',function(){
    console.log('Connected to the server');
    // socket.emit('createEmail',{
    //     email:'vikram@v.com',
    //     test: `I'm good. How are you?`
    // });
    // socket.emit('createMessage',{
    //     from:'Vikram',
    //     text:'Yup. This Works!'
    // });
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
    let li = jQuery('<li></li>');
    li.text(`${message.from}:${message.text}`);

    jQuery('#messages').append(li);
});

// socket.emit('createMessage',{
//     from:'Frank',
//     text:'Hi'
// },function(data){
//     console.log(data);
// });

jQuery('#message-form').on('submit',function(e){
    e.preventDefault(); //Prevents the default event of form of page refresh the page and modifying the url.
    socket.emit('createMessage',{
        from:'Vikram',
        text: jQuery('[name=message]').val()
    },function(){
        //console.log(data);
    });
});

let locationButton = jQuery('#send-location');
locationButton.on('click',function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser')
    }
    navigator.geolocation.getCurrentPosition(function (position){
        socket.emit('createLocationMessage',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        });
    },function(err){
        alert('Unable to Fetch Location');
    });
});

socket.on('newLocationMessage',function(message){
    let li = jQuery('<li></li>');
    let a = jQuery('<a target="_blank">My Current Location</a>'); //Tells the browser to open another tab(target=_blank)
    li.text(`${message.from}:`);
    a.attr('href',message.url);
    li.append(a);
    jQuery('#messages').append(li); 
});