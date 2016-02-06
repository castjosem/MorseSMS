module.exports = function(io){
	var express 	= require('express'),
		uuid 		= require('node-uuid'),
		_ 			= require('lodash')
		app 		= express(),
		searches	= require('searches');

	var channels = [];

	function newChannel(){
		var channel = {
			id: uuid.v4(),
			text = [],
			word: ""
		};
		return channel;
	};

	console.log("TEST");


	io.on('connection', function(client){
		
		client.on('addLetter', function(data){
			console.log(data);
		});
	});

	return app;
};