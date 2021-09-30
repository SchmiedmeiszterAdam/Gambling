var szamok = []
var zsetonok = []
var zsetonErtek = 10
var zsetonSzamlalo = 0
var segedDivSzelesseg_magassaga = 3
var tdSzelesseg = 100 / 12
var segedDivClass = 36
var nyeroSzam
var jatekosZseton = 1000;
const kerekSzamokSorrendje = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26]

$(window).bind("resize", magassagAllitasTd)

$(function () {
    szamokLetrehozasa()
    tablazatLetrehozas()
    szinezes();
    segedDivekLetrhozasa()
    setTimeout(magassagAllitasTd, 100);
    segedDivekElhelyezese();
    $("#kezd").on("click", jatekKezdes)
    $("#jatekos-zseton").text(jatekosZseton)
});

function jatekKezdes() {
    $("#gombok").css("display", "none")
    kerekForgatas()
    setTimeout(ellenorzes, 11000)
    kepKattintMeghiv()
    $(".seged-div").on("click", ertekFelrakas)
    $(".szamTd").on("click", ertekFelrakas)
    $(".tol-ig-gombok").on("click", ertekFelrakas2)
}

//-----------------------------------------------------------------------------------------------------//

function kerekForgatas() {
    randomForgatas("kerek", "1")
    randomForgatas("golyo-tarolo", "-2", "1")
    nyertSzamMeghatarozas()
}

//-----------------------------------------------------------------------------------------------------//

function szamokLetrehozasa() {
    for (let i = 0; i < 37; i++) {
        szamok[i] = i;
    }
}
function tablazatLetrehozas() {
    $("#tabla").append("<table></table>");
    for (let i = 0; i < 3; i++) {
        $("table").append("<tr id = tr-" + (i + 1) + ">");
    }
    for (let i = 0; i < 36; i += 3) {
        $("table tr").eq(2).append("<td id = 'td" + szamok[i] + "' class = 'szamTd " + szamok[i] + "'>" + szamok[i + 1] + "</td");
        $("table tr").eq(1).append("<td id = 'td" + szamok[i + 1] + "' class = 'szamTd " + szamok[i + 1] + "'>" + szamok[i + 2] + "</td");
        $("table tr").eq(0).append("<td id = 'td" + szamok[i + 2] + "' class = 'szamTd " + szamok[i + 2] + "'>" + szamok[i + 3] + "</td");
    }
}
function szinezes() {
    for (let i = 0; i < 10; i += 2) {
        $("#td" + i).css("background-color", "red")
        $("#td" + (i + 1)).css("background-color", "black")
    }
    for (let i = 10; i < 17; i += 2) {
        $("#td" + i).css("background-color", "black")
        $("#td" + (i + 1)).css("background-color", "red")
    }
    for (let i = 18; i < 28; i += 2) {
        $("#td" + i).css("background-color", "red")
        $("#td" + (i + 1)).css("background-color", "black")
    }
    for (let i = 28; i < 36; i += 2) {
        $("#td" + i).css("background-color", "black")
        $("#td" + (i + 1)).css("background-color", "red")
    }
}

//-----------------------------------------------------------------------------------------------------//

function segedDivekLetrhozasa() {
    for (let i = 0; i < 22; i++) {
        $("table").append("<div class = 'seged-div " + (segedDivClass + i) + " seged-" + i + "' id = " + i + "></div>")
    }
}
function segedDivekElhelyezese() {
    var elsoHelye = tdSzelesseg - segedDivSzelesseg_magassaga / 2;
    var magassag = tdSzelesseg + segedDivSzelesseg_magassaga * 6.7
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

//-----------------------------------------------------------------------------------------------------//

function kepKattintMeghiv() {
    $("#zsetonok img").on("click", zsetonHelyezes)
}
function zsetonHelyezes() {
    $("#zsetonok img").css("width", "10%")
    $(this).css("width", "11%")
    var id = $(this).attr("id")
    zsetonErtek = id;
}
function ertekFelrakas() {
    $(this).append("<img src = 'rulett_kepek/zseton" + zsetonErtek + ".png' class='beillesztett-zseton " + zsetonErtek + "'>")
    var elemClass = $(this).attr('class').split(' ')[1];
    var gyerekek = $(this).children()
    var gyerekZsetonErtek = $(gyerekek).attr('class').split(' ')[1];
    zsetonok[elemClass] = gyerekZsetonErtek
    $(this).off()
    jatekosZsetonLevonas(gyerekZsetonErtek)
}
function ertekFelrakas2() {
    let szoveg = $(this).children("h2").text();
    $(this).empty()
    $(this).append("<img src = 'rulett_kepek/zseton" + zsetonErtek + ".png' class='beillesztett-zseton " + zsetonErtek + "'>")
    $(this).append("<h2>" + szoveg + "</h2>")
}

function jatekosZsetonLevonas(zseton){
    jatekosZseton -= zseton
    $("#jatekos-zseton").text(jatekosZseton)
}
//-----------------------------------------------------------------------------------------------------//

function elemForgatas(angle, elem) {
    var $elem = $('#' + elem);

    $({ deg: 0 }).animate({ deg: angle }, {
        duration: 10000,
        step: function (now) {
            $elem.css({
                transform: 'rotate(' + now + 'deg)'
            });
        }
    });
}
function randomForgatas(elem, irany, eltarol) {
    const szamFok = 360 / 37
    let random = Math.floor(Math.random() * 37);
    let tol = random * szamFok
    var forgat = irany * 5040 + tol
    if (eltarol === '1') {
        golyoEltolas = random
    }
    elemForgatas(forgat, elem);
}
//-----------------------------------------------------------------------------------------------------//

var golyoEltolas
function nyertSzamMeghatarozas() {
    nyeroSzam = kerekSzamokSorrendje[golyoEltolas]
    console.log(nyeroSzam)
}
function ellenorzes() {
    let tettE = zsetonok[nyeroSzam - 1];
    console.log(tettE)
    if (tettE === undefined) {
        //alert("Vesztettél")
    }
    else {
        //alert("Nyertél")
    }
}

//-----------------------------------------------------------------------------------------------------//
function magassagAllitasTd() {
    var cw = $('td').width();
    $('td').css({ 'height': cw + 'px' });
    var cw = $('.seged-div').width();
    $('.seged-div').css({ 'height': cw + 'px' });
}