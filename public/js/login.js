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
});


