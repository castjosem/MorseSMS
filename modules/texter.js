<<<<<<< HEAD
var accountSid = 'ACa51adcf30b56514ad5c1116a5edcbc34'; 
var authToken = '657e472f5ca775e8777175d214e9cd91'; 
 
//require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken); 

module.exports.texter = function(message){
	client.sms.messages.create({
    	to:'+17863702278',
	    from:'+17548885804',
	    body: message
	}, function(error, message) {
		    // The HTTP request to Twilio will run asynchronously. This callback
		    // function will be called when a response is received from Twilio
		    // The "error" variable will contain error information, if any.
		    // If the request was successful, this value will be "falsy"
		    if (!error) {
		        // The second argument to the callback will contain the information
		        // sent back by Twilio for the request. In this case, it is the
		        // information about the text messsage you just sent:
		        console.log('Success! The SID for this SMS message is:');
		        console.log(message.sid);
		 
		        console.log('Message sent on:');
		        console.log(message.dateCreated);
		    } else {
		        console.log('Oops! There was an error.');
		        console.log(error);
		    }
=======
var TMClient = require('textmagic-rest-client');
//var phone_number = '13523623532';
var phone_number = '17863702278';
  
module.exports.texter = function(message){

	var c = new TMClient('jacobhell', 'TMgoJDjFq2zOhkVdefIG6oMDeNDUAN');
	c.Messages.send({text: message, phones: phone_number}, function(err, res){
	    console.log('Messages.send()', err, res);
>>>>>>> 4af17efc776be99cb98e5f519b58d2b678912248
	});
};
