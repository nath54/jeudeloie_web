let randint = function(entier_min, entier_max) {
    return Math.floor(Math.random() * (entier_max + 1 - entier_min) + entier_min);
};

var de1, de2;
var caseActive = 0;
var gagne = false;
var nblances = 0;

var joueurs=[];
var jact=0;


var couleurs=[ "#123456" , "#654321" , "#465423" , "#872322" ,"#452484"];

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function est_dans_liste(valeur,liste){
    return liste.includes(valeur);
}

function enlever_de_liste(valeur,liste){
    for(i=0;i<liste.length;x++){
        if(valeur===liste[i]){
            liste.splice(i, 1);
            return ;
        }
    }
    return ;
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
        dd.style.borderColor=j.cl;
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
    var ki=-1;
    console.log(parameters);
    for(p of parameters){
        ki++;
        var jj={name:null,img:null,case:0,actif:null,nblances:0,etats:[],already_immobilise:false,cl:couleurs[ki]};
        var pjs=p.split(",");
        for(pp of pjs){
            var ppp=pp.split("=");
            if(ppp[0]=="name"){
                jj.name=ppp[1];
            }
            else if(ppp[0]=="img"){
                jj.img=ppp[1];
            }
            else if(ppp[0]=="couleur"){
                jj.cl="#"+ppp[1];
            }

        }
        if(jj.name!=null || jj.img!=null || jj.name!=undefined || jj.img!=undefined){
            var ddiv = document.createElement("div");
            ddiv.setAttribute("class","pion");
            ddiv.style.borderColor=jj.cl;
            ddiv.style.borderWidth="5px";
            ddiv.style.width=""+parseInt(80/joueurs.length)+"%";
            ddiv.style.height=""+parseInt(80/joueurs.length)+"%";
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
            //if (x != 0) { c.innerHTML = xx; } else { c.innerHTML = "départ"; }
            var color = "rgb(" + parseInt(100 + parseInt(x / 63 * 150)) + "," + parseInt(250 - parseInt(x / 63 * 150)) + "," + "00" + ")";
            c.style.backgroundColor = color;
            var pp=document.createElement("p");
            pp.innerHTML=(xx!="00" ? xx : "départ" );
            pp.setAttribute("class","texte_case")
            c.appendChild( pp );
        }

    }for(x=0;x<joueurs.length;x++){ make_actif(x); }
    
}

function suppr_actif(idp=null){
    if(idp==null){ idp=jact; }
    var caseActiveChaine = (joueurs[idp].case < 10 ? '0' : '') + joueurs[idp].case;
    var elem=document.getElementById("item-"+caseActiveChaine);
    try{
        elem.removeChild(joueurs[idp].actif);
    }
    catch{

    }

}

function make_actif(idp=null){
    if(idp==null){ idp=jact; }
    var caseActiveChaine = (joueurs[idp].case < 10 ? '0' : '') + joueurs[idp].case;
    var elem=document.getElementById("item-"+caseActiveChaine);
    if(elem!=null){
        elem.appendChild(joueurs[idp].actif);
    }
}

