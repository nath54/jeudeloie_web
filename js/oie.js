let randint = function(entier_min, entier_max) {
    return Math.floor(Math.random() * (entier_max + 1 - entier_min) + entier_min);
};

var de1, de2;
var caseActive = 0;
var gagne = false;
var nblances = 0;

var joueurs=[];
var jact=0;

var couleurs=[ "#123456" , "#654321" , "#465423" , "#872322"];

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function update_aff_js(){
    var dddd=document.getElementById("joueurs");
    //DELETE
    for(x=0;x<joueurs.length;x++){
        var dd=document.getElementById("div_joueur_"+x);
        if(dd!=null){
            dddd.removeChild(dd);
        }
    }
    //ADD
    for(x=0;x<joueurs.length;x++){
        var j = joueurs[x];
        //
        var dd=document.createElement("div");
        var tt=document.createElement("h2");
        var ii=document.createElement("img");
        var pp=document.createElement("p");
        //
        dd.setAttribute("id","div_joueur_"+x);
        dd.setAttribute("class","joueur_aff");
        dd.style.borderColor=couleurs[x];
        dd.style.borderWidth="5px";
        
        tt.innerHTML=j.name;
        ii.setAttribute("src",j.img);
        ii.setAttribute("class","img_portrait");
        pp.innerHTML="case : "+j.case;
        //
        dd.appendChild(ii);
        dd.appendChild(tt);
        dd.appendChild(pp);
        dddd.appendChild(dd);
    }
    var joj=joueurs[jact];
    var tt=document.getElementById("tour_actu");
    tt.innerHTML="Au tour de : "+joj.name;
}

function init_joueurs(){
    var parameters = location.search.substring(1).split("&");
    for(p of parameters){
        var jj={name:null,img:null,case:0,actif:null};
        var pjs=p.split(",");
        for(pp of pjs){
            var ppp=pp.split("=");
            //alert("ppp : "+ppp);
            if(ppp[0]=="name"){
                jj.name=ppp[1];
            }
            else if(ppp[0]=="img"){
                jj.img=ppp[1];
            }
        }
        if(jj.name!=null || jj.img!=null || jj.name!=undefined || jj.img!=undefined){
            var ddiv = document.createElement("div");
            ddiv.setAttribute("class","pion");
            ddiv.style.borderColor=couleurs[joueurs.length];
            ddiv.style.borderWidth="5px";
            var ii=document.createElement("img");
            ii.setAttribute("class","im_pion");
            ii.setAttribute("src",jj.img);
            ddiv.appendChild(ii);
            jj.actif=ddiv
            joueurs.push(jj);
        }
    }
    update_aff_js();
}



function initialisation() {
    init_joueurs();
    for (x = 0; x <= 63; x++) {
        xx = (x < 10 ? '0' : '') + x;
        var c = document.getElementById("item-" + xx);
        if (c != null) {
            if (x != 0) { c.innerHTML = xx; } else { c.innerHTML = "départ"; }
            var color = "rgb(" + parseInt(100 + parseInt(x / 63 * 150)) + "," + parseInt(250 - parseInt(x / 63 * 150)) + "," + "00" + ")";
            //console.log("x : ", x, " color : ", color);
            c.style.backgroundColor = color;
        }

    }
    //var caseActiveChaine = (caseActive < 10 ? '0' : '') + caseActive;
    //elementActif = document.getElementById("item-" + caseActiveChaine);
    //elementActif.setAttribute("class", "flexbox-item item-" + caseActiveChaine + " active");
    for(x=0;x<joueurs.length;x++){ make_actif(x); }
    
}

function suppr_actif(idp){
    /*var caseActiveChaine = (caseActive < 10 ? '0' : '') + caseActive;
    if (caseActive >= 0 && caseActive <= 63) {
        //alert(caseActiveChaine);
    }
    else if(caseActive>63){
        caseActiveChaine="63";
    }
    else{
        caseActiveChaine="00";
    }
    var elementActif = document.getElementById("item-" + caseActiveChaine);
    elementActif.setAttribute("class", "flexbox-item item-" + caseActiveChaine);
    */
    var caseActiveChaine = (joueurs[idp].case < 10 ? '0' : '') + caseActive;
    var elem=document.getElementById("item-"+caseActiveChaine);
    try{
        elem.removeChild(joueurs[idp].actif);
    }
    catch{

    }

}

function make_actif(idp){
    /*
    if (caseActive >= 0) {
        caseActiveChaine = (caseActive < 10 ? '0' : '') + caseActive;
        elementActif = document.getElementById("item-" + caseActiveChaine);
        elementActif.setAttribute("class", "flexbox-item item-" + caseActiveChaine + " active");
    };
    */
   var caseActiveChaine = (joueurs[idp].case < 10 ? '0' : '') + caseActive;
   var elem=document.getElementById("item-"+caseActiveChaine);
   elem.appendChild(joueurs[idp].actif);
}


