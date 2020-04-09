
var nbj=1;
var nbj_max=4;

function new_joueur(){
    js=document.getElementById("jouers").childNodes;
    if(js.lenght>nbj_max){
        alert("Vous êtes déjà beaucoup trop a jouer !");
    }
    else{
        var jn=js.lenght;
        var d1=document.createElement("div");
        d1.setAttribute("id","j"+jn);
        d1.setAttribute("class","user");
        var i1=document.createElement("img");
        i1.setAttribute("src","skin_1.png");
        i1.setAttribute("class","img_oie");
        i1.setAttribute("id","img"+jn);
        i1.setAttribute("onclick","chang_img("+jn+")");
        var t1=document.createElement("h2");
        t1.innerHTML="Pseudo : ";
        var inp1=document.createElement("input");
        inp1.setAttribute("value","player"+jn);
        inp1.setAttribute("id","name"+jn);
    }
}

function remove_joueur(){
    js=document.getElementById("jouers").childNodes;
    if(js.lenght<=1){
        alert("On ne peut pas avoir moins d'1 joueur ! Comment voulez vous jouer sans joueurs ?");
    }
    else{
        var jn=js.lenght-1;
        var d=documment.getElementById("j"+jn);
        var dd=document.getElementById("joueurs");
        dd.removeChild(d);
    }
}

function get_j(jnb){
    var j={nom:document.getElementById("name"+jnb).value,img:document.getElementById("img"+jnb).src};
}

function jouer(){

}


function change_img(j){
    var i=document.getElementById("img"+j);
    var ni=i.getAttribute("src");
    var a=ni.split("_");
    var b=parseInt(a[1].split(".")[0]);
    b++;
    if(b>11){b=1}
    var nsrc="skin_"+b+".png";
    i.setAttribute("src",nsrc);
}
