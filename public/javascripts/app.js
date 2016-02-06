(function(){
	console.log("init");
	var socket = io();
	var morse = Morse('#more', '#decrypted', '#pose', socket);
	morse.init();
})();


