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

var Invoke = {
    facebookApp: function() {
        var request = {
            target: "Facebook",
            action: "bb.action.SHARE",
            type: "text/plain",
            data: "Testing out the BlackBerry 10 Invoke sample for BlackBerry WebWorks! https://developer.blackberry.com #bb10believe"
        };
        Invoke.invokeApp(request);
    },

    facebookPage: function() {
        var request = {
            target: "com.rim.bb.app.facebook",
            action: "bb.action.OPEN",
            metadata: JSON.stringify({
                object_type: 'page',
                object_id: '328506290597521'
            })
        };
        Invoke.invokeApp(request);
    },

    twitterApp: function() {
        var request = {
            target: "Twitter",
            action: "bb.action.SHARE",
            type: "text/plain",
            data: "Testing out the BlackBerry 10 Invoke sample for BlackBerry WebWorks! https://developer.blackberry.com #bb10believe"
        };
        Invoke.invokeApp(request);
    },

    twitterProfile: function() {
        var request = {
            target: "com.twitter.urihandler",
            action: "bb.action.VIEW",
            uri: "twitter:connect:chadtatro"
        };
        Invoke.invokeApp(request);
    },

    twitterSearch: function() {
        var request = {
            target: "com.twitter.urihandler",
            action: "bb.action.VIEW",
            uri: "twitter:search:#bb10believe"
        };
        Invoke.invokeApp(request);
    },

    nfc: function() {
        var request = {
            target: "sys.NFCViewer",
            action: "bb.action.SHARE",
            uri: "http://developer.blackberry.com"
        };
        Invoke.invokeApp(request);
    },

    clock: function() {
        var request = {
            target: "bb.clock.launcher",
            action: "bb.action.VIEW",
            type: "text/plain",
        };
        Invoke.invokeApp(request);
    },

    clockAlarm: function() {
        var request = {
            target: "bb.clock.launcher",
            action: "bb.action.VIEW",
            type: "text/plain",
            data: "alarmClockPane"
        };
        Invoke.invokeApp(request);
    },

    clockWorld: function() {
        var request = {
            target: "bb.clock.launcher",
            action: "bb.action.VIEW",
            type: "text/plain",
            data: "worldClockTab"
        };
        Invoke.invokeApp(request);
    },

    clockStop: function() {
        var request = {
            target: "bb.clock.launcher",
            action: "bb.action.VIEW",
            type: "text/plain",
            data: "stopwatchTab"
        };
        Invoke.invokeApp(request);
    },

    bbWorldApp: function() {
        var request = {
            target: "sys.appworld",
            action: "bb.action.OPEN",
            uri: "appworld://"
        };
        Invoke.invokeApp(request);
    },

    bbWorldMyWorld: function() {
        var request = {
            target: "sys.appworld",
            action: "bb.action.OPEN",
            uri: "appworld://myworld"
        };
        Invoke.invokeApp(request);
    },

    bbWorldMusic: function() {
        var request = {
            target: "sys.appworld",
            action: "bb.action.OPEN",
            uri: "appworld://music"
        };
        Invoke.invokeApp(request);
    },

    bbWorldSearch: function() {
        var request = {
            target: "sys.appworld",
            action: "bb.action.OPEN",
            uri: "appworld://search/bbm"
        };
        Invoke.invokeApp(request);
    },

    email: function() {
        blackberry.invoke.card.invokeEmailComposer({
                subject: "Email subject",
                body: "Email body",
                to: ["a@a.ca", "b@b.com"],
                cc: ["c@c.ca, d@d.com"],
                attachment: ["path-to-file.jpg"]
            },
            function(success) {
                console.log('success');
            },
            function(cancel) {
                console.log('cancel');
            },
            function(error) {
                console.log('error');
            });
    },

    linkedInApp: function() {
        var request = {
            target: "com.linkedin.urihandler",
            action: "bb.action.VIEW",
            uri: "linkedin:contact:http://ca.linkedin.com/pub/chad-tetreault/20/49/985"
        };
        Invoke.invokeApp(request);
    },

    browser: function() {
        var request = {
            target: "sys.browser"
        };
        Invoke.invokeApp(request);
    },

    browserUri: function() {
        var request = {
            target: "sys.browser",
            uri: "http://developer.blackberry.com"
        };
        Invoke.invokeApp(request);
    },

    help: function() {
        var request = {
            target: "sys.help"
        };
        Invoke.invokeApp(request);
    },

    phone: function() {
        var request = {
            uri: "tel:5555555555"
        };
        Invoke.invokeApp(request);
    },

    settingsApp: function() {
        var request = {
            target: "sys.settings.target"
        };
        Invoke.invokeApp(request);
    },

    settingsWifi: function() {
        var request = {
            target: "sys.settings.target",
            uri: "settings://wifi"
        };
        Invoke.invokeApp(request);
    },

    adobeReaderApp: function() {
        var request = {
            target: "com.rim.bb.app.adobeReader",
        };
        Invoke.invokeApp(request);
    },

    adobeReaderPdf: function() {
        var request = {
            target: "com.rim.bb.app.adobeReader",
            action: "bb.action.OPEN",
            type: "application/pdf",
            uri: "file:///accounts/1000/shared/documents/Getting Started with Adobe Reader.pdf"
        };
        Invoke.invokeApp(request);
    },

    userApp: function() {
        var request = {
            target: "com.bb.test.invokable",
            action: "bb.action.OPEN",
            type: "text/plain",
            data: "Hello, I invoked you"
        };
        Invoke.invokeApp(request);
    },

    invokeApp: function(request) {
        blackberry.invoke.invoke(
            request,
            function() {
                console.log('success');
            }, function(e) {
                console.log('error');
                console.log(e);
            }
        );
    }
};