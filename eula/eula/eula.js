/*global blackberry */

/*
- Copyright (c) 2012 Research In Motion Limited.
-
- Licensed under the Apache License, Version 2.0 (the "License");
- you may not use this file except in compliance with the License.
- You may obtain a copy of the License at
-
- http://www.apache.org/licenses/LICENSE-2.0
-
- Unless required by applicable law or agreed to in writing, software
- distributed under the License is distributed on an "AS IS" BASIS,
- WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
- See the License for the specific language governing permissions and
- limitations under the License.
*/

function refreshEULA(lang) {
	var xhr, html;

	/* Create an XMLHttpRequest to retrieve the agreement based on the language specified. */
	xhr = new XMLHttpRequest();
	xhr.open('GET', './eula/agreements/agreement_' + lang + '.txt', true);
	xhr.responseType = 'text';
	xhr.onload = function () {
		var sections, lines, n;

		if (this.status === 200) {
			/**
			 * The intended format for the agreement is four sections separated by new lines:
			 * Section 0: Agreement title, example: License Agreement
			 * Section 1: Agreement section one; primary agreement text.
			 * Section 2: Agreement section two; secondary agreement text.
			 * Section 3: Accept/decline verbiage.
			 */
			sections = [];

			/**
			 * Trying to make this framework more robust in the event of erroneous new lines. We'll parse out
			 * the data and ensure we're only taking the four sections with actual content.
			 */
			lines = this.response.split('\n');
			for (n = 0; n < lines.length; ++n) {
				if (lines[n].length > 1) {
					sections.push(lines[n]);
				}
			}

			/* Place Section 0 into the title. */
			document.querySelector('.header > .content').innerHTML = sections[0];

			/* Merge Section 1 and Section 2 into the main EULA body. */
			html = '';
			html += '<div class="content">' + sections[1] + '</div>';
			html += '<div class="content">' + sections[2] + '</div>';
			document.querySelector('.eulabox').innerHTML = html;

			/**
			 * The intended format for Section 3 is:
			 * Accept[tab]Decline
			 *
			 * Where:
			 * - Accept refers to the translated acceptance verbiage, example: I Agree
			 * - Decline refers to the translated decline verbiage, example: I Do Not Agree
			 * - [tab] is an actual TAB character separating the two.
			 *
			 * In creating this sample, it was identified that the source was not always consistent, and sometimes
			 * instead of TAB separators &nbsp; characters were used instead. The following code can be expanded on
			 * to deal with additional characters, but for now splits up Section 3's verbiage based on &nbsp; characters
			 * as well as TAB characters.
			 */
			if (sections[3].indexOf(String.fromCharCode('160')) > -1) {
				/* &nbsp; */
				lines = sections[3].split(String.fromCharCode('160'));
			} else if (sections[3].indexOf(String.fromCharCode('9')) > -1) {
				/* tab */
				lines = sections[3].split(String.fromCharCode('9'));
			}
			sections = [];

			/* After splitting Section 3, we retrive the Accept and Decline verbiage into the Sections variable. */
			for (n = 0; n < lines.length; ++n) {
				if (lines[n].length > 1) {
					sections.push(lines[n]);
				}
			}

			/* Populate the Accept and Decline verbiage on the screen. */
			document.querySelector('.accept > .content.text').innerHTML = sections[0];
			document.querySelector('.deny > .content.text').innerHTML = sections[1];
		}
	};
	xhr.send();
}

function initEULA(acceptCallback) {
	var elements, zIndex, container, lang, html, n, z;

	/* Grab all elements to find the highest z-index. */
	elements = document.querySelectorAll('*');
	zIndex = 0;

	/* Grab the largest z-index. */
	for (n = elements.length - 1; n > -1; --n) {
		z = parseInt(elements[n].style.zIndex, 10);
		if (z > zIndex) {
			zIndex = z;
		}
	}

	/* Retrieve system language. */
	lang = blackberry.system.language.substring(0, 2);

	/* Create our main container. */
	container = document.createElement('div');
	container.id = 'eula';
	container.style.zIndex = zIndex + 1;

	/* Show the container if (alwaysShow is true) or (the EULA has not yet been accepted).  */
	container.show = function (alwaysShow) {
		if (alwaysShow === true) {
			document.querySelector('#eula').style.display = 'block';
		} else if (window.localStorage.getItem('EULA_ACCEPTED') === null) {
			document.querySelector('#eula').style.display = 'block';
		} else {
			if (typeof (acceptCallback) !== 'undefined') {
				acceptCallback();
			}
		}
	};

	/* Hide the container. */
	container.hide = function () {
		document.querySelector('#eula').style.display = 'none';
	};

	/* Populate the EULA page. */
	html = '';
	html +=	'<div class="header">';
	html +=		'<div class="content">';
	html +=		'</div>';
	html +=	'</div>';
	html +=	'<div class="eulabox"></div>';
	html +=	'<div class="accept">';
	html +=		'<div class="content image">';
	html +=			'<img src="./eula/ic_done.png" />';
	html +=		'</div>';
	html +=		'<div class="content text">';
	html +=		'</div>';
	html +=	'</div>';
	html +=	'<div class="deny">';
	html +=		'<div class="content image">';
	html +=			'<img src="./eula/ic_cancel.png" />';
	html +=		'</div>';
	html +=		'<div class="content text">';
	html +=		'</div>';
	html +=	'</div>';
	container.innerHTML = html;

	/* Add the EULA page to the document. */
	document.body.appendChild(container);

	/* View the license agreement. */
	refreshEULA(lang);

	/* EULA accepted. */
	document.querySelector('.accept').addEventListener('click', function () {
		window.localStorage.setItem('EULA_ACCEPTED', 'true');
		document.querySelector('#eula').hide();
		if (typeof (acceptCallback) !== 'undefined') {
			acceptCallback();
		}
	}, false);

	/* EULA rejected. */
	document.querySelector('.deny').addEventListener('click', function () {
		blackberry.app.exit();
	}, false);
}