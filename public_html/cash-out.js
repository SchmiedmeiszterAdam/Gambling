var bombaHely = []
var ertek
var id = 0
var bombakSzama = 1;
var bombaHelyLehetosegek = []
var jatekosTet
$(function () {
    tablazatLetrehozas()
    $("#inditas").on("click", jatekInditas)
    $(".bomba-gomb").on("click", bombaSzamKivalasztas)
    $("#uj").on("click",ujJatek)
    $(".bomba-gomb").on("mouseenter",hoverAllitas)
    $(".bomba-gomb").on("mouseleave",hoverLevetel)
    $("#ertek").on("change",ertekLekeresEllenorzes)
    $(".tet-gomb").on("click",ertekValtoztatas)
});
$(window).bind("resize", magassagAllitas)

function jatekInditas() {
    tablazatLetrehozas()
    magassagAllitas()
    bombaLehetosegekFeltoltes()
    bombaElhelyezes()
    $(".kartya").on("click", forgat)
    $("td").on("click", ellenorzes)
    osszesGomb_Ki_Be_kapcsolas(true)
}
function ujJatek(){
    $("#uj-jatek").css("display","none")
    $("#jatek-ter").css("opacity","1")
    osszesGomb_Ki_Be_kapcsolas(false)
    bombakSzama = 1
}
function ertekValtoztatas(){
    var gomb=$(this).attr("id")
    var ertek= $("#ertek").val()
    if(ertek<=100 && gomb === "0.5"){
        $("#ertek").css("border","1px solid red")
        $(".felezo").prop("disabled",true)
    }else{
        jatekosTet=gomb*ertek
        console.log(jatekosTet)
        $("#ertek").val(jatekosTet)
        $("#ertek").css("border","1px solid lightgray")
       $(".felezo").prop("disabled",false)
    }
}
function ertekLekeresEllenorzes(){
    var ertek= $("#ertek").val()
    console.log(ertek)
    if(ertek<100){
        $("#ertek").css("border","1px solid red")
        $("#inditas").prop("disabled",true)
    }
    else{
        $("#ertek").css("border","1px solid lightgray")
        $("#inditas").prop("disabled",false)
    }
}

function osszesGomb_Ki_Be_kapcsolas(be_ki){
    $(".bomba-gomb").prop("disabled",be_ki)
    $("#inditas").prop("disabled",be_ki)
    $(".tet-gomb").prop("disabled",be_ki)
    $("#ertek").prop("disabled",be_ki)
}
function bombaLehetosegekFeltoltes(){
    for (let i = 0; i < 25; i++) {
        bombaHelyLehetosegek[i] = i
    }
}
function tablazatLetrehozas() {
    $("#tablazat").empty()
    var idSzamalalo = 0;
    $("#tablazat").append("<table></table>")
    for (let i = 0; i < 5; i++) {
        $("#tablazat table").append("<tr></tr>")
        for (let j = 0; j < 5; j++) {
            $("#tablazat table tr").eq(i).append("<td id =" + idSzamalalo + " class = 'tabla-td kartya'><img src='cash_out_kepek/hatlap.jpg' class='hatlap'></td>")
            idSzamalalo++;
        }
        magassagAllitas()
    }
}
function bombaSzamKivalasztas() {
    bombakSzama = $(this).attr("id")
    console.log(bombakSzama)
    $(".bomba-gomb").css("background-color","white")
    $(this).css("background-color","red")
}
function bombaElhelyezes() {
    bombaHely = []
    for (let i = 0; i < bombakSzama; i++) {
        var bombak = Math.floor(Math.random() * bombaHelyLehetosegek.length);
        bombaHely[i] = bombaHelyLehetosegek[bombak]
        bombaHelyLehetosegek.splice(bombak,1)
    }
    console.log(bombaHely)
}
function ellenorzes() {
    var robban = false
    id = parseInt($(this).attr("id"))
    var i = 0
    while(i<bombaHely.length && !robban) {
        if (id === bombaHely[i]) {
            robban = true
            console.log("bejöttem",$(this))
        }
        i++
    }
    if(robban){
        $(".kartya").off()
        $(this).append("<img src='cash_out_kepek/bomba.jpg' class='elolap'></img>")
        osszesGomb_Ki_Be_kapcsolas(false)
        ujJatekMegjelenit()
    }
    else{
        $(this).append("<img src='cash_out_kepek/elolap.jpg' class='elolap'></img>")
    }
}
function ujJatekMegjelenit(){
    $("#uj-jatek").css("display","block")
    $("#jatek-ter").css("opacity","0.2")
}
function magassagAllitas() {
    var magassag = $(".tabla-td").width()
    $("tr").css({ 'height': magassag + 'px' })
}
function forgat() {
    $(this).addClass("flip")
}
function hoverAllitas(){
    var gomb=$(this).attr("id")
    if(gomb != bombakSzama){
        $(this).css("background-color","rgb(218, 214, 210)")
    }
    else{
        $(this).css("background-color","red")
    }
}
function hoverLevetel(){
    var gomb=$(this).attr("id")
    if(gomb != bombakSzama){
        $(this).css("background-color","white")
    }
}