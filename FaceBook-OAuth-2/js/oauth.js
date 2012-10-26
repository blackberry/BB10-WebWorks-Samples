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

// rename redirectUri (removed extra '.php' from my type-o)

// initialization function - the core of the application
function initApp() {
	try {
		// facebook oauth setup
		facebookOptions = {
			clientId: '',
			clientSecret: '',

			// we use a php script on a server because facebook doesn't allow for local:/// callbacks
			// at this time.  the php simply redirects us back to 'local:///index.html'
			redirectUri: 'http://mydomain.com/oauth_redirect.php'
		};

		// here we check for query strings in window.location when the app loads.  This is because facebook is calling back
		// to our callbackUrl. When the app initializes, and there is a query string, it checks if the user
		// authorized the app or not
		var query = window.location.search;
		authCode = null;
		authCode = query.split('code=');
		authCode = authCode[1] || null;

		// we've got an auth code, let's exchange that for an access token
		if (authCode !== null) {
			getAccessToken();
		}
	} catch (e) {
		alert('Error in initApp: ' + e);
	}
}

// first, we get the user to authorize with the service and allow our app access
function getAuthorization() {
	try {
		showMessage('Contacting Facebook...');
		window.location.replace('https://www.facebook.com/dialog/oauth?client_id=' + facebookOptions.clientId + '&redirect_uri=' + facebookOptions.redirectUri + '&scope=publish_stream,read_stream');
	} catch (e) {
		alert('Error in getAuthorization: ' + e);
	}
}

// exchange our 'access code' for an 'access_token'
function getAccessToken() {
	try {
		var url = 'https://graph.facebook.com/oauth/access_token?client_id=' + facebookOptions.clientId + '&redirect_uri=' + facebookOptions.redirectUri + '&client_secret=' + facebookOptions.clientSecret + '&code=' + authCode;

		$.ajax({
			type: 'GET',
			url: url,
			success: function(data) {
				var response = data;

				// parse 'access_token' from the response
				response = response.split('&');
				accessToken = response[0].split('=');
				accessToken = accessToken[1];

				// get authenticated users' info for future use
				getUserInfo();
			},

			error: function(data) {
				alert('Error getting access_token: ' + data.responseText);
				return false;
			}
		});
	} catch (e) {
		alert('Error in getAccessToken: ' + e);
	}
}

// get users info (we're grabbing their full name for this sample)
function getUserInfo() {
	try {
		var url = 'https://graph.facebook.com/me?access_token=' + accessToken;

		$.ajax({
			type: 'GET',
			url: url,
			dataType: 'json',
			success: function(data) {

				// data.name = users full name
				showMessage('Hello ' + data.name + '!');
				$('#buttonSetup').hide();
				$('#afterAuth').show();
			},

			error: function(data) {
				alert('Error getting users info: ' + data.responseText);
				return false;
			}
		});
	} catch (e) {
		alert('Error in getUserInfo: ' + e);
	}
}

// update the users status
function postToService() {
	try {
		var status = $('#inputBox').val();
		if (status === '' || status === 'enter your status...') {
			showMessage('You didn\'t enter anything to post :(');
			return false;

		} else {
			showMessage('Updating status...');
			var url = 'https://graph.facebook.com/me/feed?message=' + status + '&access_token=' + accessToken;

			$.ajax({
				type: 'POST',
				url: url,
				dataType: 'json',
				success: function(data) {
					showMessage('Status updated!!');
					$('#inputBox').val('enter your status...');

					// display the updated news feed to the user
					setTimeout(function() {
						getFeed();
					}, 200);
				},

				error: function(data) {
					alert('Error updating status: ' + data.responseText);
					return false;
				}
			});
		}
	} catch (e) {
		alert('Error in postToService: ' + e);
	}
}

// get users news feed
function getFeed() {
	try {
		showMessage('Getting news feed...');
		var url = 'https://graph.facebook.com/me/feed?access_token=' + accessToken;

		$.ajax({
			type: 'GET',
			url: url,
			dataType: 'json',
			success: function(data) {
				showMessage('Your news feed...');
				var feed = data.data;

				// clear the content div, and prepare to add new data to it
				$('#content p').remove();

				// show the last 4 items from the users news feed
				// note: there are several objects that could be posted in a news feed. for simplicity
				// we're only showing objects with a 'story' attribute
				for (var i = 0; $('#content p').size() < 4; i++) {
					if (typeof feed[i].story !== 'undefined') {
						$('#content').append('<p>' + feed[i].story + '</p>');
					}
				}

				// display the feed, after it's been parsed
				$('#content').fadeIn();
			},

			error: function(data) {
				alert('Error loading news feed: ' + data.responseText);
				return false;
			}
		});
	} catch (e) {
		alert('Error in getFeed: ' + e);
	}
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
			$('#message').fadeOut(500, function() {
				$('#message').html('');
			});
		}, 8000);
	} catch (e) {
		alert('Error in showMessage: ' + e);
	}
}