const express = require('express')
const Routeur = require('./Routes/SiteRoutes.js');
const session = require('express-session');
var http = require('http');



// or
// const createIframe = require("node-iframe").default;



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
app.use('/pdf', express.static(__dirname + '/pdf'));
app.use(Routeur)


app.set('port',8100);
var server = http.createServer(app);
server.listen(8100,'fd00::3:c10c');

console.log(app.get('port'));
