var loszerHelye;
var fegyverAllasa;
var vege = false;
$(function () {
    jatek();    
});


function jatek() {
    $("#kezd").click(jatekKezdete);
    $("#uj-jatek").click(jatekKezdete);
}


function jatekKezdete() {
    ujJatekEltuntet();
    fegyverAllasa = 1;
    loszerHelyenekMeghatarozasa();
    $("#loves").click(lovesTortent);
    $("#porgetes").click(ujProgetes);
    //$("#passz").click(passz);
    $("#passz").prop('disabled',true);
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
    $("#loves").prop('disabled',true);
    $("#porgetes").prop('disabled',true);
    porgetes();
    loszerHelyenekMeghatarozasa();
    setTimeout(gombokEnable,1510);
}
function loszerHelyenekMeghatarozasa(){    
    loszerHelye = Math.floor(Math.random() * 6) + 1;
    console.log(loszerHelye);
}
function lovesTortent(){
    gombokDisable();
    if(fegyverAllasa === loszerHelye){
        alert("Meghaltál");
        ujJatekMegjelenit();
        vege = true;
    }
    else{
        $("#fegyver").addClass("kicsit-forgat");
        setTimeout(function(){$("#fegyver").removeClass("kicsit-forgat");},1001)
        fegyverAllasa++;
        if(fegyverAllasa === 7){
            fegyverAllasa = 1;
        }
    }
    if(!vege){
        setTimeout(ellenfelLepes, 1500);
    }
}
function ellenfelLepes(){
    if(fegyverAllasa === loszerHelye){
        alert("Nyertél!");
        ujJatekMegjelenit();
        vege = true;
    }
    else{
        $("#fegyver").addClass("kicsit-forgat");
        setTimeout(function(){$("#fegyver").removeClass("kicsit-forgat");},1001)
        fegyverAllasa++;
        if(fegyverAllasa === 7){
            fegyverAllasa = 1;
        }
    }
    setTimeout(gombokEnable,2000);

}
function gombokDisable(){
    $("#loves").prop('disabled',true);
    $("#porgetes").prop('disabled',true);
}
function gombokEnable(){
    $("#loves").prop('disabled',false);
    $("#porgetes").prop('disabled',false);
}