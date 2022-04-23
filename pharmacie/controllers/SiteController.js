var myModel=require('../model/MyModel');

var db= require('../bddCon');

const site_affichage_accueil = (req, res) => {

    res.render('index')
}

const site_affichage_commande = (req, res) => {


    myModel.getMedicament(function(data){
        res.render('commande', { Lignes: data })
    })


}

const site_afficher_enregistrer_client = (req, res) => {
    let titrePage = "Enregistrement clients "
    res.render('pages/pharmacie/enregistrer', { titre: titrePage,i:1 })
}

const site_enregistrer_client = (req, res) => {
    let CliName = req.body.name
    let CliPrenom = req.body.prenom
    let CliDate = req.body.date
    let CliMutuelle = req.body.mutu
    let CliPhone = req.body.tel
    let CliSecu = req.body.secu
    let CliSexe = req.body.sexe


     if ((parseInt(CliPhone)/1)!=CliPhone){
         console.log(CliPhone)
         res.render('pages/pharmacie/enregistrer',{alert: "Numéro de téléphone pas au bon format",i: 2})
     }
     else{
        myModel.InsererClient(CliName,CliPrenom,CliDate,CliMutuelle,CliPhone,CliSecu,CliSexe,res)
        res.redirect('/pharmacie/liste')
     }
  
   


}

const site_afficher_liste_patients = (req, res) => {
    let titrePage = "Liste des patients"
   myModel.getPatient(function(data1){
        
    myModel.getMedecin(function(data2){
        
       res.render("pages/pharmacie/liste", { client: data1, medecin: data2, titre: titrePage })
       
    })
   })
}

const site_supprimer_client = (req, res) => {
    secu = req.params.secu

        myModel.getCliID(function(data){
            data.forEach(function (user) {
                cli_id = user.cli_id
                    myModel.SupClient()                           
            })
        })
                 res.redirect("pharmacie/liste");    

}


const site_liste_patient_rechercher = (req, res) => {
    let titrePage = "Liste des patients"
    let client = req.body.rechercher
    db.query('SELECT * FROM client WHERE cli_nom LIKE "' + client + '%"  or cli_prenom LIKE  "' + client + '%"', (err, lignes) => {
        if (!err) {

            db.query('SELECT * FROM medecin    ', (err, lignes2) => {
                if (client != "") {

                    res.render("pages/pharmacie/liste", { client: lignes, medecin: lignes2, titre: titrePage })
                }
                else {
                    res.redirect('/pharmacie/liste')
                }
            })

        }

        else {
             
            res.send("Erreur ajout : " + JSON.stringify(err))
        }
    })
}

const site_afficher_liste_médicaments = (req, res) => {
    db.query('SELECT medic_nom,medic_stock,medic_id FROM medicament ORDER BY medic_nom ASC', (err, lignes) => {
        if (!err) {


            res.render("pages/pharmacie/liste_medicaments", { Lignes: lignes })


        }
        else {
             
            res.send("Erreur ajout : " + JSON.stringify(err))
        }
    })
}

const site_supprimer_medicament = (req,res) => {

    medic_id = req.params.medic
     
    let liste = []
    function requeteSup(){
        db.query('DELETE FROM medicament WHERE medic_id =' + medic_id, (err, lignes) => {
        })
    }

    db.query('SELECT trait_ordo FROM medic_traitement WHERE trait_medic = ' + medic_id, (err, lignes) => {
         
        if(lignes==""){
            requeteSup()
            res.redirect('/pharmacie/liste_medicaments')
        }
        else{
        lignes.forEach(function (user) {
            trait_ordo = user.trait_ordo
            db.query('SELECT trait_id FROM medic_traitement WHERE trait_ordo = ' + trait_ordo, (err, lignes) => {
                lignes.forEach(function (user2) {
                    liste.push(user2.trait_id)
                })
                if(liste.length==1){
                    db.query('DELETE FROM ordonnance WHERE ordo_id =' + trait_ordo, (err, lignes) => {
                        requeteSup()
                    })
                }
                else{
                    requeteSup()
                }
                
            })
        })
        res.redirect('/pharmacie/liste_medicaments')
    }
    })
    
}

