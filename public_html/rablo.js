var kepek = ["alma","bar","csengo","cseresznye","dinnye","erme","gyemant","lohere","patko","sziv","szolo","szolo_szem"]

$(function () {
    oszlopokFeltoltes()
    oszlopElinditas()
    oszlopMegallitas()
});
function oszlopokFeltoltes() {
    for(i = 1; i<4; i++){
        keveres(kepek);
        $("#oszlop-"+i+"").empty();
        for (j = 0; j < kepek.length; j++) {
            $("#oszlop-"+i+"").append("<span style='--i:"+(j+1)+";'><div id = 'oszlop-"+i+"-icon-"+(j+1)+"'></div></span>");
            $("#oszlop-"+i+"-icon-"+(j+1)+"").css("background-image","url(fel_karu_rablo_kepek/"+kepek[j]+".png)");
        }
    }
    for (let i = 0; i < kepek.length; i++) {
    }
}
function oszlopElinditas(){
    $("#oszlop-1").addClass("porgetes");
    $("#oszlop-2").addClass("porgetes");
    $("#oszlop-3").addClass("porgetes");
}
function oszlopMegallitas(){
    setTimeout(function(){$("#oszlop-1").removeClass("porgetes")},4000)
    setTimeout(function(){$("#oszlop-2").removeClass("porgetes")},6000)
    setTimeout(function(){$("#oszlop-3").removeClass("porgetes")},8000)
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