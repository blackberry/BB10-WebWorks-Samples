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

        var options = {
            appVersion: blackberry.app.version,
            polling: 10000,
            uploadTimeout: 60000,
            sessionTimeoutSeconds: 30,
            storage: 100000,
            logger: true
        };

        localyticsSession = LocalyticsSession("0ad80167e95a7661ce24bc1-1e779c90-c3ca-11e2-33fb-00a426b17dd8", options);
        postAnalytics();

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
        bb.pushScreen('app.html', 'app');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    }
};

// event 1
function eventOne() {
    localyticsSession.tagEvent('Event 1');
    toast('Triggered: Event 1');
    postAnalytics();
}

// event 2
function eventTwo() {
    localyticsSession.tagEvent('Event 2');
    toast('Triggered: Event 2');
    postAnalytics();
}

// event 3
function eventThree() {
    localyticsSession.tagEvent('Event 3');
    toast('Triggered: Event 3');
    postAnalytics();
}

// event 4
function postAnalytics() {
    // if a connection is already open it will re - use it instead of creating a new connection
    localyticsSession.open();

    /** note: you don't always have to call this upload method as the library will cache all usage,
     *  and upload it for you at the start of the next user session. for this sample I wanted it to
     *  report a bit quicker, so I'm calling upload().
     */
    localyticsSession.upload();
}

// simple toast message
function toast(msg) {
    try {
        blackberry.ui.toast.show(msg);
    } catch (e) {}
}