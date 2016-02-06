var crypto = require('crypto');
var algorithm = 'aes-256-cbc';

var defaultPass = "HackFSU";

module.exports.encrypt = function(data, pass){
	if (typeof pass === 'undefined'){
		pass = defaultPass;
	}

	var cipher = crypto.createCipher(algorithm, pass);
	var crypted = cipher.update(data,'utf8','hex');
	crypted += cipher.final('hex');
	return crypted;
};

module.exports.decrypt = function(data, pass){
	if (typeof pass === 'undefined'){
		pass = defaultPass;
	}
	
	var decipher = crypto.createDecipher(algorithm, pass);
	var dec = decipher.update(data,'hex','utf8');
	dec += decipher.final('utf8');
	return dec;
};