var TMClient = require('textmagic-rest-client');
//var phone_number = '13523623532';
var phone_number = '17863702278';
  
module.exports.texter = function(message){

	var c = new TMClient('jacobhell', 'TMgoJDjFq2zOhkVdefIG6oMDeNDUAN');
	c.Messages.send({text: message, phones: phone_number}, function(err, res){
	    console.log('Messages.send()', err, res);
	});
};
