/*
- Copyright (c) 2012 Research In Motion Limited.
-
- Licensed under the Apache License, Version 2.0 (the "License");
- you may not use this file except in compliance with the License.
- You may obtain a copy of the License at
-
- http://www.apache.org/licenses/LICENSE-2.0
-
- Unless required by applicable law or agreed to in writing, software
- distributed under the License is distributed on an "AS IS" BASIS,
- WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
- See the License for the specific language governing permissions and
- limitations under the License.
*/

/*global blackberry */

function saveCanvas(canvas) {
	/* STEP 1: Leverage the blackberry.invoke APIs to invoke a File Picker card in SAVE mode to generate a valid path.
	 * https://developer.blackberry.com/html5/apis/blackberry.invoke.card.html#.invokeFilePicker
	 */
	blackberry.invoke.card.invokeFilePicker(
		{
			mode: blackberry.invoke.card.FILEPICKER_MODE_SAVER,
			type: [
				blackberry.invoke.card.FILEPICKER_TYPE_PICTURE
			],
			directory: [blackberry.io.sharedFolder]
		},
		function (path) {
			/* STEP 2: Now that we have a valid path, create a file with the HTML5 FileSystem APIs.
			 * https://developer.blackberry.com/html5/apis/filesystem.html
			 */
			blackberry.io.sandbox = false;

			window.webkitRequestFileSystem(
				window.PERSISTENT,
				5.0 * 1024 * 1024,
				function (fileSystem) {
					/* We've obtained a valid fileSystem object. */
					fileSystem.root.getFile(
						path,
						{
							create: true
						},
						function (fileEntry) {
							/* We've obtained a valid fileEntry object. */
							fileEntry.createWriter(
								function (fileWriter) {
									/* We've obtained a valid fileWriter object. */
									fileWriter.onerror = function (fileError) {
										console.log('FileWriter Error: ' + fileError);
									};
									fileWriter.onwriteend = function () {
										blackberry.ui.toast.show('Canvas saved!');
									};

									/* STEP 3: Now that our FileEntry and FileWriter are in place, convert the <canvas> data to a Blob so it can be saved as a file. This is generally the most complicated part.
									 * https://github.com/eligrey/canvas-toBlob.js
									 *
									 * Note: The above is a cross-browser implementation of the HTML5 canvas.toBlob standard:
									 * http://www.w3.org/TR/2011/WD-html5-20110525/the-canvas-element.html
									 */

									canvas.toBlob(
										function (blob) {
											fileWriter.write(blob);
										},
										'image/png'
									);
								},
								function (fileError) {
									console.log('FileEntry Error: ' + fileError);
								}
							);
						},
						function (fileError) {
							console.log('DirectoryEntry (fileSystem.root) Error: ' + fileError);
						}
					);
				},
				function (fileError) {
					/* Error. */
					console.log('FileSystem Error: ' + fileError);
				}
			);
		},
		function (reason) {
			/* User cancelled. */
			console.log('User Cancelled: ' + reason);
		},
		function (error) {
			/* Invoked. */
			if (error) {
				console.log('Invoke Error: ' + error);
			}
		}
	);
}