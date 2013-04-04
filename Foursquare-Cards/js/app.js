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
	authCode = null;
	bb.pushScreen('start.html', 'start');

	// setup the foursquire cliendId
	foursquareOptions = {
		clientId: 'L4CURGRJ0JCCVA0QJ1Y5JI052HMZI0MSQIQMVTMX1JTN43L2'
	}
}


// Invoke the Foursquare Card to start the authorization process
function startSDK() {
	blackberry.invoke.invoke({
		action: "bb.action.VIEW",
		data: foursquareOptions.clientId,
		target: "com.foursquare.blackberry.sso.card",
		type: "sso/foursquare",
	}, 

	// invoke success callback
	function(data) {
	},

	// invoke error callback
	function(data) {
	});

	// capture the onChildCardClosed event 
	blackberry.event.addEventListener("onChildCardClosed", onChildCardClosedHandler);
}


// child card closed callback
function onChildCardClosedHandler(request) {

	// if user cancels, or doesn't allow access to their foursquare account
	if(request.reason == 'denied' || request.reason == 'canceled') {
		// do something
		
	// success
	} else if(request.reason == 'success') {

		// in the authorization callback
		if(request.type == '') {
			accessToken = request.data;
			accessToken = accessToken.split('"')[1];
			toast('Authorized with Foursquare!');
			bb.pushScreen('connected.html', 'connected');

		// in the venue search callback
		} else if(request.type == 'application/json') {
			var data = JSON.parse(request.data);
			var id = data.id;
			var name = data.name;
			checkIn(id, name);
		}
	}
}


// invoke venue search card
function search() {
	blackberry.invoke.invoke({
		target: "com.foursquare.blackberry.venuesearch.card",
		action: "bb.action.VIEW",
		type: "venuesearch/foursquare",
		uri: "foursquare://venues/search?oauth_token=" + accessToken,
	},

	// invoke success callback
	function(data) {
	},

	// invoke error callback
	function(data) {
	});
}


// check-in to a venue
function checkIn(venueId, venueName) {
	var url = 'https://api.foursquare.com/v2/checkins/add?venueId=' + venueId + '&oauth_token=' + accessToken;
	$.ajax({
		type: 'POST',
		url: url,

		// success callback
		success: function() {
			toast('Checked in to' + venueName);
		},

		// error callback
		error: function(data) {
			alert('Error checking in!' + data.text);
		}
	});
}


// helper function to display a toast message
function toast(msg) {
	blackberry.ui.toast.show(msg);
}