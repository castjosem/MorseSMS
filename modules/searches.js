var http = require('http');
var request = require("request");
var baseUrl = "http://api.bing.com/osjson.aspx?JsonType=callback&query=";
var minLetters = 0;

module.exports.suggestions = function(word, callback){
	if(word.length >= minLetters){
		request(baseUrl + word, callback);
	}
};