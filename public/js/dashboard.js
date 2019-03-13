$(document).ready(function () {
    $('.modal').modal(); 
    console.log('Hello');
    let userDetails={
        userId:sessionStorage.getItem("userId")
    }
    $('#pendingrequest').click(function(e){
        GetPendingRequests();
    });
    
    $('#testbtn').click(function(e){
        //alert('Hey');
        $('#RequestModal').modal('open');
    })
    $('#friendlist').click(function(e){
        $("#contact_load").fadeIn(100, 'linear');

        ajaxCall('GET',`/user/display/friends/${userDetails.userId}`,'').then(function(result){
            console.log(result);


            let ol = jQuery('<ul class="collection with-header"></ul>');

            ol.append(jQuery('<li style="float: none" class="collection-header black-text"><h6><b>Contacts<b></h6></li>'))
    
            result.data.forEach(function(user){
                let li = jQuery('<li style="float: none" class="collection-item black-text">').css({display:'flex', 'flex-direction':'row','justify-content':'space-between'});
                //let div = jQuery('<div></div>')
                jQuery('<span></span>').css({flex:'1',margin:'auto'}).html(user.name).appendTo(li);
                let a = jQuery('<a href="#!" class="secondary-content"></a>');
                //let i = jQuery('<a href="#!" class="secondary-content"></a>');
                a.append('<i class="material-icons">send</i>').click(function(e){
                    //alert('Hey');       
                //     var header = $('#requestHeader').html(user.name); 
                //     //$('#RequestModal').append(header);
                //     $('#RequestModal').modal('open'); 
                  //  $('#RequestModal').attr({'data-userId':user._id,'date-userName':user.name});
                      

                //console.log("Here",user._id,user.name,user._id+sessionStorage.getItem("userId")); 
                connect({id:user._id,name:user.name,room:`${user._id}+${sessionStorage.getItem("userId")}`})
                });
                li.attr({'data-userId':user._id,'data-userName':'Vikram'});
                //div.append(a);
                li.append(a);
                //ol.append(jQuery('<li style="float: none" class="collection-item black-text">Item1</li>').text(user.name)); 
                ol.append(li);

            $("#contact_load").fadeOut(100, 'linear');
            });            
        
            jQuery('#users-friends').html(ol);

            //ol.find('li').bind('click',userClick.bind(null,'Yo'));
        });
    });

    $('#requestSubmit').click(function(e){
        let data = {
            userId:sessionStorage.getItem("userId"),
            friend: $('#RequestModal').attr('data-userId')
        }
        $("#screen_load").fadeIn(100, 'linear');
        ajaxCall('PATCH','/user/add',data).then(function(result){
            if(result.status == 'OK'){
                $("#screen_load").fadeOut(100, 'linear');
                $("#request-validate").html("<span class='alert alert-success'>Success</span>");
                $('#RequestModal').modal('hide');
                GetPendingRequests();
            }
            console.log(result);
        });
    });
   
    function GetPendingRequests(){
        $("#contact_load").fadeIn(100, 'linear');
        $('#pendingRequestList').empty();
        ajaxCall('GET',`/user/display/request/${userDetails.userId}`,'').then(function(result){
            console.log(result);
            let ol = jQuery('<ul class="collection with-header"></ul>');

            ol.append(jQuery('<li style="float: none" class="collection-header black-text"><h6><b>Requests</b></h6></li>'))
    
            result.data.forEach(function(user){
                let li = jQuery('<li style="float: none" class="collection-item black-text">').css({display:'flex', 'flex-direction':'row','justify-content':'space-between'});
                //let div = jQuery('<div></div>')
                jQuery('<span></span>').css({flex:'1',margin:'auto'}).html(user.name).appendTo(li);
                let a = jQuery('<a href="#!" class="secondary-content"></a>');
                //let i = jQuery('<a href="#!" class="secondary-content"></a>');
                a.append('<i class="material-icons">add</i>').click(function(e){
                    //alert('Hey');       
                    var header = $('#requestHeader').html(user.name); 
                    //$('#RequestModal').append(header);
                    $('#RequestModal').modal('open'); 
                    $('#RequestModal').attr({'data-userId':user._id,'date-userName':user.name});
                      

                // console.log("Here",$('#RequestModal').attr('data-userId')); 
                }).attr({'data-userId':user._id})
                //div.append(a);
                li.attr({'data-userId':user._id,'data-userName':'Vikram'});

                li.append(a);
                //ol.append(jQuery('<li style="float: none" class="collection-item black-text">Item1</li>').text(user.name)); 
                ol.append(li);
                
                //ol.append(jQuery('<li style="float: none" class="collection-item black-text"><div><a href="#!" class="secondary-content"><i class="material-icons">send</i></a></div></li>').text(user.name));

            });            
        
            jQuery('#users-friends').html(ol);
            $("#contact_load").fadeOut(100, 'linear');

            //ol.find('li').bind('click',userClick.bind(null,'request'));
        });
    }
    function userClick(from,e){
        //console.log('here');
        let id = e.target;
        let a = $(id).attr("value");
        console.log(e,from,a);
            
        if(from == 'request')
            {
                let a = $(id).attr("value");    
                $('#RequestModal').modal('open');
               // $('#RequestModal').attr({userId:a});
                $('#RequestModal').attr({'data-userId':a});
                //console.log("Here",$('#RequestModal').attr('data-userId'));               
            }
        //console.log("Hey",id);
        else{
            let userId = $(id).attr("data-userId");
            let userName = $(id).attr("data-userName");
            console.log(userName,userId);
            //'data-userName':'Vikram'
            //connect({userId:('#RequestModal').attr('data-userId')},name:'')
        }
    };

    function ajaxCall(method,url,data){
        //console.log(url);
        return  jQuery.ajax({
            type: method,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: url,
            async: true,
            data: JSON.stringify(data)
          });
    };

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

function connect(user){
    //console.log('user',user);
    socket.on('connect',function(){
        //let params = jQuery.deparam(window.location.search);
        socket.emit('join',user,function(err){
            console.log(user);
            if(err){
                alert(err);
                //window.location.href = '/';
            }else{
                console.log('No Error');
            }
        });
        console.log('Connected to the server');       
        });
}

socket.on('disconnect',function(){
   console.log('Disconnected from server');
});  


// socket.on('updateUserList',function(users){
//     let ol = jQuery('<ul></ul>');

//     users.forEach(function(user){
//         ol.append(jQuery('<li></li>').text(user)); 
//     });

//     jQuery('#users').html(ol);
   
//     console.log('Users List',users);
// })
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
   //console.log('Hello');
   socket.emit('createMessage',{
       //from:getUrlParam(window.location.href,'name'),
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
       from:message.from,
       //from: getUrlParam(window.location.href,'name'), //message.from,
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
});


