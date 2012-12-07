/*
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

/*global blackberry */

var bbm = {
	registered: false,

	/**
	 * Registers this application with the blackberry.bbm.platform APIs.
	 *
	 * NOTE: This is NOT required for the invoke APIs.
	 */
	register: function () {
		blackberry.event.addEventListener('onaccesschanged', function (accessible, status) {
			if (status === 'unregistered') {
				blackberry.bbm.platform.register({
					uuid: '33490f91-ad95-4ba9-82c4-33f6ad69fbbc'
				});
			} else if (status === 'allowed') {
				bbm.registered = accessible;
			}
		}, false);
	},

	/**
	 * setDisplayPicture: Sets the BBM profile display picture.
	 */
	setDisplayPicture: function () {
		blackberry.bbm.platform.self.setDisplayPicture('local:///img/avatar-32x32.png');
	},

	/**
	 * inviteToDownload: Displays a BBM list of existing users that can be
	 * contacted to also download this application.
	 */
	inviteToDownload: function () {
		blackberry.bbm.platform.users.inviteToDownload();
	},

	/**
	 * inviteToBBM: Invokes the invite to BBM functionality to add BBM contacts.
	 */
	inviteToBBM: function () {
		blackberry.invoke.invoke({
			action: 'bb.action.INVITEBBM',
			uri: 'pin:2100000A'
		});
	},

	/**
	 * setAvatar: Invokes the avatar selector on the specified image.
	 */
	setAvatar: function () {
		blackberry.invoke.invoke({
			target: 'sys.bbm.imagehandler',
			action: 'bb.action.SET',
			uri: 'local:///img/avatar.png'
		});
	},

	/**
	 * startChat: Invokes a BBM chat with an existing BBM contact.
	 *
	 * Specifying a PIN that is not already in the user's contacts will result in the Invite To BBM screen.
	 *
	 * Specifying a PIN that is in the user's contacts will immediately start a chat with that person.
	 *
	 * Specifying no PIN should invoke the Contact Picker, but currently does not. However, shareText with empty data string should do the job.
	 */
	startChat: function () {
		blackberry.invoke.invoke({
			action: 'bb.action.BBMCHAT'
		});
	},

	/**
	 * shareText: Starts a chat session with pre-populated text.
	 */
	shareText: function () {
		blackberry.invoke.invoke({
			target: 'sys.bbm.sharehandler',
			action: 'bb.action.SHARE',
			data: 'This is some text.',
			mimeType: 'text/plain'
		});
	},

	/**
	 * shareImage: Starts a chat session with attached image.
	 */
	shareImage: function () {
		blackberry.invoke.invoke({
			target: 'sys.bbm.sharehandler',
			action: 'bb.action.SHARE',
			uri: 'local:///img/avatar.png'
		});
	},

	/**
	 * populate: Retrieve BBM profile information and populate a BBUI screen.
	 */
	populate: function (element) {
		element.querySelector('#displayname').setCaption(blackberry.bbm.platform.self.displayName);

		element.querySelector('#available').setChecked(
			blackberry.bbm.platform.self.status === 'available' ? true : false
		);

		element.querySelector('#statusmessage').value		= blackberry.bbm.platform.self.statusMessage;
		element.querySelector('#personalmessage').value		= blackberry.bbm.platform.self.personalMessage;
		element.querySelector('#ppid').value				= blackberry.bbm.platform.self.ppid;
		element.querySelector('#handle').value				= blackberry.bbm.platform.self.handle;
		element.querySelector('#applicationversion').value	= blackberry.bbm.platform.self.appVersion;
		element.querySelector('#bbmsdkversion').value		= blackberry.bbm.platform.self.bbmsdkVersion;
	},

	/**
	 * save: Updates the user's BBM profile based on the current information.
	 */
	save: function () {
		/* Update status. */
		blackberry.bbm.platform.self.setStatus(
			document.querySelector('#available').getChecked() === true ? 'available' : 'busy',
			document.querySelector('#statusmessage').value,
			function (accepted) {
			}
		);

		/* Update personal message. */
		blackberry.bbm.platform.self.setPersonalMessage(
			document.querySelector('#personalmessage').value,
			function (accepted) {
			}
		);
	}
};