function deplacement_oie(caseActive,nb_tot,pas=1){
    var cc=caseActive;
    console.log("deplacement oie( cA : "+cc+" , nb_tot : "+nb_tot+" , pas : "+pas);
    
    var nba=0;
    function boucle_dep(){
        nba+=pas;
        suppr_actif(jact);
        cc+=1;
        make_actif(jact);
        if(nba!=nb_tot){
            sleep(300).then(() => {
                window.requestAnimationFrame(boucle_dep);
            })
        }
    }
    window.requestAnimationFrame(boucle_dep);
}


async function lancer_des(){
    var dt=new Date();
    var dtt=new Date();
    var ad=dt.getTime();
    var td=randint(1,10);
    var vd1=parseInt(randint(1,6));
    var vd2=parseInt(randint(1,6));
    var av=0;
    document.getElementById("dé1").innerHTML=vd1;
    document.getElementById("dé2").innerHTML=vd2;
    document.getElementById("finitde").innerHTML="lancés..."
    function boucle(){
        if(td<1000){
            dt=new Date();
            if(dt.getTime()-ad>=td){
                ad=dt.getTime();
                document.getElementById("dé1").innerHTML=vd1;
                document.getElementById("dé2").innerHTML=vd2;
                vd1++;
                if(vd1>6){vd1=1}
                vd2++;
                if(vd2>6){vd2=1}
                td+=av;
                av+=randint(1,5);
            }
            sleep(td).then(() => {
                window.requestAnimationFrame(boucle);
            })
        }
        else{
            document.getElementById("finitde").innerHTML="pas lancés"
            return vd1,vd2;
        }
    }
    boucle();
}



async function jeu(){
    await lancer_des();
    var de1=parseInt(document.getElementById("dé1").innerHTML)
    var de2=parseInt(document.getElementById("dé2").innerHTML)
    alert(de1+" "+de2);
    nblances++;
    document.getElementById("lancer").innerHTML = "(" + de1 + ", " + de2 + "= " + (de1 + de2) + ")";
    document.getElementById("nblancers").innerHTML = nblances;
    fonction_1(de1,de2);
}

 /*
const jeu = async () => {
    const result = await lancer_des();
    // do something else here after firstFunction completes
    var de1=parseInt(document.getElementById("dé1").innerHTML)
    var de2=parseInt(document.getElementById("dé2").innerHTML)
    alert(de1+" "+de2);
    nblances++;
    document.getElementById("lancer").innerHTML = "(" + de1 + ", " + de2 + "= " + (de1 + de2) + ")";
    document.getElementById("nblancers").innerHTML = nblances;
    fonction_1(de1,de2);
 }
 */

/*
function jeu()
{
    var promise = lancer_des();
    promise.then(function(result) { 
        var de1=parseInt(document.getElementById("dé1").innerHTML)
        var de2=parseInt(document.getElementById("dé2").innerHTML)
        alert(de1+" "+de2);
        nblances++;
        document.getElementById("lancer").innerHTML = "(" + de1 + ", " + de2 + "= " + (de1 + de2) + ")";
        document.getElementById("nblancers").innerHTML = nblances;
        fonction_1(de1,de2);
    });
}
*/






function fonction_1(de1=null,de2=null){
    if (!gagne) {
        if(de1==null || de2==null){
            de1=0;
            de2=0;
        }
        var caseActiveChaine = (caseActive < 10 ? '0' : '') + caseActive;
        if (nblances == 0 && de1 + de2 == 9) {
            if ((de1 == 6 && de2 == 3) || (de1 == 3 && de2 == 6)) {
                caseActive = 29;
            } else if ((de1 == 4 && de2 == 5) || (de1 == 5 && de2 == 4)) {
                caseActive = 53;
            }
        } else {
            //suppr_actif(caseActive);

            // On calcule la nouvelle position active
            caseActive += de1 + de2;
            if(caseActive<=63){
                deplacement_oie(caseActive-de1-de2,caseActive,1);
            }
            if(caseActive > 63) {
                deplacement_oie(caseActive-de1-de2,63,1);
                var ncas=63 - (caseActive - 63);
                deplacement_oie(63,ncas,-1);
                caseActive = ncas;
                //alert("superior " + caseActive)
            }
            if (caseActive == 63) {
                alert("Vous avez gagné !")
                gagne = true;
            }
        }
        //console.log("caseActive : " + caseActive)
        if (caseActive <= 63) {
            // On recherche le nouvel élément actif.
            //make_actif(jact);
            //console.log(" caseActiveChaine : "+caseActiveChaine);
        } else {
            elementActif = document.getElementById("item-63");
        }
        document.getElementById("caseActive").innerHTML = caseActive;
    } else {
        alert("Vous avez gagné la partie, pour en recommencer une nouvelle, veuillez recharger la page");
    }
    jact++;
    if(jact>=joueurs.length){ jact=0; }
    update_aff_js();
};

var fonction_2 = function() {

};


initialisation();