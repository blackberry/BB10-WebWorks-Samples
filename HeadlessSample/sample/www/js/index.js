/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 var app = {
	// Application Constructor
	initialize: function() {
		this.bindEvents();
		document.getElementById("btnResend").setAttribute("onclick", "app.resendNotification()");
	},
	// Bind Event Listeners
	//
	// Bind any events that are required on startup. Common events are:
	// 'load', 'deviceready', 'offline', and 'online'.
	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},
	// deviceready Event Handler
	//
	// The scope of 'this' is the event. In order to call the 'receivedEvent'
	// function, we must explicity call 'app.receivedEvent(...);'
	onDeviceReady: function() {
		app.receivedEvent('deviceready');
		app.pollFile();
	},
	// Update DOM on a Received Event
	receivedEvent: function(id) {
		var parentElement = document.getElementById(id);
		var listeningElement = parentElement.querySelector('.listening');
		var receivedElement = parentElement.querySelector('.received');

		listeningElement.setAttribute('style', 'display:none;');
		receivedElement.setAttribute('style', 'display:block;');

		console.log('Received Event: ' + id);
	},
	readFile: function() {
		blackberry.io.sandbox = false;
		window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;

		window.requestFileSystem(window.PERMANENT, 1024 * 1024,
			function (fs) {
				fs.root.getFile(blackberry.io.home + '/log.txt', {create: false},
					function (fileEntry) {
						fileEntry.file(function (file) {
							var reader = new FileReader();

							reader.onloadend = function (e) {
								var log = document.getElementById('MessageLog');
								log.innerText = this.result;
							};

							reader.readAsText(file);
						}, this.errorHandler);
					}, this.errorHandler);
			}, this.errorHandler);
	},

	errorHandler: function(e) {
		var msg = '';

		switch (e.code) {
			case FileError.QUOTA_EXCEEDED_ERR:
			msg = 'QUOTA_EXCEEDED_ERR';
			break;
			case FileError.NOT_FOUND_ERR:
			msg = 'NOT_FOUND_ERR';
			break;
			case FileError.SECURITY_ERR:
			msg = 'SECURITY_ERR';
			break;
			case FileError.INVALID_MODIFICATION_ERR:
			msg = 'INVALID_MODIFICATION_ERR';
			break;
			case FileError.INVALID_STATE_ERR:
			msg = 'INVALID_STATE_ERR';
			break;
			default:
			msg = 'Unknown Error';
			break;
		}

		console.log('Error: ' + msg);
	},
	pollFile: function() {
		app.readFile();
		setTimeout(app.pollFile, 20000);
	}
};
