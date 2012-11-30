**Setup**

To use, copy into your modules folder, and add the following to your require.config (main.js):

```
require.config({
	...,
	packages: [
	  		{ 
	  			name: 'actionBar',
	  			location: 'modules/actionBar', //this points to the location of the module
	  			main: 'main'
	  		}
	 	]
...
```

**Action Bar with tabs**

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

**Changelog:**

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

**License**

This module is licensed under the Apache license.
