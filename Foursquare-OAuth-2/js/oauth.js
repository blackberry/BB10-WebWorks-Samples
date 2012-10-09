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


// initialization function - the core of the application
function initApp() {
	try {

		// foursquare setup
		foursquareOptions = {
			clientId: '',
			clientSecret: '',

			// this assume your content source is index.html in your config.xml
			callbackUrl: 'local:///index.html'
		};

		// here we check for queryStrings when the app loads.  This is because foursquare is calling back
		// to our callbackUrl.  If the app initializes, and there is a query string, it checks if the user
		// authorized the app or not
		accessToken = checkForQueryStrings('access_token') || null;
		denied = checkForQueryStrings('error') || null;

		// user denied access
		if (denied !== null) {
			showMessage('User denied access. The end.');
			return false;

		// user has allowed access, proceed...
		} else if (accessToken !== null) {
			showMessage('Annnnnd we\'re authd!');
			setTimeout(function(){
				$('#buttonSetup').hide();
				$('#afterAuth').show();
			}, 100);
		}

	} catch (e) {
		alert('Error in initApp: ' + e);
	}
}

// first, we get the user to authorize with the service and allow our app access
// note: foursquare doesn't have an api endpoint for 'logging out', so users will have to go to foursquare.com
//       and deauthorize your app if/when they decide to
function getAuthorization() {
	try {
		$('#message').fadeIn(300).html('Contacting foursquare...');
		window.location.replace('https://foursquare.com/oauth2/authenticate?client_id=' + foursquareOptions.clientId + '&response_type=token&display=touch&redirect_uri=' + foursquareOptions.callbackUrl);
	} catch (e) {
		alert('Error in getAuthorization: ' + e);
	}
}

// search for near-by venues
function searchForVenues(lat, lon) {
	try {
		$('#message').fadeIn(300).html('Searching venues...');
		var currentDate = getCurrentDate();

		// we don't need to do an authorized request for this endpoint (https://developer.foursquare.com/docs)
		var url = 'https://api.foursquare.com/v2/venues/search?ll=' + lat + ',' + lon + '&oauth_token=' + accessToken + '&v=' + currentDate;

		$.ajax({
			type: 'GET',
			url: url,
			success: function(data) {
				for (var i = 0; i < 6; i++) {  // only load 6 venues - for demo purposes
					var venue = data.response.venues[i];

					$('#content').append('<p onclick="checkIn(this, \'' + venue.id + '\', \'' + venue.name + '\');">' + venue.name + '</p>');
				}

				$('#message').fadeOut(500);
				$('#content').fadeIn(600);
			},

			error: function() {
				$('#message').html('');
			}
		});

	} catch (e) {
		alert('Error in searchForVenues: ' + e);
	}
}


// check-in to a venue
function checkIn(row, venueId, venueName) {
	try {

		// check if this row/venue already has the 'active' class, if so, do not re-checkin
		if ($(row).hasClass('activeCheckin')) {
			return false;
		}

		// this requires an authorized call to the checkin endpoint (https://developer.foursquare.com/docs/checkins/add)
		var url = 'https://api.foursquare.com/v2/checkins/add?venueId=' + venueId + '&oauth_token=' + accessToken;

		$.ajax({
			type: 'POST',
			url: url,

			success: function() {
				showMessage('Checked in @ ' + venueName);
				$('.activeCheckin').removeClass('activeCheckin');
				$(row).addClass('activeCheckin');
			}
,			error: function(data) {
				$('#message').html('Error checking in!' + data.text);
			}
		});
	} catch (e) {
		alert('Error in getAccessTokens: ' + e);
	}
}

// we use HTML5 Geolocation to pin-point where the user is
function startGeolocation() {
	setTimeout(function() {
		$('#message').fadeIn(300).html('Getting your position...');
	}, 100);
	var options;
	navigator.geolocation.getCurrentPosition(geoSuccess, geoFail, options);
}

// geolocation success callback
function geoSuccess(position) {
	var gpsPosition = position;
	var coordinates = gpsPosition.coords;
	searchForVenues(coordinates.latitude, coordinates.longitude);
}

// geolocation failure callback
function geoFail() {
	showMessage('Couldn\'t get your position...');
	return false;
}

// helper function for displaying a message to the user
function showMessage(msg) {
	try {

		if (!$('#message').is(':visible')) {
			$('#message').show();
		}
		setTimeout(function() {
			$('#message').html(msg);
		}, 500);
		setTimeout(function() {
			$('#message').fadeOut(500, function(){
				$('#message').html('');
			});
		}, 4000);
	} catch (e) {
		alert('Error in showMessage: ' + e);
	}
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

// helper function which checks for certain query strings when the app loads (for use in the OAuth callback)
function checkForQueryStrings(id) {
	var string = "[\\#]" + id + "=([^&#]*)";
	var regex = new RegExp(string);
	var found = regex.exec(window.location);
	if (found === null) {
		return;
	} else {
		return found[1];
	}
}