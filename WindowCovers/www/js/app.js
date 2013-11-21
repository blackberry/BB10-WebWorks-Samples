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

// called by the webworksready event when the environment is ready
function initApp() {
	cover = new Object();

	// reset the cover settings upon maximizing the app
	blackberry.event.addEventListener("exitcover", function() {
		blackberry.ui.cover.resetCover();
	});

	bb.pushScreen('app.html', 'app');
}


// invoke the camera
function setPhoto() {
	var mode = blackberry.invoke.card.CAMERA_MODE_PHOTO;
	blackberry.invoke.card.invokeCamera(mode, function(path) {

		// set cover photo to the path of the picture we took
		cover.photo = 'file://' + path;
		bb.pushScreen('setLabel.html', 'setLabel');

		// user cancelled out of the camera
	}, function(reason) {
		showToast('Cancelled');
		return false;

		// there was an error invoking the
	}, function(error) {
		if(error) {
			alert("invoke error " + error);
			return false;
		}
	});
}


// set the cover label
function setLabel() {
	cover.label = document.getElementById('coverLabel').value || 'My Label';
	updateCover();
}


// setup the cover
function updateCover() {
	// set cover photo
	blackberry.ui.cover.setContent(blackberry.ui.cover.TYPE_IMAGE, {
		path: cover.photo
	});

	// set cover label
	blackberry.ui.cover.labels.push({
		label: cover.label,
		size: 10,
		wrap: true
	});

	// update the cover
	blackberry.ui.cover.updateCover();
	showToast('Cover Updated!');
	bb.pushScreen('app.html', 'app');

	// minimize the app
	setTimeout(function(){
		blackberry.app.minimize();
	}, 1000);
}


// display a simple toast message
function showToast(msg) {
	blackberry.ui.toast.show(msg);
}