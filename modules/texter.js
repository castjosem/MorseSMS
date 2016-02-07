var TMClient = require('textmagic-rest-client');
  
module.exports.texter = function(message){

	var c = new TMClient('jacobhell', 'TMgoJDjFq2zOhkVdefIG6oMDeNDUAN');
	c.Messages.send({text: message, phones:'13523623532'}, function(err, res){
	    console.log('Messages.send()', err, res);
	});
};
