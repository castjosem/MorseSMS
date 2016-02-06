(function(){
	console.log("init");
	var socket = io();
	var morse = Morse('#more', '#decrypted', '#pose', socket);
	morse.init();


	socket.on('suggestions', function(arr){
		console.log(arr);
	});

})();


