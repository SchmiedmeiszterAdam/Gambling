var szamok = [];
var zsetonErtek = 0;
var zsetonSzamlalo = 0;
var segedDivSzelesseg_magassaga = 5;
var tdSzelesseg = 100 / 12;
$(function () {
    szamokLetrehozasa()
    tablazatLetrehozas()
    szinezes();
    segedDivekLetrhozasa()
    setTimeout(magassagAllitasTd, 100);
    b();
    kepKattintMeghiv()
});
$(window).bind("resize", magassagAllitasTd)
$(window).bind("resize", b)
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
        $("table tr").eq(0).append("<td id = 'td" + szamok[i] + "' class = 'szamTd'>" + szamok[i] + "</td");
        $("table tr").eq(1).append("<td id = 'td" + szamok[i + 1] + "' class = 'szamTd'>" + szamok[i + 1] + "</td");
        $("table tr").eq(2).append("<td id = 'td" + szamok[i + 2] + "' class = 'szamTd'>" + szamok[i + 2] + "</td");
    }

}
function szinezes() {
    for (let i = 1; i < 12; i += 2) {
        $("#td" + i).css("background-color", "black")
        $("#td" + (i+12)).css("background-color", "black")
        $("#td" + (i+24)).css("background-color", "black")
        $("#td" + (i+1)).css("background-color", "green")
        $("#td" + (i+13)).css("background-color", "green")
        $("#td" + (i+25)).css("background-color", "green")
    }
    
}
function segedDivekLetrhozasa() {
    for (let i = 0; i < 22; i++) {
        $("table").append("<div class = 'seged-div" + " " + "seged-" + i + "' id = " + i + "></div>")
    }
}
function b() {
    
    
    var elsoHelye = tdSzelesseg - segedDivSzelesseg_magassaga / 2;
    var magassag = tdSzelesseg + segedDivSzelesseg_magassaga * 3
    for (let i = 0; i < 11; i++) {
        var tolas = elsoHelye + i * tdSzelesseg
        $(".seged-" + i + "").css("left", "" + tolas + "%")
        $(".seged-" + i + "").css("bottom", "" + magassag + "%")
    }
    var szorzo = 0;
    for (let i = 11; i < 23; i++) {
        var tolas = elsoHelye + szorzo * tdSzelesseg
        $(".seged-" + i + "").css("left", "" + tolas + "%")
        $(".seged-" + i + "").css({ "top": magassag + "%" })
        szorzo++;
    }
}
function kepKattintMeghiv() {
    $("#zsetonok img").on("click", zsetonHelyezes)
}
function zsetonHelyezes() {
    $(".seged-div").on("click",ertekFelrakas)
    $(".szamTd").on("click",ertekFelrakas)

    $("#zsetonok img").css("width", "10%")
    $(this).css("width", "11%")
    var id = $(this).attr("id")
    zsetonErtek = id;
}
function ertekFelrakas(){
    $(this).css("background-image","url('rulett_kepek/zseton"+zsetonErtek+".png')")    
}