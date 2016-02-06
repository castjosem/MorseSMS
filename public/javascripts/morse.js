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
	space: "....."
}

Myo.on('connected', function(data){
	Myo.setLockingPolicy("none");
})

/*//Whenever we get a pose event, we'll update the image sources with the active version of the image
Myo.on('pose', function(pose){
	console.log("pose");
})*/

//Opposite of above. We also revert the main img to the unlocked state
Myo.on('fingers_spread', function(){
	console.log("fingers off");
});


//Whenever a myo locks we'll switch the main image to a lock image
Myo.on('fist', function(){
	console.log("fist_off");
});

//Whenever a myo unlocks we'll switch the main image to a unlock image
Myo.on('wave_in', function(){
	console.log("wave");
});

