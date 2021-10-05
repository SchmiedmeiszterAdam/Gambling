let szamok = []
let zsetonErtek = 10
let nyeroSzam
let jatekosZseton = 1000
const kerekSzamokSorrendje = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26]
let golyoEltolas
let JatekosNyeremeny = 0
const pirosak = []
const feketek = []

$(window).bind("resize", magassagAllitasTd)

$(function () {
    szamokLetrehozasa()
    tablazatLetrehozas()
    szinezes()
    segedDivekLetrhozasa()
    setTimeout(magassagAllitasTd, 100)
    segedDivekElhelyezese()
    $("#kezd").on("click", jatekKezdes)
    jatekosZsetonKiiras()
})

function jatekKezdes() {
    $("#gombok").css("display", "none")
    setTimeout(kerekForgatas, 5000)
    setTimeout(ellenorzesek, 16000)
    $("#zsetonok img").on("click", zsetonKivalasztas)
    $(".seged-div, #paros, #paratlan, .szamTd, .tol-ig-gombok, #piros, #fekete").on("click", ertekFelrakas)
}

//-----------------------------------------------------------------------------------------------------//

function kerekForgatas() {
    randomForgatas("kerek", "1")
    randomForgatas("golyo-tarolo", "-2")
    nyertSzamMeghatarozas()
}

//-----------------------------------------------------------------------------------------------------//

function szamokLetrehozasa() {
    for (let i = 0; i < 37; i++) {
        szamok[i] = i
    }
}
function tablazatLetrehozas() {
    $("#tabla").append("<table></table>")
    for (let i = 0; i < 3; i++) {
        $("table").append("<tr id = tr-" + (i + 1) + ">")
    }
    for (let i = 0; i < 36; i += 3) {
        $("table tr").eq(2).append("<td id = 'td" + szamok[i] + "' class = 'szamTd " + szamok[i] + "'>" + szamok[i + 1] + "</td")
        $("table tr").eq(1).append("<td id = 'td" + szamok[i + 1] + "' class = 'szamTd " + szamok[i + 1] + "'>" + szamok[i + 2] + "</td")
        $("table tr").eq(0).append("<td id = 'td" + szamok[i + 2] + "' class = 'szamTd " + szamok[i + 2] + "'>" + szamok[i + 3] + "</td")
    }
}
function szinezes() {
    for (let i = 0; i < 36; i += 2) {
        if (i < 10 || i > 17 && i < 28) {
            szinezesSegito(i, "red", "black", pirosak, feketek)
        }
        else {
            szinezesSegito(i, "black", "red", feketek, pirosak)
        }
    }
}
function szinezesSegito(i, szin1, szin2, tomb1, tomb2) {
    $("#td" + i).css("background-color", szin1)
    tomb1.push(i + 1)
    $("#td" + (i + 1)).css("background-color", szin2)
    tomb2.push(i + 2)
}
//-----------------------------------------------------------------------------------------------------//

function segedDivekLetrhozasa() {
    let segedDivClass = 36
    for (let i = 0; i < 22; i++) {
        $("table").append("<div class = 'seged-div " + (segedDivClass + i) + " seged-" + i + "' id = " + i + "></div>")
    }
}
function segedDivekElhelyezese() {
    let segedDivSzelesseg_magassaga = 3
    let tdSzelesseg = 100 / 12
    let elsoHelye = tdSzelesseg - segedDivSzelesseg_magassaga / 2
    let magassag = (100 / 3) - (segedDivSzelesseg_magassaga * 2)
    let szorzo = 0
    let irany = "bottom"
    let tolas
    for (let i = 0; i < 23; i++) {
        if (i > 10) {
            irany = "top"
            tolas = elsoHelye + szorzo * tdSzelesseg
            szorzo++
        }
        else {
            tolas = elsoHelye + i * tdSzelesseg
        }
        $(".seged-" + i + "").css("left", "" + tolas + "%")
        $(".seged-" + i + "").css(irany, "" + magassag + "%")
    }
}


