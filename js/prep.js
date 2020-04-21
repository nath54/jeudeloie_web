
var nbj=1;
var nbj_max=5;

var ch=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];

function rch(lst){ return lst[parseInt(Math.random()*lst.length)]; }

function new_joueur(){
     
    var js=document.getElementById("joueurs").children;
    var ljs=[];
    var len=0;
    for(j of js){
        ljs.push(j);
        len++;
    }
    if(ljs.length>=nbj_max){
    js=ljs;
    //alert("len : "+len);value="#132456">jà beaucoup trop a jouer !");
    }
    else{
        var rcl="#"+rch(ch)+rch(ch)+rch(ch)+rch(ch)+rch(ch)+rch(ch);
        var jn=len+1;
        //alert(jn+" "+js);
        var d1=document.createElement("div");
        d1.setAttribute("id","j"+jn);
        d1.setAttribute("class","user");
        var d2=document.createElement("div");
        d2.setAttribute("style","border:5px solid "+rcl+"; border-radius:10px; margin:5px; padding:5px;")
        d2.setAttribute("id","ed"+jn);
        d1.appendChild(d2);
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
        d2.appendChild(i1);
        var pp1=document.createElement("p");
        pp1.appendChild(t1);
        pp1.appendChild(inp1);
        var t2=document.createElement("h2");
        var i2=document.createElement("input");
        t2.innerHTML="Couleur : ";
        i2.setAttribute("type","color");
        i2.setAttribute("id","cl"+jn);
        i2.setAttribute("onchange","changecljoueur("+jn+")");
        i2.setAttribute("value",rcl);
        var pp2=document.createElement("p");
        pp2.appendChild(t2);
        pp2.appendChild(i2);
        d2.appendChild(pp1);
        d2.appendChild(pp2);
        
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
    x=1;
    for(j of ljs){
        var jnom=document.getElementById("name"+x).value;
        var jimg=document.getElementById("img"+x).src;
        var jcl=document.getElementById("cl"+x).value;
        while(jnom.includes("&")){ jnom=jnom.replace("&"," et "); }
        txt+="name="+jnom+",";
        txt+="img="+jimg+",";
        txt+="couleur="+jcl.split("#")[1];
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


function changecljoueur(ii){
    var cl=document.getElementById("cl"+ii).value;
    document.getElementById("ed"+ii).style.borderColor=cl;
}

