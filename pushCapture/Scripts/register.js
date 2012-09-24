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
 * @fileOverview This file has functions related to the registration needed before pushes can be received.
 * @version 1.0
 * @name register.js
 */

/**
 * Initializes the register screen's fields.
 * 
 * @param {Element}
 *            element the root element of the screen
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.initRegister = function(element) {        
    if (sample.pushcapture.usesdkaspi) {
		 // The Push Service SDK is being used
		 // Display the username and password fields
	    element.getElementById("reguserid").value = sample.pushcapture.userid;
	    element.getElementById("regpwd").value = sample.pushcapture.passwd;

	    if (sample.pushcapture.userid != null) {
	        element.getElementById("reguserid").focus();
	    }
	 } else {	 
		 // The Push Service SDK is not being used
		 element.getElementById("reguseridtd").innerHTML = "No username required";
		 element.getElementById("regpwdtd").innerHTML = "No password required";
	 }
};

/**
 * Validates and, if successful, attempts to create the push channel and subscribe to the Push Initiator.
 * 
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.register = function() {
    document.getElementById("errordiv").style.display = "none";
	
    var wasValidationSuccessful = sample.pushcapture.validateRegisterFields();

    if (wasValidationSuccessful) {
   	    if (sample.pushcapture.usesdkaspi) {
            document.getElementById("reguserid").disabled = true;
            document.getElementById("regpwd").disabled = true;
   	    }
   	    
	    var opInProgressDiv = document.createElement("div");
	    opInProgressDiv.id = "op-in-progress";
	    opInProgressDiv.className = "full-size-dark";
	    document.body.appendChild(opInProgressDiv);
   	    
   	    document.getElementById("activityindicator").style.display = "block";
        document.getElementById("progressinfo").style.display = "block";
        document.getElementById("progressinfo").innerHTML = "Creating push channel...";

        if (sample.pushcapture.pushService) {
        	sample.pushcapture.pushService.createChannel(sample.pushcapture.createChannelCallback);
        } else {
        	// This error should not occur since a PushService object should have been created
        	// before trying to do a create channel
        	// We'll display an error if, by chance, this does happen
			document.body.removeChild(document.getElementById("op-in-progress"));
        	document.getElementById("activityindicator").style.display = "none";
        	document.getElementById("progressinfo").style.display = "none";            
       	    if (sample.pushcapture.usesdkaspi) {
                document.getElementById("reguserid").disabled = false;
                document.getElementById("regpwd").disabled = false;
       	    }
            document.getElementById("errordiv").style.display = "block";
            
            document.getElementById("errormsg").innerHTML = "Error: Could not create push " +
                "channel as no PushService object was found.";
        }
    }
};

/**
 * Validates the entered registration information.
 * 
 * @returns {Boolean} true if validation passes; false, otherwise
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.validateRegisterFields = function() {
	if (!sample.pushcapture.usesdkaspi) {
		return true;
	}

    var username = document.getElementById("reguserid").value.trim();

    if (username == "") {
        document.getElementById("errordiv").style.display = "block";
        document.getElementById("errormsg").innerHTML = "Error: No username was specified.";
        return false;
    }

    var password = document.getElementById("regpwd").value.trim();

    if (password == "") {
        document.getElementById("errordiv").style.display = "block";
        document.getElementById("errormsg").innerHTML = "Error: No password was specified.";
        return false;
    }

    return true;
};

/**
 * Actions to perform after attempting to create a push channel.
 * 
 * @param {Number}
 *            result the result of the create channel operation	  
 * @param {String}
 *            token the token from a successful create channel operation
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.createChannelCallback = function(result, token) {
	if (result == blackberry.push.PushService.SUCCESS) {
		 if (sample.pushcapture.usesdkaspi) {
			 // The Push Service SDK is being used, so attempt to subscribe
			 // to the Push Initiator
		     sample.pushcapture.subscribeToPushInitiator(token);
		 } else {
			// The Push Service SDK is not being used, jump to displaying a success
	        sample.pushcapture.successfulRegistration();
		 }
	} else {
		document.body.removeChild(document.getElementById("op-in-progress"));
		document.getElementById("activityindicator").style.display = "none";
		document.getElementById("progressinfo").style.display = "none";        
   	    if (sample.pushcapture.usesdkaspi) {
            document.getElementById("reguserid").disabled = false;
            document.getElementById("regpwd").disabled = false;
   	    }
        document.getElementById("errordiv").style.display = "block";
        
        if (result == blackberry.push.PushService.INTERNAL_ERROR) {
            document.getElementById("errormsg").innerHTML = "Error: An internal error occurred during " +
			    "the create channel. Try registering again.";
    	} else if (result == blackberry.push.PushService.CREATE_SESSION_NOT_DONE) {
            document.getElementById("errormsg").innerHTML = "Error: No call to blackberry.push.PushService.create " +
                "was done before creating the channel. It usually means a programming error.";
    	} else if (result == blackberry.push.PushService.MISSING_PORT_FROM_PPG) {
            document.getElementById("errormsg").innerHTML = "Error: A port could not be obtained from the " +
			    "PPG during the create channel. Try registering again.";
    	} else if (result == blackberry.push.PushService.INVALID_DEVICE_PIN) {
    		// This error code only applies to a consumer application using the public/BIS PPG
            document.getElementById("errormsg").innerHTML = "Error: The PPG obtained the device's PIN during " +
			    "the create channel and considered it invalid. Try registering again.";
    	} else if (result == blackberry.push.PushService.INVALID_PROVIDER_APPLICATION_ID) {
    		// This error code only applies to a consumer application using the public/BIS PPG
    		document.getElementById("errormsg").innerHTML = "Error: The application ID was considered " +
			    "invalid or missing during the create channel. Check your configuration settings.";
    	} else if (result == blackberry.push.PushService.INVALID_PPG_SUBSCRIBER_STATE) {
    		// This error code only applies to a consumer application using the public/BIS PPG
    		document.getElementById("errormsg").innerHTML = "Error: The subscriber on the PPG end reached an " +
    		    "invalid state. Report this issue to the RIM support team.";
    	} else if (result == blackberry.push.PushService.EXPIRED_AUTHENTICATION_TOKEN_PROVIDED_TO_PPG) {
    		// This error code only applies to a consumer application using the public/BIS PPG
    		document.getElementById("errormsg").innerHTML = "Error: An expired authentication token was" +
    		    "passed to the PPG internally during the create channel. Try registering again.";
    	} else if (result == blackberry.push.PushService.INVALID_AUTHENTICATION_TOKEN_PROVIDED_TO_PPG) {
    		// This error code only applies to a consumer application using the public/BIS PPG
    		document.getElementById("errormsg").innerHTML = "Error: An invalid authentication token was passed " +
    		    "to the PPG internally during the create channel. Report this issue to the RIM support team.";
    	} else if (result == blackberry.push.PushService.PPG_SUBSCRIBER_LIMIT_REACHED) {
    		// This error code only applies to a consumer application using the public/BIS PPG
    		document.getElementById("errormsg").innerHTML = "Error: Too many devices have already peformed a " +
    		    "create channel for this application ID. Contact RIM to increase the subscription limit for this app.";
    	} else if (result == blackberry.push.PushService.INVALID_OS_VERSION_OR_DEVICE_MODEL_NUMBER) {
    		// This error code only applies to a consumer application using the public/BIS PPG
    		document.getElementById("errormsg").innerHTML = "Error: This device was found to have an invalid OS " +
    		    " version or device model number during the create channel. Consider updating the OS on the device.";
    	} else if (result == blackberry.push.PushService.MISSING_PPG_URL) {
    		// This error code only applies to a consumer application using the public/BIS PPG
    		document.getElementById("errormsg").innerHTML = "Error: The PPG URL was considered " +
			    "invalid or missing during the create channel. Check your configuration settings.";
    	} else if (result == blackberry.push.PushService.PUSH_TRANSPORT_UNAVAILABLE) {
    		// This error code only applies to a consumer application using the public/BIS PPG
    		document.getElementById("errormsg").innerHTML = "Error: Create channel failed as the push transport " +
				"is unavailable. Verify your mobile network and/or Wi-Fi are turned on. If they are on, you will " +
				"be notified when the push transport is available again.";
    	} else if (result == blackberry.push.PushService.MISSING_SUBSCRIPTION_RETURN_CODE_FROM_PPG) {
    		// This error code only applies to a consumer application using the public/BIS PPG
    		document.getElementById("errormsg").innerHTML = "Error: There was an internal issue obtaining " +
			    "the subscription return code from the PPG during the create channel. Try registering again.";
    	} else if (result == blackberry.push.PushService.INVALID_PPG_URL_OR_PPG_UNAVAILABLE) {
    		// This error code only applies to a consumer application using the public/BIS PPG
    		document.getElementById("errormsg").innerHTML = "Error: The PPG URL might have been invalid. Check " +
    		    "your configuration settings. If it looks correct, the PPG might be temporarily unavailable. Try " +
    		    "registering again.";
    	} else {
    		document.getElementById("errormsg").innerHTML = "Error: Received error code (" + result + ") from " +
			    "the create channel.";
    	}
	} 
};

/**
 * Attempts to subscribe to the Push Initiator.
 * 
 * @param {String}
 *            token the token from a successful create channel operation
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.subscribeToPushInitiator = function(token) {
    document.getElementById("progressinfo").innerHTML = "Subscribing to Push Initiator...";
        
    var type;
    if (sample.pushcapture.usingpublicppg) {
        type = "public";
    } else {
    	type = "enterprise";
    }
    
    var username = document.getElementById("reguserid").value.trim();
    var password = document.getElementById("regpwd").value.trim();
    var address = token;
    var osversion = blackberry.system.softwareVersion;
    var model = blackberry.system.hardwareId;

    var params = "appid=" + encodeURIComponent(sample.pushcapture.appid) + "&";
    params += "address=" + address + "&";
    params += "osversion=" + osversion + "&";
    params += "model=" + model + "&";
    params += "username=" + encodeURIComponent(username) + "&";
    params += "password=" + encodeURIComponent(password) + "&";
    params += "type=" + type;

    var subscribeUrl = sample.pushcapture.piurl + "/subscribe?" + params;
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("GET", subscribeUrl);

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4) {
            var status = xmlHttp.status;
            var returnCode = xmlHttp.responseText;

            sample.pushcapture.pushInitiatorSubscribeHandler(status, returnCode);
        }
    };

    xmlHttp.send();
};

/**
 * Handles the HTTP response back from the Push Initiator.
 * 
 * @param {Number}
 *            status the status of the HTTP request
 * @param {String}
 *            returnCode the response text from the HTTP request
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.pushInitiatorSubscribeHandler = function(status, returnCode) {
		
    if (status == 200) {
        if (returnCode == "rc=200") {
            // Successful subscribe to the Push Initiator, now store the registration
        	sample.pushcapture.storeRegistration();
        } else {
            // Hide the progress info because there was an error
			document.body.removeChild(document.getElementById("op-in-progress"));
        	document.getElementById("activityindicator").style.display = "none";
        	document.getElementById("progressinfo").style.display = "none";
            
            document.getElementById("reguserid").disabled = false;
            document.getElementById("regpwd").disabled = false;

            document.getElementById("errordiv").style.display = "block";

            if (returnCode == "rc=10001") {
                // Note: This error should not occur unless, for some weird reason, the address specified in the request
                // parameter is incorrect
                document.getElementById("errormsg").innerHTML = "Error: The token from the create channel was null, empty, " +
				    "or longer than 40 characters in length.";
            } else if (returnCode == "rc=10011") {
                // Note: This error should not occur unless, for some weird reason, the OS version or device model
                // specified in the request parameter is incorrect
                document.getElementById("errormsg").innerHTML = "Error: Subscribe to the Push Initiator failed since "
                    + "the OS version or device model of the BlackBerry was invalid.";
            } else if (returnCode == "rc=10002") {
                document.getElementById("errormsg").innerHTML = "Error: Subscribe to the Push Initiator failed since "
                    + "the application ID specified in the configuration settings could not be found, or it was found "
                    + "to be inactive or expired.";
            } else if (returnCode == "rc=10020") {
                document.getElementById("errormsg").innerHTML = "Error: Subscribe failed since the subscriber ID "
                    + "generated by the Push Initiator (based on the username and password specified) was null or empty, "
                    + "longer than 42 characters in length, or matched the 'push_all' keyword.";
            } else if (returnCode == "rc=10025") {
                document.getElementById("errormsg").innerHTML = "Error: Subscribe failed since the Push Initiator "
                    + "application had a type of Enterprise Push and had the bypass subscription flag set to true.";
            } else if (returnCode == "rc=10026") {
                document.getElementById("errormsg").innerHTML = "Error: Subscribe to the Push Initiator failed since "
                    + "the username or password specified was incorrect.";
            } else if (returnCode == "rc=10027") {
                // Note: You obviously would not want to put an error description like this, but we will to assist with
                // debugging
                document.getElementById("errormsg").innerHTML = "Error: Subscribe to the Push Initiator failed because "
                    + "a CPSubscriptionFailureException was thrown by the onSubscribeSuccess method of the implementation "
                    + "being used of the ContentProviderSubscriptionService interface.";
            } else if (returnCode == "rc=10028") {
                // Note: This error should not occur unless, for some weird reason, the type specified in the request
                // parameter is incorrect
                document.getElementById("errormsg").innerHTML = "Error: Subscribe to the Push Initiator failed since the "
                    + "type was null, empty, or not one of 'public' or 'enterprise'.";
            } else if (returnCode == "rc=-9999") {
                document.getElementById("errormsg").innerHTML = "Error: Subscribe to the Push Initiator failed with a "
                    + "general error (i.e. rc=-9999).";
            } else {
                document.getElementById("errormsg").innerHTML = "Error: Subscribe to the Push Initiator failed with the "
                    + "following error code: " + returnCode + ".";
            }
        }
    } else {
        // Hide the progress info because there was an error
		document.body.removeChild(document.getElementById("op-in-progress"));
    	document.getElementById("activityindicator").style.display = "none";
    	document.getElementById("progressinfo").style.display = "none";
        
        // Enabled the fields again because there was an error
        document.getElementById("reguserid").disabled = false;
        document.getElementById("regpwd").disabled = false;

        document.getElementById("errordiv").style.display = "block";
        document.getElementById("errormsg").innerHTML = "Error: Subscribe to the Push Initiator failed with HTTP response code: "
            + status + ". (" + returnCode + ")";
    }
};

/**
 * Stores the registration information in the database.
 * 
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.storeRegistration = function() {
	// Store the username and password
	sample.pushcapture.userid = document.getElementById("reguserid").value.trim();
	sample.pushcapture.passwd = document.getElementById("regpwd").value.trim();

    sample.pushcapture.db.transaction(function(tx) {
        tx.executeSql("DROP TABLE registration;", [], 
            function(tx, results) {
                sample.pushcapture.successDropRegistration();
            }, function(tx, e) {
                sample.pushcapture.successDropRegistration();
            });
    });
};

/**
 * Called after successfully dropping the registration table from storage. We are about to store new values.
 * 
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.successDropRegistration = function() {
    sample.pushcapture.db.transaction(function(tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS registration (userid TEXT, passwd TEXT);", [], 
            function(tx, results) {
                sample.pushcapture.successRegistrationCreation();
            });
    });
};

/**
 * Called after successfully creating the registration table in storage. Now, store the new registration values.
 * 
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.successRegistrationCreation = function() {
    sample.pushcapture.db.transaction(function(tx) {
        tx.executeSql("INSERT INTO registration (userid, passwd) VALUES (?, ?);", 
    		[ sample.pushcapture.userid, sample.pushcapture.passwd ], 
    		function(tx, results) {
                sample.pushcapture.successfulRegistration();
            });
    });
};

/**
 * Notifies the user of a successful registration.
 * 
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.successfulRegistration = function() {
    // Indicate that the registration was successful
	document.body.removeChild(document.getElementById("op-in-progress"));
	document.getElementById("activityindicator").style.display = "none";
    document.getElementById("progressinfo").innerHTML = "Successfully registered.";
    
    // Show the fields again because the registration is done    
	if (sample.pushcapture.usesdkaspi) {
        document.getElementById("reguserid").disabled = false;
        document.getElementById("regpwd").disabled = false;
	}
};