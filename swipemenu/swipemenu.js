/*
 * Copyright 2012 Research In Motion Limited.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var swipemenu = (function() {
    "use strict";
	
	//private stuff
	var height = 70;
	var state = { activeClick : false, ignoreClick : false, menuOpen : false };

	function showMenuBar() {
		var menu = document.getElementById("menuBar");

		//Show menu only if its already closed:
		if (menu && !state.menuOpen) {
			
			if ((typeof window.blackberry !== "undefined") && (typeof blackberry.event !== "undefined")) {
				blackberry.event.addEventListener("swipedown", hideMenuBar);
			}
		
			//If you are already using jQuery in your project, use it to perform menu transition:
			if (typeof jQuery === "undefined") {
				menu.style['-webkit-transition'] = 'all 0.5s ease-in-out';
				menu.style['-webkit-transform'] = 'translate(0, ' + (height + 3) + 'px)';
				console.log("showMenuBar - using CSS3 to perform menu transition");
			} else {
				$('#menuBar').animate({top : 0}, {queue : false});
				console.log("showMenuBar - using jQuery to perform menu transition");
			}
			
			state.menuOpen = true;
		}
		console.log("showMenuBar complete");
	}
	function hideMenuBar() {
		var menu = document.getElementById("menuBar");
		//Hide menu only if its open:
		if (menu && state.menuOpen) {
			
			if ((typeof window.blackberry !== "undefined") && (typeof blackberry.event !== "undefined")) {
				blackberry.event.addEventListener("swipedown", showMenuBar);
			}

			//If you are already using jQuery in your project, use it to perform menu transition:
			if (typeof jQuery === "undefined") {
				menu.style['-webkit-transition'] = 'all 0.5s ease-in-out';
				menu.style['-webkit-transform'] = 'translate(0, -' + (height + 3) + 'px)';
				console.log("hideMenuBar - using CSS3 to perform menu transition");
			} else {
				$('#menuBar').animate({top : -100}, {queue : false});
				console.log("hideMenuBar - using jQuery to perform menu transition");
			}
		
			state.menuOpen = false;
		}
		console.log("hideMenuBar complete");
	}

	function onMenuBarClicked() {
		state.activeClick = true;
		console.log("onMenuBarClicked complete");
	}
	function globalClickHandler(e) {
		//Close the menu if user touches anywhere on the page
		//	Requirement: menu must currently be open
		//	Exception: don't close menu if user has clicked on the menu itself.
		//	Exception: don't close menu if global ignore click state has been set.
		if (state.menuOpen && !state.activeClick && !state.ignoreClick) {
			hideMenuBar();
		}
		state.activeClick = false;
		state.ignoreClick = false;
		console.log("globalClickHandler complete");
	}
	
	function createSwipeMenu() {
		var rightButtons, leftButtons, menuBar, existingMenu, top, style;

		top = parseInt(height / 9, 10);
		
		rightButtons = document.createElement("ul");
		rightButtons.id = "menuBarRightButtons";
		rightButtons.style.cssFloat = "right";
		rightButtons.style.listStyle = "none";
		rightButtons.style.margin = "0";
		rightButtons.style.padding = "0 5px";
		rightButtons.style.border = "0";
		rightButtons.style.position = "relative";
		rightButtons.style.top = top + "px";
		
		leftButtons = document.createElement("ul");
		leftButtons.id = "menuBarLeftButtons";
		leftButtons.style.cssFloat = "left";
		leftButtons.style.listStyle = "none";
		leftButtons.style.margin = "0";
		leftButtons.style.padding = "0 5px";
		leftButtons.style.border = "0";
		leftButtons.style.position = "relative";
		leftButtons.style.top = top + "px";

		menuBar = document.createElement("div");
		menuBar.addEventListener("click", onMenuBarClicked, false);
		menuBar.id = "menuBar";
		//menu structure/position - don't change this:
		menuBar.style.position = "fixed";
		menuBar.style.left = "0px";
		menuBar.style.width = "100%";
		menuBar.style.clear = "both";
		menuBar.style.margin = "0";
		menuBar.style.padding = "0";
		menuBar.style.lineHeight = "1";
		menuBar.style.border = "0";
		menuBar.style.fontSize = "100%";
		//menu theme - you can customize this:
		menuBar.style.background = "rgb(56,54,56)";
		menuBar.style.borderBottom = "solid 1px #DDD";
		menuBar.style.boxShadow = "0px 2px 2px #888";
		menuBar.style.fontFamily = "Arial";
		menuBar.style.color = "#CCCCCC";

		//Content displayed off screen is invisible.  Need to forcefully apply a style
		//	to ensure that target off-screen content (the menu) becomes visible:
		menuBar.style['-webkit-transform'] = 'translate(0, 0)';

		menuBar.appendChild(leftButtons);
		menuBar.appendChild(rightButtons);
		
		//Add swipemenu only if it isn't already on the page
		existingMenu = document.getElementById("menuBar");
		if (!existingMenu) {
			document.body.appendChild(menuBar);
		}
		
		console.log("createSwipeMenu complete");
	}

	//Called after a button is added to the menu. Scales menu bar to proper height of newly-added buttons.
	function adjustMenuHeight() {
		var menu, style;

		menu = document.getElementById("menuBar");
		if (menu) {
			//TODO: Not as efficient as possible - would prefer to do only 1 page repaint here:
			menu.style.top = '-' + (height + 3) + 'px';
			menu.style.height = height + 'px';
			//menu.style = style;
		}
	}

	
	//public stuff
	return {
		simulateSwipeEvent : function() {
			state.ignoreClick = true;
			showMenuBar();
			console.log("simulateSwipeEvent complete");
		},
		close : function() {
			hideMenuBar();
			console.log("close complete");
		},
		addButton : function(title, onSelect, alignRight, iconPath, id) {
			var link, fontHeight, img, br, spn, style, i, buttonContainer, existingButtons;

			existingButtons = document.getElementById("menuBar").getElementsByTagName("li");
			for (i = 0; i < existingButtons.length; i= i + 1) {
				if (existingButtons[i].innerText === title) {
					//button already exists - don't add it
					return false;
				}
			}
			
			fontHeight = parseInt(height / 2.5, 10);

			link = document.createElement("li");

			//Set any ID property that may have been provided
			if (id) {
				link.setAttribute('id', id);
			}

			//BUG: we are setting the ID property to allow developers to customize this style
			//	however, we now go and manually overwrite a lot of styles:

			//button structure/position - don't change this:
			link.style.margin = "0 2px 0 2px";
			link.style.border = "0";
			link.style.padding = parseInt(fontHeight / 1.65, 10) + "px 12px";	//scale padding to best fit menu
			link.style.lineHeight = "inherit";
			link.style.fontSize = fontHeight + "px";
			link.style.borderRadius = "10px";
			link.style.cssFloat = "left";
			
			//button theme - customize this:
			link.style.background = "#222";
			link.style.color = "inherit";
			link.style.cursor = "pointer";
			link.style.fontWeight = "inherit";
			link.style.fontFamily = "inherit";
			link.style.textAlign = "center";


			//Can provide a path to an icon
			if (iconPath) {
				//reduce the padding around the image - fits into menu better:
				link.style.padding = parseInt(fontHeight / 4, 10) + "px 12px";
				
				img = new Image();
				img.src = iconPath;
				img.style.height = parseInt(height * 0.6, 10) + "px";		//scale the image to the current menubar height
				link.appendChild(img);

				if (title) {
					br = document.createElement("br");
					link.appendChild(br);
					//If title and image are used together, reduce _image_ size to fit in menu
					img.style.height = parseInt(height * 0.45, 10) + "px";		//scale the image to the current menubar height
					//If title and image are used together, reduce _font_ size to fit in menu
					link.style.fontSize = parseInt(fontHeight/2,10) + "px";
				}
			}
			spn = document.createElement("span");
			spn.innerText = title;
			link.appendChild(spn);
			
			
			//Add click handlers for menu button callbacks:
			if (onSelect) {
				link.addEventListener("click", onSelect, false);
				//close menu bar after user clicks the button
				link.addEventListener("click", hideMenuBar, false);
			}
			
			//Add button to right or left side of menu:
			if (alignRight) {
				buttonContainer = document.getElementById("menuBarRightButtons");
			} else {
				buttonContainer = document.getElementById("menuBarLeftButtons");
			}
			buttonContainer.appendChild(link);
			

			//Tell the menu to set its height (necessary after each button add):
			adjustMenuHeight();

			console.log("addButton '" + title + "' complete");
		},
		doPageLoad : function() {

			createSwipeMenu();

			//Closes the menu after user clicks anywhere on the page
			document.addEventListener("click", globalClickHandler, false);

			if ((typeof window.blackberry !== "undefined") && (typeof blackberry.event !== "undefined")) {
				
				blackberry.event.addEventListener('swipedown', showMenuBar);
				
				
				//blackberry.event.addEventListener("swipedown", swipemenu.showMenuBar);
			}

			console.log("doPageLoad complete");
		},
		setMenuHeight : function(newHeight) {
			height = newHeight;
		}
	};

}());

