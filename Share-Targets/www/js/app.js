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


// set filepicker options for images
var shareImage = function() {
    var type = 'image';
    var details = {
        mode: blackberry.invoke.card.FILEPICKER_MODE_PICKER,
        filter: ["*.jpg", "*.png"]
    };
    invokeFilePicker(details, type);
};


// set filepicker options for documents
var shareDoc = function() {
    var type = 'doc';
    var details = {
        mode: blackberry.invoke.card.FILEPICKER_MODE_PICKER,
        filter: ["*.pdf", "*.txt", "*.doc", "*.log"]
    };
    invokeFilePicker(details, type);
};


// set filepicker options for music
var shareMusic = function() {
    var type = 'music';
    var details = {
        mode: blackberry.invoke.card.FILEPICKER_MODE_PICKER,
        filter: ["*.wav", "*.mp3"]
    };
    invokeFilePicker(details, type);
};


// set filepicker options for video
var shareVideo = function() {
    var type = 'video';
    var details = {
        mode: blackberry.invoke.card.FILEPICKER_MODE_PICKER,
        filter: ["*.mp4", "*.m4v"]
    };
    invokeFilePicker(details, type);
};


// invoke the filepicker card
var invokeFilePicker = function(details, type) {
    var title, request;
    blackberry.invoke.card.invokeFilePicker(details, function(path) {
            path = path[0];

            // image
            if (type === 'image') {
                title = "Share Image";
                request = {
                    action: 'bb.action.SHARE',
                    uri: 'file://' + path,
                    target_type: ["CARD"]
                };
                loadShareCard(title, request);

                // document
            } else if (type === 'doc') {
                title = "Share Document";
                request = {
                    action: 'bb.action.SHARE',
                    uri: 'file://' + path,
                    target_type: ["APPLICATION", "VIEWER"]
                };
                loadShareCard(title, request);

                // music
            } else if (type === 'music') {
                title = "Share Music";
                request = {
                    action: 'bb.action.SHARE',
                    uri: 'file://' + path,
                    target_type: ["APPLICATION", "VIEWER", "CARD"]
                };
                loadShareCard(title, request);

                // video
            } else if (type === 'video') {
                title = "Share Video";
                request = {
                    action: 'bb.action.SHARE',
                    uri: 'file://' + path,
                    target_type: ["APPLICATION", "VIEWER", "CARD"]
                };
                loadShareCard(title, request);
            }
        },

        // cancelled filepicker
        function(reason) {
            console.log("cancelled: " + reason);

            // filepicker error
        }, function(error) {
            if (error) {
                console.log("invoke error: " + error);
            } else {
                console.log("invoke success ");
            }
        });
};


// load the share card
var loadShareCard = function(title, request) {
    console.log(title);
    console.log(request);

    blackberry.invoke.card.invokeTargetPicker(request, title,

        // success
        function() {},

        // error
        function(e) {
            console.log(e);
        });
};