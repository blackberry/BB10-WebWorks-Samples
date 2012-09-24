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
 * @fileOverview This file has common functions to be shared amongst the other JavaScript files.
 * @version 1.0
 * @name common.js
 */

/**
 * @namespace
 * @description The namespace for the Push Capture application.
 */

window.sample = {};

sample.pushcapture = (function() {

    /**
     * Constructs a Push Capture object.
     * 
     * @constructor
     */
    function PushCapture() {
        /**
         * Returns a string with leading and trailing whitespace removed.
         * 
         * @returns {String} a string with leading and trailing whitespace removed
         * @memberOf String
         */
        String.prototype.trim = function() {
            return (this.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, ""));
        };

        /**
         * Returns true if a string starts with the specified prefix.
         * 
         * @param {String}
         *            str the prefix
         * @returns {Boolean} true if a string starts with the specified prefix
         * @memberOf String
         */
        String.prototype.startsWith = function(str) {
            return (this.match("^" + str) == str);
        };

        /**
         * Returns true if a string ends with the specified suffix.
         * 
         * @param {String}
         *            str the suffix
         * @returns {Boolean} true if a string ends with the specified suffix
         * @memberOf String
         */
        String.prototype.endsWith = function(str) {
            return (this.match(str + "$") == str);
        };

        /**
         * The database to store pushes, configuration, registration, etc. in.
         * 
         * @constant
         */
        this.db;
        try {
            this.db = openDatabase("pushcapture", "1.0", "Push capture storage", 5 * 1024 * 1024);
        } catch (err) {
            // Do nothing here since the db will be left uninitialized and the proper error will be
            // displayed when the user attempts to perform an operation that requires a db transaction
        }
        
        /**
         * The key to use to store the list of pushes in local storage to make it quicker to display when possible.
         * 
         * @constant
         */
        this.localStorageKey = "sample.pushcapture.pushlistkey";

        /**
         * The error message received when attempting to use the application and a database error
         * is encountered.
         * 
         * @constant
         */
        this.databaseError = "Error: Problem was encountered while attempting to access the database.";
        
        /**
         * The message to be displayed when no pushes exist in the database.
         * 
         * @constant
         */
        this.noPushesMessage = "There are currently no pushes.";
        
        /**
         * PushService object obtained from a success call to blackberry.push.PushService.create.
         */
        this.pushService = null;
        
        /**
         * Invoke target ID for receiving new push notifications.
         */
        this.invoketargetid = "sample.pushcapture.invoke.target";
        
        /**
         * Use SDK as Push Initiator configuration setting.
         * This indicates whether or not the Push Service SDK will be used to manage
         * subscriptions for the Push Initiator.
         */
        this.usesdkaspi = true;
        
        /**
         * Whether the public/BIS PPG is being used.  If set to false, an
         * enterprise/BES PPG is being used.
         */
        this.usingpublicppg = true;
        
        /**
         * Launch Application on a New Push configuration setting.
         * This indicates whether or not the application should be launched/started up
         * if it is closed and a new push comes in.
         */
        this.launchapp = false;
        
        /**
         * Application ID configuration setting.
         */
        this.appid = null;

        /**
         * Push Initiator URL configuration setting.
         */
        this.piurl = null;

        /**
         * PPG URL configuration setting.
         */
        this.ppgurl = null;

        /**
         * Username registration information.
         */
        this.userid = null;

        /**
         * Password registration information.
         */
        this.passwd = null;
        
        /**
         * The push that is currently selected.
         */
        this.selectedPushSeqnum = null;
        
        /**
         * The push content to be displayed.
         */     
        this.content = null;

        /**
         * Keep a count of the number of calls that were attempted to 
         * <code>sample.pushcapture.onInvoke</code> and no <code>PushService</code>   
         * instance was found.
         */
        this.onInvokeAttemptCount = 0;
        
        /**
         * Keep a count of the number of unregister attempts with the Push Initiator.
         */
        this.unregisterAttemptCount = 0;
    }

    /**
     * Converts a Blob to a text string with the given encoding.
     * 
     * @param {Blob}
     *            blob the blob to be converted
     * @param {String}
     *            encoding the encoding of the Blob
     * @param {function}
     *            callback the callback to be called with the string result         
     * @memberOf sample.pushcapture
     */
    PushCapture.prototype.blobToTextString = function(blob, encoding, callback) {    	
    	var reader = new FileReader();
    	
    	reader.onload = function(evt) {    		
        	// No errors, get the result and call the callback
        	callback(evt.target.result);
    	};
    	
    	reader.onerror = function(evt) {    		
        	console.log("Error converting Blob to string: " + evt.target.error);
    	};
    	
        reader.readAsText(blob, encoding);
    };
    
    /**
     * Converts a Blob to a binary base64 encoded string.
     * 
     * @param {Blob}
     *            blob the blob to be converted
     * @param {function}
     *            callback the callback to be called with the binary base64 encoded string         
     * @memberOf sample.pushcapture
     */
    PushCapture.prototype.blobToBinaryBase64String = function(blob, callback) {
    	var reader = new FileReader();
    	
    	reader.onload = function(evt) {
        	// No errors, base64 encode the result and call the callback
        	callback(sample.pushcapture.arrayBufferToBase64(evt.target.result));
    	};
    	
    	reader.onerror = function(evt) {
        	console.log("Error converting Blob to binary base64 string: " + evt.target.error);
    	};
        
        reader.readAsArrayBuffer(blob);
    };
    
    /**
     * Converts an ArrayBuffer to a base64 encoded string.
     * 
     * @param {ArrayBuffer}
     *            arrayBuffer the ArrayBuffer to be converted       
     * @memberOf sample.pushcapture
     */
    PushCapture.prototype.arrayBufferToBase64 = function(arrayBuffer) {
        var binary = "";
        var bytes = new Uint8Array(arrayBuffer);
        var len = bytes.byteLength;
        
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
            
        return window.btoa(binary);
    };       
    
    /**
     * Converts a Unicode/UTF8 string to Base64.
     * 
     * This function is a workaround because the atob and btoa browser functions that should convert 
     * between a binary string and a Base64 encoded ASCII string
     * blow up when faced with Unicode with a INVALID_CHARACTER_ERR: DOM Exception 5.
     * 
     * http://ecmanaut.blogspot.ca/2006/07/encoding-decoding-utf8-in-javascript.html
     * http://monsur.hossa.in/2012/07/20/utf-8-in-javascript.html
     *  
     * @param str the Unicode string to base64 encode
     * @returns the base64 encoded Unicode string
     */
    PushCapture.prototype.utf8_to_b64 = function ( str ) {
        return window.btoa(unescape(encodeURIComponent( str )));
    };

    /**
     * Converts a Base64 string to Unicode/UTF8 string.
     * 
     * This function is a workaround because the atob and btoa browser functions that should convert 
     * between a binary string and a Base64 encoded ASCII string
     * blow up when faced with Unicode with a INVALID_CHARACTER_ERR: DOM Exception 5.
     * 
     * http://ecmanaut.blogspot.ca/2006/07/encoding-decoding-utf8-in-javascript.html
     * http://monsur.hossa.in/2012/07/20/utf-8-in-javascript.html
     *  
     * @param str the base64 Unicode encoded string
     * @returns  the Unicode string
     */
    PushCapture.prototype.b64_to_utf8 =function( str ) {
        return decodeURIComponent(escape(window.atob( str )));
    };
    
    /**
     * Returns the English abbreviation for a month.
     * 
     * @param {Number}
     *            month a month of the year (from 0-11)
     * @returns {String} a month's English abbreviation
     * @memberOf sample.pushcapture
     */
    PushCapture.prototype.getMonthText = function(month) {
        if (month == 0) {
            return "Jan";
        } else if (month == 1) {
            return "Feb";
        } else if (month == 2) {
            return "Mar";
        } else if (month == 3) {
            return "Apr";
        } else if (month == 4) {
            return "May";
        } else if (month == 5) {
            return "Jun";
        } else if (month == 6) {
            return "Jul";
        } else if (month == 7) {
            return "Aug";
        } else if (month == 8) {
            return "Sep";
        } else if (month == 9) {
            return "Oct";
        } else if (month == 10) {
            return "Nov";
        } else {
            return "Dec";
        }
    };

    /**
     * Returns the English abbreviation for a day of the week.
     * 
     * @param {Number}
     *            day a day of the week (from 0-6)
     * @returns {String} a day of the week's English abbreviation
     * @memberOf sample.pushcapture
     */
    PushCapture.prototype.getDayOfWeekText = function(day) {
        if (day == 0) {
            return "Sun";
        } else if (day == 1) {
            return "Mon";
        } else if (day == 2) {
            return "Tue";
        } else if (day == 3) {
            return "Wed";
        } else if (day == 4) {
            return "Thu";
        } else if (day == 5) {
            return "Fri";
        } else if (day == 6) {
            return "Sat";
        }
    };

    /**
     * Returns the path to an icon based on the type passed in.
     * 
     * @param {String}
     *            type the content type
     * @returns {String} an image path
     * @memberOf sample.pushcapture
     */
    PushCapture.prototype.getIconForType = function(type) {
        if (type == "image") {
            return "Images/pictures.png";
        } else if (type == "xml") {
            return "Images/browser.png";
        } else {
            return "Images/memo.png";
        }
    };

    /**
     * Returns a preview of the content based on the type passed in.
     * 
     * @param {String}
     *            type the content type
     * @param {String}
     *            extension the file extension of the push content      
     * @param {String}
     *            content the content to be previewed (a base64 encoded string)
     * @returns {String} a preview of the content
     * @memberOf sample.pushcapture
     */
    PushCapture.prototype.getPushPreview = function(type, extension, content) {
        if (type == "image") {
            return "Image: " + extension;
        } else if (type == "xml") {
            if (extension == ".html") {
                return "HTML/XML: .html";
            } else {
                return "HTML/XML: .xml";
            }
        } else {
            // Base 64 decode the string
        	var textStr = sample.pushcapture.b64_to_utf8(content);
        	
            // We want to limit the previewed content to 25 characters (including the "..." part)
            var part = textStr.substring(0, 22);
            
            if (textStr != part) {
                part += "...";
            }

            return part;
        }
    };
    
    /**
     * Shows the user input screen.
     * 
     * @param {String}
     *            tabId the id of the tab to show
     * @memberOf sample.pushcapture
     */
    PushCapture.prototype.showUserInputScreen = function(tabId) {
    	bb.pushScreen('userinput.htm', tabId);
    };
   
    /**
     * Shows the config tab.
     * 
     * @memberOf sample.pushcapture
     */
    PushCapture.prototype.showConfigTab = function() {
    	// Only do something if we are not already on the config tab
    	if (document.getElementById("config-tab").style.display == "none") {    		
	    	// Updates the title bar
	    	document.getElementById("user-input-title").setCaption("Configuration");
	    	document.getElementById("user-input-title").setActionCaption("Save");
	    	document.getElementById("user-input-title").onactionclick = function() { sample.pushcapture.configure(); };
			
	    	// Shows the config tab, hides the others
	    	document.getElementById("errordiv").style.display = "none";
	    	document.getElementById("progressinfo").style.display = "none";
	        document.getElementById("register-tab").style.display = "none";
	        document.getElementById("unregister-tab").style.display = "none";
	        document.getElementById("config-tab").style.display = "block";
	        
	    	sample.pushcapture.initConfiguration(document);
    	} 
    };
    
    /**
     * Shows the register tab.
     * 
     * @memberOf sample.pushcapture
     */
    PushCapture.prototype.showRegisterTab = function() {
    	// Only do something if we are not already on the register tab
    	if (document.getElementById("register-tab").style.display == "none") {
	    	// Updates the title bar
	    	document.getElementById("user-input-title").setCaption("Register");
		    document.getElementById("user-input-title").setActionCaption("Submit");
	    	document.getElementById("user-input-title").onactionclick = function() { sample.pushcapture.register(); };
	    	
	    	// Shows the register tab, hides the others
	    	document.getElementById("errordiv").style.display = "none";
	    	document.getElementById("progressinfo").style.display = "none";
	        document.getElementById("config-tab").style.display = "none";
	        document.getElementById("unregister-tab").style.display = "none";
	        document.getElementById("register-tab").style.display = "block";
	       
	        sample.pushcapture.initRegister(document);
			
			sample.pushcapture.checkIfConfigExists();
    	}
    };

    /**
     * Shows the unregister tab.
     * 
     * @memberOf sample.pushcapture
     */
    PushCapture.prototype.showUnregisterTab = function() {
    	// Only do something if we are not already on the unregister tab
    	if (document.getElementById("unregister-tab").style.display == "none") {
	    	// Updates the title bar
	    	document.getElementById("user-input-title").setCaption("Unregister");
	    	document.getElementById("user-input-title").setActionCaption("Submit");
	    	document.getElementById("user-input-title").onactionclick = function() { sample.pushcapture.unregister(); };
			
	    	// Shows the unregister tab, hides the others
	    	document.getElementById("errordiv").style.display = "none";
	    	document.getElementById("progressinfo").style.display = "none";
	        document.getElementById("config-tab").style.display = "none";
	        document.getElementById("register-tab").style.display = "none";
	        document.getElementById("unregister-tab").style.display = "block";
	        
	        sample.pushcapture.initUnregister(document);
			
			sample.pushcapture.checkIfConfigExists();
    	}
    };
    
    /**
     * Checks if configuration settings are found in the database and displays an error if there are not any.
     * 
     * @memberOf sample.pushcapture
     */
    PushCapture.prototype.checkIfConfigExists = function() {        
        try {
            sample.pushcapture.db.readTransaction(function(tx) {
                tx.executeSql("SELECT appid, piurl, ppgurl, usesdkaspi, usingpublicppg, launchapp FROM configuration;", [], null,
                        sample.pushcapture.displayNoConfigError);
            });
        } catch (e) {
            alert(sample.pushcapture.databaseError);
        }
    };

    /**
     * Initializes the push service. 
     * <br/> 
     * NOTE: This must be called every time a new page loads up.
     * 
     * @memberOf sample.pushcapture
     */
    PushCapture.prototype.initPushService = function() {    	
		// Add an event listener to handle incoming push notifications
		// We will ignore non-push invoke events
    	blackberry.event.addEventListener("invoked", sample.pushcapture.onInvoke);
    	
        try {
            sample.pushcapture.db.readTransaction(function(tx) {
                tx.executeSql("SELECT appid, piurl, ppgurl, usesdkaspi, usingpublicppg, launchapp FROM configuration;", [],
                    sample.pushcapture.loadRegistration);
            });
        } catch (e) {
            alert(sample.pushcapture.databaseError);
        }
    };
    
    /**
     * Handles an incoming invoke request.  Note that non-push invokes are ignored.
     * Push invokes will have the <code>PushPayload</code> extracted and be passed off to 
     * <code>sample.pushcapture.pushNotificationHandler</code> for processing.
     * 
     * @param {JSON}
     *            invokeRequest an invoke request
     * @memberOf sample.pushcapture
     */
    PushCapture.prototype.onInvoke = function(invokeRequest) {    	
    	if (invokeRequest.action != null && invokeRequest.action == "bb.action.PUSH") {
    		if (sample.pushcapture.onInvokeAttemptCount < 10 && sample.pushcapture.pushService == null) {    			
    			// Wait a bit for the PushService instance to be created and then try again
    			setTimeout(function() { sample.pushcapture.onInvoke(invokeRequest); }, 750);
    		} else if (sample.pushcapture.pushService != null) {    			
            	var pushPayload = sample.pushcapture.pushService.extractPushPayload(invokeRequest);            	
            	sample.pushcapture.pushNotificationHandler(pushPayload);
    		} else {
    			console.log("Error: No PushService instance was available to extract the push.");
    		}
    	}
    };
    
    /**
     * Loads the stored registration information (i.e. user id and password) and then tries to
     * create a <code>blackberry.push.PushService</code> object with a call to <code>createPushService</code>.
     * 
     * @param {SQLTransaction}
     *            tx a database transaction
     * @param {SQLResultSet}
     *            results the results of the query executed in the initPushService() function
     * @memberOf sample.pushcapture
     */
    PushCapture.prototype.loadRegistration = function(tx, results) {
        sample.pushcapture.appid = results.rows.item(0).appid;
        sample.pushcapture.piurl = results.rows.item(0).piurl;
        sample.pushcapture.ppgurl = results.rows.item(0).ppgurl;
        if (results.rows.item(0).usingpublicppg == 1) {
        	sample.pushcapture.usingpublicppg = true;
        } else {
        	sample.pushcapture.usingpublicppg = false;
        }
        if (results.rows.item(0).launchapp == 1) {
        	sample.pushcapture.launchapp = true;
        } else {
        	sample.pushcapture.launchapp = false;
        }
        if (results.rows.item(0).usesdkaspi == 1) {
        	sample.pushcapture.usesdkaspi = true;
        } else {
        	sample.pushcapture.usesdkaspi = false;
        }        
        
        sample.pushcapture.db.readTransaction(function(tx) {
            tx.executeSql("SELECT userid, passwd FROM registration;", [],
                function(tx, results) {
                    sample.pushcapture.userid = results.rows.item(0).userid;
                    sample.pushcapture.passwd = results.rows.item(0).passwd;
                
                    sample.pushcapture.createPushService();
                }, function(tx, e) {
                    sample.pushcapture.createPushService();
                });
        });
    };

    /**
     * Attempts to create a <code>blackberry.push.PushService</code> object to
     * be used for performing push-related operations such as createChannel, etc.
	 *
     * @memberOf sample.pushcapture
     */
    PushCapture.prototype.createPushService = function() {    	
    	var ops;
    	if (sample.pushcapture.usingpublicppg) {
    		// Consumer application using public push
    		ops = { invokeTargetId : sample.pushcapture.invoketargetid, 
    				appId : sample.pushcapture.appid, 
    				ppgUrl : sample.pushcapture.ppgurl 
    			  };
    	} else {
    	    // Enterprise application using enterprise push
    		if (sample.pushcapture.usesdkaspi) {
    			// If we're using the Push Service SDK for our Push Initiator 
    			// implementation, we will have specified our own application ID to use
        		ops = { invokeTargetId : sample.pushcapture.invoketargetid, 
        				appId : sample.pushcapture.appid
        			  };
    		} else {
    			ops = { invokeTargetId : sample.pushcapture.invoketargetid };
    		}
    	}
    	
    	blackberry.push.PushService.create(ops, sample.pushcapture.successCreatePushService, 
    	    sample.pushcapture.failCreatePushService, sample.pushcapture.onSimChange,
    	    sample.pushcapture.onPushTransportReady);
    };
    
    /**
     * After successfully creating a <code>blackberry.push.PushService</code> object,
     * we store it to a global variable so that it can be used across pages.
     * A call will also be made to set the application to launch on a new push if the 
     * (configuration settings checkbox had been checked).  If the checkbox had been 
     * unchecked, we will tell the application not to launch on a new push.
     * 
     * @param {blackberry.push.PushService}
     *            service a <code>blackberry.push.PushService</code> object
     * @memberOf sample.pushcapture
     */
    PushCapture.prototype.successCreatePushService = function(service) {    	
    	// Save the service into a global variable so that it can be used later for operations
        // such as create channel, destroy channel, etc.
    	sample.pushcapture.pushService = service;
    	
    	// We'll use the PushService object right now in fact to indicate whether we want to
    	// launch the application on a new push or not
    	sample.pushcapture.pushService.launchApplicationOnPush(sample.pushcapture.launchapp, 
    	    sample.pushcapture.launchApplicationCallback);
    };
    
    /**
     * After failing to create a <code>blackberry.push.PushService</code> object,
     * respond to the possible errors.
     * 
     * @param {Number}
     *            result an error code
     * @memberOf sample.pushcapture
     */
    PushCapture.prototype.failCreatePushService = function(result) {
		if (document.getElementById("config-table") != null) {
			// On the configuration screen
			document.body.removeChild(document.getElementById("op-in-progress"));
			document.getElementById("activityindicator").style.display = "none";
			document.getElementById("progressinfo").style.display = "none";
		}
    	
    	if (result == blackberry.push.PushService.INTERNAL_ERROR) {
			alert("Error: An internal error occurred while calling " +
			"blackberry.push.PushService.create. Try restarting the application.");
    	} else if (result == blackberry.push.PushService.INVALID_PROVIDER_APPLICATION_ID) {
    		// This error only applies to consumer applications that use a public/BIS PPG
			alert("Error: Called blackberry.push.PushService.create with a missing " +
			"or invalid appId value. It usually means a programming error.");
    	} else if (result == blackberry.push.PushService.MISSING_INVOKE_TARGET_ID) {
			alert("Error: Called blackberry.push.PushService.create with a missing " +
			"invokeTargetId value. It usually means a programming error.");
    	} else if (result == blackberry.push.PushService.SESSION_ALREADY_EXISTS) {
			alert("Error: Called blackberry.push.PushService.create with an appId or " +
			"invokeTargetId value that matches another application. It usually means a " +
			"programming error.");    		
    	} else {
			alert("Error: Received error code (" + result + ") after " +
			"calling blackberry.push.PushService.create.");
    	}
    };
    
    /**
     * This is the callback after calling the <code>launchApplicationOnPush</code> function on a
     * <code>blackberry.push.PushService</code> object. The call may or may not have been successful.
     * Handle possible errors accordingly.
     * 
     * @param {Number}
     *            result either a success code or an error code
     * @memberOf sample.pushcapture
     */
    PushCapture.prototype.launchApplicationCallback = function(result) {    	
    	if (result == blackberry.push.PushService.SUCCESS) {
    		if (document.getElementById("config-table") != null) {
    			// On the configuration screen
    			sample.pushcapture.successfulConfiguration();
    		}
    	} else {    		
    		if (document.getElementById("config-table") != null) {
    			// On the configuration screen
    			document.body.removeChild(document.getElementById("op-in-progress"));
    			document.getElementById("activityindicator").style.display = "none";
    			document.getElementById("progressinfo").style.display = "none";
    		}
    		
	    	if (result == blackberry.push.PushService.INTERNAL_ERROR) {
				alert("Error: An internal error occurred while calling launchApplicationOnPush. " +
				"Try restarting the application.");
	    	} else if (result == blackberry.push.PushService.CREATE_SESSION_NOT_DONE) {
				alert("Error: Called launchApplicationOnPush without an " +
				"existing session. It usually means a programming error.");
	    	} else {
				alert("Error: Received error code (" + result + ") after " +
				"calling launchApplicationOnPush."); 		
	    	}
    	}
    };
    
    /**
     * Displays an error if no configuration settings are found in the database and 
     * shows the configuration tab.
     * 
     * @memberOf sample.pushcapture
     */
    PushCapture.prototype.displayNoConfigError = function() {
        alert("Error: No configuration settings were found. Please fill them in.");

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

    return new PushCapture();
}());
