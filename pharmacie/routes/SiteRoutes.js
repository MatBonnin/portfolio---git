

// création du routeur Express pour ce module
const { Router } = require('express');
const express = require('express');
const routeur = express.Router();

const Controle = require('../controllers/SiteController');



// Afficher page accueil
routeur.get('/pharmacie', Controle.site_afficher_liste_patients);

//Afficher page commande
routeur.get('/pharmacie/commande', Controle.site_affichage_commande);

// Affiche la page d'enregistrement client 
routeur.get('/pharmacie/enregistrer', Controle.site_afficher_enregistrer_client);

// Enregistre un nouveau client
routeur.post('/pharmacie/enregistrer', Controle.site_enregistrer_client);

// Affiche liste de patient
routeur.get('/pharmacie/liste', Controle.site_afficher_liste_patients);

// Recherche dans la liste de patient
routeur.post('/pharmacie/liste/rechercher', Controle.site_liste_patient_rechercher);

// Affiche liste de médicaments
routeur.get('/pharmacie/liste_medicaments', Controle.site_afficher_liste_médicaments);

// Recherche dans la liste de médicaments
routeur.post('/pharmacie/liste_medicaments/rechercher', Controle.site_liste_médicaments_rechercher);

// Afficher page enregistrement d'ordonnance
routeur.get('/pharmacie/liste/enregistrer_ordonnance/:secu', Controle.site_afficher_enregistrer_ordonnance);

// Afficher ordonnance
routeur.get('/pharmacie/liste/afficher_ordonnance/:secu', Controle.site_afficher_ordonnance_patient);

//Affiche graphique du medic
routeur.get('/pharmacie/liste_medicaments/graphiques/:medic',Controle.site_medicaments_graph);

//Enregistrer nouvelle ordonnance 
routeur.post('/pharmacie/liste/ordonnance/ajouter', Controle.site_ajouter_ordonnance);

//Commande de medicament
routeur.get('/pharmacie/liste_medicaments/graphiques/commander/:medic&:difStock',Controle.site_commande_medicaments_graph);

//Supprimer client
routeur.get('/pharmacie/liste/client/supprimer/:secu',Controle.site_supprimer_client);

//Suprimer ordonnance
routeur.get('/pharmacie/supprimer_ordonnance/:ordo&:secu', Controle.site_supprimer_ordo);

//Afficher page de modification de client 
routeur.get('/pharmacie/liste/afficher_modifier_client/:secu', Controle.site_afficher_modifier_client);

routeur.post('/pharmacie/modifier_client/:id',Controle.site_modifier_client);

routeur.get('/pharmacie/liste_medicament/supprimer/:medic',Controle.site_supprimer_medicament)


 

module.exports = routeur;