const site_liste_médicaments_rechercher = (req, res) => {
    let medicament = req.body.rechercher
     
    db.query('SELECT medic_nom,medic_stock,medic_id FROM medicament WHERE medic_nom like  "' + medicament + '%"', (err, lignes) => {
        if (!err) {
            
            if (medicament != "") {
                res.render("pages/pharmacie/liste_medicaments", { Lignes: lignes })
            }
            else {
                res.redirect('/pharmacie/liste_medicaments')
            }


        }
        else {
             
            res.send("Erreur ajout : " + JSON.stringify(err))
        }
    })
}

const site_afficher_modifier_client = (req, res) => {
    cli_secu = req.params.secu

    db.query('SELECT * FROM client WHERE cli_secu = ' + cli_secu, (err, lignes) => {

         
        res.render('pages/pharmacie/modifier_client', { donnee: lignes })


    })

}

const site_modifier_client = (req, res) => {
    let cli_id = req.params.id
    let CliName = req.body.name
    let CliPrenom = req.body.prenom
    let CliMutuelle = req.body.mutu
    let CliPhone = req.body.tel
    let CliSecu = req.body.secu

    db.query('UPDATE client SET cli_nom = "' + CliName + '", cli_prenom ="' + CliPrenom + '",cli_mutuelle = "' + CliMutuelle + '",cli_telephone = "' + CliPhone + '" , cli_secu = ' + CliSecu + ' WHERE cli_id = ' + cli_id, (err, lignes) => {
        res.redirect('/pharmacie/liste')
    })

}

const site_afficher_enregistrer_ordonnance = (req, res) => {
    let secu = req.params.secu
    db.query('SELECT cli_nom,cli_prenom,cli_date FROM client WHERE cli_secu =' + secu, (err, lignes) => {

        if (!err) {
            let donnée = lignes

            db.query('SELECT medic_nom FROM medicament ', (err, lignes) => {

                res.render("pages/pharmacie/enregistrer_ordonnance", { Liste: donnée, medics: lignes })
            })

        }
    })

}

const site_commande_medicaments_graph = (req, res) => {
    let difStock = req.params.difStock
    let medicament = req.params.medic

    if (difStock > 0) {
        db.query('SELECT medic_stock FROM medicament WHERE medic_nom ="' + medicament + '"', (err, lignes) => {
            if (!err) {
                lignes.forEach(function (user) {
                    medic_stock = user.medic_stock
                    medic_stock = parseInt(medic_stock) + parseInt(difStock)

                    db.query('UPDATE medicament SET medic_stock =' + medic_stock + ' WHERE medic_nom ="' + medicament + '"', (err, lignes) => {

                        res.redirect('/pharmacie/liste_medicaments/graphiques/' + medicament + '')

                    })

                })
            }
        })
    }
    else {
        res.redirect('/pharmacie/liste_medicaments/graphiques/' + medicament + '')
    }
     


}

