/*global document, console, el, forceRegister */

/*
* Copyright 2014 Research In Motion Limited.
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
 *	A few helper functions not related to Push.
 */
var utils = {
	/* Keep track of the user interaction with the Force button. */
	'toggleForce': function () {
		el.force.classList.toggle('disabled');
		forceRegister = !forceRegister;
	},

	/* Logs events to the screen and console. */
	'log': function (value) {
		var div;

		console.log(value);
		value = '<span style="color: #111111;">[' + new Date().toTimeString().split(' ')[0] + ']</span> ' + value.toString();

		div = document.createElement('div');
		div.innerHTML = value;
		el.content.appendChild(div);
		el.content.scrollTop = el.content.scrollHeight;
	}
};