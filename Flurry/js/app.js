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
	console.log('Loaded Flurry Analytics');

	FlurryAgent.setAppVersion(blackberry.app.version);
	
	// set os version
	var env = {
		'os': blackberry.system.softwareVersion
	};

	FlurryAgent.startSession('QGTTWW6PBNC5PJT8QM67');

	FlurryAgent.logEvent('environment', env);
	bb.pushScreen('app.html', 'app');
}


/**
 *  event 1
 */

function eventOne() {
	FlurryAgent.logEvent('Event 1');
	toast('Triggered: Event 1');
}


/**
 *  event 2
 */

function eventTwo() {
	FlurryAgent.logEvent('Event 2');
	toast('Triggered: Event 2');
}


/**
 *  event 3
 */

function eventThree() {
	FlurryAgent.logEvent('Event 3');
	toast('Triggered: Event 3');
}


/** 
 *   simple toast message
 */

function toast(msg) {
	try {
		blackberry.ui.toast.show(msg);
	} catch (e) {
		console.log(msg);
	}
}