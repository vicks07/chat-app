jQuery(document).ready(function () {    
        let url = "localhost:5000/";                 
        jQuery('#login').click(function(){            
              $('#LoginModal').modal('show');
        });  

        jQuery('#loginSubmit').click(function(){
            let email = $("#email").val();
            let pwd = $("#pwd").val();
            let userDetails = {
                email:email,
                pwd:pwd
            }
            $.post(url + '/users/create', userDetails , function(result){
                //$("span").html(result);
              });
            console.log(email,pwd);
        });

        jQuery('#signup').click(function(){            
            $('#SignUpModal').modal('show');
      });  

      jQuery('#signUpSubmit').click(function(){
        let name = $("#signup-name").val();
        let email = $("#signup-email").val();
        let pwd = $("#signup-pwd").val();
        let userDetails = {
            name:name,
            email:email,
            pwd:pwd
        }
        console.log(userDetails);
        // $.post(url + '/users/create', userDetails , function(result){
        //     //$("span").html(result);
        //     console.log(result);
        //   });

        ajaxCall('POST','/user/create',userDetails).then(function(result){
            console.log(result);
        })
        //   $.ajax({
        //     type: 'POST',
        //     contentType: "application/json; charset=utf-8",
        //     dataType: "json",
        //     url: url + '/users/create',
        //     async: async,
        //     data: userDetails
        //   });
        console.log(email,pwd);
    });
    function ajaxCall(method,url,data){
        //console.log('Here');
        return  jQuery.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: url,
            async: true,
            data: JSON.stringify(data)
          });
    };


});
