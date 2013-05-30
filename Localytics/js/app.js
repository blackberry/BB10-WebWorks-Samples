/*
 * Copyright 2013 Research In Motion Limited.
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

/**
 *  called by the webworksready event when the environment is ready
 */

function initApp() {
	var options = {
		appVersion: blackberry.app.version,
		polling: 10000,
		uploadTimeout: 60000,
		sessionTimeoutSeconds: 30,
		storage: 100000,
		logger: true
	};

	localyticsSession = LocalyticsSession("0ad80167e95a7661ce24bc1-1e779c90-c3ca-11e2-33fb-00a426b17dd8", options);
	postAnalytics();
	bb.pushScreen('app.html', 'app');
}


/**
 *  event 1
 */

function eventOne() {
	localyticsSession.tagEvent('Event 1');
	toast('Triggered: Event 1');
	postAnalytics();
}


/**
 *  event 2
 */

function eventTwo() {
	localyticsSession.tagEvent('Event 2');
	toast('Triggered: Event 2');
	postAnalytics();
}


/**
 *  event 3
 */

function eventThree() {
	localyticsSession.tagEvent('Event 3');
	toast('Triggered: Event 3');
	postAnalytics();
}


/**
 *  event 4
 */

function postAnalytics() {
	// if a connection is already open it will re-use it instead of creating a new connection
	localyticsSession.open();
	localyticsSession.upload();
}

// simple toast message

function toast(msg) {
	try {
		blackberry.ui.toast.show(msg);
	} catch (e) {}
}