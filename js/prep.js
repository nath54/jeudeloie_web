
var nbj=1;
var nbj_max=4;

function new_joueur(){
     
    var js=document.getElementById("joueurs").children;
    var ljs=[];
    var len=0;
    for(j of js){
        ljs.push(j);
        len++;
    }
    js=ljs;
    //alert("len : "+len);
    //alert((len>=nbj_max)+" "+len+" "+nbj_max);
    if(len>=nbj_max){
        alert("Vous êtes déjà beaucoup trop a jouer !");
    }
    else{
        var jn=len+1;
        //alert(jn+" "+js);
        var d1=document.createElement("div");
        d1.setAttribute("id","j"+jn);
        d1.setAttribute("class","user");
        var i1=document.createElement("img");
        i1.setAttribute("src","imgs/skin_1.png");
        i1.setAttribute("class","img_oie");
        i1.setAttribute("id","img"+jn);
        i1.setAttribute("onclick","change_img("+jn+")");
        var t1=document.createElement("h2");
        t1.innerHTML="Pseudo : ";
        var inp1=document.createElement("input");
        inp1.setAttribute("value","player"+jn);
        inp1.setAttribute("id","name"+jn);
        d1.appendChild(i1);
        d1.appendChild(t1);
        d1.appendChild(inp1);
        var ddd=document.getElementById("joueurs");
        ddd.appendChild(d1);
    }
}

function remove_joueur(){
    js=document.getElementById("joueurs").children;
    var ljs=[];
    var len=0;
    for(j of js){
        ljs.push(j);
        len++;
    }
    js=ljs;
    if(len<=1){
        alert("On ne peut pas avoir moins d'1 joueur ! Comment voulez vous jouer sans joueurs ?");
    }
    else{
        var jn=len;
        var d=document.getElementById("j"+jn);
        var dd=document.getElementById("joueurs");
        dd.removeChild(d);
    }
}

function get_j(jnb){
    var j={nom:document.getElementById("name"+jnb).value,img:document.getElementById("img"+jnb).src};
}

function jouer(){
    js=document.getElementById("joueurs").children;
    var ljs=[];
    var len=0;
    for(j of js){
        ljs.push(j);
        len++;
    }
    txt="oie.html?"
    js=ljs;
    x=1;
    for(j of ljs){
        var jnom=document.getElementById("name"+x).value;
        var jimg=document.getElementById("img"+x).src;
        jnom=jnom.replace("&"," et ");
        txt+="name="+jnom+",";
        txt+="img="+jimg;
        txt+="&";
        x++;
    }
    Javascript:window.open(txt);
}


function change_img(j){
    var i=document.getElementById("img"+j);
    var ni=i.getAttribute("src");
    var a=ni.split("_");
    var b=parseInt(a[1].split(".")[0]);
    b++;
    if(b>11){b=1}
    var nsrc="imgs/skin_"+b+".png";
    i.setAttribute("src",nsrc);
    //alert(nsrc);
}
