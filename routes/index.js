var express = require('express');
var crypter = require('./../modules/crypter');
var mailer = require('./../modules/mailer');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express'});
});







router.post('/encrypt', function(req, res, next){
	if (typeof req.body.text !== 'undefined'){
		var data = req.body.text;
		var pass = undefined;

		if (typeof req.body.pass !== 'undefined'){
			pass = req.body.pass;
		}

		var crypted = crypter.encrypt(data, pass);
		res.json({ encrypted: crypted });
	}
	else{
		res.json({ error: 'Invalid data' });
	}
});

router.post('/decrypt', function(req, res, next){
	if (typeof req.body.text !== 'undefined'){
		var data = req.body.text;
		var pass = undefined;

		if (typeof req.body.pass !== 'undefined'){
			pass = req.body.pass;
		}

		var crypted = crypter.decrypt(data, pass);
		res.json({ decrypted: crypted });
	}
	else{
		res.json({ error: 'Invalid data' });
	}
});



module.exports = router;
