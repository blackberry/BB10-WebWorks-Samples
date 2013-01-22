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

/**
 * @fileOverview This file has functions related to the handling of the callback when a SIM card change has occurred on the device.
 * @version 1.0
 * @name simchangehandler.js
 */

/**
 * This function is called when a SIM card change has occurred. Clears up storage, unsubscribes from the Push Initiator (if
 * needed), and advises the potentially new user to register.
 * 
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.onSimChange = function() {
    // If we are on the home screen, we need to clear the screen
    if (document.getElementById("push-list") != null) {
        document.getElementById("progressinfo").style.display = "none";
        document.getElementById("no-results").style.display = "none";

        var pushTable = document.getElementById("push-table");
        if (pushTable.hasChildNodes()) {
            while (pushTable.childNodes.length >= 1) {
                pushTable.removeChild(pushTable.firstChild);
            }
        }

        if (pushTable.hasAttribute("selectedPush")) {
            pushTable.removeAttribute("selectedPush");
        }

        // Indicate that processing is currently being done
        document.getElementById("progressinfo").style.display = "block";
        document.getElementById("progressinfo").innerHTML = "Processing...";
    }

    // No push should be selected anymore
    sample.pushcapture.selectedPushSeqnum = null;

    // Remove the push list from local storage since
    // the push list is going to be deleted
    localStorage.removeItem(sample.pushcapture.localStorageKey);

    // Remove all the notifications from the BlackBerry Hub for this app
    sample.pushcapture.db.transaction(function(tx) {
        tx.executeSql("SELECT seqnum FROM push WHERE unread = ?;", [ "T" ], function(tx, results) {
            for ( var i = 0; i < results.rows.length; i++) {
                Notification.remove(results.rows.item(i).seqnum + sample.pushcapture.notificationSuffix);
            }

            // Now, drop the push table to delete all the pushes
            sample.pushcapture.simChangeDropPushTable();
        }, function(tx, e) {
            // If the push table is not there, no need to
            // remove any notifications or pushes
            sample.pushcapture.simChangeSuccessDropPushTable();
        });
    });
};

/**
 * Drops the push table from storage on a SIM change.
 * 
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.simChangeDropPushTable = function() {
    sample.pushcapture.db.transaction(function(tx) {
        tx.executeSql("DROP TABLE push;", [], function(tx, results) {
            sample.pushcapture.simChangeSuccessDropPushTable();
        }, function(tx, e) {
            sample.pushcapture.simChangeSuccessDropPushTable();
        });
    });
};

/**
 * Called after successfully dropping the push table from storage on a SIM change.
 * 
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.simChangeSuccessDropPushTable = function() {
    sample.pushcapture.db.transaction(function(tx) {
        tx.executeSql("DROP TABLE messageidhistory;", [], function(tx, results) {
            sample.pushcapture.simChangeSuccessDropMessageHistory();
        }, function(tx, e) {
            sample.pushcapture.simChangeSuccessDropMessageHistory();
        });
    });
};

/**
 * Called after successfully dropping the message Id history table from storage on a SIM change.
 * 
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.simChangeSuccessDropMessageHistory = function() {
    sample.pushcapture.db.readTransaction(function(tx) {
        tx.executeSql("SELECT appid, piurl, usesdkaspi FROM configuration;", [], sample.pushcapture.simChangeLoadConfigAndUser,
                sample.pushcapture.simChangeSuccess);
    });
};

/**
 * Retrieves the appid, whether or not the Push Initiator is being subscribed to (using the Push Service SDK), and the Push
 * Initiator URL from the configuration table. If the Push Initiator is being subscribed to, we also load the currently registered
 * user so that we can unsubscribe them.
 * 
 * @param {SQLTransaction}
 *            tx a database transaction
 * @param {SQLResultSet}
 *            results the results of the query executed in the simChangeSuccessDropMessageHistory() function
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.simChangeLoadConfigAndUser = function(tx, results) {
    sample.pushcapture.appid = results.rows.item(0).appid;
    sample.pushcapture.piurl = results.rows.item(0).piurl;
    if (results.rows.item(0).usesdkaspi == 1) {
        sample.pushcapture.usesdkaspi = true;
    } else {
        sample.pushcapture.usesdkaspi = false;
    }

    if (sample.pushcapture.usesdkaspi) {
        // The Push Service SDK is being used for subscription
        sample.pushcapture.simChangeLoadUser();
    } else {
        // The Push Service SDK is not being used for subscription
        sample.pushcapture.simChangeSuccess();
    }
};

/**
 * Loads the currently registered user so that we can unsubscribe them from the Push Initiator (using the Push Service SDK).
 * 
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.simChangeLoadUser = function() {
    sample.pushcapture.db.readTransaction(function(tx) {
        tx.executeSql("SELECT userid, passwd FROM registration;", [], sample.pushcapture.simChangeUnsubscribeFromPushInitiator,
                function(tx, e) {
                    sample.pushcapture.simChangeSuccess();
                });
    });
};

/**
 * Attempts to unsubscribe from the Push Initiator (using the Push Service SDK).
 * 
 * @param {SQLTransaction}
 *            tx a database transaction
 * @param {SQLResultSet}
 *            results the results of the query executed in the simChangeLoadUser() function
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.simChangeUnsubscribeFromPushInitiator = function(tx, results) {
    sample.pushcapture.userid = results.rows.item(0).userid;
    sample.pushcapture.passwd = results.rows.item(0).passwd;

    var params = "appid=" + encodeURIComponent(sample.pushcapture.appid) + "&";
    params += "username=" + encodeURIComponent(sample.pushcapture.userid) + "&";
    params += "password=" + encodeURIComponent(sample.pushcapture.passwd);

    var unsubscribeUrl = sample.pushcapture.piurl + "/unsubscribe?" + params;

    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("GET", unsubscribeUrl);

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4) {
            sample.pushcapture.unregisterAttemptCount++;

            var status = xmlHttp.status;
            var returnCode = xmlHttp.responseText;

            if (sample.pushcapture.unregisterAttemptCount < 3 && (status != 200 || returnCode != "rc=200")) {
                // Give it a couple extra tries just in case it fails for some reason
                setTimeout(sample.pushcapture.simChangeLoadUser, 1000);
            }

            // Clear the username and password since the user was unsubscribed
            sample.pushcapture.db.transaction(function(tx) {
                tx.executeSql("DROP TABLE registration;", [], function(tx, results) {
                    sample.pushcapture.simChangeSuccess();
                }, function(tx, e) {
                    sample.pushcapture.simChangeSuccess();
                });
            });
        }
    };

    xmlHttp.send();
};

/**
 * Called after successfully clearing the necessary database tables and unsubscribing from the Push Initiator (if using the Push
 * Service SDK for subscription with the Push Initiator).
 * 
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.simChangeSuccess = function() {
    // If we are on the home screen, we need to now remove the processing message
    if (document.getElementById("push-list") != null) {
        document.getElementById("progressinfo").style.display = "none";

        sample.pushcapture.displayNoResults();
    }

    blackberry.ui.dialog.standardAskAsync(
            "The SIM card was changed and, as a result, the current user has been unregistered. Please register again.",
            blackberry.ui.dialog.D_OK, null, {
                title : "Push Capture"
            });

    // Show the register tab
    // Check if we are already on the user input screen
    if (document.getElementById("user-input-screen") != null) {
        // Highlight the register tab in the action bar
        var actionBar = document.getElementById("user-input-action-bar");
        var tab = document.getElementById("user-input-reg-action");
        actionBar.setSelectedTab(tab);

        sample.pushcapture.showRegisterTab();
    } else {
        sample.pushcapture.showUserInputScreen("register");
    }
};
