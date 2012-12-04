##Purpose##
The purpose of this module is to provide a clean, highly customizable, intuitive way to add a BlackBerry 10 actionBar to your projects. Focus is on performance, state-awareness (using Backbone routes) and simplicity.

##Use##

**Dependencies**

+ Backbone.js
+ lodash/underscore
+ jquery

Edit these in the AMD wrapper of actionBar.js to change from lodash to underscore, or to use different names.  

##Non-AMD use##

```
<head>
	<script type="text/javascript" src="js/lodash.min.js"></script>
	<script type="text/javascript" src="js/jquery.min.js"></script>
	<script type="text/javascript" src="js/backbone.min.js"></script>
	<script type="text/javascript" src="js/actionBar-min.js"></script>
</head>

<body>
  <script>
	Router = Backbone.Router.extend({
		
			routes: {
				"" : "page1",
				"page1" : "page1",
				"page2" : "page2"
			},
			
			initialize: function(){
				this.actionbar = new actionBar({ router: this});
				document.body.appendChild(this.actionbar.el);
				this.actionbar.tabs.add([
					{ 
						title: "page 1",
						url: "page1"
					},
					{ 
						title: "page 2",
						url: "page2"
					},
				]);
			},
			
			
			page1: function(){
				console.log("page 1");
			},
			
			page2: function(){
				console.log("page 2");
			}
	  
	});
	  
	var App = new Router();
	Backbone.history.start();
  
  </script>
...
```

##AMD Use##

To use, copy into your modules/lib folder, and add the following to your require.config (main.js):

```
require.config({
	...,
	paths: {
				actionBar: 'modules/actionBar/actionBar.js'
	}
...
```

Inside router/controller

```
define([ 'actionBar' ],function(){

	//first create an instance and pass the router (scroll to bottom for more info on this)
	var actionBar = new actionBar({ router: this});
  	
  	//and append to your view
  	this.app.append(actionBar.el); 						
						
	//now it's time to add tabs (this can be done during run-time :))
	actionBar.tabs.add([ 
                            {
                                title: "Profile",
                                icon:  "art/icons/profile.png",
                                url: "profile"   //this will trigger app.html#profile
                            },
                            {
                                title: "People",
                                icon:  "art/icons/people.png",
                                url: "people"    //this will trigger app.html#people
                            }
                       ]);
...
```

**Action Bar with back button**

```
//first create an instance with back = true
	var actionBar = new actionBar({ back: true});
  	
  	//and append to your view
  	this.app.append(actionBar.el);
  	
  	//the back button will trigger a window.back(), which will work nicely with the routing, no extra work needed

```

**Icons**

Store your icons in the artwork folder of your project and pass the full path when creating tabs. This ensures you can update actionBar without breaking anything.

##Build##

1. install node (ensure you have an environment variable set up)
2. run build.sh/build.bat

##Changelog:##

+ 0.5.1 - non-AMD version added and tested
+ 0.5 - added almond.js and configured for r.js build/optimization
+ 0.3.1 - moved icons out, for portability
+ 0.3 - dynamic widths for tabs to fill screen width
+ 0.2 - added ability to dynamically add tabs
+ 0.1 - actionBar is now router aware (read notice below)


Note:
If using tabs, pass in the router when initializing actionBar. This ensures that if user goes to route without clicking (using the address bar for example), we highlight the right tab.

If you are calling the actionBar module from the router/controller (like I do), then pass "this" as such:

```
var actionBar = new actionBar({ router: this }); //if instance created within router
//OR
var actionBar = new actionBar({ router: window.controller }); //if instance created outside router
```

##License##

This module is licensed under the Apache license.
