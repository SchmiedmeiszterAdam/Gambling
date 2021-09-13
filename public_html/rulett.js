var szamok = [];


$(function () {
    szamokLetrehozasa()
    tablazatLetrehozas()
    szinezes();
    var cw = $('td').width();
    $('td').css({'height':cw+'px'});
    var cw = $('.seged-div').width();
    $('.seged-div').css({'height':cw+'px'});
    setTimeout(magassagAllitas,100);
    segedDivekLetrhozasa()
    divekElhelyezese()
});
$(window).bind("resize",magassagAllitas)
function magassagAllitas(){
    var cw = $('td').width();
    $('td').css({'height':cw+'px'});
    var cw = $('.seged-div').width();
    $('.seged-div').css({'height':cw+'px'});
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
    for (let i = 0; i < 20; i++) {
        $("table").append("<div class = 'seged-div"+" " +"seged-"+ i +"' id = "+ i +"></div>")
    }    
}
function divekElhelyezese(){
    for (let i = 0; i < 11; i++) {
        var tolas = 3.9+i*5.4
        $(".seged-"+i+"").css("left",""+tolas+"vw")
    }
    var szorzo = 0;
    for (let i = 11; i < 22; i++) {
        var tolas = 3.9+szorzo*5.4
        $(".seged-"+i+"").css("left",""+tolas+"vw")
        szorzo++;
    }
    
}
