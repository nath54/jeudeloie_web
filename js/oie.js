let randint = function(entier_min, entier_max) {
    return Math.floor(Math.random() * (entier_max + 1 - entier_min) + entier_min);
};

var de1, de2;
var caseActive = 0;
var gagne = false;
var nblances = 0;

function initialisation() {
    for (x = 0; x <= 63; x++) {
        xx = (x < 10 ? '0' : '') + x;
        var c = document.getElementById("item-" + xx);
        if (c != null) {
            if (x != 0) { c.innerHTML = xx; } else { c.innerHTML = "départ"; }
            var color = "rgb(" + parseInt(100 + parseInt(x / 63 * 150)) + "," + parseInt(250 - parseInt(x / 63 * 150)) + "," + "00" + ")";
            console.log("x : ", x, " color : ", color);
            c.style.backgroundColor = color;
        }

    }
    var caseActiveChaine = (caseActive < 10 ? '0' : '') + caseActive;
    elementActif = document.getElementById("item-" + caseActiveChaine);
    elementActif.setAttribute("class", "flexbox-item item-" + caseActiveChaine + " active");
}



var fonction_1 = function() {
    if (!gagne) {
        de1 = randint(1, 6);
        de2 = randint(1, 6);
        nblances++;
        document.getElementById("lancer").innerHTML = "(" + de1 + ", " + de2 + "= " + (de1 + de2) + ")";
        document.getElementById("nblancers").innerHTML = nblances;
        var caseActiveChaine = (caseActive < 10 ? '0' : '') + caseActive;
        if (nblances == 0 && de1 + de2 == 9) {
            if ((de1 == 6 && de2 == 3) || (de1 == 3 && de2 == 6)) {
                caseActive = 29;
            } else if ((de1 == 4 && de2 == 5) || (de1 == 5 && de2 == 4)) {
                caseActive = 53;
            }
        } else {
            if (caseActive >= 0) {
                // On supprime la valeur  "active" dans l'élément considéré.
                var elementActif = document.getElementById("item-" + caseActiveChaine);
                elementActif.setAttribute("class", "flexbox-item item-" + caseActiveChaine);

            };

            // On calcule la nouvelle position active
            caseActive += de1 + de2;
            while (caseActive > 63) {
                while (caseActive % 9 == 0 && (de1 + de2) != 9) {
                    caseActive += de1 + de2;
                }
                caseActive = 63 - (caseActive - 63);
                //alert("superior " + caseActive)
            }
            if (caseActive == 63) {
                alert("Vous avez gagné !")
                gagne = true;
            }
        }
        console.log("caseActive : " + caseActive)
        if (caseActive <= 63) {
            // On recherche le nouvel élément actif.
            caseActiveChaine = (caseActive < 10 ? '0' : '') + caseActive;
            elementActif = document.getElementById("item-" + caseActiveChaine);
            elementActif.setAttribute("class", "flexbox-item item-" + caseActiveChaine + " active");
            console.log(caseActiveChaine);
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