//import moment = require("moment");

let socket = io();

 function scrollToBottom(){
    //Selectors
    let messages = jQuery('#messages');
    let newMessage = messages.children('li:last-child');
    //Heights
    let clientHeight = messages.prop('clientHeight');
    let scrollTop = messages.prop('scrollTop');
    let scrollHeight = messages.prop('scrollHeight');
    let newMessageHeight = newMessage.innerHeight(); //Height of the latest message
    let lastMessageHeight = newMessage.prev().innerHeight(); //height of the second last message

    if(clientHeight + scrollTop +newMessageHeight +lastMessageHeight >=scrollHeight){
        messages.scrollTop(scrollHeight);
        //console.log('Should Scroll Down');
    }

 }

socket.on('connect',function(){

    let params = jQuery.deparam(window.location.search);
    socket.emit('join',params,function(err){
        if(err){
            alert(err);
            window.location.href = '/';
        }else{
            console.log('No Error');
        }
    });
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

    let template = jQuery('#message-template').html();
    let formattedTime = moment(message.createdAt).format('h:mm a');

    let html = Mustache.render(template,{
        text:message.text,
        from: message.from,
        createdAt:formattedTime
    });

    jQuery('#messages').append(html);

    scrollToBottom();
    // console.log('newMessage',message);
    // let li = jQuery('<li></li>');
    // li.text(`${message.from} ${formattedTime}:${message.text}`);

    // jQuery('#messages').append(li);
});

// socket.emit('createMessage',{
//     from:'Frank',
//     text:'Hi'
// },function(data){
//     console.log(data);
// });
let messageTextBox = jQuery('[name=message]');

jQuery('#message-form').on('submit',function(e){
    e.preventDefault(); //Prevents the default event of form of page refresh the page and modifying the url.
    socket.emit('createMessage',{
        from:getUrlParam(window.location.href,'name'),
        text: messageTextBox.val()
    },function(){
        messageTextBox.val('');
        //console.log(data);
    });
});

let locationButton = jQuery('#send-location');
locationButton.on('click',function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser')
    }

    locationButton.attr('disabled','disabled').text('Sending Location..'); //Disable the location button

    navigator.geolocation.getCurrentPosition(function (position){
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        });
    },function(err){
        locationButton.removeAttr('disabled').text('Send Location');         
        alert('Unable to Fetch Location');
    });
});

socket.on('newLocationMessage',function(message){
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = jQuery('#location-message-template').html();
    let html = Mustache.render(template,{
        url:message.url,
        from: getUrlParam(window.location.href,'name'), //message.from,
        createdAt:formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();
    // let li = jQuery('<li></li>');
    // let a = jQuery('<a target="_blank">My Current Location</a>'); //Tells the browser to open another tab(target=_blank)
    // li.text(`${message.from} ${formattedTime}:`);
    // a.attr('href',message.url)  ;
    // li.append(a);
    // jQuery('#messages').append(li); 
});

function getUrlParam(url_string, key) {
    var url = new URL(url_string);
    return url.searchParams.get(key);
}