const site_medicaments_graph = (req, res) => {

    let medicament = req.params.medic
    let medic_id
    let trait_ordo = []

     

    let tableau = [
        [1, 0],
        [2, 0],
        [3, 0],
        [4, 0],
        [5, 0],
        [6, 0],
        [7, 0],
        [8, 0],
        [9, 0],
        [10, 0],
        [11, 0],
        [12, 0],


    ]
    let tableauResultat = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]


    function monthDiff(a1, m1, j1, a2, m2, j2) {
        var months;
        months = (a2 - a1) * 12;
        months -= m1;
        months += m2;
        if (j2 - parseInt(j1, 0) >= 0) {

            months += 1
        }
        return months <= 0 ? 0 : months;
    }

    function test(a1, m1, j1, a2, m2, j2) {

        var diff = monthDiff(a1, m1, j1, a2, m2, j2);
        return diff;
    }


    db.query('SELECT medic_id,medic_stock FROM medicament WHERE medic_nom = "' + medicament + '"', (err, lignes) => {
        if (!err) {
            lignes.forEach(function (user) {
                medic_id = user.medic_id
                medic_stock = user.medic_stock
            })


            db.query('SELECT trait_ordo FROM medic_traitement WHERE trait_medic = ' + medic_id + '', (err, lignes) => {
                if (!err) {
                    if (lignes == "") { res.render('pages/pharmacie/graph_medicament', { stock: medic_stock, tab2: tableauResultat, medic: medicament }) }
                    lignes.forEach(function (user) {
                        trait_ordo.push(user.trait_ordo)

                    })

                    for (let i = 0; i < trait_ordo.length; i++) {
                        db.query('SELECT ordo_date FROM ordonnance WHERE ordo_id =' + trait_ordo[i], (err, lignes) => {
                            if (!err) {
                                let ordo_id = trait_ordo[i]
                                var différence = []
                                let ligneDiff = lignes


                                db.query('SELECT trait_duree, trait_id,trait_boites,trait_medic FROM medic_traitement,medicament WHERE trait_medic = ' + medic_id + ' AND trait_ordo = ' + ordo_id + ' GROUP BY trait_id', (err, lignes) => {
                                    if (!err) {
                                        ligneDiff.forEach(function (user) {

                                            let dates = new Date()
                                            date = user.ordo_date
                                             
                                            jours = date.slice(0, 2)
                                            mois = date.slice(3, 5)
                                            annee = date.slice(6, 10)
                                            JoursActuelle = dates.getDate()
                                             
                                            MoisActuelle = (dates.getMonth() + 1)
                                             
                                            anneeActuelle = dates.getFullYear()


                                            différence.push(test(annee, mois, jours, anneeActuelle, MoisActuelle, JoursActuelle))
                                             
                                             

                                            différence = différence - 1

                                            console.log(lignes)
                                            lignes.forEach(function (user) {

                                                if (différence < user.trait_duree) {

                                                    for (let j = 0; j < user.trait_duree - différence; j++) {

                                                        if ((j + MoisActuelle) <= 12) {

                                                            for (let y = 0; y < 12; y++) {

                                                                if (tableau[y][0] == (j + MoisActuelle)) {


                                                                    tableauResultat[(j + MoisActuelle) % MoisActuelle] = tableauResultat[(j + MoisActuelle) % MoisActuelle] + (user.trait_boites)
                                                                }

                                                            }
                                                        }

                                                        else {
                                                            for (let y = 0; y < 12; y++) {
                                                                DateSup = ((j + MoisActuelle) % 13) + 1

                                                                if (tableau[y][0] == DateSup) {

                                                                    tableauResultat[(12 + DateSup) % MoisActuelle] = tableauResultat[(12 + DateSup) % MoisActuelle] + (user.trait_boites)


                                                                }

                                                            }
                                                        }


                                                    }

                                                }

                                                else {
                                                     
                                                }


                                            })


                                            if (i == (trait_ordo.length - 1)) {
                                                 
                                                 
                                                 
                                                 
                                                res.render('pages/pharmacie/graph_medicament', { stock: medic_stock, tab2: tableauResultat, medic: medicament })
                                            }
                                        })

                                    }
                                    else {
                                         

                                    }
                                })
                            }
                        })

                    }

                }
                else {
                     
                    res.send("Erreur  : " + JSON.stringify(err))
                }
            })
        }
        else {
             
            res.send("Erreur  : " + JSON.stringify(err))
        }

    })
}

