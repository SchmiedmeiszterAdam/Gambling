$(function () {
    jatek();    
});


function jatek() {
    $("#kezd").click(szam);
    $("#uj-jatel").click(ujJatek);
}


function szam() {
    var random_szam = Math.floor(Math.random() * 6) + 1;
    console.log(random_szam);
    $("#fegyver").addClass("forog");
    $("#kezd").css("display","none"); 
    setTimeout(function(){ $("#fegyver").removeClass("forog");
    }, 1501);    
}
function ujJatek(){
}
