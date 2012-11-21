/*
 * Copyright 2010-2012 Research In Motion Limited.
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


// query the invoke api and return services we can share the image/* mime-type to
function sharePhoto() {
	try {
		var request = {
			action: 'bb.action.SHARE',
			type: 'image/*',
			target_type: ["APPLICATION", "CARD"]
		};

		blackberry.invoke.query(request, function(response) {
			var targets = response[0].targets;
			var dataToAppend = '';

			console.log(targets);
			$('#shareList').empty();

			for(var i = 0; i < targets.length; i++) {
				var icon = 'file://' + targets[i].icon;
				var label = targets[i].label;
				var key = targets[i].key;

				dataToAppend += '<li onclick="sharePhotoTo(\'' + key + '\')"><div class="listImage"><img width="119px" height="119px" src="' + icon + '"/></div><div class="listText">' + label + '</div></li>';
			}

			$('#shareList').append(dataToAppend);
			shareShow();

		}, function(response) {});

	} catch(e) {
		// added so it'll work in the browser
		shareShow();
	}
}


// share photo to selected service
function sharePhotoTo(key) {
	alert('Sharing to: ' + key);

	/*
	blackberry.invoke.invoke({
		target: key,
		action: "bb.action.OPEN",
		type: "image/*",
		uri: "file://" + savedFilePath
	}, function() {}, function() {});
*/
}


// show share card
function shareShow() {
	setTimeout(function() {
		$('#shareCard').addClass('show');
	}, 150);
}


// hide share card
function shareHide() {
	$('#shareCard').removeClass('show');
}
