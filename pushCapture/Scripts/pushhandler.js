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
 * @fileOverview This file has functions related to the handling of an incoming push.
 * @version 1.0
 * @name pushhandler.js
 */

/**
 * This function is called when new push content comes in. It checks for duplicate pushes, 
 * stores the push in the database, and updates the push list.
 * 
 * @param {blackberry.push.PushPayload}
 *            pushpayload the newly received push content
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.pushNotificationHandler = function(pushpayload) {	
    var contentType = pushpayload.headers["Content-Type"];
    if(!contentType) {
    	contentType = pushpayload.headers["content-type"];
    	if(!contentType) {
    		contentType = "text/plain";
    	}
    }
    
    sample.pushcapture.checkForDuplicateMessage(pushpayload.id, pushpayload.data, contentType);

	// If an acknowledgement of the push is required (that is, the push was sent as a confirmed push 
	// - which is equivalent terminology to the push being sent with application level reliability),
	// then you must either accept the push or reject the push
    if (pushpayload.isAcknowledgeRequired) {
		// In our sample, we always accept the push, but situations might arise where an application
		// might want to reject the push (for example, after looking at the headers that came with the push
		// or the data of the push, we might decide that the push received did not match what we expected
		// and so we might want to reject it)
    	pushpayload.acknowledge(true);
    }
};

/**
 * Checks to see if the newly received push is a duplicate of an existing push being displayed.
 * 
 * @param {String}
 *            messageId the value of the push ID
 * @param {Blob}
 *            content the content of the push
 * @param {String}
 *            contentType the content type (i.e. the value of the "Content-Type" header)
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.checkForDuplicateMessage = function(messageId, content, contentType) {
    // If there was no value for the header, then skip this check
    if (messageId == null) {
        sample.pushcapture.processPush(content, contentType);
    } else {
        sample.pushcapture.db.transaction(function(tx) {
            tx.executeSql("CREATE TABLE IF NOT EXISTS messageidhistory"
                + "(rownum INTEGER PRIMARY KEY AUTOINCREMENT, messageid TEXT);", [], 
                function(tx, results) {
                    sample.pushcapture.successMessageIdHistoryCreation(messageId, content, contentType);
                });
        });
    }
};

/**
 * Called after successfully creating the message id history table in the database (if it does not exist).
 * 
 * @param {String}
 *            messageId the value of the push ID
 * @param {Blob}
 *            content the content of the push
 * @param {String}
 *            contentType the content type (i.e. the value of the "Content-Type" header)
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.successMessageIdHistoryCreation = function(messageId, content, contentType) {
    sample.pushcapture.db.readTransaction(function(tx) {
        tx.executeSql("SELECT messageid FROM messageidhistory WHERE messageid = ?;", [ messageId ], 
            function(tx, results) {
	            if (results.rows.length != 0) {
	                // A duplicate was found
	                sample.pushcapture.duplicateFoundAction();
	            } else {
	                // No duplicate was found, insert a new entry into the history
	                sample.pushcapture.db.transaction(function(tx) {
	                    tx.executeSql("INSERT INTO messageidhistory (rownum, messageid) VALUES(?, ?);",
                            [ null, messageId ], 
                            function(tx, results) {
                                sample.pushcapture.successMessageIdInsert(content, contentType);
                            });
	                });
	            }
            });
    });
};

/**
 * Called after successfully inserting a new entry into the message id history table in the database.
 * 
 * @param {Blob}
 *            content the content of the push
 * @param {String}
 *            contentType the content type (i.e. the value of the "Content-Type" header)
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.successMessageIdInsert = function(content, contentType) {
    sample.pushcapture.db.readTransaction(function(tx) {
        tx.executeSql("SELECT COUNT(*) AS count FROM messageidhistory;", [], 
            function(tx, results) {
	            if (results.rows.item(0).count > 10) {
	                sample.pushcapture.db.transaction(function(tx) {
	                    // Remove the oldest message Id in the history
	                    tx.executeSql(
                            "DELETE FROM messageidhistory WHERE rownum = (SELECT min(rownum) FROM messageidhistory);",
                            [], function(tx, results) {
                                sample.pushcapture.processPush(content, contentType);
                            });
	                });
	            } else {
	                sample.pushcapture.processPush(content, contentType);
	            }
            });
    });
};

/**
 * Action to be taken when a duplicate push is detected. Currently, this function does nothing. 
 * We just discard the duplicate.
 * 
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.duplicateFoundAction = function() {
    // Currently, does nothing
};

/**
 * Performs all the processing required of a newly received push 
 * (now that it has been determined that that push is not a duplicate).
 * 
 * @param {Blob}
 *            content the content of the push
 * @param {String}
 *            contentType the content type (i.e. the value of the "Content-Type" header)
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.processPush = function(content, contentType) {
    // Remove the push list from local storage since the push list
    // is going to be updated with this new push we are processing
	localStorage.removeItem(sample.pushcapture.localStorageKey);

    var currentTime = new Date();

    // Get the push date (based on the current time)
    var pushdate = sample.pushcapture.getPushDate(currentTime);

    // Get the push time (based on the current time)
    var pushtime = sample.pushcapture.getPushTime(currentTime);

    // Add the new pushed content to storage
    sample.pushcapture.storePush(content, contentType, pushdate, pushtime);
};

/**
 * Returns the date of the push based on the current time that is passed in.
 * 
 * @param {Date}
 *            currentDate the current date and time
 * @returns {String} the push date
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.getPushDate = function(currentDate) {
    var dayOfWeek = sample.pushcapture.getDayOfWeekText(currentDate.getDay());
    var month = sample.pushcapture.getMonthText(currentDate.getMonth());
    var dayOfMonth = currentDate.getDate();
    var year = currentDate.getFullYear();

    return dayOfWeek + ", " + month + " " + dayOfMonth + ", " + year;
};

/**
 * Returns the time of the push based on the current time that is passed in.
 * 
 * @param {Date}
 *            currentDate the current date and time
 * @returns {String} the push time
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.getPushTime = function(currentDate) {
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var timeOfDay = "a";

    // We want all minutes less than 10 to add a "0" in front since,
    // for example, 5:8 for a time is incorrect (it should be 5:08)
    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    if (hours >= 12) {
        timeOfDay = "p";
    }

    if (hours >= 13) {
        hours -= 12;
    }

    if (hours == 0) {
        hours += 12;
    }

    return hours + ":" + minutes + timeOfDay;
};

/**
 * Inserts the newly received push content into the database.
 * 
 * @param {Blob}
 *            content the content of the push
 * @param {String}
 *            contentType the content type (i.e. the value of the "Content-Type" header)
 * @param {String}
 *            pushdate the date of the push
 * @param {String}
 *            pushtime the time of the push
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.storePush = function(content, contentType, pushdate, pushtime) {	
    sample.pushcapture.db.transaction(function(tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS push (seqnum INTEGER PRIMARY KEY AUTOINCREMENT, "
            + "pushdate TEXT, type TEXT, pushtime TEXT, extension TEXT, content TEXT, unread TEXT);", [], 
            function(tx, results) {
                var type = sample.pushcapture.getPushedContentType(contentType);
                var extension = sample.pushcapture.getPushedContentFileExtension(contentType);
                
                if (type == "image") {                    	
                	sample.pushcapture.blobToBinaryBase64String(content,
                    	function(binaryBase64Str) {
                		    sample.pushcapture.insertPush(binaryBase64Str, type, extension, pushdate, pushtime);
                	    }
                	);
                } else {                    	
                	sample.pushcapture.blobToTextString(content, "UTF-8", 
                	    function(textStr) {                              			
                		    sample.pushcapture.insertPush(sample.pushcapture.utf8_to_b64(textStr), type, extension, pushdate, pushtime);
                	    }
                	);
                }                	
            });
    });
};

/**
 * Attempts to insert the push into the database.
 * 
 * @param {String}
 *            content the content of the push as a base64 encoded string
 * @param {String}
 *            type the content type
 * @param {String}
 * 			  extension the file extension of the push content
 * @param {String}
 *            pushdate the date of the push
 * @param {String}
 *            pushtime the time of the push
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.insertPush = function(content, type, extension, pushdate, pushtime) {	
    sample.pushcapture.db.transaction(function(tx) {
        tx.executeSql("INSERT INTO push (seqnum, pushdate, type, pushtime, extension, content, unread) "
            + "VALUES (?, ?, ?, ?, ?, ?, ?);", [ null, pushdate, type, pushtime, extension, content, "T" ],
            function(tx, results) {
                var seqnum = results.insertId;
                
                sample.pushcapture.addPushItem(content, type, extension, pushdate, pushtime, seqnum);
            });
    });	
};

/**
 * Adds a new push item (and possibly date heading) to the push list.
 * 
 * @param {String}
 *            content the content of the push as a base64 encoded string
 * @param {String}
 *            type the content type
 * @param {String}
 * 			  extension the file extension of the push content
 * @param {String}
 *            pushdate the date of the push
 * @param {String}
 *            pushtime the time of the push
 * @param {Number}
 *            seqnum the unique id identifying the push
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.addPushItem = function(content, type, extension, 
		pushdate, pushtime, seqnum) {    	
	// Check if we are on the push list screen
	// Otherwise, there is no need to add the push item to the list
	// It will instead be handled when loading the pushes for the push list screen
	if (document.getElementById("push-screen") != null) {
		// Create a push row
	    var pushRow = document.createElement("tr");
	    pushRow.id = seqnum.toString(10);
	    pushRow.className = "unread-push";	    
	
	    // First column
	    var firstColumn = document.createElement("td");
	    firstColumn.setAttribute("onclick", "sample.pushcapture.openPush('" + pushRow.id + "');");
	    firstColumn.className = "column1";
	    
	    var firstColumnImage = document.createElement("img");
	    firstColumnImage.src = sample.pushcapture.getIconForType(type);
	    
	    firstColumn.appendChild(firstColumnImage);
	
	    // Second column
	    var secondColumn = document.createElement("td");
	    secondColumn.setAttribute("onclick", "sample.pushcapture.openPush('" + pushRow.id + "');");
	    secondColumn.className = "column2";
	    
	    var secondColumnText = document.createTextNode(sample.pushcapture.getPushPreview(type, extension, content));
	    
	    secondColumn.appendChild(secondColumnText);
	
	    // Third column
	    var thirdColumn = document.createElement("td");
	    thirdColumn.setAttribute("onclick", "sample.pushcapture.openPush('" + pushRow.id + "');");
	    thirdColumn.className = "column3";

	    var thirdColumnText = document.createTextNode(pushtime);
	    
	    thirdColumn.appendChild(thirdColumnText);
	
	    // Fourth column
	    var fourthColumn = document.createElement("td");
	    fourthColumn.setAttribute("onclick", "sample.pushcapture.deletePush('" + pushRow.id + "');");
	    fourthColumn.className = "column4";
	    
	    var fourthColumnImage = document.createElement("img");
	    fourthColumnImage.id = "img" + pushRow.id;
	    fourthColumnImage.src = "Images/trash.png";
	    
	    fourthColumn.appendChild(fourthColumnImage);
	    
	    pushRow.appendChild(firstColumn);
	    pushRow.appendChild(secondColumn);
	    pushRow.appendChild(thirdColumn);
	    pushRow.appendChild(fourthColumn);
	    
	    // Create a date row
        var dateRow = document.createElement("tr");
        var dateColumn = document.createElement("td");
        dateColumn.colSpan = 4;
        dateColumn.className = "heading";
        
        var dateColumnText = document.createTextNode(pushdate);
        
        dateColumn.appendChild(dateColumnText);
        dateRow.appendChild(dateColumn);
	
	    if (document.getElementById("no-results") != null) {
	    	  // Remove the "no pushes" message
	    	document.getElementById("push-screen").removeChild(document.getElementById("no-results"));
	
	        document.getElementById("push-table").appendChild(dateRow);
	
	        document.getElementById("push-table").appendChild(pushRow);
	    } else if (document.getElementById("push-table").firstChild.firstChild.firstChild.nodeValue == pushdate) {
	        // Insert below the current date row (since the date matches)
	    	document.getElementById("push-table").insertBefore(pushRow, document.getElementById("push-table").firstChild.nextSibling);
	    } else {
	        // Insert a row for the date heading (since the date did not match)	and the push
	    	document.getElementById("push-table").insertBefore(pushRow, document.getElementById("push-table").firstChild);
	    	
	    	document.getElementById("push-table").insertBefore(dateRow, document.getElementById("push-table").firstChild);
	    }
	    
	    // Update the scroller since we've added new items to the screen
	    bb.scroller.refresh();
	}
};

/**
 * Based on the "Content-Type" header of the received push, returns the corresponding file extension of the content.
 * 
 * @param {String}
 *            contentType the content type (i.e. the value of the "Content-Type" header)
 * @returns {String} the pushed content's file extension
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.getPushedContentFileExtension = function(contentType) {
    if (contentType.startsWith("application/xml")) {
        return ".xml";
    } else if (contentType.startsWith("text/html")) {
        return ".html";
    } else if (contentType.startsWith("image/jpeg")) {
        return ".jpg";
    } else if (contentType.startsWith("image/gif")) {
        return ".gif";
    } else if (contentType.startsWith("image/png")) {
        return ".png";
    } else if (contentType.startsWith("text/plain")) {
        return ".txt";
    }
};

/**
 * Based on the "Content-Type" header of the received push, returns the corresponding type.
 * 
 * @param {String}
 *            contentType the content type (i.e. the value of the "Content-Type" header)
 * @returns {String} the pushed content's type (i.e. one of "image", "xml", or "text")
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.getPushedContentType = function(contentType) {
    if (contentType.startsWith("image")) {
        return "image";
    } else if (contentType.startsWith("text/html") || contentType.startsWith("application/xml")) {
        return "xml";
    } else {
        return "text";
    }
};