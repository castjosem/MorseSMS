var nodemailer = require('nodemailer');
var email = "hack@morsepro.com";
var title = "MorseHacks! Real Hipe"

module.exports.send = function(receiver, message){
	var options = {
		from: email,
		to: receiver,
		subject: title,
		text: message 
	};
	console.log(options);

	var transporter = nodemailer.createTransport();
	transporter.sendMail(options, function(error, info){
		if(error){
			console.log(error);
		}else{
			console.log('Message sent: ' + info.response);			
		};
	});
};