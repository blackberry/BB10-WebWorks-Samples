/*
* Copyright 2012 Research In Motion Limited.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

function onSuccess() {
    document.getElementById("log").innerHTML += "<p>Invocation sucessful</p>";
}

function onError(error) {
    document.getElementById("log").innerHTML += "<p>Invocation error: " + error + "</p>";
}

function invokeTwitter() {
    blackberry.invoke.invoke({
        target: "Twitter",
        action: "bb.action.SHARE",
        type: "text/plain",
        data: "Testing out the BlackBerry 10 Invoke sample for WebWorks! https://github.com/blackberry/BB10-WebWorks-Samples/tree/master/invoke #bb10believe"
    }, onSuccess, onError);
}

function invokeTwitterProfile() {
    blackberry.invoke.invoke({
        target: "com.twitter.urihandler",
        action: "bb.action.VIEW",
        uri: "twitter:connect:blackberrydev"
    }, onSuccess, onError);
}

function invokeTwitterSearch() {
    blackberry.invoke.invoke({
        target: "com.twitter.urihandler",
        action: "bb.action.VIEW",
        uri: "twitter:search:#bb10believe"
    }, onSuccess, onError);
}

function invokeFacebook() {
        blackberry.invoke.invoke({
        target: "Facebook",
        action: "bb.action.SHARE",
        type: "text/plain",
        data: "Testing out the BlackBerry 10 Invoke sample for WebWorks! https://github.com/blackberry/BB10-WebWorks-Samples/tree/master/invoke #bb10believe"
    }, onSuccess, onError);
}

function invokeFacebookPage() {
    blackberry.invoke.invoke({
        target: "com.rim.bb.app.facebook",
        action: "bb.action.OPEN",
        metadata: JSON.stringify({object_type : 'page' , object_id : '328506290597521'}) 
    }, onSuccess, onError);
}

function invokeClock() {
    blackberry.invoke.invoke({
        target: "bb.clock.launcher",
        action: "bb.action.VIEW",
        type: "text/plain",
    }, onSuccess, onError);
}

function invokeClockAlarm() {
    blackberry.invoke.invoke({
        target: "bb.clock.launcher",
        action: "bb.action.VIEW",
        type: "text/plain",
        data: "alarmClockPane"
    }, onSuccess, onError);
}

function invokeClockWorld() {
    blackberry.invoke.invoke({
        target: "bb.clock.launcher",
        action: "bb.action.VIEW",
        type: "text/plain",
        data: "worldClockTab"
    }, onSuccess, onError);
}

function invokeClockStop() {
    blackberry.invoke.invoke({
        target: "bb.clock.launcher",
        action: "bb.action.VIEW",
        type: "text/plain",
        data: "stopwatchTab"
    }, onSuccess, onError);
}

function invokeBBWorld() {
    blackberry.invoke.invoke({
        target: "sys.appworld",
        action: "bb.action.OPEN",
        uri: "appworld://"
    }, onSuccess, onError);
}

function invokeBBWorldSearch() {
    blackberry.invoke.invoke({
        target: "sys.appworld",
        action: "bb.action.OPEN",
        uri: "appworld://search/s=cats"
    }, onSuccess, onError);
}

function invokeBBWorldMyWorld() {
    blackberry.invoke.invoke({
        target: "sys.appworld",
        action: "bb.action.OPEN",
        uri: "appworld://myworld"
    }, onSuccess, onError);
}

function invokeBBWorldMusic() {
    blackberry.invoke.invoke({
        target: "sys.appworld",
        action: "bb.action.OPEN",
        uri: "appworld://music"
    }, onSuccess, onError);
}


function invokeNFC() {
    blackberry.invoke.invoke({
        target: "sys.NFCViewer",
        action: "bb.action.SHARE",
        uri: "http://chadtatro.com"
    }, onSuccess, onError);
}

function invokeEmail() {
    blackberry.invoke.card.invokeEmailComposer({
        subject: "Email subject",
        body: "Email body",
        to: ["a@a.ca", "b@b.com"],
        cc: ["c@c.ca, d@d.com"],
        attachment: ["path-to-file.jpg"]
    }, 
    function(success) {
    }, 
    function (cancel) {
    },
    function (error) {
    } 
    );
}

function invokeLinkedIn() {
    blackberry.invoke.invoke({
        target: "com.linkedin.urihandler",
        action: "bb.action.VIEW",
        uri: "linkedin:contact:http://ca.linkedin.com/pub/chad-tetreault/20/49/985"
    }, onSuccess, onError);
}

function invokeBrowser() {
    blackberry.invoke.invoke({
        target: "sys.browser",
    }, onSuccess, onError);
}

function invokeBrowserUri() {
    blackberry.invoke.invoke({
        target: "sys.browser",
        uri: "http://www.blackberry.com"
    }, onSuccess, onError);
}

function invokePhone() {
    blackberry.invoke.invoke({
        uri: "tel:5555555555"
    }, onSuccess, onError);
}

function invokeSettings() {
    blackberry.invoke.invoke({
        target: "sys.settings.target"
    }, onSuccess, onError);
}

function invokeWiFiSettings() {
    blackberry.invoke.invoke({
        target: "sys.settings.target",
        uri: "settings://wifi"
    }, onSuccess, onError);
}

function invokeHelp() {
    blackberry.invoke.invoke({
        target: "sys.help"
    }, onSuccess, onError);
}

function invokeAdobeReader() {
    blackberry.invoke.invoke({
        target: "com.rim.bb.app.adobeReader",
    }, onSuccess, onError);
}

function invokeAdobeReaderPdf() {
    blackberry.invoke.invoke({
        target: "com.rim.bb.app.adobeReader",
        action: "bb.action.OPEN",
        type: "application/pdf",
        uri: "file:///accounts/1000/shared/documents/Getting Started with Adobe Reader.pdf"
    }, onSuccess, onError);
}

function invokeApp() {
    blackberry.invoke.invoke({
        target: "com.bb.test.invokable",
        action: "bb.action.OPEN",
        type: "text/plain",
        data: "Hello, I invoked you"
    }, onSuccess, onError);
}