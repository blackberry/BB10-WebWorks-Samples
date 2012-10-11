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

/*global document, alert, blackberry */

/* This file holds the majority of the functionality for adding a new
 * contact to the address book.
 */

var _addContact = {
	/* Called when the Save button is clicked. */
	save: function () {
		'use strict';
		var options, contact, onSuccess, onError;

		/* Our fields to set for this contact. */
		options = {};
		options.name = new blackberry.pim.contacts.ContactName();
		options.name.givenName = document.querySelector('#givenName').value;
		options.name.familyName = document.querySelector('#familyName').value;
		options.nickname = document.querySelector('#mysteryField').value;

		/* Create a new contact based on our options. */
		contact = blackberry.pim.contacts.create(options);

		/* If creation succeeds, let the user know. */
		onSuccess = function (contact) {
			alert('Contact (ID: ' + contact.id + ') successfully saved.');
		};

		/* If there is an error, let the user know. */
		onError = function (error) {
			alert('Error ' + error.code);
		};

		/* Call the blackberry.pim.contacts.Contact.save function with our trigger functions. */
		contact.save(onSuccess, onError);
	}
};