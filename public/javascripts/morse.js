var Morse = function(tempCont, decryptedCont, poseCont){
	var $temp = $(tempCont);
	var $decrypted = $(decryptedCont);
	var $pose = $(poseCont);

	var object = {};
	var temp = "";
	var decrypted = "";
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
		Myo.on('connected', function(){
			console.log('connected');
		});
		Myo.connect('com.hackfsu.morse');
		Myo.on('connected', function(data){
			Myo.setLockingPolicy("none");
		});
		Myo.on('fingers_spread', function(){
			temp = temp + "-";
			object.updateTemp();
		});
		Myo.on('fist', function(){
			temp = temp + ".";
			object.updateTemp();
		});
		Myo.on('wave_in', function(){
			console.log("wave");
			for (var key in map){
				if(map[key] == temp)
					decrypted = decrypted + key;				
			}
			temp = "";
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
	};

	object.updateDecrypt = function(){
		$decrypted.html(decrypted);
	};

	object.getDecrypted = function(){
		return decrypted;
	};

	object.getTemp = function(){
		return temp;
	};

	object.getSuggestion = function(){
		var baseUrl = "http://api.bing.com/osjson.aspx?JsonType=callback&query=" + temp;
	};

	return object;
};