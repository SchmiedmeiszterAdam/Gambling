var jatekos_szamjai = []
var b_oszlop = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
var i_oszlop = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
var n_oszlop = [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45]
var g_oszlop = [46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60]
var o_oszlop = [61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75]

var jatekos_tomb_szamlalo = 0
$(function () {
    jatek_kezdes();
});


function jatek_kezdes() {
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
    szamgeneralas();
}





function szamgeneralas() {
    console.log(jatekos_szamjai);
    var seged = 0;
    $("table").empty();
    var index = 0;
    for (let i = 0; i < jatekos_szamjai.length; i++) {
        if (i % 5 === 0) {
            index++;
            $("table").append("<tr>");
        }
        $("table tr").eq(index).append("<td>" + jatekos_szamjai[seged] + "</td>");
        console.log(i);
        if (seged === 20) {
            seged = 1;
        }
        else if (seged === 21) {
            seged = 2;
        }
        else if (seged === 22) {
            seged = 3;
        }
        else if (seged === 23) {
            seged = 4;
        }
        else if (seged === 24) {
            seged = 5;
        }
        else {
            seged += 5;
        }
        
    }
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