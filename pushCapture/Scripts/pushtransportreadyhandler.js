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
 * @fileOverview This file has functions related to the handling of the callback when the push transport is back up and available again.
 * @version 1.0
 * @name pushtransportreadyhandler.js
 */

/**
 * This function is called after a create or destroy channel operation has failed with a
 * <code>PUSH_TRANSPORT_UNAVAILABLE</code> error code and the push transport is now available
 *  again. 
 *  
 * @param {Number}
 *            lastFailedOperation the last failed operation (i.e. create or destroy channel)
 * @memberOf sample.pushcapture
 */
sample.pushcapture.constructor.prototype.onPushTransportReady = function(lastFailedOperation) {
	var message = "The push transport is now available. Please try ";

	if (lastFailedOperation == blackberry.push.PushService.CREATE_CHANNEL_OPERATION) {
		message += "registering ";
	} else {
		message += "unregistering ";
	}
	
	message += "again.";
	
    alert(message);
};
