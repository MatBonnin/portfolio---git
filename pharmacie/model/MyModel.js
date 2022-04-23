var db= require('../bddCon');

module.exports={

    getPatient:function(callback){
        db.query('SELECT cli_nom,cli_prenom,cli_sexe,cli_date,cli_telephone,cli_secu,cli_mutuelle ,cli_médecin FROM client ORDER BY cli_id ASC', (err, lignes) => {
            if (!err) {
                
                return callback(lignes)
            }
            else {
                console.log(err)
                console.log("Erreur lors de l'enregistrment du traitement")
                
            }
        })
    },

    getMedecin:function(callback){
        db.query('SELECT * FROM medecin    ', (err, lignes2) => {
    
    
            return callback(lignes2)
    
        })

    },

    getMedicament:function(callback){
    db.query('SELECT medic_nom,medic_stock FROM medicament', (err, lignes) => {

        return callback(lignes)

    })
  },
   InsererClient : (CliName,CliPrenom,CliDate,CliMutuelle,CliPhone,CliSecu,CliSexe,res) =>{
    let requeteSQL = "INSERT INTO client (cli_nom, cli_prenom, cli_date,cli_mutuelle,cli_telephone,cli_secu,cli_sexe) VALUES "
    requeteSQL = requeteSQL + ' ("' + CliName + '","' + CliPrenom + '","' + CliDate + '","' + CliMutuelle + '",' + CliPhone + ',' + CliSecu + ' ,"' + CliSexe + '")'
    db.query(requeteSQL, (err, lignes) => {
        if (!err) {
            console.log("Insertion terminé");
            
        } else {
            console.log("Erreur lors de l'enregistrment")
            res.send("Erreur ajout : " + JSON.stringify(err))
        }
    })
  },
  getCliID:function(callback) {
    db.query('SELECT cli_id FROM client WHERE cli_secu =' + secu , (err, lignes) => {
        if(!err){ 
            console.log(lignes)
            return callback(lignes) 
      }
      else{
        return "test"
    }
    })
  },
  SupClient : () =>{
    db.query('DELETE FROM medic_traitement WHERE trait_client =' + cli_id + '', (err, lignes) => {
        db.query('DELETE FROM ordonnance WHERE ordo_patient =' + cli_id + '', (err, lignes) => {
            db.query('DELETE FROM ordonnance WHERE ordo_patient =' + cli_id + '', (err, lignes) => {})
        })
        
  })
}
 
}

