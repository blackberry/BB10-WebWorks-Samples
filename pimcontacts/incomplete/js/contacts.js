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

/*global window, document, console, alert, blackberry, bb */

/* This file holds the majority of the functionality for retrieving
 * contacts from the address book and deleting contacts.
 */

var _contacts = {
	container: null,
	filter: null,
	context: null,

	/* Used to insert a Contact result into our main screen's list. */
	insertContact: function (contact) {
		'use strict';
		var div;

		/* Create a new <div> element and assign properties to match a BBUI.js Image List item. */
		div = document.createElement('div');
		div.setAttribute('data-bb-type', 'item');

		/****************************************/
		/********** TASK 3C GOES HERE ***********/
		/****************************************/
		div.setAttribute('data-bb-title', contact.name.givenName);
		div.innerHTML = contact.name.familyName;

		/* We will also store the actual Contact object for easier access. */
		div.contact = contact;

		/* Add this new item to the Image List. */
		_contacts.container.appendItem(div);
	},

	/* This function gets called when we want to populate our Image List with Contacts. */
	populateContacts: function () {
		'use strict';
		var contactFields, onFindSuccess, onFindError, findOptions;

		/****************************************/
		/********** TASK 3B GOES HERE ***********/
		/****************************************/
		contactFields = ['name'];

		/* This function takes the Contacts that are found and feeds them one-by-one
		 * to our insertContact method that creates the BBUI.js <div> elements.
		 */
		onFindSuccess = function (contacts) {
			var n;

			_contacts.container.clear();
			for (n = 0; n < contacts.length; n = n + 1) {
				_contacts.insertContact(contacts[n]);
			}
		};

		/* Called if there is an error during search. */
		onFindError = function (error) {
			/****************************************/
			/*********** TASK 5 GOES HERE ***********/
			/****************************************/
		};

		/* Create a blank ContactFindOptions object. */
		findOptions = new blackberry.pim.contacts.ContactFindOptions();

		/****************************************/
		/*********** TASK 2 GOES HERE ***********/
		/****************************************/

		/* The field(s) we will filter our returned Contacts on. */
		findOptions.filter = [
			{fieldName: blackberry.pim.contacts.ContactFindOptions.SEARCH_FIELD_GIVEN_NAME, fieldValue: _contacts.filter.value}
		];

		/* The sort order. */
		findOptions.sort = [
			{fieldName: blackberry.pim.contacts.ContactFindOptions.SORT_FIELD_FAMILY_NAME, desc: false},
			{fieldName: blackberry.pim.contacts.ContactFindOptions.SORT_FIELD_GIVEN_NAME, desc: false}
		];

		/* Number of contacts to return. */
		findOptions.limit = 100;

		/* Return only favorite contacts? */
		findOptions.favorite = false;

		/* Here we supply the variables we just initialized and invoke our call to find. */
		blackberry.pim.contacts.find(contactFields, findOptions, onFindSuccess, onFindError);
	},

	/* This function gets invoked when the 'Add' button is pushed and will display the Add Contact screen. */
	addContact: function () {
		'use strict';
		bb.pushScreen('addcontact.html', 'addcontact');
	},

	/* Called from the context menu to delete a specific Contact. */
	deleteContact: function () {
		'use strict';
		var selected, onSuccess, onError, selectedContact;

		/* First, we retrieve the selected item from our context menu. This will provide us with
		 * access to the Image List item that holds the Contact itself.
		 */
		selected = _contacts.context.menu.selected.selected;
		if (selected) {
			/* When a Contact is deleted, we will alert the user to the success. */
			onSuccess = function () {
				alert('Contact deleted.');
				_contacts.populateContacts();
			};

			/* If deletion encounters an error, we will alert the user to the error. */
			onError = function (error) {
				alert('Error ' + error.code);
			};

			/* Since we've retrieve the Image List object, and because we stored the 
			 * Contact object as a property of the Image List object, we can use the
			 * contact property to obtain the Contact object.
			 */
			selectedContact = selected.contact;

			/****************************************/
			/*********** TASK 4 GOES HERE ***********/
			/****************************************/
		} else {
			alert('Nothing selected.');
		}
	}
};