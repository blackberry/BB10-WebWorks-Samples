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

function initApp() {
	'use strict';

	/* Enable context menu. */
	//blackberry.ui.contextmenu.enabled = true;

	/* Context menu item for all elements. */
	blackberry.ui.contextmenu.addItem([
		blackberry.ui.contextmenu.CONTEXT_ALL
	], {
		actionId: 'favourite',
		label: 'Favourite',
		icon: 'local:///img/cog.png'
	}, function () {
		alert('Favourite!');
	});

	/* Context menu item for all elements. */
	blackberry.ui.contextmenu.addItem([
		blackberry.ui.contextmenu.CONTEXT_LINK
	], {
		actionId: 'link',
		label: 'Link',
		icon: 'local:///img/cog.png'
	}, function () {
		alert('Link!');
	});

	/* Context menu item for all elements. */
	blackberry.ui.contextmenu.addItem([
		blackberry.ui.contextmenu.CONTEXT_IMAGE
	], {
		actionId: 'image',
		label: 'Image',
		icon: 'local:///img/cog.png'
	}, function () {
		alert('Image!');
	});

	/* Context menu item for all elements. */
	blackberry.ui.contextmenu.addItem([
		blackberry.ui.contextmenu.CONTEXT_IMAGE_LINK
	], {
		actionId: 'imagelink',
		label: 'Image Link',
		icon: 'local:///img/cog.png'
	}, function () {
		alert('Image Link!');
	});

	/* Context menu item for all elements. */
	blackberry.ui.contextmenu.addItem([
		blackberry.ui.contextmenu.CONTEXT_INPUT
	], {
		actionId: 'input',
		label: 'Input',
		icon: 'local:///img/cog.png'
	}, function () {
		alert('Input!');
	});

	/* Context menu item for all elements. */
	blackberry.ui.contextmenu.addItem([
		blackberry.ui.contextmenu.CONTEXT_TEXT
	], {
		actionId: 'text',
		label: 'Text',
		icon: 'local:///img/cog.png'
	}, function () {
		alert('Text!');
	});
}