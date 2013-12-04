/*
 * Copyright 2013 BlackBerry.
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

var Channel = {
	open: function() {
		var request = {
			target: "sys.bbm.channels.card.previewer",
			action: "bb.action.OPENBBMCHANNEL",
			uri: "bbmc:C00124CF8"
		};
		Channel.go(request);
	},

	shareText: function() {
		var request = {
			target: "sys.bbm.channels.sharehandler",
			type: "text/plain",
			action: "bb.action.SHARE",
			data: "this is a test"
		};
		Channel.go(request);
	},

	sharePhoto: function() {
		var request = {
			target: "sys.bbm.channels.sharehandler",
			action: "bb.action.SHARE",
			uri: "local:///test.gif"
		};
		Channel.go(request);
	},

	go: function(params) {
		blackberry.invoke.invoke(
			params,

			function() {
				console.log('success');
			},

			function(e) {
				console.log(e);
			}
		);
	}
};