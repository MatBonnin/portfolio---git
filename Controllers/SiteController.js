var myModel = require('../Models/MyModel.js');
var fetch = require('node-fetch');

const accueil = (req, res) => {

    res.render('pages/accueil')
}


 //Première année BTS SIO

const loto = (req,res) => {
    res.render('pages/loto')
}

const pirate = (req,res) => {
    res.render('pages/pirate/index')
}

const infoPirate = (req,res) => {
    res.render('pages/pirate/info')
}

const enregistrerScore = (req,res) => {
    pseudo = req.body.pseudo
    score = req.body.score
    console.log(pseudo)
    console.log(score)

    myModel.enregistrerScore(score,pseudo)
    res.redirect('/SIO1/Pirate')
}

const afficherScore = async(req,res) => {
    score = await myModel.recupererScore()
    console.log(score)
    res.render('pages/pirate/score',{score:score})
}


module.exports = {
    accueil,
    loto,
    pirate,
    infoPirate,
    enregistrerScore,
    afficherScore
}