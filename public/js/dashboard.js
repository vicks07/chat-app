$(document).ready(function () {
    console.log('Hello');
    let userDetails={
        userId:"5c7fb0f5b554964d900b8560"
    }
    ajaxCall('GET','/user/display/request/',userDetails).then(function(result){
        console.log(result);
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