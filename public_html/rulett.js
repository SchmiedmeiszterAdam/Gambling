var szamok = [];


$(function () {
    szamokLetrehozasa()
    tablazatLetrehozas()
    szinezes();
    setTimeout(magassagAllitasTd,100);
    setTimeout(magassagAllitasKep,100);
    setTimeout(szelessegFigyeles,100);
    segedDivekLetrhozasa()
});


$(window).bind("resize",szelessegFigyeles)
$(window).bind("resize",magassagAllitasTd)
function magassagAllitasTd(){
    var cw = $('td').width();
    $('td').css({'height':cw+'px'});
    var cw = $('.seged-div').width();
    $('.seged-div').css({'height':cw+'px'});
}
$(window).bind("resize",magassagAllitasKep)
function magassagAllitasKep(){
    var cw = $('#kerek').width();
    var ch = $('#kerek').height();
    $('#kerek').css({'width':ch+'px'});
    $('#kerek').css({'height':cw+'px'});
    
}
function szamokLetrehozasa() {
    for (let i = 0; i < 36; i++) {
        szamok[i] = i + 1;
    }
    console.log(szamok)
}
function tablazatLetrehozas() {
    $("#tabla").empty();
    $("#tabla").append("<table></table>");
    for (let i = 0; i < 3; i++) {
        $("table").append("<tr id = tr-"+(i+1)+">");
    }
    for (let i = 0; i < 36; i+=3) {
        $("table tr").eq(0).append("<td id = "+szamok[i]+">" + szamok[i] + "</td");
        $("table tr").eq(1).append("<td id = "+szamok[i+1]+">" + szamok[i+1] + "</td");
        $("table tr").eq(2).append("<td id = "+szamok[i+2]+">" + szamok[i+2] + "</td");
    }
    
}
function szinezes(){
    for (let i = 1; i < 12; i+=2) {
        $("#"+i+"").css("background","black")
    }
    for (let i = 13; i <24; i+=2) {
        $("#"+i+"").css("background","black")
    }
    for (let i = 25; i < 36; i+=2) {
        $("#"+i+"").css("background","black")
    }
}
function segedDivekLetrhozasa(){
    for (let i = 0; i < 22; i++) {
        $("table").append("<div class = 'seged-div"+" " +"seged-"+ i +"' id = "+ i +"></div>")
    }    
}
function divekElhelyezese(elso, szorzas, magassag1,magassag2){
    for (let i = 0; i < 11; i++) {
        var tolas = elso+i*szorzas
        $(".seged-"+i+"").css("left",""+tolas+"vw")
        $(".seged-"+i+"").css({"top":magassag1 +"vw"})
        $(".seged-"+i+"").css("background","gray")
    }
    var szorzo = 0;
    for (let i = 11; i < 23; i++) {
        var tolas = elso+szorzo*szorzas
        $(".seged-"+i+"").css("left",""+tolas+"vw")
        $(".seged-"+i+"").css({"top":magassag2 +"vw"})
        $(".seged-"+i+"").css("background","gray")
        szorzo++;
    }
}
function szelessegFigyeles(){
    var oldalSzelesseg = $( window ).width();
    console.log(oldalSzelesseg)
    if(oldalSzelesseg > 800){
        divekElhelyezese(3.5,5,3.5,8.5)
    }
    else if(oldalSzelesseg < 800 && oldalSzelesseg > 400){
        divekElhelyezese(5.3,6.65,5.2,11.8)
    }
    else if(oldalSzelesseg < 400){
        divekElhelyezese(6.8,8.34,6.9,15.3)
    }
}
