var Morse = function(tempCont, suggestionsCont, decryptedCont, poseCont, socket_io){
	var $temp = $(tempCont);
	var $decrypted = $(decryptedCont);
	var $pose = $(poseCont);
	var $suggestionsCont = $(suggestionsCont);
	var socket = socket_io;

	var object = {};
	var temp = "";
	var decrypted = "";
	var final_message = []; 
	var suggestions = [];
	var map = {
		a: ".-", 
		b: "-...",
		c: "-.-.",
		d: "-..",
		e: ".",
		f: "..-.",
		g: "--.",
		h: "....",
		i: "..",
		j: ".---",
		k: "-.-",
		l: ".-..",
		m: "--",
		n: "-.",
		o: "---",
		p: ".--.",
		q: "--.-",
		r: ".-.",
		s: "...",
		t: "-",
		u: ".-.",
		v: "...-",
		w: ".--",
		x: "-..-",
		y: "-..-",
		y: "-.--",
		z: "--..",
		" ": ".....",
	};

	object.init = function(){
		socket.on('suggestions', function(arr){
			suggestions = arr;
			$suggestionsCont.html('');
			for(var i=0 ; i<suggestions.length ; i++){
				$suggestionsCont.append('<li><a class="suggestion" href="#">'+ suggestions[i] +'</a></li>');
			}
		});

		$suggestionsCont.on('click','.suggestion', function(){
			word = $(this).text();
			object.addWord(word);
			$suggestionsCont.html('<li>Start typing</li>');
		});


		Myo.on('connected', function(){
			console.log('connected');
		});
		Myo.connect('com.hackfsu.morse');
		Myo.on('connected', function(data){
			Myo.setLockingPolicy("none");
		});
		Myo.on('fingers_spread', function(){
			object.appendTemp("-");
			object.updateTemp();
		});
		Myo.on('fist', function(){			
			object.appendTemp(".");
			object.updateTemp();
		});
		Myo.on('wave_in', function(){
			console.log("wave");
			for (var key in map){
				if(map[key] == temp){
					if(map[key] == "....."){
						object.addWord(decrypted);						
						object.clearDecrypted();
					}
					else {
						object.appendDecrypted(key);						
					} 
				}
			}
			object.clearTemp();
			object.updateTemp();
		});
		Myo.on('wave_out', function(){
			console.log("wave_out");
		});

		Myo.on('rest', function(){
			$pose.attr('src', 'images/unknown.png');
		});

		Myo.on('battery_level', function(val){
			console.log('Much power', val);
		});

		Myo.on('pose', function(pose){
			switch(pose){
				case 'wave_out':
				case 'wave_in':
				case 'fist':
				case 'fingers_spread':
					$pose.attr('src', 'images/' + pose + '_active.png');
					break;
				default:
					break;
			}
		})

		Myo.on('pose_off', function(pose){
			switch(pose){
				case 'wave_out':
				case 'wave_in':
				case 'fist':
				case 'fingers_spread':
					$pose.attr('src', 'images/' + pose + '_active.png');
					break;
				default:
					break;
			}
		});
	};

	object.updateTemp = function(){
		$temp.html(temp);
		socket.emit('addLetter', decrypted);
	};

	object.appendTemp = function (symbol) {
		temp = temp + symbol;
	}

	object.appendDecrypted = function(letter){
		decrypted = decrypted + letter;
		object.updateDecrypt();
	};

	object.clearDecrypted = function() {
		decrypted = "";
	};

	object.clearTemp = function() {
		temp = "";
	};

	object.getDecrypted = function(){
		return decrypted;
	};

	object.getTemp = function(){
		return temp;
	};

	object.addWord = function(word){
		final_message.push(word);
		object.clearTemp();
		object.clearDecrypted();
		object.updateDecrypt();
	};

	object.updateDecrypt = function(){
		$decrypted.html(final_message.join(' ') + ' ' + decrypted);
	};

	object.getSuggestions = function(){
		return suggestions;
	};
	
	object.test = function(){
		console.log("EEEE");
	};

	return object;
};