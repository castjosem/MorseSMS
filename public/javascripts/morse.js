var Morse = function(tempCont, suggestionsCont, decryptedCont, poseCont, socket_io){
	var $temp = $(tempCont);
	var $decrypted = $(decryptedCont);
	var $pose = $(poseCont);
	var $suggestionsCont = $(suggestionsCont);
	var socket = socket_io;

	var bucket_initial = 0.0;
	var bucket_diff = 0.25;
	var bucket_size = 0.04;
	var bucket_current = 0;

	/*
	var movements = {
		dot: "fist",
		dash: "fingers_spread",
		letter: "wave_in",
		send: "wave_out",
		add_sugg: "double_tap",
		sugg: "switch_word"
	};
	*/

	var movements = {
		dot: "wave_in",
		dash: "wave_out",
		letter: "fingers_spread",
		send: "fist",
		add_sugg: "double_tap",
		sugg: "switch_word"
	};

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
			var word = $(this).text();
			object.addSugg(word);
		});


		Myo.on('connected', function(){
			console.log('connected');
		});

		Myo.connect('com.hackfsu.morse');

		Myo.on('connected', function(data){
			Myo.setLockingPolicy("none");
		});

		Myo.on('switch_word', function(bucket_changed){
			$suggestionsCont.find('.suggestion').eq(bucket_current).removeClass('suggestion-active');
			$suggestionsCont.find('.suggestion').eq(bucket_changed).addClass('suggestion-active');
			bucket_current = bucket_changed;		    
		    console.log("switch_word", bucket_current);
		});

		Myo.on('orientation', function(data){
			$('#x').html(data.x);
			$('#y').html(data.y);
			$('#z').html(data.z);
			$('#w').html(data.w);

			if (data.x + bucket_diff > 0 && suggestions.length > 0){
				bucket_changed = Math.min(Math.round(data.x / bucket_size), suggestions.length - 1);				
				if (bucket_changed != bucket_current)
					Myo.trigger('switch_word', bucket_changed);
			}
		})

		Myo.on(movements.dash, function(){
			object.appendTemp("-");
			object.updateTemp();
		});

		Myo.on(movements.dot, function(){
			object.appendTemp(".");
			object.updateTemp();
		});

		Myo.on(movements.add_sugg, function(){
			var word = $suggestionsCont.find('.suggestion').eq(bucket_current).text();
			console.log(word);
			object.addSugg(word);
		});

		Myo.on(movements.letter, function(){
			if(decrypted.length > 0){				
				responsiveVoice.speak(decrypted, "US English Female", {pitch: 2});
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
			}
		});

		Myo.on(movements.send, function(){
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
				case 'double_tap':
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
				case 'double_tap':
					$pose.attr('src', 'images/' + pose + '.png');
					break;
				default:
					break;
			}
		});
	};

	object.addSugg = function(word){
		object.addWord(word);
		$suggestionsCont.html('<li>Start typing</li>');
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