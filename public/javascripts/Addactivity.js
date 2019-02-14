document.getElementById("button_model").addEventListener('click',
    function () {
        window.alert("Test");
        document.querySelector('.modal fade').style.display = 'flex';

    });

document.querySelector('.close').addEventListener('click',
    function () {
        document.querySelector('.modal').style.display = 'none'
    }
);

$(document).ready(function(){
    $("#myBtn").click(function(){
        $("#myModal").modal();
    });
});