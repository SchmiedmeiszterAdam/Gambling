$(function () {
    $(window).bind("resize", magassagAllitasTd)
    let zsetonErtek = 10
    let nyeroSzam
    let jatekosZseton = 1000
    const kerekSzamokSorrendje = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26]
    let JatekosNyeremeny
    const pirosak = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 90, 32, 34, 36]
    let kattintottak = [false, false, false, false, false]
    let szamlalo

    elsoLepesek()
    //jatekKezdes()
    function jatekMenete() {
        JatekosNyeremeny = 0
        szamlalo = 0
        setTimeout(kerekForgatas, 6000)
        setTimeout(ellenorzesek, 17000)
        setTimeout(tetrakasTiltasa, 14000)
        setTimeout(function () { $(".beillesztett-zseton").remove() }, 19000)
        idoKijelzes()
        $("#zsetonok img").on("click", zsetonKivalasztas)
        $(".seged-div, #paros, #paratlan, .szamTd, .tol-ig-gombok, #piros, #fekete").on("click", ertekFelrakas)
        kattintottak = [false, false, false, false, false]
    }
    function jatekKezdes() {
        jatekMenete()
        setInterval(jatekMenete, 22000)
    }
    function elsoLepesek() {
        tablazatLetrehozas()
        segedDivekLetrhozasa()
        setTimeout(magassagAllitasTd, 100)
        jatekosZsetonKiiras()
    }

    //-----------------------------------------------------------------------------------------------------//

    function kerekForgatas() {
        randomForgatas("kerek", "1")
        randomForgatas("golyo-tarolo", "-2")
    }

    //-----------------------------------------------------------------------------------------------------//

    function tablazatLetrehozas() {
        $("#tabla").append("<table></table>")
        for (let i = 0; i < 3; i++) {
            $("table").append("<tr id = tr-" + (i + 1) + ">")
        }

        let szuloElem
        for (let i = 0; i < 36; i++) {
            if (i % 3 === 0) {
                szuloElem = $("table tr").eq(2)
            }
            else if (i % 3 === 1) {
                szuloElem = $("table tr").eq(1)
            }
            else {
                szuloElem = $("table tr").eq(0)
            }
            const ujTd = $("<td id=' td-" + (i + 1) + "' class = 'szamTd'>" + (i + 1) + "</td>").appendTo(szuloElem)
            const td = new Td(ujTd, i)
        }
    }
    //-----------------------------------------------------------------------------------------------------//

    function segedDivekLetrhozasa() {
        let szuloElem = $("table")
        for (let i = 0; i < 22; i++) {
            const ujSegedDiv = $("<div class = 'seged-div'></div>").appendTo(szuloElem)
            const div = new segedDiv(ujSegedDiv, i)
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
        kattintottBeallitas(this)
    }
    function kattintottBeallitas(elemNev) {
        let nev = $(elemNev).attr("class").split(" ")[0]
        if (nev === "szamTd") {
            kattintottak[0] = true
        }
        if (nev === "seged-div") {
            kattintottak[1] = true
        }
        if (nev === "tol-ig-gombok") {
            kattintottak[2] = true
        }
        if (nev === "paros-paratlan") {
            kattintottak[3] = true
        }
        if (nev === "piros-fekete") {
            kattintottak[4] = true
        }
    }
    function tetrakasTiltasa() {
        $(".seged-div, #paros, #paratlan, .szamTd, .tol-ig-gombok, #piros, #fekete").off()
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
        let $elem = $("#" + elem)

        $({ deg: 0 }).animate(
            { deg: angle },
            {
                duration: 11000,
                step: function (now) {
                    $elem.css({
                        transform: "rotate(" + now + "deg)",
                    });
                },
            }
        );
    }
    function randomForgatas(elem, irany) {
        const szamFok = 360 / 37
        let random = Math.floor(Math.random() * 37)
        let tol = random * szamFok
        let forgat = irany * 4320 + tol
        if (szamlalo === 1) {
            nyertSzamMeghatarozas(random)
        }
        elemForgatas(forgat, elem)
        szamlalo++
    }
    //-----------------------------------------------------------------------------------------------------//

    function nyertSzamMeghatarozas(random) {
        nyeroSzam = kerekSzamokSorrendje[random]
        console.log("Nyerőszám: " + nyeroSzam)
    }

    function ellenorzesek() {
        if (kattintottak[0] === true) {
            ellenorzesTd()
            console.log("TD")
        }
        if (kattintottak[1] === true) {
            ellenorzesSegedDiv()
            console.log("seged")
        }
        if (kattintottak[2] === true) {
            ellenorzesTolIg()
            console.log("tol")
        }
        if (kattintottak[3] === true) {
            ellenorzesParospParatlan()
            console.log("paros")
        }
        if (kattintottak[4] === true) {
            ellenorzesFeketePiros()
            console.log("piros")
        }
        nyeremenyHozzaAdas()
    }

    function ellenorzesTd() {
        console.log(this.felrakottErtek)
        felrakottZsetonLekeres("#td" + (nyeroSzam - 1), 0, 36)
    }
    function ellenorzesTolIg() {
        if (nyeroSzam >= 1 && nyeroSzam <= 12) {
            felrakottZsetonLekeres("#elso-12", 1, 3);
        } else if (nyeroSzam >= 13 && nyeroSzam <= 24) {
            felrakottZsetonLekeres("#masodik-12", 1, 3);
        } else if (nyeroSzam >= 25 && nyeroSzam <= 36) {
            felrakottZsetonLekeres("#harmadik-12", 1, 3);
        }
        if (nyeroSzam >= 1 && nyeroSzam <= 18) {
            felrakottZsetonLekeres("#elso-18", 1, 2);
        } else if (nyeroSzam >= 19 && nyeroSzam <= 36) {
            felrakottZsetonLekeres("#masodik-18", 1, 2);
        }
    }
    function ellenorzesParospParatlan() {
        if (nyeroSzam % 2 === 0 && nyeroSzam !== 0) {
            felrakottZsetonLekeres("#paros", 1, 2);
        } else if (nyeroSzam % 2 === 1) {
            felrakottZsetonLekeres("#paratlan", 1, 2);
        }
    }

    function ellenorzesFeketePiros() {
        if (pirosak.includes(nyeroSzam)) {
            felrakottZsetonLekeres("#piros", 1, 2);
        } else if (nyeroSzam != 0) {
            felrakottZsetonLekeres("#fekete", 1, 2);
        }
    }
    function ellenorzesSegedDiv() {
        const szorzo = 8;
        const zsetonSorszam = 0;
        if (nyeroSzam % 3 === 1) {
            let szam;
            let szam2;
            if (nyeroSzam === 1) {
                szam2 = Math.floor(nyeroSzam / 3);
                felrakottZsetonLekeres(".seged-0", zsetonSorszam, szorzo);
            } else if (nyeroSzam == 34) {
                szam = Math.floor(nyeroSzam / 3 - 1);
                felrakottZsetonLekeres(".seged-10", zsetonSorszam, szorzo);
            } else {
                szam = Math.floor(nyeroSzam / 3 - 1);
                felrakottZsetonLekeres(".seged-" + szam, zsetonSorszam, szorzo);
                szam2 = Math.floor(nyeroSzam / 3);
                felrakottZsetonLekeres(".seged-" + szam2, zsetonSorszam, szorzo);
            }
        } else if (nyeroSzam % 3 === 2) {
            let szam;
            let szam2;
            let szam3;
            let szam4;
            if (nyeroSzam === 2) {
                szam2 = Math.floor(nyeroSzam / 3);
                felrakottZsetonLekeres(".seged-" + szam2, zsetonSorszam, szorzo);
                szam3 = szam2 + 11;
                felrakottZsetonLekeres(".seged-" + szam3, zsetonSorszam, szorzo);
            } else if (nyeroSzam == 35) {
                szam = Math.floor(nyeroSzam / 3 - 1);
                felrakottZsetonLekeres(".seged-" + szam, zsetonSorszam, szorzo);
                szam4 = szam + 11;
                felrakottZsetonLekeres(".seged-" + szam4, zsetonSorszam, szorzo);
            } else {
                szam = Math.floor(nyeroSzam / 3 - 1);
                felrakottZsetonLekeres(".seged-" + szam, zsetonSorszam, szorzo);
                szam2 = Math.floor(nyeroSzam / 3);
                felrakottZsetonLekeres(".seged-" + szam2, zsetonSorszam, szorzo);
                szam3 = szam + 11;
                felrakottZsetonLekeres(".seged-" + szam3, zsetonSorszam, szorzo);
                szam4 = szam2 + 11;
                felrakottZsetonLekeres(".seged-" + szam4, zsetonSorszam, szorzo);
            }
        } else if (nyeroSzam % 3 === 0 && nyeroSzam !== 0) {
            let szam;
            let szam2;
            if (nyeroSzam === 3) {
                szam2 = Math.floor(nyeroSzam / 3 + 10);
                felrakottZsetonLekeres(".seged-" + szam2, zsetonSorszam, szorzo);
            } else if (nyeroSzam == 36) {
                szam = Math.floor(nyeroSzam / 3 - 1 - 9);
                felrakottZsetonLekeres(".seged-" + szam, zsetonSorszam, szorzo);
            } else {
                szam2 = Math.floor(nyeroSzam / 3 + 10);
                felrakottZsetonLekeres(".seged-" + szam2, zsetonSorszam, szorzo);
                szam = Math.floor(nyeroSzam / 3 + 9);
                felrakottZsetonLekeres(".seged-" + szam, zsetonSorszam, szorzo);
            }
        }
    }
    function felrakottZsetonLekeres(elem, szam, szorzo) {
        let gyerekek = $(elem).children();
        if (gyerekek.length > szam) {
            let gyerekZsetonErtek = parseInt($(gyerekek).attr("class").split(" ")[1]);
            JatekosNyeremeny += gyerekZsetonErtek * szorzo;
        }
    }

    function nyeremenyHozzaAdas() {
        jatekosZseton += JatekosNyeremeny;
        jatekosZsetonKiiras();
    }
    //-----------------------------------------------------------------------------------------------------//

    function idoKijelzes() {
        let ido = 14
        let idoIras = setInterval(function () {
            $("#tet-ido-kijelzo").text("A fogadás lezárul " + ido + " másodperc múlva")
            ido--
            if (ido === -1) {
                clearInterval(idoIras)
                $("#tet-ido-kijelzo").text("A fogadás lezárult!")
            }
        }, 1000)
    }

    //-----------------------------------------------------------------------------------------------------//
    function magassagAllitasTd() {
        let cw = $("td").width() + 0.01;
        $("td").css({ height: cw + "px" });
        let cw2 = $(".seged-div").width() + 2.01;
        $(".seged-div").css({ height: cw2 + "px" });
    }
    /*$(window).on("kikapcsolas", (event) => {
        this.kattintott = true
        this.felrakottErtek = zsetonErtek
        console.log(this.felrakottErtek)
    })*/
    $('.szamTd').on("click", "kikapcsolas", (event) => {
        this.kattintott = true
        console.log(this.felrakottErtek)
    })
});

