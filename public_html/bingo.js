var jatekos_szamjai = [];
const b_oszlop = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const i_oszlop = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
const n_oszlop = [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
const g_oszlop = [46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60];
const o_oszlop = [61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75];

var osszes_szam = [];
var szerepelt_szamok = []
var i = 0;
var jo = false;
var sebesseg = 4000;

var nyert;
var szam2;
var jatekos_tomb_szamlalo;
var generalas;
$(function () {
    szamKiosztas();
    tablazatLetrehozas();    
    $("#kezd").on("click", jatekElkezdese)
});

function jatekElkezdese() {
    osszesSzamFeltoltes();
    $("#kezdes").css("display", "none")
    idozito();
    $("#kezd").click(jatekElkezdese);
    $("#igen").click(ujJatek);
    $("td").click(ellenorzes);
    $("#fel-nyil").click(sebessegNoveles);
    $("#le-nyil").click(sebessegCsokkentes);
}
//-----------------------------------------------------------------------------------------------------//


function szamKiosztas() {
    jatekos_tomb_szamlalo = 0;
    jatekos_szamjai = []
    keveres(b_oszlop);
    keveres(i_oszlop);
    keveres(n_oszlop);
    keveres(g_oszlop);
    keveres(o_oszlop);
    for (let i = 0; i < 5; i++) {
        jatekos_szamjai[jatekos_tomb_szamlalo] = b_oszlop[i];
        jatekos_tomb_szamlalo++;
    }
    for (let i = 0; i < 5; i++) {
        jatekos_szamjai[jatekos_tomb_szamlalo] = i_oszlop[i];
        jatekos_tomb_szamlalo++;
    }
    for (let i = 0; i < 5; i++) {
        jatekos_szamjai[jatekos_tomb_szamlalo] = n_oszlop[i];
        jatekos_tomb_szamlalo++;
    }
    for (let i = 0; i < 5; i++) {
        jatekos_szamjai[jatekos_tomb_szamlalo] = g_oszlop[i];
        jatekos_tomb_szamlalo++;
    }
    for (let i = 0; i < 5; i++) {
        jatekos_szamjai[jatekos_tomb_szamlalo] = o_oszlop[i];
        jatekos_tomb_szamlalo++;
    }
}
//-----------------------------------------------------------------------------------------------------//

function tablazatLetrehozas() {
    $("table").empty();
    let index = 0;
    for (let i = 0; i < 5; i++) {
        $("table").append("<tr>");
    }
    for (let i = 0; i < jatekos_szamjai.length; i++) {
        if (index % 5 === 0) {
            index = 0;
        }
        $("table tr").eq(index).append("<td id = " + i + ">" + jatekos_szamjai[i] + "</td>");
        index++;
    }
}
//-----------------------------------------------------------------------------------------------------//

function ellenorzes() {
    let index = this.id;
    let ertek = jatekos_szamjai[index];
    for (let i = 0; i < szerepelt_szamok.length; i++) {
        if (ertek === szerepelt_szamok[i]) {
            $(this).addClass("volt");
            jo = true;
        }
    }
    if (szam2 !== ertek && !jo) {
        $("td").css("border", "1px solid red");
    }
    setTimeout(function () {
        $("td").css("border", "1px solid black");
    }, 2000);
    jo = false;
    if (szamol() === 25) {
        setTimeout(function () {
            alert("Nyertél");
            uj();
        }, 100);
        nyert = true;
        idozitoMegallitas();
    }

}
function RandomSzamGeneralas() {
    if (!nyert) {
        let szam = Math.floor(Math.random() * osszes_szam.length);
        szam2 = osszes_szam[szam];
        szerepelt_szamok[i] = szam2;
        $("#szam-megjelenito").text(osszes_szam[szam]);
        osszes_szam.splice(szam, 1);
        i++;
    }
    if (osszes_szam.length === 0) {
        alert("Vesztettél")
        idozitoMegallitas()
        uj()
    }
    console.log(sebesseg)
}
//-----------------------------------------------------------------------------------------------------//

function idozito() {
    generalas = setInterval(RandomSzamGeneralas, sebesseg);
}
function idozitoMegallitas() {
    clearInterval(generalas);
}
//-----------------------------------------------------------------------------------------------------//

function osszesSzamFeltoltes() {
    osszes_szam = [];
    for (let i = 1; i < 76; i++) {
        osszes_szam[i - 1] = i;
    }
    szerepelt_szamok = [];
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
//-----------------------------------------------------------------------------------------------------//

function ujJatek() {
    $("#ujrakezdes").css("display", "none")
    $("#szam-megjelenito").text("")
    nyert = false
    jatekos_tomb_szamlalo = 0
    idozitoMegallitas()
    szamKiosztas()
    tablazatLetrehozas()
    jatekElkezdese()
}
function uj() {
    $("#ujrakezdes").css("display", "flex");
}
//-----------------------------------------------------------------------------------------------------//

function sebessegNoveles() {
    if (sebesseg > 2000) {
        sebesseg -= 500;
        idozitoMegallitas();
        idozito();
    }
    console.log(sebesseg);
}
function sebessegCsokkentes() {
    if (sebesseg < 8000) {
        sebesseg += 500;
        idozitoMegallitas();
        idozito();
    }
    console.log(sebesseg);
}
//-----------------------------------------------------------------------------------------------------//

function szamol() {
    let db = $(".volt").length;
    return db;
}