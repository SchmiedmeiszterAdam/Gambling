var loszerHelye;
var fegyverAllasa;
const lovesHang = new Audio("orosz_rulett_hangok/loves.mp3")
const cilinderHang = new Audio("orosz_rulett_hangok/cilinder-zaras.mp3")
const golyoHang = new Audio("orosz_rulett_hangok/golyo-behelyezes.mp3")
const nincsLovesHang = new Audio("orosz_rulett_hangok/nincs-loves.mp3")
const porgetesHang = new Audio("orosz_rulett_hangok/porget.mp3")
$(function () {
    gombokDisable()
    $("#info").mouseenter(function () { $("#info-szoveg").css("display", "block"); $("#info-szoveg").addClass("hatter-megjelenites"); })
    $("#info").mouseleave(function () { $("#info-szoveg").css("display", "none"); $("#info-szoveg").removeClass("hatter-megjelenites"); })
    $("#kezd").click(jatekKezdete);
    $("#uj-jatek").click(jatekKezdete);
    $("#loves").click(lovesTortent);
    $("#porgetes").click(ujProgetes);
    var cw = $('#fegyver-tarolo').width();
    $('#fegyver-tarolo').css({ 'height': cw + 'px' });
    setTimeout(magassagAllitas, 100);
});
$(window).bind("resize", magassagAllitas)


function jatekKezdete() {
    $("#ver-hatter").removeClass("hatter-megjelenites");
    $("#ver-hatter").css("display", "none");
    $("#szoveg-tarolo").css("display", "none");
    ujJatekEltuntet();
    fegyverAllasa = 1;
    loszerHelyenekMeghatarozasa();
    gombokDisable();
    animaciok();
}
//-----------------------------------------------------------------------------------------------------//

function animaciok() {
    startGombEltuntet();
    golyoBehelyezes();
    setTimeout(porgetesIdozitessel, 1000)
}
function golyoBehelyezes() {
    $("#lyuk-1").addClass("loszer-megjelenit");
    golyoHang.play()
    setTimeout(function () { cilinderHang.play() }, 1400)
}
function porgetesIdozitessel() {
    setTimeout(function () { $("#lyuk-1").removeClass("loszer-megjelenit"); }, 500);
    setTimeout(function () { $("#fegyver").addClass("forog"); }, 1501);
    setTimeout(function () { porgetesHang.play() }, 1550);
    setTimeout(function () {
        $("#fegyver").removeClass("forog");
        gombokEnable();
    }, 3002);
}
function porgetes() {
    porgetesHang.play()
    $("#fegyver").addClass("forog");
    setTimeout(function () {
        $("#fegyver").removeClass("forog");
    }, 1501);
}
//-----------------------------------------------------------------------------------------------------//

function ujProgetes() {
    gombokDisable();
    porgetes();
    loszerHelyenekMeghatarozasa();
    setTimeout(lovesTortent, 2000);
}
function lovesTortent() {
    gombokDisable();
    if (fegyverAllasa === loszerHelye) {
        lovesHang.play();
        ujJatekMegjelenit();
        $("#ver-hatter").css("display", "block");
        $("#ver-hatter").addClass("hatter-megjelenites");
        $("#szoveg-tarolo").css("display", "block");
        $("#szoveg-tarolo").addClass("hatter-megjelenites");
        return false;
    }
    else {
        $("#fegyver").addClass("kicsit-forgat");
        nincsLovesHang.play()
        setTimeout(function () { $("#fegyver").removeClass("kicsit-forgat"); }, 1001)
        fegyverAllasa++;
        if (fegyverAllasa === 7) {
            fegyverAllasa = 1;
        }
        setTimeout(ellenfelLepes, 1500);
    }
    console.log(fegyverAllasa);
}
//-----------------------------------------------------------------------------------------------------//

function loszerHelyenekMeghatarozasa() {
    loszerHelye = Math.floor(Math.random() * 6) + 1;
    console.log(loszerHelye);
}
//-----------------------------------------------------------------------------------------------------//

function ellenfelLepes() {
    if (fegyverAllasa === loszerHelye) {
        lovesHang.play();
        alert("Nyertél!");
        ujJatekMegjelenit();
        return false;
    }
    else {
        nincsLovesHang.play()
        $("#fegyver").addClass("kicsit-forgat");
        setTimeout(function () { $("#fegyver").removeClass("kicsit-forgat"); }, 1001)
        fegyverAllasa++;
        if (fegyverAllasa === 7) {
            fegyverAllasa = 1;
        }
        setTimeout(gombokEnable, 1000);
    }
    console.log(fegyverAllasa);
}
//-----------------------------------------------------------------------------------------------------//

function gombokDisable() {
    $("#loves").prop('disabled', true);
    $("#porgetes").prop('disabled', true);
}
function gombokEnable() {
    $("#loves").prop('disabled', false);
    $("#porgetes").prop('disabled', false);
}
//-----------------------------------------------------------------------------------------------------//

function ujJatekMegjelenit() {
    $("#uj-jatek").css("display", "block");
}
function ujJatekEltuntet() {
    $("#uj-jatek").css("display", "none");
}
function startGombEltuntet() {
    $("#kezd").css("display", "none");
}
//-----------------------------------------------------------------------------------------------------//

function magassagAllitas() {
    var cw = $('#fegyver-tarolo').width();
    var ch = $('#fegyver-tarolo').height();
    $('#fegyver-tarolo').css({ 'width': ch + 'px' });
    $('#fegyver-tarolo').css({ 'height': cw + 'px' });
}