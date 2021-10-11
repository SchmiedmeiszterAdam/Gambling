$(function () {
    const pakli = []
    const szinek = ["pick", "treff", "kor", "karo"]
    const ertekek = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
    let jatekosLapok = 0;
    let osztoLapok = 0;
    pakliFeltoltes()
    keveres()
    jatekinditas()
    $("#lapkero-gomb").click(lapkeres)
    $("#megall-gomb").click(megall)

    function jatekinditas() {
        kartyaAdas("#jatekos-laphely", jatekosLapok)
        kartyaAdas("#oszto-lapok", osztoLapok)
        kartyaAdas("#jatekos-laphely", jatekosLapok)
        kartyaleforditva()
        jatekosLapokEllenorzes()
    }

    function pakliFeltoltes() {
        for (let i = 0; i < szinek.length; i++) {
            const szin = szinek[i];
            for (let j = 0; j < ertekek.length; j++) {
                const ertek = ertekek[j];
                pakli.push(szin + " " + ertek)
            }
        }
    }

    function keveres() {
        var currentIndex = pakli.length, randomIndex;

        while (currentIndex != 0) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [pakli[currentIndex], pakli[randomIndex]] = [
                pakli[randomIndex], pakli[currentIndex]];
        }
        return pakli;
    }
    function kartyaAdas(hely, lap) {
        let adottKartya = pakli[0]
        pakli.splice(0, 1)
        let kartyaElem = adottKartya.split(" ")
        let kartyaSzimbolum = kartyaElem[0]
        let kartyaErtek = kartyaElem[1]
        kartyaLetrehozas(kartyaSzimbolum, kartyaErtek, hely)
        lapErtekHozzaadas(hely, kartyaErtek, lap)
    }
    function kartyaLetrehozas(szimbolum, kartyaErtek, hely) {
        $(hely).append('<div class="kartya"><div class="szimbolum szimbolum-1"><img src="black-jack-kepek/' + szimbolum + '.png"></div><div  class="szimbolum szimbolum-2"><img src="black-jack-kepek/' + szimbolum + '.png"></div><div class="ertek">' + kartyaErtek + '</div></div>')
    }
    function kartyaleforditva() {
        $("#oszto-lapok").append('<img src = "black-jack-kepek/kartya-hatlap.png" class ="hatlap">')
    }
    function lapkeres() {
        kartyaAdas("#jatekos-laphely", jatekosLapok)
    }
    function jatekosLapokEllenorzes() {
        if (jatekosLapok > 21) {
            console.log("BUSTED")
            $("#lapkero-gomb").prop("disabled", true)
        }
        else if (jatekosLapok === 21) {
            console.log("BLACK JACK")
            //nyert()
            $(".gombok").prop("disabled", true)
        }
    }
    function lapErtekHozzaadas(hely, ertek, lap) {
        let lapErtek = parseInt(ertek)
        let asz = lap + 11
        if (ertek === "J" || ertek === "Q" || ertek === "K") {
            lapErtek = 10
        }
        if (ertek === "A" && asz < 22) {
            lapErtek = 11
        }
        else if (ertek === "A") {
            lapErtek = 1
        }
        if (hely === "#jatekos-laphely") {
            jatekosLapok += lapErtek
            jatekosLapokEllenorzes()
        } else {
            osztoLapok += lapErtek
        }
    }
    function megall() {
        $(this).prop("disabled", true)
        $(".hatlap").remove()
        kartyaAdas("#oszto-lapok", osztoLapok)
        osztoLepesek()
    }
    function osztoLepesek() {
        let vege = false
        while (!vege) {
            if (osztoLapok === 21) {
                console.log("INSTANT WIN")
                vege = true
            }
            else if (osztoLapok > 21) {
                console.log("OSZTÓ BUSTED")
                vege = true
            }
            else if (osztoLapok <= 16) {
                kartyaAdas("#oszto-lapok", osztoLapok)
                console.log("KÖTELEZŐ HÚZNI")
            }
            else if (osztoLapok >= 17) {
                //vege()
                console.log("NEM HÚZHAT TÖBBET")
                vege = true
            }
        }
    }
});