function deplacement_oie(de1,de2){
    //joueurs[jact]
    var sd=de1+de2;
    var bg=0;
    var pas=1;
    if( est_dans_liste("recule",joueurs[jact].etats) ){
        pas=-1;
        enlever_de_liste("recule",joueurs[jact].etats);
    }
    //
    if( est_dans_liste("immobilisé",joueurs[jact].etats) ){
        bg=sd;
        enlever_de_liste("immobilisé",joueurs[jact].etats);
        joueurs[jact].already_immobilise=true;
    }
    else{
        joueurs[jact].already_immobilise=false;
    }
    //
    window.requestAnimationFrame(avancer);

    //
    function avancer(){
        
        if(bg<sd){
            //
            suppr_actif();
            joueurs[jact].case+=pas;
            if(joueurs[jact].case>=63){
                pas=-1
                joueurs[jact].case=63;
            }
            if(joueurs[jact].case<=0){
                pas=1;
                joueurs[jact].case=0;
            }
            make_actif();
            //
            bg++;
            sleep(300).then(() => {
                window.requestAnimationFrame(avancer);
            })
        }
        else{
            
            //
            var cond=true;
            if(cond && joueurs[jact].case==63){
                gagne=true;
                cond=false;
                alert(joueurs[jact].name+" a gagné !  =)")
                document.getElementById("gagne_aff").innerHTML=joueurs[jact].name+" a gagné !";
            }
            if(cond && joueurs[jact].case==62){
                cond=false;
                alert("Dommage, "+joueurs[jact].name+", tu retournes à la case départ.  =(");
                suppr_actif();
                joueurs[jact].case=0;
                make_actif();
            }
            if(cond && joueurs[jact].case%10==0){
                alert("Dommage, "+joueurs[jact].name+", tu va reculer la prochaine fois que tu va jouer.  :(");
                joueurs[jact].etats.push("recule");
            }
            /*
            if(cond && joueurs[jact].case==13 && !joueurs[jact].already_immobilise){
                alert("Dommage, "+joueurs[jact].name+", tu est immobilisé pendant 2 tours.  8-(");
                for(x=0;x<2;x++){ joueurs[jact].etats.push("immobilise"); }
            }
            if(cond && joueurs[jact].case==26 && !joueurs[jact].already_immobilise){
                alert("Dommage, "+joueurs[jact].name+", tu est immobilisé pendant 3 tours.  8-(");
                for(x=0;x<3;x++){ joueurs[jact].etats.push("immobilise"); }
            }
            if(cond && joueurs[jact].case==39 && !joueurs[jact].already_immobilise){
                alert("Dommage, "+joueurs[jact].name+", tu est immobilisé pendant 1 tours.  8-(");
                for(x=0;x<1;x++){ joueurs[jact].etats.push("immobilise"); }
            }
            */
            //
            window.tour_actu=true;
            //
            update_aff_js();
            //
            //
            jact++;
            if(jact>=joueurs.length){ jact=0; }
        }
    }
}

function lancer_des(){
    var dt=new Date();
    var dtt=new Date();
    var tpfin=1000;
    var ddeb=dt.getTime();
    var ad=dt.getTime();
    var td=randint(1,10);
    var vd1=parseInt(randint(1,6));
    var vd2=parseInt(randint(1,6));
    var av=0;
    document.getElementById("dé1").innerHTML=vd1;
    document.getElementById("dé2").innerHTML=vd2;
    document.getElementById("finitde").innerHTML="lancés..."
    function boucle(){
        if(!document.getElementById("check_pass").checked){
            var ddt=new Date();
            if(ddt.getTime()-ddeb<tpfin){
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
                document.getElementById("finitde").innerHTML="pas lancés";
                suite_de();
            }
        }
        else{
            document.getElementById("finitde").innerHTML="pas lancés";
            suite_de();
        }
    }
    boucle();
}


function suite_de(){
    var de1=parseInt(document.getElementById("dé1").innerHTML)
    var de2=parseInt(document.getElementById("dé2").innerHTML)
    //alert(de1+" "+de2);
    joueurs[jact].nblances++;
    document.getElementById("lancer").innerHTML = "(" + de1 + ", " + de2 + "= " + (de1 + de2) + ")";
    document.getElementById("nblancers").innerHTML = joueurs[jact].nblances;
    fonction_1(de1,de2);
}

function jeu(){
    if (window.tour_actu==false) return;
    else{
        window.tour_actu=false;
        lancer_des();
    }
}



function fonction_1(de1=null,de2=null){
    if (!gagne) {
        if(de1==null || de2==null){
            de1=0;
            de2=0;
        }
        deplacement_oie(de1,de2);
    } else {
        alert("Vous avez gagné la partie, pour en recommencer une nouvelle, veuillez recharger la page");
    }
    
};





