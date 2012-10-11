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

/*global window, document, console, alert, blackberry */

/* This file holds the majority of the functionality for integration with
 * BlackBerry Messenger.
 */

var _bbm = {
	registered: false,

	/* This will be called when the user clicks the 'set' button for
	 * status or personal message.
	 */
	setField: function (field) {
		'use strict';
		var status, message, onComplete;

		if (field === 'status') {
			/* Assign the status for this update. */
			if (document.querySelector('#status').getChecked() === true) {
				status = 'available';
			} else {
				status = 'busy';
			}

			/* Assign the status message for this update. */
			message = document.querySelector('#statusMessage').value;

			/* Assign the onComplete function for this update. */
			onComplete = function (accepted) {
				if (accepted === true) {
					alert('Status update was accepted.');
				} else {
					alert('Status update was not accepted.');
				}
			};

			/* Call setStatus with our defined arguments. */
			blackberry.bbm.platform.self.setStatus(status, message, onComplete);
		} else if (field === 'personalMessage') {
			/* Assign the personal message for this update. */
			message = document.querySelector('#personalMessage').value;

			/* Assign the onComplete function for this update. */
			onComplete = function (accepted) {
				if (accepted === true) {
					alert('Status update was accepted.');
				} else {
					alert('Status update was not accepted.');
				}
			};

			/* Call setPersonalMessage with our defined arguments. */
			blackberry.bbm.platform.self.setPersonalMessage(message, onComplete);
		}
	},

	fieldChanged: function (element) {
		'use strict';

		/* Reset all of our fields to invisible. */
		document.querySelector('#_status').style.display = 'none';
		document.querySelector('#_personalMessage').style.display = 'none';
		document.querySelector('#_ppid').style.display = 'none';
		document.querySelector('#_handle').style.display = 'none';
		document.querySelector('#_appVersion').style.display = 'none';
		document.querySelector('#_bbmsdkVersion').style.display = 'none';

		/* Show the chosen field. */
		document.querySelector("#_" + element.value).style.display = 'inline';
	},

	populate: function () {
		'use strict';

		/* Only allow functionality if we've registered with BBM. */
		if (_bbm.registered === true) {
			/* Set the Display Name from the BBM profile. */
			document.querySelector('#displayName').innerHTML = blackberry.bbm.platform.self.displayName;

			/* Set the Status from the BBM profile. */
			if (blackberry.bbm.platform.self.status === 'available') {
				document.querySelector('#status').setChecked(true);
			} else {
				document.querySelector('#status').setChecked(false);
			}

			/* The remaining fields are direct assignments. */
			document.querySelector('#statusMessage').value = blackberry.bbm.platform.self.statusMessage;
			document.querySelector('#personalMessage').value = blackberry.bbm.platform.self.personalMessage;
			document.querySelector('#ppid').innerHTML = blackberry.bbm.platform.self.ppid;
			document.querySelector('#handle').innerHTML = blackberry.bbm.platform.self.handle;
			document.querySelector('#appVersion').innerHTML = blackberry.bbm.platform.self.appVersion;
			document.querySelector('#bbmsdkVersion').innerHTML = blackberry.bbm.platform.self.bbmsdkVersion;
		} else {
			alert('You must register with BBM first.');
		}
	},

	/* Will be called when the user clicks the Register button. */
	register: function () {
		'use strict';
		var options;

		/* Only invoke this functionality if we have not yet registered. */
		if (_bbm.registered === false) {
			blackberry.event.addEventListener("onaccesschanged", function (accessible, status) {
				if (status === 'allowed') {
					/* Access allowed. */
					_bbm.registered = true;

					/* Show our BBM Fields panel. */
					document.querySelector('#profile').style.display = 'inline';
				} else if (status === 'user') {
					/* Access blocked by user. */
					alert('Access is blocked by the user.');
				} else if (status === 'rim') {
					/* Access blocked by RIM. */
					alert('Access is blocked by RIM.');
				} else {
					/* Remaining error codes have been implemented. */
					if (status === 'itpolicy') {
						alert('Access is blocked by IT Policy.');
					} else if (status === 'resetrequired') {
						alert('Access is blocked because a device reset is required to use the BBM Social Platform.');
					} else if (status === 'nodata') {
						alert('Access is blocked because the device is out of data coverage. A data connection is required to register the application.');
					} else if (status === 'temperror') {
						alert('Access is blocked because of a temporary error. The application should try to call blackberry.bbm.platform.register in 30 minutes, or the next time the application starts.');
					} else if (status === 'nonuiapp') {
						alert('Access is blocked because blackberry.bbm.platform.register was called from a non-UI application.');
					}
				}
			});

			/* A valid, unique, 36-character UUID is being used. */
			options = {
				uuid: "33490f91-ad95-4ba9-82c4-33f6ad69fbbc"
			};

			/* Call the register function with our UUID. */
			blackberry.bbm.platform.register(options);
		}
	},

	invite: function () {
		'use strict';

		/* Only allow functionality if we've registered with BBM. */
		if (_bbm.registered === true) {
			blackberry.bbm.platform.users.inviteToDownload();
		} else {
			alert('You must register with BBM first.');
		}
	}
};