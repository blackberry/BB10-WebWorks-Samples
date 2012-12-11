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
	bb.pushScreen('app.html', 'app');
}


// load camera card
function openCamera() {
	var mode = blackberry.invoke.card.CAMERA_MODE_PHOTO;

	blackberry.invoke.card.invokeCamera(mode, function(path) {
		blackberry.system.setWallpaper('file://' + path);
		showToast('Wallpaper changed!');
	},

	// cancel callback
	function(reason) {
		alert("cancelled " + reason);
	},

	// error callback
	function(error) {
		if(error) {
			alert("invoke error " + error);
		} else {
			console.log("invoke success ");
		}
	});
}


// load filepicker card
function openFilepicker() {

	// filepicker options
	var details = {
		mode: blackberry.invoke.card.FILEPICKER_MODE_PICKER,
		viewMode: blackberry.invoke.card.FILEPICKER_VIEWER_MODE_GRID,
		sortBy: blackberry.invoke.card.FILEPICKER_SORT_BY_NAME,
		sortOrder: blackberry.invoke.card.FILEPICKER_SORT_ORDER_DESCENDING
	};

	blackberry.invoke.card.invokeFilePicker(details, function(path) {
		blackberry.system.setWallpaper('file://' + path);
		showToast('Wallpaper changed!');
	},

	// cancel callback
	function(reason) {
		alert("cancelled " + reason);
	},

	// error callback
	function(error) {
		if(error) {
			alert("invoke error " + error);
		} else {
			console.log("invoke success ");
		}
	});
}

// display a simple toast message
function showToast(msg) {
	blackberry.ui.toast.show(msg);
}