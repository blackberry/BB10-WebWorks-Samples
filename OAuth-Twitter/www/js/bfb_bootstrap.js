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

/* ==============================================================================================
 *	APPLICATION OBJECT
 * =========================================================================================== */

var App = {

    /* ==============================================================================================
     *	WINDOW COVERS - https://developer.blackberry.com/html5/apis/blackberry.ui.cover.html
     * =========================================================================================== */

    ui: {
        windowCover: {
            setup: function(path) {
                console.log('[ setup active frames ]');

                // setup the window cover (displayed when app is minimized)
                blackberry.ui.cover.setContent(blackberry.ui.cover.TYPE_IMAGE, {
                    path: path
                });

                setTimeout(function() {
                    blackberry.ui.cover.updateCover();
                }, 0);
            }

        }
    }
};



/* ==============================================================================================
 *	BBM - https://developer.blackberry.com/html5/apis/blackberry.bbm.platform.html
 * =========================================================================================== */

var Bbm = {
    registered: false,

    // registers this application with the blackberry.bbm.platform APIs.
    register: function() {
        blackberry.event.addEventListener('onaccesschanged', function(accessible, status) {
            if (status === 'unregistered') {
                blackberry.bbm.platform.register({
                    uuid: '5b54bb3a-ab66-11e2-a242-f23c91aec05e' // unique uuid
                });
            } else if (status === 'allowed') {
                Bbm.registered = accessible;
            }
        }, false);

    },

    // update the users personal message
    updateMessage: function() {
        function dialogCallBack(selection) {
            var txt = selection.promptText;
            blackberry.bbm.platform.self.setPersonalMessage(
                txt,
                function(accepted) {});
        }

        // standard async dialog to get new 'personal message' for bbm
        blackberry.ui.dialog.standardAskAsync("Enter your new status", blackberry.ui.dialog.D_PROMPT, dialogCallBack, {
            title: "BBM"
        });
    },

    // invite a contact to download your app via bbm
    inviteToDownload: function() {
        blackberry.bbm.platform.users.inviteToDownload();
    }
};



/* ==============================================================================================
 *  INVOCATION - https://developer.blackberry.com/html5/documentation/invoking_core_apps.html
 * =========================================================================================== */

var Invoke = {

    // list of share targets
    targets: function(uri) {
        var title = 'Share';
        var request = {
            action: 'bb.action.SHARE',
            uri: uri,
            target_type: ["APPLICATION", "VIEWER", "CARD"]
        };

        blackberry.invoke.card.invokeTargetPicker(request, title,
            // success
            function() {},

            // error
            function(e) {});
    },

    // blackberry world
    blackberryWorld: {

        // vendor page
        app: function(id) {
            blackberry.invoke.invoke({
                    target: 'sys.appworld',
                    action: 'bb.action.OPEN',
                    uri: 'appworld://content/' + id
                },

                // success
                function() {},

                // error
                function() {});
        }
    },

    // email
    email: function(to, subject, body) {
        var message = to + '?subject=' + subject + '&body=' + body;
        blackberry.invoke.invoke({
            target: 'sys.pim.uib.email.hybridcomposer',
            action: 'bb.action.OPEN, bb.action.SENDMAIL',
            type: 'message/rfc822',
            uri: 'mailto:' + message
        });
    },

    // blackberry maps
    maps: function(address) {
        blackberry.invoke.invoke({
            action: 'bb.action.NAVIGATETO',
            type: 'application/vnd.blackberry.string.address',
            data: address
        });
    },

    // nfc
    nfc: function(uri) {
        blackberry.invoke.invoke({
            target: "sys.NFCViewer",
            action: "bb.action.SHARE",
            uri: uri
        }, function() {}, function() {});
    },

    // twitter
    twitter: function(shareText) {
        blackberry.invoke.invoke({
            target: "Twitter",
            action: "bb.action.SHARE",
            type: "text/plain",
            data: shareText
        }, function() {}, function() {});
    },

    //facebook
    facebook: function(shareText) {
        blackberry.invoke.invoke({
            target: "Facebook",
            action: "bb.action.SHARE",
            type: "text/plain",
            data: shareText
        }, function() {}, function() {});
    },

    utils: {

        // filepicker
        filePicker: function(success, cancel, failure) {

            var details = {
                mode: blackberry.invoke.card.FILEPICKER_MODE_PICKER,
                viewMode: blackberry.invoke.card.FILEPICKER_VIEWER_MODE_GRID,
                sortBy: blackberry.invoke.card.FILEPICKER_SORT_BY_NAME,
                sortOrder: blackberry.invoke.card.FILEPICKER_SORT_ORDER_DESCENDING
            };

            blackberry.invoke.card.invokeFilePicker(details, function(path) {
                    success(path);
                },

                // cancel callback
                function(reason) {
                    cancel(reason);
                },

                // error callback
                function(error) {
                    if (error) {
                        failure(error);
                    }
                }
            );
        },

        // camera
        camera: function(success, cancel, failure) {
            var mode = blackberry.invoke.card.CAMERA_MODE_PHOTO;
            blackberry.invoke.card.invokeCamera(mode, function(path) {
                    success(path);
                },

                function(reason) {
                    cancel(reason);
                },

                function(error) {
                    if (error) {
                        failure(error);
                    }
                }
            );
        }
    }
};



/* ==============================================================================================
 *	TOASTS - https://developer.blackberry.com/html5/apis/blackberry.ui.toast.html
 * =========================================================================================== */

var Toast = {
    regular: function(text, timeout) {
        try {
            timeout = timeout || false;
            var options = {
                timeout: timeout
            };
            blackberry.ui.toast.show(text, options);
        } catch (e) {
            console.log('toast: ' + text);
        }
    },

    withButton: function(text, btnText, btnCallback, timeout) {
        try {
            timeout = timeout || false;
            var options = {
                timeout: timeout,
                buttonText: btnText,
                buttonCallback: eval(btnCallback)
            };
            blackberry.ui.toast.show(text, options, timeout);
        } catch (e) {
            console.log('toast: ' + text);
        }
    }
};



/* ===========================================================================================
 *	SPINNERS - https://github.com/blackberry/bbUI.js/wiki/Activity-Indicator
 * ======================================================================================== */
// spinner divs in spinners.html

var Spinner = {
    'lastOn': false,
    off: function() {
        if (Spinner.lastOn) {
            var el = document.getElementById('spinner-' + Spinner.lastOn);
            el.style.display = 'none';
        }
    },

    on: function(size) {
        Spinner['lastOn'] = size;
        var el = document.getElementById('spinner-' + size);
        el.style.display = 'block';
    }
};