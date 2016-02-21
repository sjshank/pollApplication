const express = require('express'),
	route = require('./server/middlewares/router'),
	app = express();

const server = require('./server')(app);
const appConfig = require('./server/middlewares/appConfig')(express, app);


	app.use('/api', route);
	app.use('/auth', route);
	app.use('/', function(req, res){
		res.sendFile(__dirname + '/server/views/landingPage.htm')
	});