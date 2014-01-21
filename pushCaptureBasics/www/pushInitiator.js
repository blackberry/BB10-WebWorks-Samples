/*global window, XMLHttpRequest, blackberry, utils */

/*
* Copyright 2010-2012 Research In Motion Limited.
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
 *	This object provides an easy way for a device to initiate a push to itself,
 *	it is intended to aid in testing purposes with this application but can be
 *	adapted to act as a Push Initiator for a number of use-cases.
 *
 *	Note that this is a true Push, which originates on the device and gets sent to the
 *	BlackBerry infrastructure where it is then routed through the service back to the
 *	device and received by this application.
 */
var pushInitiator = {
	/* Holds our various properties. */
	'config': null,

	/**
	 *	We must call this function to initialize our config variable as the
	 *	authorization field requires two of the values in order to be set.
	 */
	'init': function () {
		pushInitiator.config = {
			'ppgUrl' : 'https://cp@@@@.pushapi.eval.blackberry.com',
			'appId' : '@@@@-@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
			'pwd' : '@@@@@@@@',
			'recipient' : blackberry.identity.uuid.substring(2),
			'data' : JSON.stringify({
				'subject' : 'Breaking News!',
				'body' : 'Squirrel beats man at chess. It was nuts!'
			})
		};
		pushInitiator.config.authorization = window.btoa(pushInitiator.config.appId + ':' + pushInitiator.config.pwd);
	},

	/**
	 *	Calling this API will construct a push and sent it via XHR.
	 */
	'sendPush': function () {
		var postData, url, xhr;

		/* This is the template for all pushes. */
		postData = '';
		postData += '--$(boundary)' + '\r\n';
		postData += 'Content-Type: application/xml; charset=UTF-8' + '\r\n';
		postData += '<?xml version="1.0"?>' + '\r\n';
		postData += '<!DOCTYPE pap PUBLIC "-//WAPFORUM//DTD PAP 1.0//EN" "http://www.openmobilealliance.org/tech/DTD/pap_1.0.dtd">' + '\r\n';
		postData += '<pap>' + '\r\n';
		postData += '<push-message push-id="$(pushid)"' + '\r\n';
		postData += '        source-reference="$(username)"' + '\r\n';
		postData += '        deliver-before-timestamp="2020-12-31T23:59:59Z" >' + '\r\n';
		postData += '<address address-value="$(addresses)"/>' + '\r\n';
		postData += '<quality-of-service delivery-method="$(deliveryMethod)"/>' + '\r\n';
		postData += '</push-message>' + '\r\n';
		postData += '</pap>' + '\r\n';
		postData += '--$(boundary)' + '\r\n';
		postData += '$(headers)' + '\r\n';
		postData += '\r\n';
		postData += '$(content)' + '\r\n';
		postData += '--$(boundary)--';

		/* Here we are replacing specific sections of the template with our data defined in the config variable. */
		postData = postData.replace(/\$\(boundary\)/g, 'qwertyuiop');
		postData = postData.replace(/\$\(pushid\)/g, new Date().getTime());
		postData = postData.replace(/\$\(username\)/g, pushInitiator.config.appId);
		postData = postData.replace(/\$\(addresses\)/g, pushInitiator.config.recipient);
		postData = postData.replace(/\$\(deliveryMethod\)/g, 'unconfirmed');
		postData = postData.replace(/\$\(headers\)/g, 'Content-Type: text/plain');
		postData = postData.replace(/\$\(content\)/g, pushInitiator.config.data);

		/* The standard push URL. */
		url = pushInitiator.config.ppgUrl + '/mss/PD_pushRequest';

		/* Create a new XHR and set its content type and authorization. */
		xhr = new XMLHttpRequest();
		xhr.open('POST', url, true);
		xhr.setRequestHeader('Content-Type', 'multipart/related; type="application/xml"; boundary="qwertyuiop"');
		xhr.setRequestHeader('Authorization', 'Basic ' + pushInitiator.config.authorization);

		/* These listeners will help us track progress. */
		xhr.addEventListener('load', function onLoad() {
			utils.log('PushInitiator success: ' + this.status);
		}, false);
		xhr.addEventListener('error', function onError(result) {
			utils.log('PushInitiator error: ' + result.code);
		}, false);
		xhr.addEventListener('abort', function onAbort(result) {
			utils.log('PushInitiator aborted.' + result.code);
		}, false);

		/* Send the push. */
		xhr.send(postData);
	}
};