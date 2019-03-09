$(document).ready(function () {
    console.log('Hello');
    let userDetails={
        userId:sessionStorage.getItem("userId")
    }
    $('#pendingrequest').click(function(e){
        GetPendingRequests();
    });

    /*<ul class="collection with-header">
        <li class="collection-header"><h4>First Names</h4></li>
        <li class="collection-item"><div>Alvin<a href="#!" class="secondary-content"><i class="material-icons">send</i></a></div></li>
        <li class="collection-item"><div>Alvin<a href="#!" class="secondary-content"><i class="material-icons">send</i></a></div></li>
        <li class="collection-item"><div>Alvin<a href="#!" class="secondary-content"><i class="material-icons">send</i></a></div></li>
        <li class="collection-item"><div>Alvin<a href="#!" class="secondary-content"><i class="material-icons">send</i></a></div></li>
      </ul> */
    $('#testbtn').click(function(e){
        alert('Hey');
    })
    $('#friendlist').click(function(e){
        ajaxCall('GET',`/user/display/friends/${userDetails.userId}`,'').then(function(result){
            console.log(result);
    
            let ol = jQuery('<ul class="collection with-header"></ul>');

            ol.append(jQuery('<li style="float: none" class="collection-header black-text"><h6>Contacts</h6></li>'))
    
            result.data.forEach(function(user){
                let li = jQuery('<li style="float: none" class="collection-item black-text">');
                let div = jQuery('<div></div>').html(user.name);
                let a = jQuery('<a href="#!" class="secondary-content"></a>');
                //let i = jQuery('<a href="#!" class="secondary-content"></a>');
                a.append('<i class="material-icons">send</i>').click(function(e){
                    //alert('Hey');
                    alert($(this).attr('data-userId'));
                }).attr({'data-userId':user._id})
                div.append(a);
                li.append(div);
                //ol.append(jQuery('<li style="float: none" class="collection-item black-text">Item1</li>').text(user.name)); 
                ol.append(li);
                
                //ol.append(jQuery('<li style="float: none" class="collection-item black-text"><div><a href="#!" class="secondary-content"><i class="material-icons">send</i></a></div></li>').text(user.name));

            });            
        
            jQuery('#users-friends').html(ol);

            ol.find('li').bind('click',userClick.bind(null,'Yo'));
        });
    });

    $('#requestSubmit').click(function(e){
        let data = {
            userId:sessionStorage.getItem("userId"),
            friend: $('#RequestModal').attr('data-userId')
        }
        $(".loadergap").fadeIn(100, 'linear');
        ajaxCall('PATCH','/user/add',data).then(function(result){
            if(result.status == 'OK'){
                $(".loadergap").fadeOut(100, 'linear');
                $("#request-validate").html("<span class='alert alert-success'>Success</span>");
                $('#RequestModal').modal('hide');
                GetPendingRequests();
            }
            console.log(result);
        });
    });

    // $('#RequestModal').click(function(e){
       
    // });
    
    // $("li").click(function ()
    // {   
    //     alert('Hey')    ;
    //     console.log("Hey",this);
    //     let a = $(this).attr("value");

    // // $("#user").html(a);//here the clicked value is showing in the div name user
    //      console.log(a);//here the clicked value is showing in the console
    // });

    function GetPendingRequests(){
        $(".loadergap").fadeIn(100, 'linear');
        $('#pendingRequestList').empty();
        ajaxCall('GET',`/user/display/request/${userDetails.userId}`,'').then(function(result){
            console.log(result);
            let ol = jQuery('<ul class="collection with-header"></ul>');

            ol.append(jQuery('<li style="float: none" class="collection-header black-text"><h6>Requests</h6></li>'))
    
            result.data.forEach(function(user){
                let li = jQuery('<li style="float: none" class="collection-item black-text">');
                let div = jQuery('<div></div>').html(user.name);
                let a = jQuery('<a href="#!" class="secondary-content"></a>');
                //let i = jQuery('<a href="#!" class="secondary-content"></a>');
                a.append('<i class="material-icons">add</i>').click(function(e){
                    alert('Hey');
                    $('#RequestModal').modal('show');               
                    $('#RequestModal').attr({'data-userId':user._id});
                console.log("Here",$('#RequestModal').attr('data-userId')); 
                }).attr({'data-userId':user._id})
                div.append(a);
                li.append(div);
                //ol.append(jQuery('<li style="float: none" class="collection-item black-text">Item1</li>').text(user.name)); 
                ol.append(li);
                
                //ol.append(jQuery('<li style="float: none" class="collection-item black-text"><div><a href="#!" class="secondary-content"><i class="material-icons">send</i></a></div></li>').text(user.name));

            });            
        
            jQuery('#users-friends').html(ol);
            $(".loadergap").fadeOut(100, 'linear');

            //ol.find('li').bind('click',userClick.bind(null,'Yo'));
        });
    }
    function userClick(from,e){
        console.log('here');
        let id = e.target;
        //console.log(e,from);
        let a = $(id).attr("value");        
        if(from == 'request')
            {
                $('#RequestModal').modal('show');
               // $('#RequestModal').attr({userId:a});
                $('#RequestModal').attr({'data-userId':a});
                console.log("Here",$('#RequestModal').attr('data-userId'));               
            }
        //console.log("Hey",id);
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
});