var bombaHely = []
var bombakSzama = 1;
const bombaHelyLehetosegek = []
var jatekosZseton = 5000
let jatekosTet = 100

let nyeremeny;
$(function () {
    tablazatLetrehozas()
    $("#inditas").on("click", jatekInditas)
    $(".bomba-gomb").on("click", bombaSzamKivalasztas)
    $("#uj").on("click", ujJatek)
    $(".bomba-gomb").on("mouseenter", hoverAllitas)
    $(".bomba-gomb").on("mouseleave", hoverLevetel)
    $("#ertek").keyup(ertekLekeresEllenorzes)
    $(".tet-felezo-duplazo").on("click", ertekValtoztatas)
    $(".felezo").prop("disabled", true)
    jatekosZsetonKiiras()
    $(".tet-max").on("click", tetMaxolas)
});

function jatekInditas() {
    $("#kivetel").on("click", nyeremenyKivetel)
    $("#kivetel").prop("disabled", false)
    tablazatLetrehozas()
    bombaLehetosegekFeltoltes()
    bombaElhelyezes()
    $(".kartya").on("click", forgat)
    $("td").on("click", ellenorzes)
    osszesGomb_Ki_Be_kapcsolas(true)
    $("#aktualis-nyeremeny").text(jatekosTet)
    jatekosZsetonLevonas()
    nyeremeny = jatekosTet
}
//-----------------------------------------------------------------------------------------------------//

function tablazatLetrehozas() {
    $("#tablazat").empty()
    let idSzamalalo = 0;
    $("#tablazat").append("<table></table>")
    for (let i = 0; i < 5; i++) {
        $("#tablazat table").append("<tr></tr>")
        for (let j = 0; j < 5; j++) {
            $("#tablazat table tr").eq(i).append("<td id =" + idSzamalalo + " class = 'tabla-td kartya'><img src='cash_out_kepek/hatlap.jpg' class='hatlap'></td>")
            idSzamalalo++;
        }
    }
}
//-----------------------------------------------------------------------------------------------------//

function ujJatek() {
    $("#uj-jatek").css("display", "none")
    $("#jatek-ter").css("opacity", "1")
    osszesGomb_Ki_Be_kapcsolas(false)
    bombaSzamVisszaallitas()
}
function bombaSzamVisszaallitas() {
    bombakSzama = 1
    $(".bomba-gomb").css("background-color", "white")
    $(".piros").css("background-color", "red")
}
function ujJatekMegjelenit() {
    $("#uj-jatek").css("display", "block")
    $("#jatek-ter").css("opacity", "0.2")
}
//-----------------------------------------------------------------------------------------------------//

function bombaElhelyezes() {
    bombaHely = []
    for (let i = 0; i < bombakSzama; i++) {
        var bombak = Math.floor(Math.random() * bombaHelyLehetosegek.length)
        bombaHely[i] = bombaHelyLehetosegek[bombak]
        bombaHelyLehetosegek.splice(bombak, 1)
    }
    console.log(bombaHely)
}


//-----------------------------------------------------------------------------------------------------//

function tetMaxolas() {
    jatekosTet = jatekosZseton
    $("#ertek").val(jatekosTet)
    felezoKiBeKapcsolas(false)
    duplaKiBeKapcsolas(true)
}
function ertekValtoztatas() {
    let gomb = $(this).attr("id")
    let ertek = $("#ertek").val()


    if (ertek <= 100 && gomb === "0.5") {
        felezoKiBeKapcsolas(true)
    } else {
        jatekosTet = gomb * ertek
        $("#ertek").val(jatekosTet)
        felezoKiBeKapcsolas(false)
    }
    if (jatekosTet > jatekosZseton / 2) {
        duplaKiBeKapcsolas(true)
    } else {
        duplaKiBeKapcsolas(false)
    }
    if (jatekosTet < 200) {
        felezoKiBeKapcsolas(true)
    }
}
function ertekLekeresEllenorzes() {
    let ertek = parseInt($("#ertek").val())
    let jo = true
    if (ertek < 200) {
        felezoKiBeKapcsolas(true)
    }
    else {
        felezoKiBeKapcsolas(false)
    }

    if (jatekosZseton < ertek || ertek < 1) {
        $("#max").prop("disabled", true)
        duplaKiBeKapcsolas(true)
        $("#inditas").prop("disabled", true)
        jo = false
    }
    else if (ertek > jatekosZseton / 2) {
        duplaKiBeKapcsolas(true)
    }
    else {
        $("#max").prop("disabled", false)
        duplaKiBeKapcsolas(false)
        $("#inditas").prop("disabled", false)
        jo = true
    }
    if (ertek < 100) {
        $("#ertek").css("border", "3px solid red")
        $("#inditas").prop("disabled", true)
    }
    else if (jo) {
        $("#ertek").css("border", "1px solid lightgray")
        $("#inditas").prop("disabled", false)
        jatekosTet = ertek
    }
}
//-----------------------------------------------------------------------------------------------------//

