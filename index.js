const express = require('express')
const Routeur = require('./routes/SiteRoutes');
const session = require('express-session');




let app = express()
app.set('view engine', 'ejs')

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.urlencoded({
    extended: true
}))
app.use('/style', express.static(__dirname + '/style'));
app.use('/JS', express.static(__dirname + '/JS'));
app.use('/audio', express.static(__dirname + '/audio'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/fonts', express.static(__dirname + '/fonts'));
app.use(Routeur)




app.listen(3002)