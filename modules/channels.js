module.exports = function(io){
	var express 	= require('express'),
		uuid 		= require('node-uuid'),
		_ 			= require('lodash')
		app 		= express(),
		searches	= require('./searches');
		texter		= require('./texter');

	var channels = [];

	function newChannel(){
		var channel = {
			id: uuid.v4(),			
			word: ""
		};
		return channel;
	};

	function callbackSuggestion(error, response, body){
		var filtered = [];
		var resps = JSON.parse(body)[1];
		if (typeof resps !== undefined && resps.length > 0){
			filtered = _.filter(resps, function (resp) {
				return resp.indexOf(' ') == -1;
			});
		}
		io.emit('suggestions', filtered);
	}

	io.on('connection', function(client){		
		client.on('addLetter', function(word){
			searches.suggestions(word, callbackSuggestion);
		});
	});

	io.on('connection', function(client){
		client.on('texter', function(message){
			console.log("LOOK HERE " + message);
			texter.texter(message);
	});

	

	return app;
};