const mysql = require('mysql')
const iniparser = require('iniparser')
const { resolveInclude } = require('ejs')


let configDB = iniparser.parseSync('pharmacie/db.ini')
let mysqlconnexion = mysql.createConnection({
    host: configDB['dev']['host'],
    user: configDB['dev']['user'],
    password: configDB['dev']['password'],
    database: configDB['dev']['database']

})

mysqlconnexion.connect((err) => {
    if (!err) console.log('BDD connectée.')
    else console.log('BDD connexion échouée \n Erreur: ' + JSON.stringify(err))
})


module.exports=mysqlconnexion;