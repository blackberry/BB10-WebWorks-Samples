/*
 * Copyright 2013 Research In Motion Limited.
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


// called by webworksready event
function initApp() {
	// test mode toggle
	// 1: to test in the browser
	// 0: to test on device with camera
	testMode = 1;
	getImage();
}


// get image from camera, or use temp.jpg (depending on what 'testMode' is set to)
function getImage() {
	console.log('[get image]');

	if (testMode === 1) {
		var path = "temp.jpg"
		prepareImage(path);

	} else {
  		var details = {
          mode: blackberry.invoke.card.FILEPICKER_MODE_PICKER,
          type: [blackberry.invoke.card.FILEPICKER_TYPE_PICTURE],
          imageCropEnabled: false
      	};

      	// success callback
     	blackberry.invoke.card.invokeFilePicker(details, function (path) {
     		var path = 'file://' + path;
			prepareImage(path);
        },

        // user cancelled callback
        function (reason) {
        	console.log(reason);
        },

        // error callback
        function (error) {
        	if (error) {
        		console.log(error);
            } 
        }
      );
	}
}


// prepare the image for use in our app. 
function prepareImage (filepath) {
	console.log('[prepare image]: ' + filepath);

	// get a handle to our originalImage object (in index.html) and set it's source to the picked photo
	var el = document.getElementById('originalImage');
	el.setAttribute('src', filepath);

	// important! once the originalImage object has a new source we need to run the EXIF plugin's 'loadExif' method
	$().loadExif();

	// we wrap thie in a setTimeout to allow the EXIF plugin to complete before we attempt get grab data from it
	setTimeout(function(){
		// get a handle on our canvas element (in index.html)
		var canvas = jQuery('#canvas').get(0);
		var ctx = canvas.getContext('2d');

		// create a new image object
		var image = new Image();

		// set source of the object to our filepath
		image.src = filepath;
		
		image.onload = function () {
			// we're setting the image to the size of the screen for this demo, you could grab the images width/height
			// EXIF values and scale accordingly as well
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;

			// clear the canvas
			ctx.drawImage(this, 0, 0, canvas.width, canvas.height);

			// read the 'orientation' value of our image
			var imageOrientation = $(el).exif('Orientation');


			//img is sideways (orientation 6 is 'right side up', how the camera stores the photo on Z10/Q10)
			if (imageOrientation == 6) {
				alert('EXIF.orientation: ' + imageOrientation[0] + '\nPhoto is sideways. Rotate it!');
				rotateImage();
			}  else {
				alert('EXIF.orientation: ' + imageOrientation[0] + '\nPhoto is not sideways');
			}

			// get the base64 encoded image data from the redrawn canvas and set it as the originalImage's source
			var resizedImage = canvas.toDataURL('image/jpeg', 1);
			el.src = resizedImage;
			el.style.display = 'block';
		}
	}, 0);
}


// rotate the image
function rotateImage() {
	var canvas = jQuery('#canvas').get(0);
	var ctx = canvas.getContext('2d');
	var h = window.innerHeight;
	var w = window.innerWidth;

	// rotate 90 degrees clockwise
	ctx.rotate(90 * Math.PI / 180);

	ctx.drawImage(canvas, 0, -w, h, w);
}