var db = require('../bddCon.js');


const enregistrerScore = (score,pseudo) => {
    db.query("INSERT INTO score_jeu(pseudo,score) VALUES ('" + pseudo + "'," + score + ")", (err, resultat) => {
        
        console.log(JSON.stringify(err))
    })
}

const recupererScore = (req,res) => {
    return new Promise((resolve, reject) => {
    db.query("SELECT * FROM score_jeu ORDER BY score DESC LIMIT 10", (err, resultat) => {
        console.log(resultat)
        resolve(resultat)
    })
})
}


//SELECT valeurNote,dateNote,nomMatiere FROM t_profclasse,t_note,t_matiere WHERE profClasseNote = idProfClasse AND matiereProfClasse = idMatiere
module.exports = {
    enregistrerScore,
    recupererScore
}