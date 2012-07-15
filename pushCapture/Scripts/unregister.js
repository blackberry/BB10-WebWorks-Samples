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
 * @fileOverview This file has functions related to the deregistration needed to stop pushes from being received.
 * @version 1.0
 * @name unregister.js
 */

/**
 * Initializes the unregister screen's fields.
 * 
 * @param {Element}
 *            element the root element of the screen
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.initUnregister = function(element) {
	 if (sample.pushcapture.usesdkaspi) {
		 // The Push Service SDK is being used
		 // Display the username and password fields
		 element.getElementById("unreguserid").value = sample.pushcapture.userid;
		 element.getElementById("unregpwd").value = sample.pushcapture.passwd;

		 if (sample.pushcapture.userid != null) {
		     element.getElementById("unreguserid").focus();
		 }
	 } else {
		 // The Push Service SDK is not being used
		 element.getElementById("unreguseridtd").innerHTML = "No username required";
		 element.getElementById("unregpwdtd").innerHTML = "No password required";
	 }
};

/**
 * Validates and, if successful, attempts to destroy the push channel and unsubscribe from the Push Initiator.
 * 
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.unregister = function() {
    document.getElementById("errordiv").style.display = "none";
	
    var wasValidationSuccessful = sample.pushcapture.validateUnregisterFields();

    if (wasValidationSuccessful) {
        // Hide the fields, so that it cannot be clicked again while attempting to unregister        
   	    if (sample.pushcapture.usesdkaspi) {
            document.getElementById("unreguserid").disabled = true;
            document.getElementById("unregpwd").disabled = true;
   	    }
   	 
	    var opInProgressDiv = document.createElement("div");
	    opInProgressDiv.id = "op-in-progress";
	    opInProgressDiv.className = "full-size-dark";
	    document.body.appendChild(opInProgressDiv);
	    
   	    document.getElementById("activityindicator").style.display = "block";
        document.getElementById("progressinfo").style.display = "block";
        document.getElementById("progressinfo").innerHTML = "Destroying push channel...";
        
        if (sample.pushcapture.pushService) {
        	sample.pushcapture.pushService.destroyChannel(sample.pushcapture.destroyChannelCallback);
        } else {
        	// This error should not occur since a PushService object should have been created
        	// before trying to do a destroy channel
        	// We'll display an error if, by chance, this does happen
			document.body.removeChild(document.getElementById("op-in-progress"));
        	document.getElementById("activityindicator").style.display = "none";
        	document.getElementById("progressinfo").style.display = "none";            
       	    if (sample.pushcapture.usesdkaspi) {
                document.getElementById("unreguserid").disabled = false;
                document.getElementById("unregpwd").disabled = false;
       	    }
            document.getElementById("errordiv").style.display = "block";
            
            document.getElementById("errormsg").innerHTML = "Error: Could not destroy push " +
    		"channel as no PushService object was found.";
        }
    }
};

/**
 * Validates the entered unregister information.
 * 
 * @returns {Boolean} true if validation passes; false, otherwise
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.validateUnregisterFields = function() {
	if (!sample.pushcapture.usesdkaspi) {
		return true;
	}

    var username = document.getElementById("unreguserid").value.trim();

    if (username == "") {
        document.getElementById("errordiv").style.display = "block";
        document.getElementById("errormsg").innerHTML = "Error: No username was specified.";
        return false;
    }

    var password = document.getElementById("unregpwd").value.trim();

    if (password == "") {
        document.getElementById("errordiv").style.display = "block";
        document.getElementById("errormsg").innerHTML = "Error: No password was specified.";
        return false;
    }

    return true;
};

/**
 * Actions to perform after attempting to destroy a push channel.
 * 
 * @param {Number}
 *            result the result of the destroy channel operation	  
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.destroyChannelCallback = function(result) {
	if (result == blackberry.push.PushService.SUCCESS || 
			result == blackberry.push.PushService.CHANNEL_ALREADY_DESTROYED || 
			result == blackberry.push.PushService.CHANNEL_ALREADY_DESTROYED_BY_PROVIDER ||
			result == blackberry.push.PushService.CHANNEL_SUSPENDED_BY_PROVIDER ||
			result == blackberry.push.PushService.PPG_SUBSCRIBER_NOT_FOUND ||
			result == blackberry.push.PushService.CREATE_CHANNEL_NOT_DONE) {
	    if (sample.pushcapture.usesdkaspi) {
            // The Push Service SDK is being used, so attempt to unsubscribe
	    	// from the Push Initiator
			sample.pushcapture.unsubscribeFromPushInitiator();
		 } else {
			// The Push Service SDK is not being used, jump to displaying a success
			 sample.pushcapture.successfulUnregister();
		 }
	} else {
		document.body.removeChild(document.getElementById("op-in-progress"));
		document.getElementById("activityindicator").style.display = "none";
		document.getElementById("progressinfo").style.display = "none";        
   	    if (sample.pushcapture.usesdkaspi) {
            document.getElementById("unreguserid").disabled = false;
            document.getElementById("unregpwd").disabled = false;
   	    }
        document.getElementById("errordiv").style.display = "block";
        
        if (result == blackberry.push.PushService.INTERNAL_ERROR) {
            document.getElementById("errormsg").innerHTML = "Error: An internal error occurred during " +
			"the destroy channel. Try unregistering again.";
    	} else if (result == blackberry.push.PushService.CREATE_SESSION_NOT_DONE) {
            document.getElementById("errormsg").innerHTML = "Error: No call to blackberry.push.PushService.create " +
            "was done before destroying the channel. It usually means a programming error.";
    	} else if (result == blackberry.push.PushService.INVALID_DEVICE_PIN) {
    		// This error code only applies to a consumer application using the public/BIS PPG
            document.getElementById("errormsg").innerHTML = "Error: The PPG obtained the device's PIN during " +
			"the destroy channel and considered it invalid. Try unregistering again.";
    	} else if (result == blackberry.push.PushService.INVALID_PROVIDER_APPLICATION_ID) {
    		// This error code only applies to a consumer application using the public/BIS PPG
    		document.getElementById("errormsg").innerHTML = "Error: The application ID was considered " +
			"invalid or missing during the destroy channel. Check your configuration settings.";
    	} else if (result == blackberry.push.PushService.INVALID_PPG_SUBSCRIBER_STATE) {
    		// This error code only applies to a consumer application using the public/BIS PPG
    		document.getElementById("errormsg").innerHTML = "Error: The subscriber on the PPG end reached an " +
    		"invalid state. Report this issue to the RIM support team.";
    	} else if (result == blackberry.push.PushService.EXPIRED_AUTHENTICATION_TOKEN_PROVIDED_TO_PPG) {
    		// This error code only applies to a consumer application using the public/BIS PPG
    		document.getElementById("errormsg").innerHTML = "Error: An expired authentication token was" +
    		"passed to the PPG internally during the destroy channel. Try unregistering again.";
    	} else if (result == blackberry.push.PushService.INVALID_AUTHENTICATION_TOKEN_PROVIDED_TO_PPG) {
    		// This error code only applies to a consumer application using the public/BIS PPG
    		document.getElementById("errormsg").innerHTML = "Error: An invalid authentication token was passed " +
    		"to the PPG internally during the destroy channel. Report this issue to the RIM support team.";
    	} else if (result == blackberry.push.PushService.NETWORK_FAILURE) {
    		// This error code only applies to a consumer application using the public/BIS PPG
    		document.getElementById("errormsg").innerHTML = "Error: A network failure occurred " +
			"during the destroy channel. Try unregistering again.";
    	} else if (result == blackberry.push.PushService.PPG_CURRENTLY_NOT_AVAILABLE) {
    		// This error code only applies to a consumer application using the public/BIS PPG
    		document.getElementById("errormsg").innerHTML = "Error: The PPG was temporarily not available during " +
			"the destroy channel. Try unregistering again.";
    	} else {
    		document.getElementById("errormsg").innerHTML = "Error: Received error code (" + result + ") from " +
			"the destroy channel.";
    	}
	}
};

/**
 * Attempts to unsubscribe from the Push Initiator.
 * 
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.unsubscribeFromPushInitiator = function() {
    document.getElementById("progressinfo").innerHTML = "Unsubscribing from Push Initiator...";

    var username = document.getElementById("unreguserid").value.trim();
    var password = document.getElementById("unregpwd").value.trim();

    var params = "appid=" + encodeURIComponent(sample.pushcapture.appid) + "&";
    params += "username=" + encodeURIComponent(username) + "&";
    params += "password=" + encodeURIComponent(password);

    var unsubscribeUrl = sample.pushcapture.piurl + "/unsubscribe?" + params;

    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("GET", unsubscribeUrl);

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4) {
            var status = xmlHttp.status;
            var returnCode = xmlHttp.responseText;

            sample.pushcapture.pushInitiatorUnsubscribeHandler(status, returnCode);
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
sample.pushcapture.constructor.prototype.pushInitiatorUnsubscribeHandler = function(status, returnCode) {
    if (status == 200) {
        if (returnCode == "rc=200") {
            // Successful unsubscribe from the Push Initiator, now clear the registration
        	sample.pushcapture.clearRegistration();
        } else {
            // Hide the progress info because there was an error
			document.body.removeChild(document.getElementById("op-in-progress"));
        	document.getElementById("activityindicator").style.display = "none";
        	document.getElementById("progressinfo").style.display = "none";
            
            // Show the fields again because there was an error            
            document.getElementById("unreguserid").disabled = false;
            document.getElementById("unregpwd").disabled = false;

            document.getElementById("errordiv").style.display = "block";

            if (returnCode == "rc=10002") {
                document.getElementById("errormsg").innerHTML = "Error: Unsubscribe from the Push Initiator failed since "
                        + "the application ID specified in the configuration settings could not be found, or it was found to "
                        + "be inactive or expired.";
            } else if (returnCode == "rc=10007") {
                document.getElementById("errormsg").innerHTML = "Error: Unsubscribe from the Push Initiator failed since "
                        + "the subscriber (matching the username and password specified) could not be found.";
            } else if (returnCode == "rc=10020") {
                document.getElementById("errormsg").innerHTML = "Error: Unsubscribe failed since the subscriber ID generated "
                        + "by the Push Initiator (based on the username and password specified) was null or empty, longer than 42 "
                        + "characters in length, or matched the 'push_all' keyword.";
            } else if (returnCode == "rc=10025") {
                document.getElementById("errormsg").innerHTML = "Error: Unsubscribe failed since the Push Initiator "
                        + "application had a type of Enterprise Push and had the bypass subscription flag set to true.";
            } else if (returnCode == "rc=10026") {
                document.getElementById("errormsg").innerHTML = "Error: Unsubscribe from the Push Initiator failed since "
                        + "the username or password specified was incorrect.";
            } else if (returnCode == "rc=10027") {
                // Note: You obviously would not want to put an error description like this, but we will to assist with
                // debugging
                document.getElementById("errormsg").innerHTML = "Error: Unsubscribe from the Push Initiator failed "
                        + "because a CPSubscriptionFailureException was thrown by the onUnsubscribeSuccess method of the "
                        + "implementation being used of the ContentProviderSubscriptionService interface.";
            } else if (returnCode == "rc=-9999") {
                document.getElementById("errormsg").innerHTML = "Error: Unsubscribe from the Push Initiator failed "
                        + "with a general error (i.e. rc=-9999).";
            } else {
                document.getElementById("errormsg").innerHTML = "Error: Unsubscribe from the Push Initiator failed "
                        + "with the following error code: " + returnCode + ".";
            }
        }
    } else {
        // Hide the progress info because there was an error
		document.body.removeChild(document.getElementById("op-in-progress"));
    	document.getElementById("activityindicator").style.display = "none";
    	document.getElementById("progressinfo").style.display = "none";
        
        // Show the fields again because there was an error        
        document.getElementById("unreguserid").disabled = false;
        document.getElementById("unregpwd").disabled = false;

        document.getElementById("errordiv").style.display = "block";
        document.getElementById("errormsg").innerHTML = "Error: Unsubscribe from the Push Initiator failed with "
                + "HTTP response code: " + status + ". (" + returnCode + ")";
    }
};

/**
 * After a successful unregister, removes the registration information from storage.
 * 
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.clearRegistration = function() {
    sample.pushcapture.userid = null;
    sample.pushcapture.passwd = null;

    sample.pushcapture.db.transaction(function(tx) {
        tx.executeSql("DROP TABLE registration;", [], 
            function(tx, results) {
                sample.pushcapture.successfulUnregister();
            }, function(tx, e) {
                sample.pushcapture.successfulUnregister();
            });
    });
};

/**
 * Notifies the user of a successful unregister.
 * 
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.successfulUnregister = function() {
    // Indicate that the unregister was successful
	document.body.removeChild(document.getElementById("op-in-progress"));
	document.getElementById("activityindicator").style.display = "none";
    document.getElementById("progressinfo").innerHTML = "Successfully unregistered.";
    
    // Show the fields again because the unregister is done    
	if (sample.pushcapture.usesdkaspi) {
        document.getElementById("unreguserid").disabled = false;
        document.getElementById("unregpwd").disabled = false;
	}
};