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
 * This function is called when a SIM card change has occurred. Clears up storage, 
 * unsubscribes from the Push Initiator, and advises the potentially new user to re-register.
 * 
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.onSimChange = function() {
    sample.pushcapture.db.transaction(function(tx) {
        tx.executeSql("DROP TABLE push;", [], 
        	function(tx, results) {
                sample.pushcapture.successSimChangeDropPushTable();
            }, function(tx, e) {
                sample.pushcapture.successSimChangeDropPushTable();
            });
    });
};

/**
 * Called after successfully dropping the push table from storage on a SIM change.
 * 
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.successSimChangeDropPushTable = function() {
    sample.pushcapture.db.transaction(function(tx) {
        tx.executeSql("DROP TABLE messageidhistory;", [], 
            function(tx, results) {
                sample.pushcapture.successSimChangeDropMessageHistory();
            }, function(tx, e) {
                sample.pushcapture.successSimChangeDropMessageHistory();
            });
    });
};

/**
 * Called after successfully dropping the message Id history table from storage on a SIM change.
 * 
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.successSimChangeDropMessageHistory = function() {
    sample.pushcapture.db.readTransaction(function(tx) {
        tx.executeSql("SELECT appid, piurl, usesdkaspi FROM configuration;", [],
                sample.pushcapture.setConfigurationAndDropTable, sample.pushcapture.successSimChange);
    });
};

/**
 * Retrieves the appid, whether or not the SDK is being used as the Push Initiator, 
 * and the Push Initiator URL from the configuration table.  These will be needed
 * for the unsubscribe from the Push Initiator (if the SDK is being used). 
 * Then, attempts to drop the configuration table.
 * 
 * @param {SQLTransaction}
 *            tx a database transaction
 * @param {SQLResultSet}
 *            results the results of the query executed in the successSimChangeDropMessageHistory() function
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.setConfigurationAndDropTable = function(tx, results) {
    sample.pushcapture.appid = results.rows.item(0).appid;
    sample.pushcapture.piurl = results.rows.item(0).piurl;
    if (results.rows.item(0).usesdkaspi == 1) {
    	sample.pushcapture.usesdkaspi = true;
    } else {
    	sample.pushcapture.usesdkaspi = false;
    }  

    sample.pushcapture.db.transaction(function(tx) {
        tx.executeSql("DROP TABLE configuration;", [], 
            function(tx, results) {
	            // We need to put a delay before attempting to unsubscribe.
	            // It takes awhile after a SIM swap for the device to initialize
	            // with the new service books.
	            // We can only attempt an unsubscribe once the new service books
	            // are present.
	            setTimeout(sample.pushcapture.successSimChangeDropConfiguration, 90000);
	        }, function(tx, e) {
	            setTimeout(sample.pushcapture.successSimChangeDropConfiguration, 90000);
	        });
    });
};

/**
 * Called after successfully dropping the configuration table from storage on a SIM change.
 * 
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.successSimChangeDropConfiguration = function() {
	if (sample.pushcapture.usesdkaspi) {
        // The Push Service SDK is being used
	    sample.pushcapture.db.readTransaction(function(tx) {
	        tx.executeSql("SELECT userid, passwd FROM registration;", [],
	                sample.pushcapture.simChangeUnsubscribeFromPushInitiator, 
	                function(tx, e) {
	                    sample.pushcapture.successSimChange();
	                });
	    });
	} else {
        // The Push Service SDK is not being used
		sample.pushcapture.successSimChange();
	}
};

/**
 * Attempts to unsubscribe from the Push Initiator.
 * 
 * @param {SQLTransaction}
 *            tx a database transaction
 * @param {SQLResultSet}
 *            results the results of the query executed in the successSimChangeDropConfiguration() function
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
                setTimeout(sample.pushcapture.successSimChangeDropConfiguration, 5000);
            }

            // Clear the username and password since the user was unsubscribed
            sample.pushcapture.db.transaction(function(tx) {
                tx.executeSql("DROP TABLE registration;", [], 
                    function(tx, results) {
                        sample.pushcapture.successSimChange();
                    }, function(tx, e) {
                        sample.pushcapture.successSimChange();
                    });
            });
        }
    };

    xmlHttp.send();
};

/**
 * Called after successfully clearing the necessary database tables and unsubscribing.
 * 
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.successSimChange = function() {
    alert("A SIM card change was detected. Please configure and then re-register.");

    // Show the configuration tab
	// Check if we are already on the user input screen
    if (document.getElementById("user-input-screen") != null) {
    	// Highlight the config tab in the action bar
    	var tab = document.getElementById("user-input-config-action");
    	bb.actionBar.highlightAction(tab);
    	
    	sample.pushcapture.showConfigTab();
    } else {
        sample.pushcapture.showUserInputScreen("configuration");	
    }
};