
// création du routeur Express pour ce module
const express = require('express');
const routeur = express.Router();

const Controle = require('../Controllers/SiteController.js');
const ControlePharmacie = require('../pharmacie/controllers/SiteController.js');



 routeur.get('/', Controle.accueil);



 //Première année BTS SIO
 routeur.get('/SIO1/Loto', Controle.loto);
 routeur.get('/SIO1/Pirate', Controle.pirate);
 routeur.get('/SIO1/Pirate/info', Controle.infoPirate);
 routeur.get('/SIO1/Pirate/score', Controle.afficherScore);

 routeur.post('/SIO1/Pirate/enregistrerScore', Controle.enregistrerScore);


 //Deuxieme année BTS SIO 

 //Pharmacie

 // Afficher page accueil
routeur.get('/pharmacie', ControlePharmacie.site_afficher_liste_patients);

//Afficher page commande
routeur.get('/pharmacie/commande', ControlePharmacie.site_affichage_commande);

// Affiche la page d'enregistrement client 
routeur.get('/pharmacie/enregistrer', ControlePharmacie.site_afficher_enregistrer_client);

// Enregistre un nouveau client
routeur.post('/pharmacie/enregistrer', ControlePharmacie.site_enregistrer_client);

// Affiche liste de patient
routeur.get('/pharmacie/liste', ControlePharmacie.site_afficher_liste_patients);

// Recherche dans la liste de patient
routeur.post('/pharmacie/liste/rechercher', ControlePharmacie.site_liste_patient_rechercher);

// Affiche liste de médicaments
routeur.get('/pharmacie/liste_medicaments', ControlePharmacie.site_afficher_liste_médicaments);

// Recherche dans la liste de médicaments
routeur.post('/pharmacie/liste_medicaments/rechercher', ControlePharmacie.site_liste_médicaments_rechercher);

// Afficher page enregistrement d'ordonnance
routeur.get('/pharmacie/liste/enregistrer_ordonnance/:secu', ControlePharmacie.site_afficher_enregistrer_ordonnance);

// Afficher ordonnance
routeur.get('/pharmacie/liste/afficher_ordonnance/:secu', ControlePharmacie.site_afficher_ordonnance_patient);

//Affiche graphique du medic
routeur.get('/pharmacie/liste_medicaments/graphiques/:medic',ControlePharmacie.site_medicaments_graph);

//Enregistrer nouvelle ordonnance 
routeur.post('/pharmacie/liste/ordonnance/ajouter', ControlePharmacie.site_ajouter_ordonnance);

//Commande de medicament
routeur.get('/pharmacie/liste_medicaments/graphiques/commander/:medic&:difStock',ControlePharmacie.site_commande_medicaments_graph);

//Supprimer client
routeur.get('/pharmacie/liste/client/supprimer/:secu',ControlePharmacie.site_supprimer_client);

//Suprimer ordonnance
routeur.get('/pharmacie/supprimer_ordonnance/:ordo&:secu', ControlePharmacie.site_supprimer_ordo);

//Afficher page de modification de client 
routeur.get('/pharmacie/liste/afficher_modifier_client/:secu', ControlePharmacie.site_afficher_modifier_client);

routeur.post('/pharmacie/modifier_client/:id',ControlePharmacie.site_modifier_client);

routeur.get('/pharmacie/liste_medicament/supprimer/:medic',ControlePharmacie.site_supprimer_medicament)

//STAGE SOLTI

routeur.get('/SIO2/SOLTI', Controle.afficherStage);

routeur.get('/iframe', Controle.iframe);

 module.exports = routeur;