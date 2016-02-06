var http = require('http');
var baseUrl = "http://api.bing.com/osjson.aspx?JsonType=callback&query="

module.exports.suggestions = function(word){
	http.get(baseUrl + word, function(resp){
		console.log('Success, with: ' + resp.statusCode);
		console.log(resp);
	}).on('error', function(err){
		console.log('Suggestions. Error, with: ' + err.message);
	});
};