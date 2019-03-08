$(document).ready(function () {
    console.log('Hello');
    let userDetails={
        userId:sessionStorage.getItem("userId")
    }
    $('#pendingrequest').click(function(e){
        GetPendingRequests();
    });

    $('#friendlist').click(function(e){
        ajaxCall('GET',`/user/display/friends/${userDetails.userId}`,'').then(function(result){
            console.log(result);
    
            let ol = jQuery('<ul class ="list-group list-group-flush"></ul>');
    
            result.data.forEach(function(user){
                ol.append(jQuery('<li class="list-group-item"></li>').text(user.name)); 
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
    
            let ol = jQuery('<ul id="pendingRequestList" class ="list-group list-group-flush"></ul>');
    
            result.data.forEach(function(user){
                ol.append(jQuery(`<li class="list-group-item" value=${user._id}></li>`).text(user.name)); 
            });
            $(".loadergap").fadeOut(100, 'linear');
            jQuery('#users-friends').html(ol);
            ol.find('li').bind('click',userClick.bind(null,'request'));
        });
    }
    function userClick(from,e){
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