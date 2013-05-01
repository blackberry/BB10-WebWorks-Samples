/*
 * Copyright 2013 Research In Motion Limited.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var _application = window.qnx.webplatform.getApplication(),
    _startupMode = _application.invocation.getStartupMode(),
     request;

qnx.webplatform.getController().addEventListener("webview.initialized", function (webview) {
    webview.addEventListener('DocumentLoadFinished', function () {
        var injector = "var s = document.createElement('script'); s.src = 'local:///chrome/webworks.js'; document.getElementsByTagName('head')[0].appendChild(s);";
        // Inject the webworks.js
        webview.executeJavaScript(injector);

        //Inject the second script
        injector = "var s = document.createElement('script'); s.src = 'local:///post.js'; document.getElementsByTagName('head')[0].appendChild(s);";
        webview.executeJavaScript(injector);
    });
});

