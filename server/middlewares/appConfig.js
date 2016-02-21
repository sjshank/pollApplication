const bodyParser = require("body-parser"),
	expressHbs = require('express3-handlebars'),
	expressSession = require('express-session'),
	cookieParser = require('cookie-parser'),
	mongoose = require("mongoose"),
	connect = require('connect'),
	morgan = require('morgan'),
	MongoStore = require('connect-mongo')(expressSession),
	path = require("path");

module.exports = function(express, app){
	app.use(morgan('dev'));
	app.use(express.static('client'));
	app.use(express.static('client/js/'));
	app.use(express.static('node_modules'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));

/*
*	Initialize session using express. Used express-session for session controlling.
*/
	app.use(expressSession({
		secret : "bookmarkKey",
		resave : true,
		saveUninitialized : true,
	  	store: new MongoStore({
		    mongooseConnection : mongoose.connection
	  })
}));

	// view engine setup
	app.set('views', path.join(__dirname, 'server/views'));
	app.set('view engine', 'htm');

	app.use(function(req, res, next){
		  res.set('X-Powered-By', 'Polls Application');
		  next();
		});
}