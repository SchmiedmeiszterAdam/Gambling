var kepek = ["alma", "bar", "csengo", "cseresznye", "dinnye", "erme", "gyemant", "lohere", "patko", "sziv", "szolo", "szolo_szem"]
var nyert = []
var tetekTomb = [10, 50, 100, 200, 500]
var tetSzamlalo = 0
var jatekosPontszam = 10000
$(function () {
    oszlopokFeltoltes()
    $("#porgeto-gomb").on("click", jatekInditas)
    $("#tet").text(tetekTomb[0])
    $("#tet-novelo").on("click", tetNoveles)
    $("#tet-csokkento").on("click", tetCsokkentes)
    $("#pontszam-kijelzo").text(jatekosPontszam)

});
function jatekInditas() {
    if (jatekosPontszam < tetekTomb[tetSzamlalo]) {
        alert("Nincs money-d szegény vagy")
    }
    else {
        porgetes()
    }
}
//-----------------------------------------------------------------------------------------------------//

function oszlopokFeltoltes() {
    for (i = 1; i < 4; i++) {
        keveres(kepek);
        nyert[i - 1] = kepek[kepek.length - 1]
        $("#oszlop-" + i + "").empty();
        for (j = 0; j < kepek.length; j++) {
            $("#oszlop-" + i + "").append("<span style='--i:" + (j + 1) + ";'><div id = 'oszlop-" + i + "-icon-" + (j + 1) + "'></div></span>");
            $("#oszlop-" + i + "-icon-" + (j + 1) + "").css("background-image", "url(fel_karu_rablo_kepek/" + kepek[j] + ".png)");
        }
    }
    console.log(nyert)
}
function oszlopElinditas() {
    $("#oszlop-1").addClass("porgetes");
    $("#oszlop-2").addClass("porgetes");
    $("#oszlop-3").addClass("porgetes");
}
function oszlopMegallitas() {
    setTimeout(function () { $("#oszlop-1").removeClass("porgetes") }, 4000)
    setTimeout(function () { $("#oszlop-2").removeClass("porgetes") }, 6000)
    setTimeout(function () { $("#oszlop-3").removeClass("porgetes") }, 8000)
}

//-----------------------------------------------------------------------------------------------------//

function porgetes() {
    $("#porgeto-gomb").off();
    oszlopokFeltoltes()
    oszlopElinditas();
    gombkikapcsolas();
    oszlopMegallitas();
    setTimeout(gombVisszakapcsolas, 8800);
    setTimeout(function () { $("#porgeto-gomb").on("click", jatekInditas) }, 9000)
    setTimeout(ellenorzes, 8500)
}

//-----------------------------------------------------------------------------------------------------//
function gombkikapcsolas() {
    $("#tet-novelo").prop("disabled", true)
    $("#tet-csokkento").prop("disabled", true)

}
function gombVisszakapcsolas() {
    $("#tet-novelo").prop("disabled", false)
    $("#tet-csokkento").prop("disabled", false)
}
//-----------------------------------------------------------------------------------------------------//

function tetNoveles() {
    if (tetSzamlalo < 4) {
        tetSzamlalo++
    }
    $("#tet").text(tetekTomb[tetSzamlalo])
}
function tetCsokkentes() {
    if (tetSzamlalo > 0) {
        tetSzamlalo--
    }
    $("#tet").text(tetekTomb[tetSzamlalo])
}
//-----------------------------------------------------------------------------------------------------//

function ellenorzes() {

    if (nyert[0] === nyert[1] && nyert[1] === nyert[2] && nyert[0] === nyert[2]) {
        jatekosPontszam += (tetekTomb[tetSzamlalo] * 2)
    }
    else {
        jatekosPontszam -= tetekTomb[tetSzamlalo]

    }
    $("#pontszam-kijelzo").text(jatekosPontszam)

}
//-----------------------------------------------------------------------------------------------------//
function keveres(tomb) {
    var currentIndex = tomb.length, randomIndex;

    while (currentIndex != 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [tomb[currentIndex], tomb[randomIndex]] = [
            tomb[randomIndex], tomb[currentIndex]];
    }
    return tomb;
}
//A tömböt ne keverje, hanem tolja el egy random mennyiséggel. A sorrend maradjon. *****
//Ha a randomnál ugyan azokat a számokat kapjuk, meg kell oldani hogy mégis máshogy nézzen ki a pörgetés ******
//2 gombbal növelni/csökkentetni lehet a tétet. min 10 max 500 -----------
//A tét ne változzon pörgetések között csak ha a felhasználó csökkenti vagy növeli --------
//gomb nyomásra induljon el a pörgetés ----------
//ha veszít vonja le az összeget amit felrakott --------
//ha nincs már annyi pénze amennyit fel akar rakni, ne engedje játszani -------------
//ha nyer egy bizonyos szorzót rakunk a feltett tétre
//Hasonlítson valamennnyire egy slot machine-ra

