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
                password:pwd
            }
            $(".loadergap").fadeIn(100, 'linear');
            ajaxCall('POST','/user/login',userDetails).then(function(result){
                console.log(result);
                if(result.status === 'OK'){
                    console.log('Success');
                    $(".loadergap").fadeOut(100, 'linear');
                    $("#login-validate").html("<span class='alert alert-success'>Success</span>");
                    sessionStorage.setItem("userId", result.data[0]._id);
                    sessionStorage.setItem("userName", result.data[0].name);
                    window.location = "../userdashboard.html";
                }
                else{
                    $(".loadergap").fadeOut(100, 'linear');
                    $("#login-validate").html("<span class='alert alert-danger'>Invalid Username/Password</span>");
                }
            });
            // $.post(url + '/users/login', userDetails , function(result){
            //     //$("span").html(result);
            //   });
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
            password:pwd
        }
        console.log(userDetails);
        // $.post(url + '/users/create', userDetails , function(result){
        //     //$("span").html(result);
        //     console.log(result);
        //   });
        $(".loadergap").fadeIn(100, 'linear');
        ajaxCall('POST','/user/create',userDetails).then(function(result){
            //console.log(result);
            if(result.n >= 1 && result.ok >= 1){
                console.log('Success');
                $(".loadergap").fadeOut(100, 'linear');
                $("#signup-validate").html("<span class='alert alert-success'>Resgistration Successful</span>");
                
            }
            else{
                $(".loadergap").fadeOut(100, 'linear');
                $("#login-validate").html("<span class='alert alert-danger'>Oops! Something went wrong</span>");
            }
        });
        //   $.ajax({
        //     type: 'POST',
        //     contentType: "application/json; charset=utf-8",
        //     dataType: "json",
        //     url: url + '/users/create',
        //     async: async,
        //     data: userDetails
        //   });
        //console.log(email,pwd);
    });
    function ajaxCall(method,url,data){
        //console.log(url);
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