function felezoKiBeKapcsolas(be_ki) {
    $(".felezo").prop("disabled", be_ki)
}
function duplaKiBeKapcsolas(be_ki) {
    $(".dupla").prop("disabled", be_ki)
}
function osszesGomb_Ki_Be_kapcsolas(be_ki) {
    $(".bomba-gomb").prop("disabled", be_ki)
    $("#inditas").prop("disabled", be_ki)
    $(".tet-gomb").prop("disabled", be_ki)
    $("#ertek").prop("disabled", be_ki)
}
//-----------------------------------------------------------------------------------------------------//

function jatekosZsetonLevonas() {
    jatekosZseton -= jatekosTet
    jatekosZsetonKiiras()
}
//-----------------------------------------------------------------------------------------------------//

function bombaSzamKivalasztas() {
    bombakSzama = $(this).attr("id")
    console.log(bombakSzama)
    $(".bomba-gomb").css("background-color", "white")
    $(this).css("background-color", "red")
}
//-----------------------------------------------------------------------------------------------------//

function ellenorzes() {
    let robban = false
    let id = parseInt($(this).attr("id"))
    let i = 0
    while (i < bombaHely.length && !robban) {
        if (id === bombaHely[i]) {
            robban = true
        }
        i++
    }
    if (robban) {
        $(".kartya").off()
        $(this).append("<img src='cash_out_kepek/bomba.jpg' class='elolap'></img>")
        ujJatekMegjelenit()
        $("#kivetel").prop("disabled", true)
        $("#kivetel").off()
    }
    else {
        $(this).append("<img src='cash_out_kepek/elolap.jpg' class='elolap'></img>")
        nyeremenySzorzo()
        $(this).off()
    }
}
//-----------------------------------------------------------------------------------------------------//

function nyeremenySzorzo() {
    let szorzo = Math.floor(Math.random() * 6)
    let vegsoSzorzo = (szorzo * 0.05).toFixed(2)
    $(this).off()
    nyeremeny += jatekosTet * vegsoSzorzo
    $("#aktualis-nyeremeny").text(Math.floor(nyeremeny))
}
function nyeremenyKivetel() {
    jatekosZseton += nyeremeny
    jatekosZsetonKiiras()
    ujJatek()
    osszesGomb_Ki_Be_kapcsolas(false)
    $("#aktualis-nyeremeny").text("")
    $(this).off()
}
//-----------------------------------------------------------------------------------------------------//

function forgat() {
    $(this).addClass("flip")
}
//-----------------------------------------------------------------------------------------------------//

function bombaLehetosegekFeltoltes() {
    for (let i = 0; i < 25; i++) {
        bombaHelyLehetosegek[i] = i
    }
}
//-----------------------------------------------------------------------------------------------------//

function hoverAllitas() {
    let gomb = $(this).attr("id")
    if (gomb != bombakSzama) {
        $(this).css("background-color", "rgb(218, 214, 210)")
    }
    else {
        $(this).css("background-color", "red")
    }
}
function hoverLevetel() {
    let gomb = $(this).attr("id")
    if (gomb != bombakSzama) {
        $(this).css("background-color", "white")
    }
}
//-----------------------------------------------------------------------------------------------------//

function jatekosZsetonKiiras() {
    $("#jatekos-zseton").text(jatekosZseton)
}