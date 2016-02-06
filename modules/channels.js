module.exports = function(io){
	var express 	= require('express'),
		uuid 		= require('node-uuid'),
		_ 			= require('lodash')
		app 		= express();

	var channels = [];

	function newChannel(){
		var channel = {
			id: uuid.v4(),
			decrypyed: "",
			word: ""
		};
		return channel;
	};

	console.log("TEST");


	io.on('connection', function(client){
		console.log( "A user connected" );
		
		client.on('decrypted', function(data){
			console.log(data);
		});
	});

	return app;
};