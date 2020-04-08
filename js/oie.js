let randint = function(entier_min, entier_max) {
    return Math.floor(Math.random() * (entier_max + 1 - entier_min) + entier_min);
};

var de1, de2;
var caseActive = 0;
var gagne = false;
var nblances = 0;

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
  

function initialisation() {
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
    var caseActiveChaine = (caseActive < 10 ? '0' : '') + caseActive;
    elementActif = document.getElementById("item-" + caseActiveChaine);
    elementActif.setAttribute("class", "flexbox-item item-" + caseActiveChaine + " active");
}

function suppr_actif(caseActive){
    var caseActiveChaine = (caseActive < 10 ? '0' : '') + caseActive;
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
}

function make_actif(caseActive){
    if (caseActive >= 0) {
        caseActiveChaine = (caseActive < 10 ? '0' : '') + caseActive;
        elementActif = document.getElementById("item-" + caseActiveChaine);
        elementActif.setAttribute("class", "flexbox-item item-" + caseActiveChaine + " active");
    };
}

function lancer_des(){
    var dt=new Date();
    var dtt=new Date();
    var ad=dt.getTime();
    var td=randint(1,10);
    var vd1=parseInt(randint(1,6));
    var vd2=parseInt(randint(1,6));
    document.getElementById("dé1").innerHTML=vd1;
    document.getElementById("dé2").innerHTML=vd2;
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
                td+=dtt.getTime()**2;
            }
            window.requestAnimationFrame(boucle);
        }
        else{
            //alert("lancer du dé : "+vd1+" "+vd2);
        }
    }
    window.requestAnimationFrame(boucle);
    return vd1,vd2
}

function deplacement_oie(caseActive,nb_tot,pas=1){
    var cc=caseActive;
    console.log("deplacement oie( cA : "+cc+" , nb_tot : "+nb_tot+" , pas : "+pas);
    
    var nba=0;
    function boucle_dep(){
        nba+=pas;
        suppr_actif(cc);
        cc+=1;
        make_actif(cc);
        if(nba!=nb_tot){
            sleep(300).then(() => {
                window.requestAnimationFrame(boucle_dep);
            })
        }
    }
    
    window.requestAnimationFrame(boucle_dep);
    
}
    

var fonction_1 = function(de1=null,de2=null) {
    if (!gagne) {
        if(de1==null || de2==null){
            lancer_des();
            de1=parseInt(document.getElementById("dé1").innerHTML)
            de2=parseInt(document.getElementById("dé2").innerHTML)
            alert(de1+" "+de2);
            nblances++;
            document.getElementById("lancer").innerHTML = "(" + de1 + ", " + de2 + "= " + (de1 + de2) + ")";
            document.getElementById("nblancers").innerHTML = nblances;
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
            //make_actif(caseActive);
            //console.log(" caseActiveChaine : "+caseActiveChaine);
        } else {
            elementActif = document.getElementById("item-63");
        }
        document.getElementById("caseActive").innerHTML = caseActive;
    } else {
        alert("Vous avez gagné la partie, pour en recommencer une nouvelle, veuillez recharger la page");
    }
};

var fonction_2 = function() {

};


initialisation();