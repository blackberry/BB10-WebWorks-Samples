/*
 * Copyright 2014 BlackBerry.
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

// filepicker (async)
function pickFile() {
	Invoke.utils.filePicker(function(path) {
			Toast.regular('Picked: ' + path, 3000);
		},

		function(reason) {
			Toast.regular('Card canceled: ' + reason);
		},

		function(error) {
			console.log(error);
		});
}

// camera (async)
function takePhoto() {
	Invoke.utils.camera(function(path) {
			Toast.regular('Photo: ' + path, 3000);
		},

		function(reason) {
			Toast.regular('Card canceled: ' + reason);
		},

		function(error) {
			console.log(error);
		});
}

// sample toast button callback
function toastCallback() {
	alert('You are in the toast call back function...');
}

// spinner usage
function spinner(size) {
	Toast.regular('Hiding spinner in 3 seconds...', 2000);
	eval('Spinner.on.' + size + '();');

	setTimeout(function() {
		Spinner.off(size);
	}, 2500);
}

// show a welcome message
function welcome() {
Toast.regular('Welcome to the Sencha Touch Sample!', 2000);
setTimeout(function(){
	Toast.regular('Swipe down to see the Application Menu!', 2000);
	setTimeout(function(){
		Toast.regular('Minimize the app to see the Window Cover', 2300);
}, 2300);
}, 2300);
}


