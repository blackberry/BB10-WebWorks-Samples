/*global window, FileReader, blackberry, autoExit, utils */

/*
* Copyright 2014 BlackBerry Limited.
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

	'queue': [],
	'waiting': false,

	/**
	 *	ops: You will need to populate these with your own Push credentials.
	 *	The invokeTarketId needs to match the custom invoke-target in your
	 *	config.xml.
	 *
	 *	For more information on registering for Push credentials, please see:
	 *	https://developer.blackberry.com/services/push/
	 */
	'ops': {
		'invokeTargetId': 'com.@@@@@@.pushclient.invoke.push',
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
		} else {
			/* Forcing Push Service registration. */
			utils.log('PushService object already exists.');
			pushClient.registerChannel();
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

		if (new Date().getTime() - pushClient.lastActivity > 2 * 24 * 60 * 60 * 1000) {
			/* If we've gone more than two days without any activity, recreate the Push Channel. This is subjective. */
			utils.log('Expired Push Channel registration.');
			pushClient.registerChannel();
		} else {
			/* We have seen activity within two days, so likely everything is okay, take no action. */
			utils.log('No need to recreate the Push Channel.');
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
	 *	Iterate recursively through the pushClient.queue array until we've processed all pushes.
	 */
	'processQueue': function (invokeRequest) {
		var pushPayload, reader;

		/* Check if there is anything left to process. */
		if (!invokeRequest) {
			/* We've processed everything. */
			utils.log('Processing complete.');
			pushClient.waiting = false;

			/* If we were processing pushes in the background, exit the app. */
			if (autoExit === true) {
				utils.log('Exit application.');
				/* blackberry.app.exit(); */
			}
			return;
		}

		try {
			/* Extract the payload from the Push Invocation. */
			pushPayload = pushClient.pushService.extractPushPayload(invokeRequest);

			/* Process a text data payload. */
			reader = new FileReader();
			reader.onload = function (result) {
				var text = result.target.result;
				utils.log(text);

				utils.log('Processing next item.');
				pushClient.processQueue(pushClient.queue.shift());
			};
			reader.onerror = function (result) {
				utils.log('Error converting blob to text: ' + result.target.error);

				utils.log('Processing next item.');
				pushClient.processQueue(pushClient.queue.shift());
			};
			reader.readAsText(pushPayload.data, 'UTF-8');
		} catch (err) {
			utils.log(err);
		}
	},

	/**
	 *	Our application was invoked before the PushService object had a chance to be created.
	 *	We'll keep checking periodically until the object is ready and then process any
	 *	outstanding pushes that we've received in the meantime.
	 */
	'waitForPushService': function () {
		if (pushClient.pushService === 0) {
			/* We still don't have a PushService object, wait a little longer. */
			utils.log('Waiting.');
			window.setTimeout(pushClient.waitForPushService, 100);
		} else {
			/* We have a PushService object, begin processing from the beginning of the queue. */
			utils.log('Processing push queue.');
			pushClient.processQueue(pushClient.queue.shift());
		}
	},

	/**
	 *	This function will be called when a Push Invocation is received. In this example,
	 *	we are assuming a text-based data payload (see pushInitiator.js) to be received.
	 *	This is the most common case for many applications.
	 */
	'onInvoke': function (invokeRequest) {

		/* Ensure the invocation has an action associated with it. */
		if (invokeRequest.action) {
			/* Only process Push Invocations. */
			if (invokeRequest.action === 'bb.action.PUSH') {
				/* Update our Push Activity to track this received push. */
				utils.log('Push invocation received.');
				window.localStorage.lastActivity = new Date().getTime();

				/* Add this invokeRequest to our processing queue. */
				utils.log('Added new push to queue.');
				pushClient.queue.push(invokeRequest);

				/* Wait for the PushService object if we need to. */
				if (pushClient.pushService === 0) {
					if (pushClient.waiting === false) {
						pushClient.waiting = true;

						/* Begin waiting for PushService object. */
						utils.log('Waiting for PushService object.');
						window.setTimeout(pushClient.waitForPushService, 100);
					}
				} else if (pushClient.waiting === false) {
					pushClient.waiting = true;

					/* We have a PushService object, begin processing from the beginning of the queue. */
					utils.log('Processing push queue.');
					pushClient.processQueue(pushClient.queue.shift());
				}
			} else {
				utils.log('Invocation received: ' + invokeRequest.action);
			}
		} else {
			utils.log('Invocation received but no associated action.');
		}
	}
};
