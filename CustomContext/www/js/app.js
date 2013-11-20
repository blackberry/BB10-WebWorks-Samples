/*
 * Copyright 2012 Research In Motion Limited.
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


// called by the webworksready event when the environment is ready
function initApp() {
	bb.pushScreen('app.html', 'app');

	// add a custom context
	var context1 = {
		actionId: 'MyItem1',
		label: 'Test 1',
		icon: '../images/1.png'
	};

	// add a context
	var context2 = {
		actionId: 'MyItem2',
		label: 'Test 2',
		icon: '../images/2.png'
	};

	// add a context
	var context3 = {
		actionId: 'MyItem3',
		label: 'Test 3',
		icon: '../images/3.png'
	};

	// add a context
	var context4 = {
		actionId: 'MyItem4',
		label: 'Test 4',
		icon: '../images/4.png'
	};

	var group1 = ["context1"];
	var group2 = ["context2"];
	var group3 = ["context3"];
	var group4 = ["context4"];

	// add the item to the menu
	blackberry.ui.contextmenu.addItem(group1, context1, function() {
		showToast('You clicked 1');
	});

	// add the item to the menu    
	blackberry.ui.contextmenu.addItem(group2, context2, function() {
		showToast('You clicked 2');
	});

	// add the item to the menu
	blackberry.ui.contextmenu.addItem(group3, context3, function() {
		showToast('You clicked 3');
	});

	// add the item to the menu    
	blackberry.ui.contextmenu.addItem(group4, context4, function() {
		showToast('You clicked 4');
	});

	// define a custom context menu for CONTEXT_IMAGE
	var options = {
        includeContextItems: [blackberry.ui.contextmenu.CONTEXT_IMAGE],
        includePlatformItems: true,
        includeMenuServiceItems: true
    };

    blackberry.ui.contextmenu.defineCustomContext("myContext", options)

    var myItem = {
    		actionId: 'MyCustomAction', 
    		label: 'Make it rain!', 
    		icon:'../images/rain.png'
    	},
        contexts = [blackberry.ui.contextmenu.CONTEXT_IMAGE];
    	blackberry.ui.contextmenu.addItem(contexts, myItem, function() { 
    		showToast('You made it rain!');
    	});
}

// display a simple toast message
function showToast(msg) {
	blackberry.ui.toast.show(msg);
}