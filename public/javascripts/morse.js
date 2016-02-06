Myo.connect('com.hackfsu.morse');

Myo.on('status', function(data){
	console.log("status");
})


//Whenever we get a pose event, we'll update the image sources with the active version of the image
Myo.on('pose', function(pose){
	console.log("pose");
})

//Opposite of above. We also revert the main img to the unlocked state
Myo.on('pose_off', function(pose){
	console.log("pose_off");
});


//Whenever a myo locks we'll switch the main image to a lock image
Myo.on('locked', function(){
	console.log("locked");
});

//Whenever a myo unlocks we'll switch the main image to a unlock image
Myo.on('unlocked', function(){
	console.log("hello");
});

