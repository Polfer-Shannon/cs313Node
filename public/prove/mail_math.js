$(document).ready(function () {
    $("#myButton").on("click", function(){
        let weight = $("#weight").val();
        let types = $("#types").val();
        
        $.get('/mail_service', {
                'weight' : weight,
                'types' : types
            } , function(data){
                $("#ajax_results").text(data.result);
            }, 'json'
        );
    })
});


