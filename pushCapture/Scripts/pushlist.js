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
 * @fileOverview This file has functions needed by the push list screen.
 * @version 1.0
 * @name pushlist.js
 */

/**
 * Initializes the push list with pushes from the database.
 * 
 * @param {Element}
 *            element the root element of the screen
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.initPushList = function(element) {	
    sample.pushcapture.loadPushes(element);
};

/**
 * Initializes the content screen with the contents of the push.
 * 
 * @param {Element}
 *            element the root element of the screen
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.initContent = function(element) {	
    element.getElementById("content").innerHTML = sample.pushcapture.content;

    element.getElementById("content").focus();
};

/**
 * Opens the selected push.
 * 
 * @param {String}
 *            pushId the push to select, highlight, and open
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.openPush = function(pushId) {	
	sample.pushcapture.selectedPushSeqnum = pushId;
	sample.pushcapture.highlightSelectedPush(document);
	
    sample.pushcapture.db.readTransaction(function(tx) {
        tx.executeSql("SELECT type, extension, content, unread FROM push WHERE seqnum = ?;",
            [ sample.pushcapture.selectedPushSeqnum ], 
            function(tx, results) {
	            if (results.rows.length == 0) {
	                alert("Error: Content for the selected push could not be found.");
	            } else {
	                if (results.rows.item(0).type == "image") {
	        		    var imageTag = "<img src='data:image/png;base64," + results.rows.item(0).content + "' />";
	        		    
	        		    sample.pushcapture.updateAndOpenPush(imageTag, results.rows.item(0).unread == "T");
	                } else {
	                	// The content is either plain text, HTML, or XML
	                	var content = sample.pushcapture.b64_to_utf8(results.rows.item(0).content);
	                	
	                    if (results.rows.item(0).extension == ".txt" || results.rows.item(0).extension == ".xml") {
	                        // This is to handle the case where the text coming in is actually HTML/XML tags
	                        content = content.replace(/&/gi, "&amp;");
	                        content = content.replace(/\"/gi, "&quot;");
	                        content = content.replace(/</gi, "&lt;");
	                        content = content.replace(/>/gi, "&gt;");
	                    }
	                    
	                    sample.pushcapture.updateAndOpenPush(content, results.rows.item(0).unread == "T");
	                }
	            }
            },
            function(tx, e) {
                alert("Error: Content for the selected push could not be found.");
            }
        );
    });
};

/**
 * Updates the push (to mark it as read, if it has not been opened before) and opens the push.
 * 
 * @param {String}
 *            content the push content as a string
 * @param {Boolean}
 *            isUnread true if the push has not previously been opened; false otherwise
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.updateAndOpenPush = function(content, isUnread) {	
    // Check if the push is currently marked as unread
    if (isUnread) {
        // Remove the push list from local storage since we are  
    	// updating one of the pushes in the list
    	localStorage.removeItem(sample.pushcapture.localStorageKey);

        sample.pushcapture.updatePush(content);
    } else {
        // Show the push content
        sample.pushcapture.showPushContent(content);
    }	
};

/**
 * Shows the content of the push.
 * 
 * @param {String}
 *            content the push content
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.showPushContent = function(content) {	
    // Sets the content to be displayed
    sample.pushcapture.content = content;
    
	bb.pushScreen('content.htm', 'pushcontent');
};

/**
 * Updates the push to indicate that it has now been read.
 * 
 * @param {String}
 *            content the push content
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.updatePush = function(content) {		
    sample.pushcapture.db.transaction(function(tx) {
        tx.executeSql("UPDATE push SET unread = ? WHERE seqnum = ?;",
            [ "F", sample.pushcapture.selectedPushSeqnum ], 
            function(tx, results) {
	            // Show the push content
	            sample.pushcapture.showPushContent(content);
            });
    });
};

/**
 * Deletes the selected push.
 * 
 * @param {String}
 *            pushId the push to select, highlight, and delete
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.deletePush = function(pushId) {
	sample.pushcapture.selectedPushSeqnum = pushId;
	sample.pushcapture.highlightSelectedPush(document);
	
	// Highlight the trash can
	document.getElementById("img" + sample.pushcapture.selectedPushSeqnum).src = "Images/trashhighlight.png";
	
	blackberry.ui.dialog.standardAskAsync("Are you sure you want to delete the push?", 
		blackberry.ui.dialog.D_YES_NO, sample.pushcapture.deleteCallback, 
		{title : "Delete?"});
};

/**
 * Callback from the delete dialog.
 * 
 * @param {Number}
 *            selectedButtonIndex the selected button of the dialog
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.deleteCallback = function(selectedButtonIndex) {
	// Unhighlight the trash can
	document.getElementById("img" + sample.pushcapture.selectedPushSeqnum).src = "Images/trash.png";
	
	if (selectedButtonIndex == 0) {
		// "Yes" was selected
        // Remove the push list from local storage since we are  
    	// deleting one of the pushes in the list
    	localStorage.removeItem(sample.pushcapture.localStorageKey);
	
	    // Delete the push from storage
	    sample.pushcapture.db.transaction(function(tx) {
	        tx.executeSql("DELETE FROM push WHERE seqnum = ?;", 
        		[ sample.pushcapture.selectedPushSeqnum ],
                function(tx, results) {
	        	    // Remove the corresponding push
	        	    sample.pushcapture.removePushItem();
	        	    
	        	    // No push should be selected anymore
	        	    sample.pushcapture.selectedPushSeqnum = null;  
	        	    document.getElementById("push-table").removeAttribute("selectedPush");
                });
	    });		
	}
};
	
/**
 * Removes the selected push from the push list.
 * 
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.removePushItem = function() {
	var pushItemToDelete = document.getElementById(sample.pushcapture.selectedPushSeqnum);
	    
    // Check to see if the item above the selected push is a date heading
    if (pushItemToDelete.previousSibling.firstChild.className == "heading") {
        if (pushItemToDelete.nextSibling == null) {
            // No item was found below the selected push
            // Now, check if there is an item above the date heading for this push
            if (pushItemToDelete.previousSibling.previousSibling == null) {
                // We only had one date heading and one push item being displayed
                // Remove all items in the list and display that there are no results
                var pushTable = document.getElementById("push-table");
                if (pushTable.hasChildNodes()) {
                    while (pushTable.childNodes.length >= 1) {
                    	pushTable.removeChild(pushTable.firstChild);
                    }
                }

                sample.pushcapture.displayNoResults();
            } else {
                // An item was found above the date heading (but nothing below the selected push)
            	var dateHeading = pushItemToDelete.previousSibling;	
            	dateHeading.parentNode.removeChild(dateHeading);
            	
            	pushItemToDelete.parentNode.removeChild(pushItemToDelete);
            }
        } else if (pushItemToDelete.nextSibling.firstChild.className == "heading") {
            // A date heading was found below the selected push
            // That means that this is the only push for its given date
        	var dateHeading = pushItemToDelete.previousSibling;	
        	dateHeading.parentNode.removeChild(dateHeading);
        	
        	pushItemToDelete.parentNode.removeChild(pushItemToDelete);
        } else {
            // Just remove the selected push
        	pushItemToDelete.parentNode.removeChild(pushItemToDelete);
        }
    } else {
        // The row above is not a date, but rather another push
        // Just remove the selected push
    	pushItemToDelete.parentNode.removeChild(pushItemToDelete);
    }
};

/**
 * Marks all pushes as open (i.e. there are no unread pushes).
 * 
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.markAllAsOpen = function() {
    sample.pushcapture.db.readTransaction(function(tx) {
        tx.executeSql("SELECT COUNT(*) AS count FROM push WHERE unread = ?;", [ "T" ],
            sample.pushcapture.updateAllUnopenedPushes, function(tx, e) {
                // No action needs to be performed on an error
            });
    });
};

/**
 * Marks all pushes in the push table as "read".
 * 
 * @param {SQLTransaction}
 *            tx a database transaction
 * @param {SQLResultSet}
 *            results the results of the query executed in the markAllAsOpen() function
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.updateAllUnopenedPushes = function(tx, results) {
    var count = results.rows.item(0).count;

    if (count > 0) {
        // Remove all items in the push list
        var pushTable = document.getElementById("push-table");
        if (pushTable.hasChildNodes()) {
            while (pushTable.childNodes.length >= 1) {
            	pushTable.removeChild(pushTable.firstChild);
            }
        }

        // Indicate that processing is currently being done
        var progressDiv = document.createElement("div");
        progressDiv.id = "progressinfo";
        progressDiv.innerHTML = "Processing...";
        document.getElementById("push-screen").appendChild(progressDiv);

        // Remove the push list from local storage since the  
    	// push list is going to be updated
    	localStorage.removeItem(sample.pushcapture.localStorageKey);

        // Update the unread flags for all pushes to "F"
        sample.pushcapture.db.transaction(function(tx) {
            tx.executeSql("UPDATE push SET unread = ?;", [ "F" ], 
                function(tx, results) {
                    // Update the push list
                    sample.pushcapture.loadPushes(null);
                });
        });
    } 
};

/**
 * Deletes all pushes.
 * 
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.deleteAll = function() {
	blackberry.ui.dialog.standardAskAsync("Are you sure you want to delete all pushes?", 
		blackberry.ui.dialog.D_YES_NO, sample.pushcapture.deleteAllCallback, 
		{title : "Delete All?"});
};

/**
 * Callback from the "delete all" dialog.
 * 
 * @param {Number}
 *            selectedButtonIndex the selected button of the dialog
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.deleteAllCallback = function(selectedButtonIndex) {
	if (selectedButtonIndex == 0) {
		// "Yes" was selected
        // Start by clearing the screen
        if (document.getElementById("progressinfo") != null) {
        	document.getElementById("push-screen").removeChild(document.getElementById("progressinfo"));
        }
        if (document.getElementById("no-results") != null) {
        	document.getElementById("push-screen").removeChild(document.getElementById("no-results"));
        }
        var pushTable = document.getElementById("push-table");
        if (pushTable.hasChildNodes()) {
            while (pushTable.childNodes.length >= 1) {
            	pushTable.removeChild(pushTable.firstChild);
            }
        }

        // Indicate that processing is currently being done
        var progressDiv = document.createElement("div");
        progressDiv.id = "progressinfo";
        progressDiv.innerHTML = "Processing...";
        document.getElementById("push-screen").appendChild(progressDiv);

        // Remove the push list from local storage since 
    	// the push list is going to be deleted
    	localStorage.removeItem(sample.pushcapture.localStorageKey);

        // Delete all pushes in storage
        sample.pushcapture.db.transaction(function(tx) {
            tx.executeSql("DROP TABLE push;", [], 
                function(tx, results) {
                    sample.pushcapture.successDeleteAllPushes();
                }, 
                function(tx, e) {
                    sample.pushcapture.successDeleteAllPushes();
                });
        });
	}
};

/**
 * Successfully deleted all the pushes. Now, perform all the other actions for the "delete all" operation.
 * 
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.successDeleteAllPushes = function() {
	document.getElementById("push-screen").removeChild(document.getElementById("progressinfo"));
	
    // No push should be selected anymore
    sample.pushcapture.selectedPushSeqnum = null;
    var pushTable = document.getElementById("push-table");
    if (pushTable.hasAttribute("selectedPush")) {
    	pushTable.removeAttribute("selectedPush");
    }
    
    sample.pushcapture.displayNoResults();
};

/**
 * Loads pushes from the database.
 * 
 * @param {Element}
 *            element the root element of the screen (might be null, in which case, use the
 *            document DOM element)
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.loadPushes = function(element) {	
	var rootElem = document;
	if (element != null) {
		rootElem = element;
	}
	
    // Clear the screen
    if (rootElem.getElementById("progressinfo") != null) {
    	rootElem.getElementById("push-screen").removeChild(rootElem.getElementById("progressinfo"));
    }
    if (rootElem.getElementById("no-results") != null) {
    	rootElem.getElementById("push-screen").removeChild(rootElem.getElementById("no-results"));
    }
    var pushTable = rootElem.getElementById("push-table");
    if (pushTable.hasChildNodes()) {
        while (pushTable.childNodes.length >= 1) {
        	pushTable.removeChild(pushTable.firstChild);
        }
    }

    // Attempt to retrieve the push list from local storage, if it exists
    var pushListStr = localStorage.getItem(sample.pushcapture.localStorageKey);

    if (pushListStr != null) {
    	pushListStr = decodeURIComponent(pushListStr);
        rootElem.getElementById("push-table").innerHTML = pushListStr;
        
        // Highlight the last selected push (if there was one)
        if (sample.pushcapture.selectedPushSeqnum != null) {
        	sample.pushcapture.highlightSelectedPush(rootElem);
        }
    } else {
        try {
            sample.pushcapture.db.readTransaction(function(tx) {
                tx.executeSql("SELECT seqnum, pushdate, type, extension, pushtime, content, unread "
                   + "FROM push ORDER BY seqnum desc;", [], 
                   function(tx, results) {
                	   sample.pushcapture.displayPushes(rootElem, tx, results);
                   },
                   function(tx, e) {                	   
                       sample.pushcapture.displayNoResultsUsingElement(rootElem);
                   });
            });
        } catch (e) {
            alert(sample.pushcapture.databaseError);
        }
    }
};

/**
 * Displays a message indicating that no pushes are found in the database.
 * 
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.displayNoResults = function() {
    sample.pushcapture.displayNoResultsUsingElement(document);
};

/**
 * Displays a message indicating that no pushes are found in the database.
 * 
 * @param {Element}
 *            element the root element of the screen
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.displayNoResultsUsingElement = function(element) {
    var noPushesDiv = document.createElement("div");
    noPushesDiv.id = "no-results";
    noPushesDiv.innerHTML = "<p>" + sample.pushcapture.noPushesMessage + "</p>";   
    element.getElementById("push-screen").appendChild(noPushesDiv);
};

/**
 * Generates a push list with pushes grouped by the date they were received on.
 * 
 * @param {Element}
 *            element the root element of the screen
 * @param {SQLTransaction}
 *            tx a database transaction
 * @param {SQLResultSet}
 *            results the results of the query executed in the loadPushes() function
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.displayPushes = function(element, tx, results) {
    if (results.rows.length == 0) {
        sample.pushcapture.displayNoResultsUsingElement(element);    
        return;
    }

    var pushdateArray = sample.pushcapture.getPushDates(results);

    var leftOffIndex = 0;
    pushdateArray.forEach(function(dateHeading) {
	    // Create a date row
        var dateRow = document.createElement("tr");
        var dateColumn = document.createElement("td");
        dateColumn.colSpan = 4;
        dateColumn.className = "heading";
        
        var dateColumnText = document.createTextNode(dateHeading);
        
        dateColumn.appendChild(dateColumnText);
        dateRow.appendChild(dateColumn);

        element.getElementById("push-table").appendChild(dateRow);
        
        var j;
        for (j = leftOffIndex; j < results.rows.length; j++) {
            leftOffIndex = j;

            if (results.rows.item(j).pushdate == dateHeading) {
        		// Create a push row
        	    var pushRow = document.createElement("tr");
        	    pushRow.id = results.rows.item(j).seqnum.toString(10);
                if (results.rows.item(j).unread == "T") {
            	    pushRow.className = "unread-push";
                } else {
                	pushRow.className = "read-push";
                }   
        	
        	    // First column
        	    var firstColumn = document.createElement("td");
        	    firstColumn.setAttribute("onclick", "sample.pushcapture.openPush('" + pushRow.id + "');");
        	    firstColumn.className = "column1";
        	    
        	    var firstColumnImage = document.createElement("img");
        	    firstColumnImage.src = sample.pushcapture.getIconForType(results.rows.item(j).type);
        	    
        	    firstColumn.appendChild(firstColumnImage);
        	
        	    // Second column
        	    var secondColumn = document.createElement("td");
        	    secondColumn.setAttribute("onclick", "sample.pushcapture.openPush('" + pushRow.id + "');");
        	    secondColumn.className = "column2";
        	    
        	    var secondColumnText = document.createTextNode(sample.pushcapture.getPushPreview(results.rows.item(j).type, results.rows.item(j).extension, results.rows.item(j).content));
        	    
        	    secondColumn.appendChild(secondColumnText);
        	
        	    // Third column
        	    var thirdColumn = document.createElement("td");
        	    thirdColumn.setAttribute("onclick", "sample.pushcapture.openPush('" + pushRow.id + "');");
        	    thirdColumn.className = "column3";

        	    var thirdColumnText = document.createTextNode(results.rows.item(j).pushtime);
        	    
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

    	        element.getElementById("push-table").appendChild(pushRow);
            } else {
                // A different push date was found
                break;
            }
        }
    });

    var pushListStr = element.getElementById("push-table").innerHTML;
    var encodedpushListStr = encodeURIComponent(pushListStr);

    // Store the push list in local storage, so we can retrieve it quickly when possible
    localStorage.setItem(sample.pushcapture.localStorageKey, encodedpushListStr);

    // Highlight the last selected push (if there was one)
    if (sample.pushcapture.selectedPushSeqnum != null) {
    	sample.pushcapture.highlightSelectedPush(element);
    }
};

/**
 * Returns an array of all the dates pushes were received on.
 * 
 * @param {SQLResultSet}
 *            results the results of the query executed in the loadPushes() function
 * @returns {Array} push date array
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.getPushDates = function(results) {
    var pushdateArray = [];

    var i;
    for (i = 0; i < results.rows.length; i++) {
        var isFound = false;

        var pushdateVal = results.rows.item(i).pushdate;

        var j;
        for (j = 0; j < pushdateArray.length; j++) {
            if (pushdateArray[j] == pushdateVal) {
                isFound = true;
                break;
            }
        }

        if (!isFound) {
            pushdateArray[pushdateArray.length] = pushdateVal;
        }
    }

    return pushdateArray;
};

/**
 * Highlights the selected push. It is expected the <code>sample.pushcapture.selectedPushSeqnum</code> variable 
 * is set on the <code>openPush()</code> function. The current/previously highlighted row will always been 
 * unselected and the new row will be selected. 
 * 
 * @param {Element}
 *            element the root element of the screen
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.highlightSelectedPush = function(element) {
	var pushTable = element.getElementById("push-table");
	
	var previouslySelectedPush = pushTable.getAttribute("selectedPush");
	
	if(previouslySelectedPush != null) {
		// Unhighlight the current/previously highlighted row
		if (element.getElementById(previouslySelectedPush).className.startsWith("read-push")) {
			element.getElementById(previouslySelectedPush).className = "read-push on-blur";
        } else {
        	element.getElementById(previouslySelectedPush).className = "unread-push on-blur";
        }
	}	
	
	// Highlight the new row (note: it may be the same as the one we just unhighlighted but that's ok)
	pushTable.setAttribute("selectedPush", sample.pushcapture.selectedPushSeqnum);	     
    if (element.getElementById(sample.pushcapture.selectedPushSeqnum).className.startsWith("read-push")) {    		
    	element.getElementById(sample.pushcapture.selectedPushSeqnum).className = "read-push on-focus";
    } else {
    	element.getElementById(sample.pushcapture.selectedPushSeqnum).className = "unread-push on-focus";
    }
};