const site_afficher_ordonnance_patient = (req, res) => {
    let secu = req.params.secu
    const cli_medic = []
    let titrePage = "Ordonnances"


    db.query('SELECT cli_id FROM client WHERE cli_secu =' + secu, (err, lignes) => {

        if (!err) {

            lignes.forEach(function (user) {

                cli_id = user.cli_id
                 

                db.query('SELECT cli_nom,cli_prenom,cli_date FROM client WHERE cli_id =' + cli_id + ' ', (err, lignes) => {
                    if (!err) {

                        lignes.forEach(function (user) {

                            pre_cli = user.cli_prenom
                            nom_cli = user.cli_nom
                            date_cli = user.cli_date

                        })

                        db.query('SELECT med_nom,med_prenom,medic_nom,ordo_date,ordo_patho,trait_boites,trait_duree FROM medicament , medic_traitement,ordonnance,medecin where trait_medic = medic_id and trait_client = ' + cli_id + ' and trait_ordo = ordo_id  and ordo_medecin = med_id', (err, lignes) => {

                            if (!err) {


                                db.query('SELECT med_nom,med_prenom,ordo_date,ordo_patho,ordo_id FROM medic_traitement,ordonnance,medecin where  trait_client = ' + cli_id + ' and trait_ordo = ordo_id  and ordo_medecin = med_id GROUP BY ordo_patho', (err, lignes2) => {

                                    if (!err) {
                                         
                                         
                                        res.render("pages/pharmacie/afficher_ordonnance", { secu: secu, medic: cli_medic, nom: nom_cli, prenom: pre_cli, age: date_cli, donnees: lignes, donnees2: lignes2, titre: titrePage })
                                    }

                                    else {
                                         
                                        res.send("Erreur ajout : " + JSON.stringify(err))
                                    }
                                })

                            }

                            else {
                                 
                                res.send("Erreur ajout : " + JSON.stringify(err))
                            }
                        })



                    }

                    else {
                         
                        res.send("Erreur ajout : " + JSON.stringify(err))
                    }


                })


            })


        }
    })



}

const site_supprimer_ordo = (req, res) => {
    ordo_id = req.params.ordo
    secu = req.params.secu
    db.query('DELETE FROM ordonnance WHERE ordo_id =' + ordo_id + '')
    db.query('DELETE FROM medic_traitement WHERE trait_ordo =' + ordo_id + '')

    res.redirect('/pharmacie/liste/afficher_ordonnance/' + secu)

}

