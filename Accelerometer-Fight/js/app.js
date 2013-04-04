/*
 * Copyright 2012 Research In Motion Limited.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


//  called by the webworksready event when the environment is ready
function initApp() {
	initSounds();
	initSensors();
	showWelcome();
}


// initialize the sounds
function initSounds() {
	// random sound counters
	randHit = 1;
	randYell = 1;

	// sound playing flags
	hitPlaying = 0;
	yellPlaying = 0;

	hit1 = new Audio('sounds/hit1.wav');
	hit2 = new Audio('sounds/hit2.wav');
	hit3 = new Audio('sounds/hit3.wav');
	hit4 = new Audio('sounds/hit4.wav');
	hit5 = new Audio('sounds/hit5.wav');
	hit6 = new Audio('sounds/hit6.wav');
	hit7 = new Audio('sounds/hit7.wav');
	hit8 = new Audio('sounds/hit8.wav');

	yell1 = new Audio('sounds/yell1.wav');
	yell2 = new Audio('sounds/yell2.wav');
	yell3 = new Audio('sounds/yell3.wav');

	gong = new Audio('sounds/gong.wav');
}


// initialize accelerometer
function initSensors() {

	// start listening to the accelerometer sensor with a delay feedback of 1000 ** microseconds **
	blackberry.sensors.setOptions("deviceaccelerometer", {
		delay: 10000,
		background: true,
		batching: false,
		queue: false,
		reducedReporting: false
	});

	// start the event listener for the sensors callback
	blackberry.event.addEventListener("deviceaccelerometer", accelCallback);
}


// accelerometer callback
function accelCallback(data) {
	x = data.x;

	if(x <= -13) {
		// if sound is playing, do not play another one
		if(hitPlaying == 1) {
			return false;
		
		// no sounds currently playing, play a sound
		} else {
			playHit();
			hitPlaying = 1;
			setTimeout(function() {
				hitPlaying = 0;
			}, 200);
		}
	}
}


// welcome message - custom toast message with button and callbacks
function showWelcome() {
	var message = '1) Shake phone to attack!\n2) Touch screen to yell!',
		buttonText = 'Start',
		toastId,

		// button clicked callback
		onButtonSelected = function() {
			gong.play();
		},

		// toast dismissed callback
		onToastDismissed = function() {};

	// toast options
	options = {
		buttonText: buttonText,
		buttonCallback: onButtonSelected,
		dismissCallback: onToastDismissed,
		timeout: 20000
	};

	// display the toast message
	toastId = blackberry.ui.toast.show(message, options);
}


// play 'hit' sounds
function playHit() {
	
	// pick a random number/sound to play
	var min = 1;
	var max = 8;
	var random = Math.floor(Math.random() * (max - min + 1)) + min;
	randHit = random;

	// if random number is the same as the previous random number, generate a new one
	if(randHit == random) {
		var random = Math.floor(Math.random() * (max - min + 1)) + min;
		randHit = random;
	}

	var sndHit = 'hit' + random;
	sndHit = eval(sndHit);
	sndHit.currentTime = 0;
	sndHit.play();
}


// play 'yell' sounds
function playYell() {
	// if sound is playing, do not play another one
	if(yellPlaying == 1) {
		return false;

	// no sounds currently playing, play a sound
	} else {
		// pick a random number/sound to play
		var min = 1;
		var max = 3;
		var random = Math.floor(Math.random() * (max - min + 1)) + min;
		randYell = random;

		// if random number is the same as the previous random number, generate a new one
		if(randYell == random) {
			var random = Math.floor(Math.random() * (max - min + 1)) + min;
			randYell = random;
		}

		var sndYell = 'yell' + random;
		sndYell = eval(sndYell);
		sndYell.currentTime = 0;
		sndYell.play();
		yellPlaying = 1;
		setTimeout(function() {
			yellPlaying = 0;
		}, 600);
	}
}