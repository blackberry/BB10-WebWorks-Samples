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

//This is an unbound invocation (no target specified): the OS will choose what target to use based on URI
function invokePictures() {
    
    downloadPicture();
    
    blackberry.invoke.invoke({
        uri: "file:///accounts/1000/shared/downloads/rim_logo_black.jpg",
    }, onSuccess, onError);
}

//Supported in HTML5: getting binary data from XHR request
function downloadPicture() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', "/rim_logo_black.jpg", true);
    xhr.responseType = 'arraybuffer';
    
    xhr.onload = function(e) {
        if (this.status == 200) {
            var bb = new window.WebKitBlobBuilder();
            bb.append(this.response);
            var blob = bb.getBlob('image/jpeg');
            saveFile(blob);
        }
    };
    xhr.send();
}

//This function demonstrates how to use the HTML5 FileSystem API: a .png blob is saved to a URI which is used for invocation
function saveFile (blob) {
    function gotFs(fs) {
        fs.root.getFile("/accounts/1000/shared/downloads/rim_logo_black.jpg", {create: true}, gotFile, errorHandler);
    }

    function gotFile(fileEntry) {
        fileEntry.createWriter(gotWriter, errorHandler);
    }

    function gotWriter(fileWriter) {
        fileWriter.onerror = function (e) {
            alert("Failed to write JPEG: " + e.toString());
        }
        fileWriter.write(blob);
    }
    window.webkitRequestFileSystem(PERSISTENT, 10 * 1024, gotFs, errorHandler);
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
