module.exports = function(io){
	var express 	= require('express'),
		uuid 		= require('node-uuid'),
		_ 			= require('lodash')
		app 		= express(),
		searches	= require('./searches');

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
		if(typeof body !== undefined){			
			var resps = JSON.parse(body)[1];
			if (typeof resps !== undefined && resps.length > 0){
				filtered = _.filter(resps, function (resp) {
					return resp.indexOf(' ') == -1;
				});
			}
			io.emit('suggestions', filtered);
		}
	}

	io.on('connection', function(client){		
		client.on('addLetter', function(word){
			searches.suggestions(word, callbackSuggestion);
		});
	});

	

	return app;
};