$(function () {
  const pakli = [];
  const szinek = ["pick", "treff", "kor", "karo"];
  const ertekek = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];
  const aszok = [];
  let jatekosLapok = 0;
  let osztoLapok = 0;
  let vege = false;
  pakliFeltoltes();
  keveres();
  jatekinditas();
  $("#lapkero-gomb").click(lapkeres);
  $("#megall-gomb").click(megall);

  function jatekinditas() {
    kartyaAdas("#jatekos-laphely", jatekosLapok);
    kartyaAdas("#oszto-lapok", osztoLapok);
    kartyaAdas("#jatekos-laphely", jatekosLapok);
    kartyaleforditva();
    jatekosLapokEllenorzes();
  }

  function pakliFeltoltes() {
    for (let i = 0; i < szinek.length; i++) {
      const szin = szinek[i];
      for (let j = 0; j < ertekek.length; j++) {
        const ertek = ertekek[j];
        pakli.push(szin + " " + ertek);
      }
    }
  }

  function keveres() {
    var currentIndex = pakli.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [pakli[currentIndex], pakli[randomIndex]] = [
        pakli[randomIndex],
        pakli[currentIndex],
      ];
    }
    return pakli;
  }
  function kartyaAdas(hely, lap) {
    let adottKartya = pakli[0];
    pakli.splice(0, 1);
    let kartyaElem = adottKartya.split(" ");
    let kartyaSzimbolum = kartyaElem[0];
    let kartyaErtek = kartyaElem[1];
    kartyaLetrehozas(kartyaSzimbolum, kartyaErtek, hely);
    lapErtekHozzaadas(hely, kartyaErtek, lap);
  }
  function kartyaLetrehozas(szimbolum, kartyaErtek, hely) {
    $(hely).append(
      '<div class="kartya"><div class="szimbolum szimbolum-1"><img src="black-jack-kepek/' +
      szimbolum +
      '.png"></div><div  class="szimbolum szimbolum-2"><img src="black-jack-kepek/' +
      szimbolum +
      '.png"></div><div class="ertek">' +
      kartyaErtek +
      "</div></div>"
    );
  }
  function kartyaleforditva() {
    $("#oszto-lapok").append(
      '<img src = "black-jack-kepek/kartya-hatlap.png" class ="hatlap">'
    );
  }
  function lapkeres() {
    kartyaAdas("#jatekos-laphely", jatekosLapok);
  }

  function jatekosLapokEllenorzes() {
    if (jatekosLapok > 21) {
      let kartya = $($("#jatekos-laphely").children()).find(".ertek").text();
      let ertek = kartya.split("");
      let van = jQuery.inArray("A", ertek);
      if (van >= 0 && !aszok.includes(van)) {
        aszok.push(van);
        jatekosLapok -= 10;
      } else {
        visszajelzes("BUSTED");
        vegeBeallitas();
      }
    } else if (jatekosLapok === 21) {
      visszajelzes("BLACK JACK");
      vegeBeallitas();
      //nyert()
      $(".gombok").prop("disabled", true);
    }
    nyertesEllenorzes();
  }
  function lapErtekHozzaadas(hely, ertek, lap) {
    let lapErtek = parseInt(ertek);
    let asz = lap + 11;
    if (ertek === "J" || ertek === "Q" || ertek === "K") {
      lapErtek = 10;
    }
    if (ertek === "A" && asz < 22) {
      lapErtek = 11;
    } else if (ertek === "A") {
      lapErtek = 1;
    }
    if (hely === "#jatekos-laphely") {
      jatekosLapok += lapErtek;
      jatekosLapokEllenorzes();
    } else {
      osztoLapok += lapErtek;
    }
  }
  function megall() {
    $(".gombok").prop("disabled", true);
    $(".hatlap").remove();
    kartyaAdas("#oszto-lapok", osztoLapok);
    osztoLepesek();
  }
  function osztoLepesek() {
    let lepesek = setInterval(lepes, 1000);
    function lepes() {
      if (vege == false) {
        if (osztoLapok === 21) {
          visszajelzes("INSTANT WIN");
          vegeBeallitas();
        } else if (osztoLapok > 21) {
          visszajelzes("OSZTÓ BUSTED");
          vegeBeallitas();
        } else if (osztoLapok <= 16) {
          kartyaAdas("#oszto-lapok", osztoLapok);
          visszajelzes("KÖTELEZŐ HÚZNI");
        } else if (osztoLapok >= 17) {
          //vege()
          visszajelzes("NEM HÚZHAT TÖBBET");
          vegeBeallitas();
        }
        nyertesEllenorzes();
      } else {
        clearInterval(lepesek);
      }
    }
  }
  function nyertesEllenorzes() {
    if (vege == true) {
      if (jatekosLapok > 21) {
        visszajelzes("Játékos busted")
      } else if (osztoLapok > 21) {
        visszajelzes("Osztó busted");
      } else if (osztoLapok > jatekosLapok && osztoLapok < 22) {
        visszajelzes("Osztó nyert");
      } else if (osztoLapok < jatekosLapok && jatekosLapok < 22) {
        visszajelzes("Játékos nyert");
      } else if (osztoLapok === jatekosLapok) {
        visszajelzes("Döntetlen");
      } else {
        visszajelzes("Valami nem ok");
      }
    }
  }

  function vegeBeallitas() {
    $(".gombok").prop("disabled", true);
    vege = true;
  }
  function visszajelzes(szoveg) {
    $("#visszajelzo").html(szoveg)
  }
});
