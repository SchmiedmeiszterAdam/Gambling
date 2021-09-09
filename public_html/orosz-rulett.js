var loszerHelye;
var fegyverAllasa;
$(function () {
    $("#info").mouseenter(function(){$("#info-szoveg").css("display","block");$("#info-szoveg").addClass("hatter-megjelenites");})
    $("#info").mouseleave(function(){$("#info-szoveg").css("display","none");$("#info-szoveg").removeClass("hatter-megjelenites");})    
    $("#kezd").click(jatekKezdete);
    $("#uj-jatek").click(jatekKezdete);
    $("#loves").click(lovesTortent);
    $("#porgetes").click(ujProgetes);
});



function jatekKezdete() { 
    $("#ver-hatter").removeClass("hatter-megjelenites");
    $("#ver-hatter").css("display","none");    
    $("#szoveg-tarolo").css("display","none");
    ujJatekEltuntet();
    fegyverAllasa = 1;
    loszerHelyenekMeghatarozasa();    
    gombokDisable();
    animaciok();
}
function ujJatekMegjelenit(){
    $("#uj-jatek").css("display","block");
}
function ujJatekEltuntet(){
    $("#uj-jatek").css("display","none");
}

function animaciok(){
    startGombEltuntet();
    golyoBehelyezes();
    porgetesIdozitessel();
}
function golyoBehelyezes(){
    $("#lyuk-1").addClass("loszer-megjelenit");
    setTimeout(function(){$("#lyuk-1").removeClass("loszer-megjelenit");},1500);
}
function porgetesIdozitessel(){
    setTimeout(function(){ $("#fegyver").addClass("forog");}, 1501);
    setTimeout(function(){ $("#fegyver").removeClass("forog");
    gombokEnable();
    }, 3002);
}
function porgetes(){
    $("#fegyver").addClass("forog");
    setTimeout(function(){ $("#fegyver").removeClass("forog");
    }, 1501);   
}
function startGombEltuntet(){    
    $("#kezd").css("display","none"); 
}
function ujProgetes(){
    gombokDisable();
    porgetes();
    loszerHelyenekMeghatarozasa();
    setTimeout(lovesTortent, 2000);
}
function loszerHelyenekMeghatarozasa(){    
    loszerHelye = Math.floor(Math.random() * 6) + 1;
    console.log(loszerHelye);
}
function lovesTortent(){
    gombokDisable();
    if(fegyverAllasa === loszerHelye){
        ujJatekMegjelenit();
        $("#ver-hatter").css("display","block");
        $("#ver-hatter").addClass("hatter-megjelenites");
        $("#szoveg-tarolo").css("display","block");
        $("#szoveg-tarolo").addClass("hatter-megjelenites");        
        return false; 
    }
    else{
        $("#fegyver").addClass("kicsit-forgat");
        setTimeout(function(){$("#fegyver").removeClass("kicsit-forgat");},1001)
        fegyverAllasa++;
        if(fegyverAllasa === 7){
            fegyverAllasa = 1;
        }
        setTimeout(ellenfelLepes, 1500);
    }
    console.log(fegyverAllasa);
}
function ellenfelLepes(){
    if(fegyverAllasa === loszerHelye){
        alert("Nyertél!");
        ujJatekMegjelenit();
        return false; 
    }
    else{
        $("#fegyver").addClass("kicsit-forgat");
        setTimeout(function(){$("#fegyver").removeClass("kicsit-forgat");},1001)
        fegyverAllasa++;
        if(fegyverAllasa === 7){
            fegyverAllasa = 1;
        }
        setTimeout(gombokEnable,1000);
    }
    console.log(fegyverAllasa);    
}
function gombokDisable(){
    $("#loves").prop('disabled',true);
    $("#porgetes").prop('disabled',true);
}
function gombokEnable(){
    $("#loves").prop('disabled',false);
    $("#porgetes").prop('disabled',false);
}