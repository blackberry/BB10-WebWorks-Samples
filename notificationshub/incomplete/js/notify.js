/**
 * Copyright (c) 2012 Research In Motion Limited.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 *
 * You may obtain a copy of the License at:
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*global window, document, console, alert, Notification */

/* This file holds the majority of the functionality for creating a
 * new notification in our Universal Inbox.
 */

var _notify = {
	/* We will implement these functions for some notifications. */
	onclick: null,
	onshow: null,
	onerror: null,
	onclose: null,

	/* When we pick a new configuration from the dropdown, this function is
	 * invoked and we set various values.
	 */
	updateConfig: function (element) {
		'use strict';
		var selected;

		/* Reset all field values. */
		document.querySelector('#title').value = '';
		document.querySelector('#body').value = '';
		document.querySelector('#tag').value = '';
		document.querySelector('#target').value = '';
		document.querySelector('#targetAction').value = '';
		document.querySelector('#payload').value = '';
		document.querySelector('#payloadURI').value = '';
		document.querySelector('#payloadType').value = '';
		document.querySelector('#additionalInfo').innerHTML = '';
		_notify.onclick = null;
		_notify.onshow = null;
		_notify.onerror = null;
		_notify.onclose = null;

		/* Get the selected item from the configuration dropdown. */
		selected = element.options[element.selectedIndex].value;

		if (selected === 'basic') {
			/* For a basic notification we are only passing a title. */
			document.querySelector('#title').value = 'Basic Notification';
		} else if (selected === 'withbody') {
			/* For a withbody notification we are passing a title and body. */
			document.querySelector('#title').value = 'Basic Notification';
			document.querySelector('#body').value = 'With body.';
		} else if (selected === 'events') {
			/* For an events notification we will implement the onshow and onerror events. */
			document.querySelector('#title').value = 'Notification With Events';
			document.querySelector('#body').value = 'Calls alert for onshow or onerror.';

			/* Triggered when the notification is initiated. */
			_notify.onshow = function () {
				alert('The notification was created successfully.');
			};

			/* Triggered if there is an error launching our notification. */
			_notify.onerror = function () {
				alert('The notification could not be created.');
			};
		} else if (selected === 'tags') {
			/* For a tags notification, we are defining a default tag. */
			document.querySelector('#tag').value = 'constant_tag';
			document.querySelector('#additionalInfo').innerHTML = 'Try sending multiple notifications with different titles and the same tag. Note that only the most recent notification exists.';
		} else if (selected === 'launch') {
			/* For a launch notification, we are providing the fields to invoke the Browser to http://www.google.com. */
			document.querySelector('#title').value = 'Launch Browser';
			document.querySelector('#body').value = 'http://www.google.com';
			document.querySelector('#tag').value = 'config.browser.invoke';
			document.querySelector('#target').value = 'sys.browser';
			document.querySelector('#targetAction').value = 'bb.action.OPEN';
			document.querySelector('#payloadURI').value = 'http://www.google.com';
			document.querySelector('#payloadType').value = 'text/html';
		} else if (selected === 'custom') {
			/****************************************/
			/*********** TASK 2 GOES HERE ***********/
			/****************************************/
		}
	},

	/* This function is called when the user clicks the Invoke button. */
	notify: function () {
		'use strict';
		var title, options, notification;

		/* title is a required attribute, make sure it is there. */
		title = document.querySelector('#title').value;
		if (title === '') {
			alert('Title can not be blank.');
			return;
		}

		/* Populate our remaining options. */
		options = {
			body:			document.querySelector('#body').value,
			tag:			document.querySelector('#tag').value,
			target:			document.querySelector('#target').value,
			targetAction:	document.querySelector('#targetAction').value,
			payload:		document.querySelector('#payload').value,
			payloadURI:		document.querySelector('#payloadURI').value,
			payloadType:	document.querySelector('#payloadType').value,
			onclick:		_notify.onclick,
			onshow:			_notify.onshow,
			onerror:		_notify.onerror,
			onclose:		_notify.onclose
		};

		/* Create a new notiication; triggered immediately. */
		notification = new Notification(title, options);
	}
};