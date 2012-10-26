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

function initApp() {
	try {

		// jsOauth setup for twitter
		twitterOptions = {
			consumerKey: '',
			consumerSecret: '',

			// this assumes your content source is index.html, if not, change below
			callbackUrl: 'http://mydomain.com/oauth_redirect.php'
		};

		twitterOauth = OAuth(twitterOptions);

		// end of jsOAuth setup
		// here we check for query strings in window.location when the app loads.  This is because facebook is calling back
		// to our callbackUrl. When the app initializes, and there is a query string, it checks if the user
		// authorized the app or not
		var query = window.location.search;
		authCode = null;
		authCode = query.split('oauth_token=');
		authCode = authCode[1] || null;

		// // we've got an auth code, let's exchange that for an access token
		if(authCode !== null) {
			
			// parse the querystring
			requestParams = localStorage.getItem('requestParams') || null;
			var denied = checkForQueryStrings('denied') || null;
			var oauthToken = checkForQueryStrings('oauth_token') || null;
			var oauthVerifier = checkForQueryStrings('oauth_verifier') || null;

			// go for access tokens
			getAccessTokens(oauthToken, oauthVerifier);
		}
	} catch(e) {
		alert('Error in initApp: ' + e);
	}
}

// first, we get the user to authorize with the service and allow our app access
function getRequestTokens() {
	try {

		showMessage('Contacting Twitter...');
		twitterOauth.get('https://api.twitter.com/oauth/request_token',

		// success
		function(data) {
			window.location.replace("https://api.twitter.com/oauth/authorize?" + data.text);
			requestParams = data.text;

			// save the tokens that Twitter gave us for use in getAccessTokens() function
			localStorage.setItem('requestParams', requestParams);
		},

		// failure
		function(data) {
			// error handling here
			$('#message').fadeOut(500);
			alert('Fale getting request token: ' + data.text);
			return false;
		});
	} catch(e) {
		alert('Error in getRequestTokens: ' + e);
	}
}


// the last step - getting access tokens
// note that we're appending our previously saved requestParams to our query.  this is part of the OAuth "flow"
function getAccessTokens(oauthToken, oauthVerifier) {
	try {
		var requestParams = localStorage.getItem('requestParams');
		twitterOauth.get('https://api.twitter.com/oauth/access_token?oauth_verifier=' + oauthVerifier + '&' + requestParams,

		// success - we have finally have access tokens!
		function(data) {
			var accessParams = {};
			var qvars_tmp = data.text.split('&');
			for(var i = 0; i < qvars_tmp.length; i++) {
				var y = qvars_tmp[i].split('=');
				accessParams[y[0]] = decodeURIComponent(y[1]);
			}

			// tell jsOAuth that we have access tokens - it'll use these for future requests to the service
			// note:  you'll want to safely store these tokens - if you were to close the app at this point
			//        the tokens would be lost, and you'd need to re-authorize with the service.
			//
			//        ** if you do save the tokens and load them from memory later, don't foget to set them
			//        in jsOAuth again like we're doing on the line below! **
			twitterOauth.setAccessToken([accessParams.oauth_token, accessParams.oauth_token_secret]);

			$('#buttonSetup').hide();
			$('#afterAuth').show();
			showMessage('Annnnd we\'re authd!');
		},

		// failure
		function(data) {
			// you can put any error handling you may want to do in here, if the request for access tokens fails
		});
	} catch(e) {
		alert('Error in getAccessTokens: ' + e);
	}
}

// helper function for displaying a message to the user
function showMessage(msg) {
	try {

		if(!$('#message').is(':visible')) {
			$('#message').show();
		}
		setTimeout(function() {
			$('#message').html(msg);
		}, 500);
		setTimeout(function() {
			$('#message').fadeOut(500, function() {
				$('#message').html('');
			});
		}, 4000);
	} catch(e) {
		alert('Error in showMessage: ' + e);
	}
}


// posting a tweet to the authorized users timeline
function postToService() {
	try {
		var status = $('#inputBox').val();
		if(status === '' || status === 'enter your tweet...') {
			showMessage('Uh oh! You didn\'t enter anything to post :(');
			return false;
		} else {

			setTimeout(function() {
				$('#message').fadeIn(300).html('Posting tweet...');
			}, 100);

			twitterOauth.post('https://api.twitter.com/1.1/statuses/update.json', {
				'status': status

				// success
			}, function(data) {
				setTimeout(function() {
					showMessage('Tweet posted!!');
					$('#inputBox').val('');
					//$('#message').fadeOut(500);
				}, 100);

				// failure
			}, function(data) {
				alert('Error posting your tweet :(');
			});
		}
	} catch(e) {
		alert('Error in postToService: ' + e);
	}
}


// display the users public timeline
function getTimeline() {
	try {

		showMessage('Loading timeline...');
		twitterOauth.get('https://api.twitter.com/1.1/statuses/user_timeline.json',

		// success
		function(data) {
			$('#content p').remove();
			var tweets = JSON.parse(data.text);

			// show the last 2 tweets from the users timeline
			for(var i = 0; i < 3; i++) {
				$('#content').append('<p>' + tweets[i].text + '</p>');
			}
			$('#content').fadeIn(600);
		},

		// failure
		function(data) {
			showMessage('Error getting timeline: ' + e);
			return false;
		});

	} catch(e) {
		alert('Error in getTimeline: ' + e);
	}
}

// helper function which checks for certain query strings when the app loads (for use in the OAuth callback)
function checkForQueryStrings(id) {
	var string = "[\\?&]" + id + "=([^&#]*)";
	var regex = new RegExp(string);
	var results = regex.exec(window.location);
	if(results === null) {
		return;
	} else {
		return results[1];
	}
}