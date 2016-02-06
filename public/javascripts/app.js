(function(){
	console.log("init");
	var socket = io();
	var morse = Morse('#morse', '#suggestions', '#decrypted', '#pose', socket);
	morse.init();

})();


