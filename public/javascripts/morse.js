Myo.connect('com.hackfsu.morse');

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
}
var temp = ""; 
Myo.on('connected', function(data){
	Myo.setLockingPolicy("none");
})

/*//Whenever we get a pose event, we'll update the image sources with the active version of the image
Myo.on('pose', function(pose){
	console.log("pose");
})*/

//Opposite of above. We also revert the main img to the unlocked state
Myo.on('fingers_spread', function(){
	temp = temp + "-";
	console.log(temp);
});


//Whenever a myo locks we'll switch the main image to a lock image
Myo.on('fist', function(){
	temp = temp + ".";
	console.log(temp);
});

//Whenever a myo unlocks we'll switch the main image to a unlock image
var decrypted_message = '';
Myo.on('wave_in', function(){
	console.log("wave");
	//temp = temp.concat("s");
	/*for(i = 0; i < map.length; i++)
	{
		if(map[i] == temp)
		{
			decrypted_message = decrypted_message.concat(map[i] + " ");
			temp = '';
		}
	}*/

	for (key in map)
	{
		if(map[key] == temp)
		{
			decrypted_message = decrypted_message + key;
		}
	}
	temp = '';

	console.log(decrypted_message);

});
Myo.on('wave_out', function(){
	console.log("wave_out");
});

