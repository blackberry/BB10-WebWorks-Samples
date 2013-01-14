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
	authCode = null;
	childWindow = null;

	// setup our Foursquare credentials, and callback URL to monitor
	foursquareOptions = {
		clientId: '',
		clientSecret: '',
		redirectUri: ''
	};

	// (bbUI) push the start.html page
	bb.pushScreen('start.html', 'start');
}


/**
 *  Set click handlers for the OAuth Start button 
 *  Note: window.open can only be triggered in this way, you must set a click handler for this.
 */
function setClickHandlers() {
	var link = document.getElementById('btnStart');
    link.addEventListener('click', function(e) {

  		// if the childWindow is already open, don't allow user to click the button
  		if (childWindow !== null) {
  			return false;
  		}

    	e.preventDefault();
    	toast('Contacting Foursquare...');
    	setTimeout(function(){ startOAuth(); }, 500);
  	});
}


/**
 *  Start the OAuth process by opening a childWindow, and directing the user to authorize the app
 */
function startOAuth() {

	// open the authorzation url
    var url = 'https://foursquare.com/oauth2/authenticate?client_id=' + foursquareOptions.clientId + '&response_type=token&display=touch&redirect_uri=' + foursquareOptions.redirectUri;
    childWindow = window.open(url, '_blank');

    // evaluate the url every second, when Foursquare redirects to our callback url, the following if statements gets fired
	window.int = self.setInterval(function(){
    	var currentURL = childWindow.window.location.href;
    	var callbackURL = foursquareOptions.redirectUri;
		var inCallback = currentURL.indexOf(callbackURL);

		// location has changed to our callback url, parse the oauth code
		if (inCallback == 0) {

			// stop the interval from checking for url changes	
			window.clearInterval(int)

			// parse the oauth code
			var code = childWindow.window.location.href;
				code = code.split('access_token=');
				code = code[1];
			window.accessToken = code;

			// close the childWindow
			childWindow.close();
			setTimeout(function(){ 
				bb.pushScreen('connected.html', 'connected');
			}, 1000);
		}
	},1000);
}


// check-in to a venue
function checkIn(venueId, venueName) {

	// this requires an authorized call to the checkin endpoint (https://developer.foursquare.com/docs/checkins/add)
	var url = 'https://api.foursquare.com/v2/checkins/add?venueId=' + venueId + '&oauth_token=' + accessToken;

	$.ajax({
		type: 'POST',
		url: url,

		success: function() {
			toast('Checked in @ ' + venueName);
		},

		error: function(data) {
			alert('Error checking in!' + data.text);
		}
	});
}


// we use HTML5 Geolocation to pin-point where the user is
function startGeolocation() {
	setTimeout(function() {
		toast('Searching for venues... This may take a minute.');
	}, 100);
	var options;
	setTimeout(function(){ 
		navigator.geolocation.getCurrentPosition(geoSuccess, geoFail, options);
	}, 1000);
}


// geolocation success callback
function geoSuccess(position) {
	var gpsPosition = position;
	var coordinates = gpsPosition.coords;
	currentLat = coordinates.latitude;
	currentLong = coordinates.longitude;
	searchForVenues();
}


// geolocation failure callback
function geoFail() {
	toast('Couldn\'t get your position... using defaults');
	currentLat = 43.465187;
	currentLong = -80.522372;

	return false;
}


// search for near-by venues
function searchForVenues() {
	$('#content p').remove();
	var currentDate = getCurrentDate();

	// we don't need to do an authorized request for this endpoint (https://developer.foursquare.com/docs)
	var url = 'https://api.foursquare.com/v2/venues/search?ll=' + currentLat + ',' + currentLong + '&oauth_token=' + accessToken + '&v=' + currentDate;

	$.ajax({
		type: 'GET',
		url: url,
		success: function(data) {
			for (var i = 0; i < 12; i++) {  // only load 12 venues - for demo purposes
				var venue = data.response.venues[i];
				$('#content').append('<p onclick="checkIn(\'' + venue.id + '\', \'' + venue.name + '\');">' + venue.name + '</p>');
			}
		},

		error: function() {
			alert('Error getting venues');
		}
	});
}


// helper function for getting the current date, in the format foursquare is expecting it for our requests
function getCurrentDate() {
	var d = new Date();
	var year = d.getFullYear();
	var month = ("0" + (d.getMonth() + 1)).slice(-2);
	var day = ("0" + d.getDate()).slice(-2);
	var theDate = year + month + day;
	return theDate;
}


// display a toast message to the user
function toast(msg) {
   blackberry.ui.toast.show(msg);	
}