window.app = {};
window.app.suggestions = [];

(function(){
	console.log("init");
	window.app.socket = io();
	window.app.morse = Morse('#morse', '#suggestions', '#decrypted', '#pose', window.app.socket);
	window.app.morse.init();

})();


