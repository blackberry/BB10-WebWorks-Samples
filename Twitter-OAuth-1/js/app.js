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

	// setup our Facebook credentials, and callback URL to monitor
	twitterOptions = {
		consumerKey: '',
		consumerSecret: '',
		callbackUrl: ''
	};
	twitterOAuth = OAuth(twitterOptions);

	// (bbUI) push the start.html page
	bb.pushScreen('start.html', 'start');
}


/**
 *  Set click handlers for the OAuth Start button
 *  Note: window.open can only be triggered in this way, you must set a click handler for this.
 */
function setClickHandlers() {
	var link = document.getElementById('btnAccess');
	link.addEventListener('click', function(e) {

		// if the childWindow is already open, don't allow user to click the button
		if(childWindow !== null) {
			return false;
		}

		e.preventDefault();
		toast('Fetching access token...');
		setTimeout(function() {
			getAccessToken();
		}, 500);
	});
}


/**
 *  Start the OAuth process by opening a childWindow, and directing the user to authorize the app
 */
function startOAuth() {
	toast('Contacting Twitter...');
	twitterOAuth.get('https://api.twitter.com/oauth/request_token', function(data) {
		window.requestParams = data.text;
		bb.pushScreen('access.html', 'access');
	}, function(data) {
		alert('Error : No Authorization');
	});
}


/**
 *  exchange request token for access token & get authorization from user
 */
function getAccessToken() {
	var url = 'https://api.twitter.com/oauth/authorize?' + requestParams;
	childWindow = window.open(url, '_blank');

	// evaluate the url every second, when facebook redirects to our callback url, the following if statements gets fired
	window.int = self.setInterval(function() {
		var currentURL = childWindow.window.location.href;

		var callbackURL = twitterOptions.callbackUrl;
		var inCallback = currentURL.indexOf(callbackURL);

		// location has changed to our callback url, parse the oauth code
		if(inCallback == 0) {

			// stop the interval from checking for url changes	
			window.clearInterval(int)

			// parse the oauth codes
			var oauthToken = checkForQueryStrings('oauth_token') || null;
			var oauthVerifier = checkForQueryStrings('oauth_verifier') || null;

			// close the childWindow
			childWindow.close();

			setTimeout(function() {
				getOAuthToken(oauthToken, oauthVerifier);
			}, 1000);
		}
	}, 1000);
}


/**
 *  exchange the access token for oauth tokens
 */
function getOAuthToken(oauthToken, oauthVerifier) {
	toast('Getting OAuth Tokens');
	twitterOAuth.get('https://api.twitter.com/oauth/access_token?oauth_verifier=' + oauthVerifier + '&' + requestParams,

	// success - we have finally have access tokens!
	function(data) {
		window.accessParams = {};
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
		twitterOAuth.setAccessToken([accessParams.oauth_token, accessParams.oauth_token_secret]);
		bb.pushScreen('connected.html', 'connected');
	},

	// failure
	function(data) {
		// you can put any error handling you may want to do in here, if the request for access tokens fails
	});
}


/**
 *  get authenticated users feed
 */
function getFeed() {
	toast('Loading feed...');
	$('#content p').remove();

	twitterOAuth.get('https://api.twitter.com/1.1/statuses/user_timeline.json',

	// success
	function(data) {
		var tweets = JSON.parse(data.text);

		// show the last 10 tweets from the users timeline
		for(var i = 0; i < 11; i++) {
			$('#content').append('<p>' + tweets[i].text + '</p>');
		}
	},

	// failure
	function(data) {
		alert('Error getting timeline: ' + e);
		return false;
	});
}


/**
 *  post to authenticated users feed
 */
function postToFeed() {
	toast('Posting Tweet...');

	var randomNum = Math.round(Math.random() * 999 + 1);
	var status = 'Test (' + randomNum + ') of the Twitter OAuth sample for BlackBerry 10 by @chadtatro! http://bit.ly/139tsVQ';

	twitterOAuth.post('https://api.twitter.com/1.1/statuses/update.json', {
		'status': status

	// success
	}, function(data) {
		toast('Posted!');
		setTimeout(function() {
			getFeed();
		}, 1000);

	// failure
	}, function(data) {
		alert('Error posting your tweet :(');
	});
}


/**
 *  display a toast message to the user
 */
function toast(msg) {
	blackberry.ui.toast.show(msg);
}


/** 
 *  helper function which checks for certain query strings when the app loads (for use in the OAuth callback)
 */
function checkForQueryStrings(id) {
	var string = "[\\?&]" + id + "=([^&#]*)";
	var regex = new RegExp(string);
	var results = regex.exec(childWindow.location.href);
	if(results === null) {
		return;
	} else {
		return results[1];
	}
}