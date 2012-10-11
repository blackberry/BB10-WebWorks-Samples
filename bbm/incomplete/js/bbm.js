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
			/****************************************/
			/*********** TASK 5 GOES HERE ***********/
			/****************************************/
		} else if (field === 'personalMessage') {
			/****************************************/
			/*********** TASK 6 GOES HERE ***********/
			/****************************************/
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

			/****************************************/
			/*********** TASK 4 GOES HERE ***********/
			/****************************************/

			/* Set the Status from the BBM profile. */
			if ('available' === 'available') {
				document.querySelector('#status').setChecked(true);
			} else {
				document.querySelector('#status').setChecked(false);
			}

			/* The remaining fields are direct assignments. */
			document.querySelector('#statusMessage').value = 'status message';
			document.querySelector('#personalMessage').value = 'personal message';
			document.querySelector('#ppid').innerHTML = 'ppid';
			document.querySelector('#handle').innerHTML = 'handle';
			document.querySelector('#appVersion').innerHTML = 'application version';
			document.querySelector('#bbmsdkVersion').innerHTML = 'bbm sdk version';
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
					/****************************************/
					/*********** TASK 3 GOES HERE ***********/
					/****************************************/
				}
			});

			/****************************************/
			/*********** TASK 2 GOES HERE ***********/
			/****************************************/
			options = {
				uuid: "http://www.guidgenerator.com/"
			};

			/* Call the register function with our UUID. */
			blackberry.bbm.platform.register(options);
		}
	},

	invite: function () {
		'use strict';

		/* Only allow functionality if we've registered with BBM. */
		if (_bbm.registered === true) {
			/****************************************/
			/*********** TASK 7 GOES HERE ***********/
			/****************************************/
		} else {
			alert('You must register with BBM first.');
		}
	}
};