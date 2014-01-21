/*global window, FileReader, blackberry, forceRegister, utils */

/*
* Copyright 2010-2012 Research In Motion Limited.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

var pushClient = {
	/**
	 *	lastActivity: Keeps track of the time of the last push activity.
	 *	pushService: Our PushService object for this session.
	 */
	'lastActivity': 0,
	'pushService': 0,

	/**
	 *	ops: You will need to populate these with your own Push credentials.
	 *	The invokeTarketId needs to match the custom invoke-target in your
	 *	config.xml.
	 *
	 *	For more information on registering for Push credentials, please see:
	 *	https://developer.blackberry.com/services/push/
	 */
	'ops': {
		'invokeTargetId': '@@@@@@@@',
		'appId': '@@@@-@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
		'ppgUrl': 'http://cp@@@@.pushapi.eval.blackberry.com'
	},

	/**
	 *	Responsible for creating the PushService object.
	 */
	'register': function () {
		/* Retrieve the last time (in milliseconds) of Push activity. */
		pushClient.lastActivity = window.parseInt(window.localStorage.lastActivity || 0, 10);

		if (pushClient.pushService === 0) {
			/* We only need a new object if we don't already have one; i.e. once per launch. */
			utils.log('Creating PushService object.');
			try {
				/* This is the core Push functionality to create the PushService object. */
				blackberry.push.PushService.create(
					pushClient.ops,
					pushClient.createSuccess,
					pushClient.createFailure,
					pushClient.simChangeCallback,
					pushClient.pushTransportReadyCallback
				);
			} catch (err) {
				utils.log(err);
			}
		} else if (window.parseInt(window.localStorage.lastActivity || 0) === 0) {
			/* If our PushService object exists, but we haven't seen any push activity, proceed to registering a Push Channel. */
			utils.log('PushService object already exists.');
			pushClient.createSuccess(pushClient.pushService);
		} else if (forceRegister === true) {
			/* If our PushService object exists, and we want to force the creation of a Push Channel, proceed. */
			utils.log('PushService object already exists.');
			pushClient.createSuccess(pushClient.pushService);
		} else {
			/* Our PushService object already exists and there is no need to create a Push Channel. */
			utils.log('PushService object already exists.');
			utils.log('Not forcing Push Channel recreation.');
		}
	},

	/**
	 *	If the PushService object is created / exists, proceed to registering the Push Channel.
	 */
	'createSuccess': function (result) {
		/* On success, the PushService object is passed into this function. */
		utils.log('PushService created successfully.');
		pushClient.pushService = result;

		/* Accept pushes if the application is not running. */
		pushClient.pushService.launchApplicationOnPush(
			true,
			function launchApplicationOnPushCallback(result) {
				/* Log whether we will be launching on Push invocations. */
				if (result === blackberry.push.PushService.SUCCESS) {
					utils.log('Application will be launched on push.');
				} else {
					utils.log('Application will not be launched on push: ' + result);
				}
			}
		);

		if (forceRegister) {
			/* If we're forcing a registration, call registerChannel. */
			utils.log('Forcing Push Channel registration.');
			pushClient.registerChannel();
		} else {
			if (new Date().getTime() - pushClient.lastActivity > 2 * 24 * 60 * 60 * 1000) {
				/* If we've gone more than two days without any activity, recreate the Push Channel. This is subjective. */
				utils.log('Expired Push Channel registration.');
				pushClient.registerChannel();
			} else {
				/* We're not forcing Puch Channel recreation and we have seen activity within two days, so likely everything is okay, take no action. */
				utils.log('No need to recreate the Push Channel.');
			}
		}
	},

	/**
	 *	When required, we will register a new Push Channel with the Push Service. It is NOT
	 *	required to create a new Push Channel every time. Once created, a Push Channel will
	 *	tend to last the lifetime of an application unless the Push Channel is intentionally
	 *	destroyed. There are some rare cases that can lead to a Push Channel becoming invalid.
	 *	To counteract this, we have implemented a two-day expectation on Push activity in the
	 *	createSuccess function above. If we do not see any activity within two days, we will
	 *	force the Push Channel to be recreated. The two days are purely arbitrary/subjective,
	 *	you will need to decide on an appropriate timeline for your own applications.
	 */
	'registerChannel': function () {
		try {
			/* Call the createChannel API to open communication with the Push services. */
			utils.log('Creating Push Channel.');
			pushClient.pushService.createChannel(
				function createChannelCallback(result, token) {
					if (result === blackberry.push.PushService.SUCCESS) {
						/* Channel was successfully created, update Push activity. */
						utils.log('Successfully created Push Channel.');
						window.localStorage.lastActivity = new Date().getTime().toString();
					} else {
						/* Channel failed to be created. */
						utils.log('Failed to create Push Channel: ' + result);
					}
				}
			);
		} catch (err) {
			utils.log(err);
		}
	},

	'createFailure': function (result) {
		utils.log('PushService creation error: ' + result);
	},

	'simChangeCallback': function () {
		utils.log('SIM Card has changed.');
	},

	'pushTransportReadyCallback': function (lastFailedOperation) {
		utils.log('Last failed operation: ' + lastFailedOperation);
	},

	/**
	 *	If we need to intentionally destroy an existing Push Channel, we can do so
	 *	with this API.
	 */
	'unregister': function () {
		try {
			/* Call the destroyChannel API to cease communication with Push services. */
			utils.log('Destroying Push Channel.');
			pushClient.pushService.destroyChannel(
				function destroyChannelCallback(result) {
					if (result === blackberry.push.PushService.SUCCESS) {
						/* Channel was successfully destroyed, reset Push activity. */
						utils.log('Successfully destroyed Push Channel.');
						window.localStorage.lastActivity = 0;
					} else {
						/* Channel could not be destroyed. */
						utils.log('Failed to destroy Push Channel: ' + result);
					}
				}
			);
		} catch (err) {
			utils.log(err);
		}
	},

	/**
	 *	This function will be called when a Push Invocation is received. In this example,
	 *	we are assuming a text-based data payload (see pushInitiator.js) to be received.
	 *	This is the most common case for many applications.
	 */
	'onInvoke': function (invokeRequest) {
		var pushPayload, reader;

		/* Ensure the invocation has an action associated with it. */
		if (invokeRequest.action) {
			/* Only process Push Invocations. */
			if (invokeRequest.action === 'bb.action.PUSH') {
				/* Check that we have a valid PushService object. */
				if (pushClient.PushService) {
					/* Update our Push Activity to track this received push. */
					utils.log('Push invocation received.');
					window.localStorage.lastActivity = new Date().getTime();
					try {
						/* Extract the payload from the Push Invocation. */
						pushPayload = pushClient.pushService.extractPushPayload(invokeRequest);

						/* Process a text data payload. */
						reader = new FileReader();
						reader.onload = function (result) {
							var text = result.target.result;
							utils.log(text);
						};
						reader.onerror = function (result) {
							utils.log('Error converting blob to text: ' + result.target.error);
						};
						reader.readAsText(pushPayload.data, 'UTF-8');
					} catch (err) {
						utils.log(err);
					}
				} else {
					utils.log('PushService object does not exist; consider creating on application launch.');
				}
			} else {
				utils.log('Invocation received: ' + invokeRequest.action);
			}
		} else {
			utils.log('Invocation received but no associated action.');
		}
	}
};