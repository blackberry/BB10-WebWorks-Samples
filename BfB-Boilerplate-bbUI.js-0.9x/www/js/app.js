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

        try {
            // register with bbm
            Bbm.register();
            // setup active frame / window cover
            App.ui.windowCover.setup('local:///images/cover.png');
        } catch (e) {
            console.log('BBM / Window Covers will not work in the browser. On device only.');
        }


        // start the app
        bb.pushScreen('home.html', 'home');

        // show welcome message
        welcome();


    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    }
};



// filepicker (async)

function pickFile() {
    Invoke.utils.filePicker(function(path) {
            Toast.regular('Picked: ' + path, 3000);
        },

        function(reason) {
            Toast.regular('Card canceled: ' + reason);
        },

        function(error) {
            console.log(error);
        });
}

// camera (async)

function takePhoto() {
    Invoke.utils.camera(function(path) {
            Toast.regular('Photo: ' + path, 3000);
        },

        function(reason) {
            Toast.regular('Card canceled: ' + reason);
        },

        function(error) {
            console.log(error);
        });
}

// sample toast button callback

function toastCallback() {
    alert('In the callback!');
}

// spinner usage

function spinner(size) {
    // hide the current spinner, if it's visible
    Spinner.off();
    Spinner.on(size);
}

// show a welcome message

function welcome() {
    Toast.regular('Welcome to the BFB Sample!', 2000);
    setTimeout(function() {
        Toast.regular('Swipe down to see the App Menu!', 2000);
        setTimeout(function() {
            Toast.regular('Minimize the app to see the Window Cover', 2300);
        }, 2300);
    }, 2300);
}