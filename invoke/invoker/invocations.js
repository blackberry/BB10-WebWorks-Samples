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

function invokeHelp() {
    blackberry.invoke.invoke({
        target: "sys.help"
    }, onSuccess, onError);
}

function invokeAdobeReader() {
    blackberry.invoke.invoke({
        target: "com.adobe.AdobeReader",
    }, onSuccess, onError);
}

function invokeAdobeReaderPdf() {
    blackberry.invoke.invoke({
        target: "com.adobe.AdobeReader",
        action: "bb.action.OPEN",
        type: "application/pdf",
        uri: "file:///accounts/1000/shared/documents/Getting Started with Adobe Reader.pdf"
    }, onSuccess, onError);
}

function invokeApp() {
    blackberry.invoke.invoke({
        target: "net.rim.webworks.invokable", 
        action: "bb.action.OPEN",
        type: "text/plain",
        data: "Hello, I invoked you"
    }, onSuccess, onError);
}

function saveFileInvoke () {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/cliffs.jpg', false);
    xhr.responseType = 'blob';

    xhr.onload = function(e) {
        blackberry.io.sandbox = false;
        window.webkitRequestFileSystem(PERSISTENT, 1024 * 1024, function(fs) {
            fs.root.getFile(blackberry.io.sharedFolder + '/downloads/cliffs.jpg', {create: true}, function(fileEntry) {
                fileEntry.createWriter(function(writer) {

                writer.onerror = function(e) { alert(e) };

                var blob = new Blob([xhr.response], {type: 'image/jpeg'});

                writer.write(blob);

                }, errorHandler);
            }, errorHandler);
        }, errorHandler);
    }
    
    xhr.send();

    blackberry.invoke.invoke({
        uri: "file:///accounts/1000/shared/downloads/cliffs.jpg",
    }, onSuccess, onError);
}

function errorHandler(fileError) {
    var msg = '';

    switch (fileError.code) {
        case FileError.QUOTA_EXCEEDED_ERR:
            msg = 'QUOTA_EXCEEDED_ERR';
            break;
        case FileError.NOT_FOUND_ERR:
            msg = 'NOT_FOUND_ERR';
            break;
        case FileError.SECURITY_ERR:
            msg = 'SECURITY_ERR';
            break;
        case FileError.INVALID_MODIFICATION_ERR:
            msg = 'INVALID_MODIFICATION_ERR';
            break;
        case FileError.INVALID_STATE_ERR:
            msg = 'INVALID_STATE_ERR';
            break;
        case FileError.NO_MODIFICATION_ALLOWED_ERR:
            msg = 'NO_MODIFICATION_ALLOWED_ERR';
            break;
        default:
            msg = 'File Error';
          break;
    };

    alert('Error: ' + msg);
}
