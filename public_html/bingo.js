var jatekos_szamjai = [];
var b_oszlop = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
var i_oszlop = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
var n_oszlop = [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
var g_oszlop = [46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60];
var o_oszlop = [61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75];

var osszes_szam = [];
var szam_mennyiseg = 75;
var szerepelt_szamok = []
var i =0;
var jo = false;

var nyert;
var szam;
var szam2;
var jatekos_tomb_szamlalo;
$(function () {
    jatek_elkezdese();
    $("#kezd").click(jatek_elkezdese);
    $("td").click(ellenorzes);
    $("#igen").click(ujJatek);
});

function jatek_kezdes() {
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
    tablazatLetrehozas();
}



function jatek_elkezdese(){
    osszes_szam_feltoltes();
    jatek_kezdes();    
    jatek();
}

function tablazatLetrehozas() {
    $("table").empty();
    var index = 0;
    for (var i = 0; i < 5; i++) {
        $("table").append("<tr>");
    }
    for (let i = 0; i < jatekos_szamjai.length; i++) {
        if (index % 5 === 0) {
            index = 0;
        }
        $("table tr").eq(index).append("<td id = "+ i +">" + jatekos_szamjai[i] + "</td>");
        index++;
    }
}

function ellenorzes(){
    var index = this.id;
    var ertek = jatekos_szamjai[index];    
    console.log(ertek,index,szam2);
    for (let i = 0; i < szerepelt_szamok.length; i++) {
        console.log(szerepelt_szamok[i]);
        if(ertek === szerepelt_szamok[i]){
            $(this).addClass("volt");
            jo = true;
        }
    }
    if(szam2 !== ertek && !jo){
        $("td").css("border","1px solid red");
    }
    setTimeout(function () {
        $("td").css("border","1px solid black");
      }, 2000);
    jo = false;
    if(szamol() === 25){
        setTimeout(function () {
            alert("Nyertél");
            uj();
          }, 100);
          nyert = true;
    }
    if(osszes_szam.length === 0){
        alert("Vesztettél")
    }
}
function szamgeneralas(){
    if(!nyert){
        szam = Math.floor(Math.random() * szam_mennyiseg);
        szam2 = osszes_szam[szam];
        szerepelt_szamok[i] = szam2;
        $("#szam-megjelenito").text(osszes_szam [szam]);
        osszes_szam.splice(szam,1);
        szam_mennyiseg--;
        i++;
    }
        
}
function jatek(){ 
    setInterval(szamgeneralas,4000);
}

function szamol(){
    var db = $(".volt").length;
    return db;
}


function osszes_szam_feltoltes(){
    osszes_szam = [];
    for (let i = 1; i < 76; i++) {
        osszes_szam [i-1] = i;
    }
}
function uj(){
    $("#ujrakezdes").css("display","flex");
}

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
function ujJatek(){
    $("#ujrakezdes").css("display","none");
    nyert = false;
    jatekos_tomb_szamlalo = 0;
    jatek_elkezdese();
}