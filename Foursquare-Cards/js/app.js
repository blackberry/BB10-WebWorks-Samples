/*
 * Copyright 2013 BlackBerry.
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

// child card closed callback

function onChildCardClosedHandler(request) {
	// try / catch so it works in browser for testing
	try {
		// success
		if (request.reason == 'success') {

			// in the authorization callback
			if (request.type === '') {
				accessToken = request.data;
				accessToken = accessToken.split('"')[1];
				Toast.regular('Access Token: ' + accessToken, 4000);

				// in the venue search callback
			} else if (request.type == 'application/json') {
				var data = JSON.parse(request.data);
				var name = data.name;
				Toast.regular('Picked: ' + name, 4000);
			}
		} else {
			// catch denied case
		}
	} catch (e) {}
}

var Foursquare = {
	// single sign-on card
	sso: function() {
		var request = {
			target: "com.foursquare.blackberry.sso.card",
			action: "bb.action.VIEW",
			type: "sso/foursquare",
			data: "L4CURGRJ0JCCVA0QJ1Y5JI052HMZI0MSQIQMVTMX1JTN43L2"
		};
		Foursquare.go(request);
	},

	// venue search
	venueSearch: function() {
		// we need an access token to do this call
		if (typeof accessToken === 'undefined') {
			Toast.withButton('You must sign-in with SSO first!', 'Sign-in', 'Foursquare.sso', 5000);
		} else {
			var request = {
				target: "com.foursquare.blackberry.venuesearch.card",
				action: "bb.action.VIEW",
				type: "venuesearch/foursquare",
				uri: "foursquare://venues/search?oauth_token=" + accessToken,
			};
			Foursquare.go(request);
		}
	},

	// explore
	explore: function() {
		var request = {
			target: "com.foursquare.blackberry.uri",
			action: "bb.action.OPEN",
			uri: "foursquare://venues/explore"
		};
		Foursquare.go(request);
	},

	// show profile
	showProfile: function() {
		var request = {
			target: "com.foursquare.blackberry.uri",
			action: "bb.action.OPEN",
			uri: "foursquare://users/self/update"
		};
		Foursquare.go(request);
	},

	// friends requests
	showFriendsRequests: function() {
		var request = {
			target: "com.foursquare.blackberry.uri",
			action: "bb.action.OPEN",
			uri: "foursquare://users/requests"
		};
		Foursquare.go(request);
	},

	// friends suggestions
	showFriendSuggestions: function() {
		var request = {
			target: "com.foursquare.blackberry.uri",
			action: "bb.action.OPEN",
			uri: "foursquare://users/suggest?type=friend"
		};
		Foursquare.go(request);
	},

	// page suggestions
	showPageSuggestions: function() {
		var request = {
			target: "com.foursquare.blackberry.uri",
			action: "bb.action.OPEN",
			uri: "foursquare://users/suggest?type=page"
		};
		Foursquare.go(request);
	},

	// add friends from...
	showAddFriends: function() {
		var request = {
			target: "com.foursquare.blackberry.uri",
			action: "bb.action.OPEN",
			uri: "foursquare://users/addfriends?from=phonebook"
		};
		Foursquare.go(request);
	},

	// venue card
	openVenue: function() {
		var request = {
			target: "com.foursquare.blackberry.uri",
			action: "bb.action.OPEN",
			uri: "foursquare://venues/4ef0e7cf7beb5932d5bdeb4e"
		};
		Foursquare.go(request);
	},

	// checkin card
	openCheckin: function() {
		var request = {
			target: "com.foursquare.blackberry.uri",
			action: "bb.action.OPEN",
			uri: "foursquare://checkins/50a08609e4b04c46ea54446d"
		};
		Foursquare.go(request);
	},


	// make the request
	go: function(params) {
		blackberry.invoke.invoke(
			params,

			function() {
				console.log('success');
			},

			function(e) {
				console.log(e);
				Toast.regular('Error invoking card: ' + e, 4000);
			}
		);
	}
};