//-----------------------------------------------------------------------------------------------------//

function zsetonKivalasztas() {
    $("#zsetonok img").css("width", "10%")
    $(this).css("width", "11%")
    let id = $(this).attr("id")
    zsetonErtek = id
}

function ertekFelrakas() {
    if (jatekosZseton >= zsetonErtek) {
        $(this).prepend("<img src = 'rulett_kepek/zseton" + zsetonErtek + ".png' class='beillesztett-zseton " + zsetonErtek + "'>")
        jatekosZsetonLevonas()
        $(this).off()
    }
}

function jatekosZsetonLevonas() {
    jatekosZseton -= zsetonErtek
    jatekosZsetonKiiras()
}

function jatekosZsetonKiiras() {
    $("#jatekos-zseton").text(jatekosZseton)
}
//-----------------------------------------------------------------------------------------------------//

function elemForgatas(angle, elem) {
    let $elem = $('#' + elem)

    $({ deg: 0 }).animate({ deg: angle }, {
        duration: 10000,
        step: function (now) {
            $elem.css({
                transform: 'rotate(' + now + 'deg)'
            })
        }
    })
}
let szamlalo = 0
function randomForgatas(elem, irany,) {
    const szamFok = 360 / 37
    let random = Math.floor(Math.random() * 37)
    let tol = random * szamFok
    let forgat = irany * 5040 + tol
    if (szamlalo === 1) {
        golyoEltolas = random
    }
    elemForgatas(forgat, elem)
    szamlalo++;
}
//-----------------------------------------------------------------------------------------------------//

function nyertSzamMeghatarozas() {
    nyeroSzam = kerekSzamokSorrendje[golyoEltolas]
    console.log(nyeroSzam)
}

function ellenorzesek() {
    ellenorzesTd()
    ellenorzesTolIg()
    ellenorzesParospParatlan()
    ellenorzesFeketePiros()
    ellenorzesSegedDiv()
    nyeremenyHozzaAdas()
}

function ellenorzesTd() {
    felrakottZsetonLekeres("#td" + (nyeroSzam - 1), 0,36)
}
function ellenorzesTolIg() {
    if (nyeroSzam >= 1 && nyeroSzam <= 12) {
        felrakottZsetonLekeres("#elso-12", 1,3)
    }
    else if (nyeroSzam >= 13 && nyeroSzam <= 24) {
        felrakottZsetonLekeres("#masodik-12", 1,3)
    }
    else if (nyeroSzam >= 25 && nyeroSzam <= 36) {
        felrakottZsetonLekeres("#harmadik-12", 1,3)
    }
}
function ellenorzesParospParatlan() {
    if (nyeroSzam % 2 === 0 && nyeroSzam !== 0) {
        felrakottZsetonLekeres("#paros",1,2)
    }
    else if (nyeroSzam % 2 === 1) {
        felrakottZsetonLekeres("#paratlan",1.2)
    }
}

function ellenorzesFeketePiros() {
    if (pirosak.includes(nyeroSzam)) {
        felrakottZsetonLekeres("#piros",1)
    }
    else if (feketek.includes(nyeroSzam)) {
        felrakottZsetonLekeres("#fekete",1,2)
    }
}
function ellenorzesSegedDiv(){
    
}
function felrakottZsetonLekeres(elem,szam,szorzo) {
    let gyerekek = $(elem).children()
    if (gyerekek.length > szam) {
        let gyerekZsetonErtek = parseInt($(gyerekek).attr('class').split(' ')[1])
        JatekosNyeremeny += gyerekZsetonErtek * szorzo
    }
}

function nyeremenyHozzaAdas() {
    jatekosZseton += JatekosNyeremeny
    jatekosZsetonKiiras()
}
//-----------------------------------------------------------------------------------------------------//

function magassagAllitasTd() {
    let cw = $('td').width() + 0.01
    $('td').css({ 'height': cw + 'px' })
    let cw2 = $('.seged-div').width() + 2.01
    $('.seged-div').css({ 'height': cw2 + 'px' })
}