/*
 * Copyright 2013 BlackBerry Limited.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

var Application = {

    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        Application.receivedEvent('deviceready');

        authCode = null;
        childWindow = null;

        // setup our Facebook credentials, and callback URL to monitor
        facebookOptions = {
            clientId: '',
            clientSecret: '',
            redirectUri: ''
        };

        bb.init({
            actionBarDark: true,
            controlsDark: true,
            listsDark: false,

            // Fires "before" styling is applied and "before" the screen is inserted in the DOM
            onscreenready: function(element, id) {},

            // Fires "after" styling is applied and "after" the screen is inserted in the DOM
            ondomready: function(element, id) {
                if (id === 'home') {
                    setClickHandlers();
                }

                if (id === 'connected') {
                    Toast.regular('Hello ' + userName + '!');
                }
            }
        });

        // start the app
        bb.pushScreen('home.html', 'home');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    }
};

/**
 *  Set click handlers for the OAuth Start button
 *  Note: window.open can only be triggered in this way, you must set a click handler for this.
 */
function setClickHandlers() {
    console.log('set click handlers');

    var link = document.getElementById('btnStart');
    link.addEventListener('click', function(e) {

        // if the childWindow is already open, don't allow user to click the button
        if (childWindow !== null) {
            return false;
        }

        e.preventDefault();
        Toast.regular('Contacting Facebook...');
        setTimeout(function() {
            startOAuth();
        }, 500);
    });
}


/**
 *  Start the OAuth process by opening a childWindow, and directing the user to authorize the app
 */
function startOAuth() {
    // open the authorzation url
    var url = 'https://www.facebook.com/dialog/oauth?client_id=' + facebookOptions.clientId + '&redirect_uri=' + facebookOptions.redirectUri + '&scope=publish_stream,read_stream';
    childWindow = window.open(url, '_blank');

    // evaluate the url every second, when facebook redirects to our callback url, the following if statements gets fired
    window.int = self.setInterval(function() {
        var currentURL = childWindow.window.location.href;
        var callbackURL = facebookOptions.redirectUri;
        var inCallback = currentURL.indexOf(callbackURL);

        // location has changed to our callback url, parse the oauth code
        if (inCallback == 0) {

            // stop the interval from checking for url changes
            window.clearInterval(int)

            // parse the oauth code
            var code = childWindow.window.location.search;
            code = code.split('code=');
            code = code[1];
            window.authCode = code;

            // close the childWindow
            childWindow.close();

            setTimeout(function() {
                getAccessToken();
            }, 1000);
        }
    }, 1000);
}


/**
 *  echange the oauth code, from an access token
 */
function getAccessToken() {
    Toast.regular('Fetching access token...');
    var url = 'https://graph.facebook.com/oauth/access_token?client_id=' + facebookOptions.clientId + '&redirect_uri=' + facebookOptions.redirectUri + '&client_secret=' + facebookOptions.clientSecret + '&code=' + authCode;

    $.ajax({
        type: 'GET',
        url: url,
        success: function(data) {
            var response = data;

            // parse 'access_token' from the response
            var response = response.split('&');
            var theAccessToken = response[0].split('=');
            window.accessToken = theAccessToken[1];

            // get authenticated users' info/name
            getUserInfo();
        },

        error: function(data) {
            alert('Error getting access_token: ' + data.responseText);
            return false;
        }
    });
}


/**
 *  get users info (we're grabbing their full name for this sample)
 */
function getUserInfo() {
    var url = 'https://graph.facebook.com/me?access_token=' + accessToken;

    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        success: function(data) {
            bb.pushScreen('connected.html', 'connected');
            window.userName = data.name;
        },

        error: function(data) {
            alert('Error getting users info: ' + data.responseText);
            return false;
        }
    });
}


/**
 *  get authenticated user's feed
 */
function getFeed() {

    Toast.regular('Refreshing feed...');

    $('#content p').remove();
    var url = 'https://graph.facebook.com/me/feed?access_token=' + accessToken;

    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        success: function(data) {
            var feed = data.data;

            // show the last 10 items from the users news feed
            // note: there are several objects that could be posted in a news feed. for simplicity
            // we're only showing objects with a 'story' attribute
            for (var i = 0; $('#content p').size() < 10; i++) {
                if (typeof feed[i].message !== 'undefined') {
                    $('#content').append('<p>' + feed[i].message + '</p>');
                }
            }
        },

        error: function(data) {
            alert('Error loading news feed: ' + data.responseText);
            return false;
        }
    });
}


/**
 *  post to authenticated user's feed
 */
function postToFeed() {
    var randomNum = Math.round(Math.random() * 999 + 1);
    var status = 'Test (' + randomNum + ') of the Facebook OAuth sample for BlackBerry 10 by @chadtatro! (http://twitter.com/chadtatro) http://bit.ly/106Blwv';
    var url = 'https://graph.facebook.com/me/feed?message=' + status + '&access_token=' + accessToken;

    $.ajax({
        type: 'POST',
        url: url,
        dataType: 'json',
        success: function(data) {
            getFeed();
        },

        error: function(data) {
            alert('Error updating status: ' + data.responseText);
            return false;
        }
    });
}