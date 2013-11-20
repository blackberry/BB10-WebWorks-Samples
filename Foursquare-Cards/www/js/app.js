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
        blackberry.event.addEventListener('deviceready', this.onDeviceReady, false);

        // child card closed callback
        document.addEventListener('onChildCardClosed', function(request) {
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
            } catch (e) {
                console.log(e);
            }
        });
    },

    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        Application.receivedEvent('deviceready');

        bb.init({
            actionBarDark: true,
            controlsDark: true,
            listsDark: false,

            // Fires "before" styling is applied and "before" the screen is inserted in the DOM
            onscreenready: function(element, id) {},

            // Fires "after" styling is applied and "after" the screen is inserted in the DOM
            ondomready: function(element, id) {}
        });

        // start the app
        bb.pushScreen('home.html', 'home');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    }
};


var Foursquare = {


    // single sign-on card
    // data: "<CLIENT ID>"
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
    // uri: "foursquare://venues/search?oauth_token=<ACCESS TOKEN>",
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

    // add friends from
    // uri: "foursquare://users/addfriends?from= <phonebook>, <twitter>, <facebook>, or <search>"
    showAddFriends: function() {
        var request = {
            target: "com.foursquare.blackberry.uri",
            action: "bb.action.OPEN",
            uri: "foursquare://users/addfriends?from=phonebook"
        };
        Foursquare.go(request);
    },

    // venue card
    // uri: "foursquare://venues/ <VENUE ID>"
    openVenue: function() {
        var request = {
            target: "com.foursquare.blackberry.uri",
            action: "bb.action.OPEN",
            uri: "foursquare://venues/4ef0e7cf7beb5932d5bdeb4e"
        };
        Foursquare.go(request);
    },

    // checkin card
    // uri: "foursquare://checkins/ <CHECKIN ID>"

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