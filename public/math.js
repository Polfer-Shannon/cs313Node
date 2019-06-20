$(document).ready(function () {
    $("#myButton").on("click", function(){
        let number1 = $("#number1").val();
        let number2 = $("#number2").val();
        let operand = $("#operand").val();
        
        $.get('/math_service', {
                'number1' : number1,
                'number2' : number2,
                'operand' : operand
            } , function(data){
                $("#ajax_results").text(data.result);
            }, 'json'
        );
    })

});


