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

function invokePictures() {
    blackberry.invoke.invoke({
        uri: "file:///accounts/1000/shared/downloads/HTML5.png",
    }, onSuccess, onError);
}
