var express = require('express'),
	path = require('path'),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
	favicon = require('serve-favicon'),
	routes = require('./routes/index'),
	socket_io = require('socket.io'),
	channels = require('./modules/channels');

var app = express();
app.io = require('socket.io')();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use(channels(app.io));

app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

module.exports = app;