const site_ajouter_ordonnance = (req, res) => {

    x = 1
    let med_pre = req.body.pre_med
    let med_nom = req.body.nom_med
    let med_num = req.body.num_med
    let CliPre = req.body.pre_cli
    let CliNom = req.body.nom_cli
    let CliDate = req.body.date_cli
    let medic_nom = req.body.med
    let medic_durée = req.body.durée
    let medic_boite = req.body.boites
    let ordo_date = req.body.date_ordo
    let ordo_maladie = req.body.maladie_ordo
    let med_id = 0

    function Requete() {
        db.query('SELECT med_id FROM medecin WHERE med_prenom = "' + med_pre + '" AND med_nom = "' + med_nom + '" AND med_telephone = "' + med_num + '" ', (err, lignes) => {

            if (!err) {
                lignes.forEach(function (user) {

                    med_id = user.med_id
                     


                })


                /* Ajout de l'ID du médecin pour le client */
                db.query('UPDATE client SET cli_médecin = "' + med_id + '"  WHERE cli_id = "' + cli_id + '" ', (err, lignes) => {


                    if (!err) {
                         

                        db.query('INSERT INTO ordonnance (ordo_medecin,ordo_patient,ordo_date,ordo_patho) VALUES ("' + med_id + '","' + cli_id + '","' + ordo_date + '","' + ordo_maladie + '") ', (err, lignes) => {

                            if (!err) {
                                 


                                /** SELECTIONER LA DERNIERE ORDONNANCE AJOUTER */

                                db.query('SELECT ordo_id FROM ordonnance WHERE ordo_medecin = "' + med_id + '" AND ordo_patient = "' + cli_id + '" AND ordo_date= "' + ordo_date + '" AND ordo_patho = "' + ordo_maladie + '" ', (err, lignes) => {

                                    if (!err) {
                                        lignes.forEach(function (user) {

                                            ordo = user.ordo_id

                                             


                                            for (let i = 0; i < medic_boite.length; i++) {

                                                 

                                                if (medic_boite.length == 1) {


                                                    db.query('SELECT medic_id FROM medicament WHERE medic_nom = "' + medic_nom + '"', (err, lignes) => {
                                                        if (!err) {
                                                             


                                                            /** verification de la présence du médciament dans la table */
                                                            if (lignes == "") {
                                                                 


                                                                 
                                                                /** Insertioon d'un médicament dans la table médicament */
                                                                db.query('INSERT INTO medicament (medic_nom) VALUES ("' + medic_nom + '") ', (err, lignes) => {
                                                                    if (err) {
                                                                         
                                                                        res.send("Erreur ajout : " + JSON.stringify(err))
                                                                    }
                                                                    else {
                                                                         



                                                                        db.query('SELECT medic_id FROM medicament WHERE medic_nom = "' + medic_nom + '"', (err, lignes) => {
                                                                            if (err) {
                                                                                 
                                                                                res.send("Erreur ajout : " + JSON.stringify(err))
                                                                            }

                                                                            else {
                                                                                 
                                                                                lignes.forEach(function (user) {

                                                                                    medic_id = user.medic_id
                                                                                     



                                                                                    /** Insertioon d'un traitement dans la table traitement */
                                                                                    db.query('INSERT INTO medic_traitement (trait_medic,trait_client,trait_boites,trait_duree,trait_ordo) VALUES ("' + medic_id + '","' + cli_id + '","' + medic_boite + '","' + medic_durée + '","' + ordo + '") ', (err, lignes) => {
                                                                                        if (err) {
                                                                                             
                                                                                            res.send("Erreur ajout : " + JSON.stringify(err))
                                                                                        }
                                                                                        else {

                                                                                             



                                                                                        }
                                                                                    })

                                                                                })

                                                                            }


                                                                        })


                                                                    }

                                                                })


                                                            }

                                                            /** Si le médicament est déjà dans la table */
                                                            else {
                                                                 

                                                                lignes.forEach(function (user) {

                                                                    medic_id = user.medic_id
                                                                     



                                                                    /** Insertioon d'un traitement dans la table traitement */
                                                                    db.query('INSERT INTO medic_traitement (trait_medic,trait_client,trait_boites,trait_duree,trait_ordo) VALUES ("' + medic_id + '","' + cli_id + '","' + medic_boite + '","' + medic_durée + '","' + ordo + '") ', (err, lignes) => {
                                                                        if (err) {
                                                                             
                                                                            res.send("Erreur ajout : " + JSON.stringify(err))
                                                                        }
                                                                        else {

                                                                             



                                                                        }
                                                                    })

                                                                })
                                                            }

                                                        }

                                                        else {
                                                             
                                                            res.send("Erreur ajout : " + JSON.stringify(err))
                                                        }


                                                    })

                                                }

                                                else {





                                                    db.query('SELECT medic_id FROM medicament WHERE medic_nom = "' + medic_nom[i] + '"', (err, lignes) => {
                                                        if (!err) {
                                                             


                                                            /** verification de la présence du médciament dans la table */
                                                            if (lignes == "") {
                                                                 


                                                                 
                                                                /** Insertioon d'un médicament dans la table médicament */
                                                                db.query('INSERT INTO medicament (medic_nom) VALUES ("' + medic_nom[i] + '") ', (err, lignes) => {
                                                                    if (err) {
                                                                         
                                                                        res.send("Erreur ajout : " + JSON.stringify(err))
                                                                    }
                                                                    else {
                                                                         



                                                                        db.query('SELECT medic_id FROM medicament WHERE medic_nom = "' + medic_nom[i] + '"', (err, lignes) => {
                                                                            if (err) {
                                                                                 
                                                                                res.send("Erreur ajout : " + JSON.stringify(err))
                                                                            }

                                                                            else {
                                                                                 
                                                                                lignes.forEach(function (user) {

                                                                                    medic_id = user.medic_id
                                                                                     



                                                                                    /** Insertioon d'un traitement dans la table traitement */
                                                                                    db.query('INSERT INTO medic_traitement (trait_medic,trait_client,trait_boites,trait_duree,trait_ordo) VALUES ("' + medic_id + '","' + cli_id + '","' + medic_boite[i] + '","' + medic_durée[i] + '","' + ordo + '") ', (err, lignes) => {
                                                                                        if (err) {
                                                                                             
                                                                                            res.send("Erreur ajout : " + JSON.stringify(err))
                                                                                        }
                                                                                        else {

                                                                                             



                                                                                        }
                                                                                    })

                                                                                })

                                                                            }


                                                                        })


                                                                    }

                                                                })


                                                            }

                                                            /** Si le médicament est déjà dans la table */
                                                            else {
                                                                 

                                                                lignes.forEach(function (user) {

                                                                    medic_id = user.medic_id
                                                                     



                                                                    /** Insertioon d'un traitement dans la table traitement */
                                                                    db.query('INSERT INTO medic_traitement (trait_medic,trait_client,trait_boites,trait_duree,trait_ordo) VALUES ("' + medic_id + '","' + cli_id + '","' + medic_boite[i] + '","' + medic_durée[i] + '","' + ordo + '") ', (err, lignes) => {
                                                                        if (err) {
                                                                             
                                                                            res.send("Erreur ajout : " + JSON.stringify(err))
                                                                        }
                                                                        else {

                                                                             



                                                                        }
                                                                    })

                                                                })
                                                            }

                                                        }

                                                        else {
                                                             
                                                            res.send("Erreur ajout : " + JSON.stringify(err))
                                                        }


                                                    })

                                                }




                                            }
                                            res.redirect("/pharmacie/liste")


                                        })


                                    }
                                    else {
                                         
                                        res.send("Erreur ajout : " + JSON.stringify(err))
                                    }
                                })



                            }
                            else {
                                 
                                res.send("Erreur ajout : " + JSON.stringify(err))
                            }


                        })

                    }

                    else {
                         
                        res.send("Erreur ajout : " + JSON.stringify(err))
                    }

                })


            }

            else {
                 
                res.send("Erreur ajout : " + JSON.stringify(err))
            }
        })
    }





    /* Recupération de l'id du client */
    db.query('SELECT cli_id FROM client WHERE cli_prenom = "' + CliPre + '" AND cli_nom = "' + CliNom + '" AND cli_date = "' + CliDate + '" ', (err, lignes) => {

        if (!err) {
            lignes.forEach(function (user) {

                cli_id = user.cli_id
                 

                /* Verification que le médecin n'est pas déjà enregistrer */
                db.query('SELECT med_id FROM medecin WHERE med_prenom = "' + med_pre + '" AND med_nom = "' + med_nom + '" AND med_telephone = "' + med_num + '" ', (err, lignes) => {

                    if (!err) {


                        /** Si le médecin n'est pas encore enregistrer */
                        if (lignes == "") {
                             

                            /* Insertion du médecin dans la table médecin */
                            db.query('INSERT INTO medecin (med_nom, med_prenom,med_telephone) VALUES ("' + med_nom + '","' + med_pre + '","' + med_num + '") ', (err, lignes) => {
                                if (!err) {
                                     

                                    /* Recupération de l'id du médecin */
                                    Requete()




                                } else {
                                     
                                    res.send("Erreur ajout : " + JSON.stringify(err))
                                }
                            })


                        }
                        /** Si le médecin est déjà enregistrer */
                        else {
                             
                            /* Recupération de l'id du médecin */
                            Requete()
                        }

                    }
                    else {
                         
                        res.send("Erreur ajout : " + JSON.stringify(err))
                    }

                })



            })

        }
        else {
             
            res.send("Erreur ajout : " + JSON.stringify(err))
        }
    })





}

module.exports = {
    site_affichage_accueil,
    site_affichage_commande,
    site_afficher_enregistrer_client,
    site_enregistrer_client,
    site_afficher_liste_patients,
    site_liste_patient_rechercher,
    site_afficher_liste_médicaments,
    site_liste_médicaments_rechercher,
    site_afficher_enregistrer_ordonnance,
    site_afficher_ordonnance_patient,
    site_ajouter_ordonnance,
    site_medicaments_graph,
    site_commande_medicaments_graph,
    site_supprimer_client,
    site_supprimer_ordo,
    site_afficher_modifier_client,
    site_modifier_client,
    site_supprimer_medicament

}