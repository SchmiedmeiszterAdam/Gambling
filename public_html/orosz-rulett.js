$(function () {
    jatek();
});
var fegyverAllas = 1;

function jatek() {
    $("#kezd").click(szam);
}


function szam() {
    var random_szam = Math.floor(Math.random() * 6) + 1;
    console.log(random_szam);
}