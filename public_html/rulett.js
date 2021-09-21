var szamok = [];
var zsetonok = []
var zsetonErtek = 0;
var zsetonSzamlalo = 0;
var segedDivSzelesseg_magassaga = 5;
var tdSzelesseg = 100 / 12;
var segedDivClass = 36;



$(window).bind("resize", magassagAllitasTd)

$(function () {
    szamokLetrehozasa()
    tablazatLetrehozas()
    szinezes();
    segedDivekLetrhozasa()
    setTimeout(magassagAllitasTd, 100);
    segedDivekElhelyezese();
    kepKattintMeghiv()
    $("#kezd").on("click",jatekKezdes)
    $(".seged-div").on("click",ertekFelrakas)
    $(".szamTd").on("click",ertekFelrakas)
});


function jatekKezdes(){

    $("#kerek").addClass("kerekForgatas")
    $("#golyo-tarolo").addClass("golyo-forgat")
    $("#gombok").css("display","none")
    setTimeout(function(){$("#kerek").removeClass("kerekForgatas");$("#gombok").css("display","flex");$("#golyo-tarolo").removeClass("golyo-forgat")},15000)
}



function magassagAllitasTd() {
    var cw = $('td').width();
    $('td').css({ 'height': cw + 'px' });
    var cw = $('.seged-div').width();
    $('.seged-div').css({ 'height': cw + 'px' });
}
function szamokLetrehozasa() {
    for (let i = 0; i < 36; i++) {
        szamok[i] = i + 1;
    }
    console.log(szamok)
}
function tablazatLetrehozas() {
    $("#tabla").append("<table></table>");
    for (let i = 0; i < 3; i++) {
        $("table").append("<tr id = tr-" + (i + 1) + ">");
    }
    for (let i = 0; i < 36; i += 3) {
        $("table tr").eq(0).append("<td id = 'td" + szamok[i] + "' class = 'szamTd "+szamok[i-1]+"'>" + szamok[i] + "</td");
        $("table tr").eq(1).append("<td id = 'td" + szamok[i + 1] + "' class = 'szamTd "+szamok[i]+"'>" + szamok[i + 1] + "</td");
        $("table tr").eq(2).append("<td id = 'td" + szamok[i + 2] + "' class = 'szamTd "+szamok[i+1]+"'>" + szamok[i + 2] + "</td");
    }

}
function szinezes() {
    for (let i = 1; i < 12; i += 2) {
        $("#td" + i).css("background-color", "black")
        $("#td" + (i+12)).css("background-color", "black")
        $("#td" + (i+24)).css("background-color", "black")
        $("#td" + (i+1)).css("background-color", "red")
        $("#td" + (i+13)).css("background-color", "red")
        $("#td" + (i+25)).css("background-color", "red")
    }
    
}
function segedDivekLetrhozasa() {
    for (let i = 0; i < 22; i++) {
        $("table").append("<div class = 'seged-div " + (segedDivClass+i) + " seged-" + i + "' id = " + i + "></div>")
    }
}
function segedDivekElhelyezese() {
    var elsoHelye = tdSzelesseg - segedDivSzelesseg_magassaga / 2;
    var magassag = tdSzelesseg + segedDivSzelesseg_magassaga * 3
    for (let i = 0; i < 11; i++) {
        var tolas = elsoHelye + i * tdSzelesseg
        $(".seged-" + i + "").css("left", "" + tolas + "%")
        $(".seged-" + i + "").css("top", "" + magassag + "%")
    }
    var szorzo = 0;
    for (let i = 11; i < 23; i++) {
        var tolas = elsoHelye + szorzo * tdSzelesseg
        $(".seged-" + i + "").css("left", "" + tolas + "%")
        $(".seged-" + i + "").css({ "bottom": magassag + "%" })
        szorzo++;
    }
}
function kepKattintMeghiv() {
    $("#zsetonok img").on("click", zsetonHelyezes)
}
function zsetonHelyezes() {
    $("#zsetonok img").css("width", "10%")
    $(this).css("width", "11%")
    var id = $(this).attr("id")
    zsetonErtek = id;
}
var i = 0;
function ertekFelrakas(){
    $(this).empty()
    $(this).append("<img src = 'rulett_kepek/zseton"+zsetonErtek+".png' class='beillesztett-zseton "+zsetonErtek+"'>")
    var elemClass = $(this).attr('class').split(' ')[1];
    var gyerekek = $(this).children()

    var gyerekZsetonErtek = $(gyerekek).attr('class').split(' ')[1];
    
    zsetonok[elemClass] = gyerekZsetonErtek

    console.log(zsetonok)
}
