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

/**
 *  called by the webworksready event when the environment is ready
 */
function initApp() {
	toast("To start: Rub head,  Double-tap Nose,  Tap Mouth");

	// listeners
	var nose = new Hammer(document.getElementById("hitNose"), {});

	var head = new Hammer(document.getElementById("hitHead"), { 
		hold_timeout: 500
	});

	var mouth = new Hammer(document.getElementById("hitMouth"), {
		hold_timeout: 10
	});

	// drag
	head.ondragstart = function(ev) {
		$('#headTop').addClass('openHead');
		setTimeout(function() {
			$('#jesse').addClass('jesseUp');
		}, 500);
	};

	head.ondragend = function(ev) {
		setTimeout(function() {
			$('#jesse').removeClass('jesseUp');
			$('#headTop').removeClass('openHead');
		}, 2500);
	}

	
	// double-tap
	nose.ondoubletap = function(ev) {
		$('#headContainer').toggle();
		$('#squint').toggle();
		setTimeout(function() {
			$('#squint').toggle();
			$('#headContainer').toggle();
		}, 500)
	};

	
	// hold
	mouth.onhold = function(ev) {
		$('#mouthOpen').toggle();
	};

	mouth.onrelease = function(ev) {
		$('#mouthOpen').toggle();
	}
}


// custom toast message with button and callbacks
function toast(msg) {
	var options = {
		timeout: 5000
	};
	toastId = blackberry.ui.toast.show(msg, options);
}