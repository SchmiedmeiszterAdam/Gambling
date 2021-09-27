var szamok = []
var zsetonok = []
var zsetonErtek = 0
var zsetonSzamlalo = 0
var segedDivSzelesseg_magassaga = 5
var tdSzelesseg = 100 / 12
var segedDivClass = 36
var nyeroSzam
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

});

function jatekKezdes() {
    $("#gombok").css("display", "none")
    kerekForgatas()
    setTimeout(ellenorzes, 11000)
    kepKattintMeghiv()
    $(".seged-div").on("click", ertekFelrakas)
    $(".szamTd").on("click", ertekFelrakas)
}

//-----------------------------------------------------------------------------------------------------//

function kerekForgatas() {
    randomForgatas("kerek", "1", "0")
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
        $("table tr").eq(0).append("<td id = 'td" + szamok[i] + "' class = 'szamTd " + szamok[i] + "'>" + szamok[i + 1] + "</td");
        $("table tr").eq(1).append("<td id = 'td" + szamok[i + 1] + "' class = 'szamTd " + szamok[i + 1] + "'>" + szamok[i + 2] + "</td");
        $("table tr").eq(2).append("<td id = 'td" + szamok[i + 2] + "' class = 'szamTd " + szamok[i + 2] + "'>" + szamok[i + 3] + "</td");
    }

}
function szinezes() {
    for (let i = 0; i < 12; i += 2) {
        $("#td" + i).css("background-color", "black")
        $("#td" + (i + 12)).css("background-color", "black")
        $("#td" + (i + 24)).css("background-color", "black")
        $("#td" + (i + 1)).css("background-color", "red")
        $("#td" + (i + 13)).css("background-color", "red")
        $("#td" + (i + 25)).css("background-color", "red")
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
var i = 0;
function ertekFelrakas() {
    $(this).empty()
    $(this).append("<img src = 'rulett_kepek/zseton" + zsetonErtek + ".png' class='beillesztett-zseton " + zsetonErtek + "'>")
    var elemClass = $(this).attr('class').split(' ')[1];
    var gyerekek = $(this).children()
    var gyerekZsetonErtek = $(gyerekek).attr('class').split(' ')[1];
    zsetonok[elemClass] = gyerekZsetonErtek
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
    else {
        kerekEltolas = random
    }

    elemForgatas(forgat, elem);
}
//-----------------------------------------------------------------------------------------------------//

var kerekEltolas
var golyoEltolas
function nyertSzamMeghatarozas() {
    nyeroSzam = kerekSzamokSorrendje[golyoEltolas]
    console.log(nyeroSzam)
}
function ellenorzes() {
    let tettE = zsetonok[nyeroSzam - 1];
    console.log(tettE)
    if (tettE === undefined) {
        alert("Vesztettél")
    }
    else {
        alert("Nyertél")
    }
}

//-----------------------------------------------------------------------------------------------------//
function magassagAllitasTd() {
    var cw = $('td').width();
    $('td').css({ 'height': cw + 'px' });
    var cw = $('.seged-div').width();
    $('.seged-div').css({ 'height': cw + 'px' });
}