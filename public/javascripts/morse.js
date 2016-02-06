var myo = function(){
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
		Myo.connect('com.hackfsu.morse');
		Myo.on('connected', function(data){
			Myo.setLockingPolicy("none");
		});
		Myo.on('fingers_spread', function(){
			temp = temp + "-";
			console.log(temp);
		});
		Myo.on('fist', function(){
			temp = temp + ".";
			console.log(temp);
		});
		Myo.on('wave_in', function(){
			console.log("wave");
			for (var key in map){
				if(map[key] == temp)
					decrypted = decrypted + key;				
			}
			temp = "";
			console.log(decrypted);
		});
		Myo.on('wave_out', function(){
			console.log("wave_out");
		});
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

var myMyo = myo();
myMyo.init();