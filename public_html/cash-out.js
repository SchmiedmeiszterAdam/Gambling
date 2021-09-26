var bombaHely = []
var bombakSzama = 1;
const bombaHelyLehetosegek = []
var jatekosZseton = 5000
let jatekosTet = 100
let vegsoSzorzo
let nyeremeny = 100
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
    $("#jatekos-zseton").text(jatekosZseton)
    $(".tet-max").on("click", tetMaxolas)

});

function jatekInditas() {
    tablazatLetrehozas()
    bombaLehetosegekFeltoltes()
    bombaElhelyezes()
    $(".kartya").on("click", forgat)
    $("td").on("click", ellenorzes)
    $("td").on("click", nyeremenySzorzo)
    osszesGomb_Ki_Be_kapcsolas(true)
    $("#aktualis-nyeremeny").text(jatekosTet)
    jatekosZsetonLevonas()
}
function jatekosZsetonLevonas(){
    jatekosZseton -= jatekosTet
    $("#jatekos-zseton").text(jatekosZseton)
}
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
function nyeremenySzorzo() {
    let szorzo = Math.floor(Math.random() * 6)
    vegsoSzorzo = szorzo * 0.05
    console.log("Végső sz: " + vegsoSzorzo, " Nyeremény "+nyeremeny)
    $(this).off()
    nyeremeny += jatekosTet * vegsoSzorzo
    console.log("Játékos tét" + jatekosTet," Nyeremény "+nyeremeny)
    $("#aktualis-nyeremeny").text(Math.floor(nyeremeny))
}
function tetMaxolas() {
    jatekosTet = jatekosZseton
    nyeremeny = jatekosTet
    $("#ertek").val(jatekosTet)
    $(".felezo").prop("disabled", false)
    $(".dupla").prop("disabled", true)
}
function ertekValtoztatas() {
    let gomb = $(this).attr("id")
    let ertek = $("#ertek").val()

    if (ertek <= 100 && gomb === "0.5") {
        $(".felezo").prop("disabled", true)
    } else {
        jatekosTet = gomb * ertek
        nyeremeny = jatekosTet
        $("#ertek").val(jatekosTet)
        $(".felezo").prop("disabled", false)
    }
    if (jatekosZseton < jatekosTet) {
        $("#max").prop("disabled", true)
        $(".dupla").prop("disabled", true)
        $("#inditas").prop("disabled", true)
    }
    else if (jatekosTet > jatekosZseton / 2) {
        $(".dupla").prop("disabled", true)
        jo = false
    }
    else {
        $("#max").prop("disabled", false)
        $(".dupla").prop("disabled", false)
        $("#inditas").prop("disabled", false)
    }
    if (jatekosTet < 200) {
        $(".felezo").prop("disabled", true)
    }
}
function ertekLekeresEllenorzes() {
    let ertek = $("#ertek").val()
    console.log(ertek)
    let jo = true
    if (ertek < 200) {
        $(".felezo").prop("disabled", true)
    }
    else {
        $(".felezo").prop("disabled", false)
    }

    if (jatekosZseton < ertek || ertek < 1) {
        $("#max").prop("disabled", true)
        $(".dupla").prop("disabled", true)
        $("#inditas").prop("disabled", true)
        jo = false
    }
    else if (ertek > jatekosZseton / 2) {
        $(".dupla").prop("disabled", true)
        jo = false
    }
    else {
        $("#max").prop("disabled", false)
        $(".dupla").prop("disabled", false)
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
        jatekosTet=ertek
        nyeremeny = jatekosTet
    }
}
function osszesGomb_Ki_Be_kapcsolas(be_ki) {
    $(".bomba-gomb").prop("disabled", be_ki)
    $("#inditas").prop("disabled", be_ki)
    $(".tet-gomb").prop("disabled", be_ki)
    $("#ertek").prop("disabled", be_ki)
}
function bombaLehetosegekFeltoltes() {
    for (let i = 0; i < 25; i++) {
        bombaHelyLehetosegek[i] = i
    }
}
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
function bombaSzamKivalasztas() {
    bombakSzama = $(this).attr("id")
    console.log(bombakSzama)
    $(".bomba-gomb").css("background-color", "white")
    $(this).css("background-color", "red")
}
function bombaElhelyezes() {
    bombaHely = []
    for (let i = 0; i < bombakSzama; i++) {
        var bombak = Math.floor(Math.random() * bombaHelyLehetosegek.length);
        bombaHely[i] = bombaHelyLehetosegek[bombak]
        bombaHelyLehetosegek.splice(bombak, 1)
    }
    console.log(bombaHely)
}
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
        osszesGomb_Ki_Be_kapcsolas(false)
        ujJatekMegjelenit()
    }
    else {
        $(this).append("<img src='cash_out_kepek/elolap.jpg' class='elolap'></img>")
    }
}
function ujJatekMegjelenit() {
    $("#uj-jatek").css("display", "block")
    $("#jatek-ter").css("opacity", "0.2")
}
function forgat() {
    $(this).addClass("flip")
}
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