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
 * @fileOverview This file has functions related to the configuration settings needed for push.
 * @version 1.0
 * @name configuration.js
 */

/**
 * When the selected PPG type is "Public/BIS", displays the "Application ID" and "PPG URL" text boxes.
 * 
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.publicPPG = function() {
	// Show both the PPG URL and App ID fields
    document.getElementById("ppgurl").style.display = "";
    document.getElementById("appid").style.display = "";
};

/**
 * When the selected PPG type is "Enterprise/BES", hides the "PPG URL" text box
 * (and possibly the "Application ID" text box if not using the Push Service SDK
 * for your Push Initiator).
 * 
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.enterprisePPG = function() {	
	// Hide the PPG URL field
    document.getElementById("ppgurl").style.display = "none";
    
    // Show the App ID field only if the Push Service SDK will be used
    if (document.getElementById("usesdkaspi").checked) {
    	document.getElementById("appid").style.display = "";
    } else {
    	document.getElementById("appid").style.display = "none";
    }
};

/**
 * Indicates we are using the Push Service SDK in our Push Initiator (server-side
 * push application) implementation.
 * If using the SDK, we will need to subscribe to the Push Initiator.
 * Therefore, we will display the "Push Initiator URL" text box and the 
 * "Application ID" text box.
 * 
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.useSDKAsPushInitiator = function() {
	if (document.getElementById("usesdkaspi").checked) {
		document.getElementById("piurl").style.display = "";
		document.getElementById("appid").style.display = "";
	} else {
		document.getElementById("piurl").style.display = "none";
		
		if (document.getElementById("publicradio").checked) {
			document.getElementById("appid").style.display = "";
		} else {
			document.getElementById("appid").style.display = "none";
		}
	}
};

/**
 * Initializes the configuration screen's fields.
 * 
 * @param {Element}
 *            element the root element of the screen
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.initConfiguration = function(element) {
    try {
        sample.pushcapture.db.readTransaction(function(tx) {
            tx.executeSql("SELECT appid, piurl, ppgurl, usesdkaspi, usingpublicppg, launchapp FROM configuration;", 
                [], 
            	function(tx, results) {
            	    sample.pushcapture.displayConfig(element, tx, results);
            	    
            	    if (element.getElementById("appid") != null && element.getElementById("appid").style.display == "") {
            	        element.getElementById("appid").focus();
            	    } else if (element.getElementById("ppgurl").style.display == "") {
            	    	element.getElementById("ppgurl").focus();
            	    } else if (element.getElementById("piurl").style.display == "") {
            	    	element.getElementById("piurl").focus();
            	    }
                }
            );
        });
    } catch (e) {
        alert(sample.pushcapture.databaseError);
    }
};

/**
 * Sets the values of the configuration fields based on the loaded configuration.
 * 
 * @param {Element}
 *            element the root element of the screen
 * @param {SQLTransaction}
 *            tx a database transaction
 * @param {SQLResultSet}
 *            results the results of the query executed in the initConfiguration() function
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.displayConfig = function(element, tx, results) {
	element.getElementById("appidtd").innerHTML = results.rows.item(0).appid;
	sample.pushcapture.appid = results.rows.item(0).appid;
	element.getElementById("piurl").value = results.rows.item(0).piurl;
	element.getElementById("ppgurl").value = results.rows.item(0).ppgurl;
    
    if (results.rows.item(0).usingpublicppg == 1) {
    	sample.pushcapture.usingpublicppg = true;
        element.getElementById("ppgtyperow").innerHTML = "<td class='user-input-padding'>Public/BIS</td>";
        element.getElementById("ppgurl").style.display = "";
    } else {
    	sample.pushcapture.usingpublicppg = false;
    	element.getElementById("ppgtyperow").innerHTML = "<td class='user-input-padding'>Enterprise/BES</td>";
        element.getElementById("ppgurl").style.display = "none";
    }

    if (results.rows.item(0).launchapp == 1) {
    	element.getElementById("launchapp").setChecked(true);
    } else {
    	element.getElementById("launchapp").setChecked(false);
    }
    
    if (results.rows.item(0).usesdkaspi == 1) {
    	element.getElementById("usesdkaspi").setChecked(true);
    	element.getElementById("piurl").style.display = "";
    } else {
    	element.getElementById("usesdkaspi").setChecked(false);
    	element.getElementById("piurl").style.display = "none";
    }
};

/**
 * Validates and, if successful, stores the entered configuration settings.
 * 
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.configure = function() {	
    var wasValidationSuccessful = sample.pushcapture.validateConfigFields();

    if (wasValidationSuccessful) {
        sample.pushcapture.storeConfiguration();
    }
};

/**
 * Validates the entered configuration settings.
 * 
 * @returns {Boolean} true if validation passes; false, otherwise
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.validateConfigFields = function() {
	if (document.getElementById("publicradio") != null) {
		if (document.getElementById("publicradio").checked) {
			sample.pushcapture.usingpublicppg = true;
		} else {
			sample.pushcapture.usingpublicppg = false;	
		}
	} 
	if (document.getElementById("appid") != null) {
	    sample.pushcapture.appid = document.getElementById("appid").value.trim();
	}
	sample.pushcapture.usesdkaspi = document.getElementById("usesdkaspi").checked;
	sample.pushcapture.launchapp = document.getElementById("launchapp").checked;
    sample.pushcapture.piurl = document.getElementById("piurl").value.trim();
    sample.pushcapture.ppgurl = document.getElementById("ppgurl").value.trim();
	
    if ((sample.pushcapture.usingpublicppg || sample.pushcapture.usesdkaspi) && sample.pushcapture.appid == "") {
        alert("Error: Please specify an application ID.");
        return false;
    }

    if (sample.pushcapture.usingpublicppg && sample.pushcapture.ppgurl == "") {
        alert("Error: Please specify a PPG URL.");
        return false;
    }
    if (sample.pushcapture.usingpublicppg && !sample.pushcapture.ppgurl.startsWith("http://")) {
        alert("Error: The PPG URL must start with http://.");
        return false;
    }
    if (sample.pushcapture.usingpublicppg && sample.pushcapture.ppgurl.endsWith("/")) {
        alert("Error: The PPG URL should not end with a /. One will be automatically added to the end.");
        return false;
    }
    
    if (sample.pushcapture.usesdkaspi && sample.pushcapture.piurl == "") {
        alert("Error: Please specify a Push Initiator URL.");
        return false;
    }
    if (sample.pushcapture.usesdkaspi && !sample.pushcapture.piurl.startsWith("http://") && !sample.pushcapture.piurl.startsWith("https://")) {
        alert("Error: The Push Initiator URL must start with http:// or https://.");
        return false;
    }
    if (sample.pushcapture.usesdkaspi && sample.pushcapture.piurl.endsWith("/")) {
        alert("Error: The Push Initiator URL should not end with a /. One will be automatically added to the end.");
        return false;
    }

    return true;
};

/**
 * Stores the configuration settings in the database.
 * 
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.storeConfiguration = function() {
    var opInProgressDiv = document.createElement("div");
    opInProgressDiv.id = "op-in-progress";
    opInProgressDiv.className = "full-size";
    document.body.appendChild(opInProgressDiv);
    
	document.getElementById("activityindicator").style.display = "block";
    document.getElementById("progressinfo").style.display = "block";
    document.getElementById("progressinfo").innerHTML = "Saving...";

    sample.pushcapture.db.transaction(function(tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS configuration (appid TEXT, piurl TEXT, "
            + "ppgurl TEXT, usesdkaspi INTEGER, usingpublicppg INTEGER, launchapp INTEGER);", [], 
            function(tx, results) {
                sample.pushcapture.successConfigurationCreation();
            });
    });
};

/**
 * Called after successfully creating (if it did not already exist) the configuration table in the database.
 * 
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.successConfigurationCreation = function() {	
    sample.pushcapture.db.readTransaction(function(tx) {
        tx.executeSql("SELECT COUNT(*) AS count FROM configuration;", [],
            sample.pushcapture.insertOrUpdateConfiguration);
    });
};

/**
 * Depending on whether there is already an existing configuration in the database, performs an insert or update.
 * 
 * @param {SQLTransaction}
 *            tx a database transaction
 * @param {SQLResultSet}
 *            results the results of the query executed in the successConfigurationCreation() function
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.insertOrUpdateConfiguration = function(tx, results) {	
    if (results.rows.item(0).count == 0) {
        sample.pushcapture.insertConfiguration();
    } else if (results.rows.item(0).count == 1) {
        sample.pushcapture.updateConfiguration();
    } else {
        alert("Error: There should be only one entry stored for configuration.");
    }
};

/**
 * Inserts a new row into the configuration table in the database and then
 * attempts to create a <code>blackberry.push.PushService</code> object.
 * 
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.insertConfiguration = function() {   	
    sample.pushcapture.db.transaction(function(tx) {
        tx.executeSql("INSERT INTO configuration (appid, piurl, ppgurl, usesdkaspi, usingpublicppg, launchapp) VALUES (?, ?, ?, ?, ?, ?);", 
            [ sample.pushcapture.appid, sample.pushcapture.piurl, sample.pushcapture.ppgurl, 
            sample.pushcapture.usesdkaspi ? 1 : 0, sample.pushcapture.usingpublicppg ? 1 : 0, sample.pushcapture.launchapp ? 1 : 0 ], 
            sample.pushcapture.createPushService);
    });
};

/**
 * Updates the existing configuration row in the database and then 
 * attempts to create a <code>blackberry.push.PushService</code> object.
 * 
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.updateConfiguration = function() {	
    sample.pushcapture.db.transaction(function(tx) {
        tx.executeSql("UPDATE configuration SET appid = ?, piurl = ?, ppgurl = ?, usesdkaspi = ?, usingpublicppg = ?, launchapp = ?", 
            [ sample.pushcapture.appid, sample.pushcapture.piurl, sample.pushcapture.ppgurl, 
            sample.pushcapture.usesdkaspi ? 1 : 0, sample.pushcapture.usingpublicppg ? 1 : 0, sample.pushcapture.launchapp ? 1 : 0 ], 
            sample.pushcapture.createPushService);
    });
};

/**
 * Notifies the user of a successful saving of configuration and allows them to jump to registration.
 * 
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.successfulConfiguration = function() {
    // Indicate that the saving of the configuration was successful
	document.body.removeChild(document.getElementById("op-in-progress"));
	document.getElementById("activityindicator").style.display = "none";
    document.getElementById("progressinfo").innerHTML = "<p>Successfully saved. Please register now.</p>";
    
    // Once the configuration has been successfully saved once, 
    // we will not allow the PPG type or the application ID to be changed
    // This is because WebWorks does not allow you to call the static 
    // blackberry.push.PushService.create function repeatedly with different application IDs
    // In your app, you should hardcode the app ID value somewhere since you will only ever need one
    if (sample.pushcapture.usingpublicppg) {
        document.getElementById("ppgtyperow").innerHTML = "<td class='user-input-padding'>Public/BIS</td>";
    } else {
    	document.getElementById("ppgtyperow").innerHTML = "<td class='user-input-padding'>Enterprise/BES</td>";
    }
    
    document.getElementById("appidtd").innerHTML = sample.pushcapture.appid;    
};