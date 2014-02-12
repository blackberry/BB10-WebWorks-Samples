# Built For BlackBerry - BBUI.js 0.9x Boilerplate

This sample is a meant to be a starting point for any BlackBerry WebWorks developer creating an app that delivers the signature BlackBerry 10 experience, and could pass the "Built For BlackBerry" designation.  

It includes many of the "must have" components:  [BBM](https://github.com/blackberry/BB10-WebWorks-Samples/tree/master/bbm), [Share Framework](https://github.com/blackberry/BB10-WebWorks-Samples/tree/master/ShareTargets), [App Menu](https://developer.blackberry.com/devzone/design/bb10/menus.html) (swipe down), [Window Covers](https://github.com/blackberry/BB10-WebWorks-Samples/tree/master/WindowCovers), [Toasts](https://github.com/blackberry/BB10-WebWorks-Samples/tree/master/Toast), BlackBerry 10 UI look and feel using [bbUI.js](https://github.com/blackberry/bbUI.js).

If you'd like to learn more about the [Built For BlackBerry](https://developer.blackberry.com/builtforblackberry) program, be sure to head on over to the [website](https://developer.blackberry.com/builtforblackberry).

**Applies To**

* [BlackBerry 10 WebWorks SDK](https://developer.blackberry.com/html5/download/sdk) 
* [Apache Cordova for BlackBerry 10](https://github.com/blackberry/cordova-blackberry/tree/master/blackberry10) 

**Author(s)** 

* [Chad Tetreault](http://www.twitter.com/chadtatro)

**Built For BlackBerry**

* Visit the [Built For BlackBerry](https://developer.blackberry.com/builtforblackberry/documentation/overview.html) program overview page.

**Dependencies**

1. [bbUI.js](https://github.com/blackberry/bbUI.js) is [licensed](https://github.com/blackberry/bbUI.js/blob/master/LICENSE) under the Apache 2.0 license.

**Icons**

* The [Liz Myers](http://www.myersdesign.com) Icon set and are [licensed](http://creativecommons.org/licenses/by/3.0/) under the CC-BY-3.0 license.

**Contributing**

* To contribute code to this repository you must be [signed up as an official contributor](http://blackberry.github.com/howToContribute.html).

## Screenshots ##

![image](https://raw.github.com/blackberry/BB10-WebWorks-Samples/WebWorks-2.0/BfB-Boilerplate-bbUI.js-0.9x/www/_screenshots/tabs.png)
![image](https://raw.github.com/blackberry/BB10-WebWorks-Samples/WebWorks-2.0/BfB-Boilerplate-bbUI.js-0.9x/www/_screenshots/invoke.png)
![image](https://raw.github.com/blackberry/BB10-WebWorks-Samples/WebWorks-2.0/BfB-Boilerplate-bbUI.js-0.9x/www/_screenshots/bbm.png)
![image](https://raw.github.com/blackberry/BB10-WebWorks-Samples/WebWorks-2.0/BfB-Boilerplate-bbUI.js-0.9x/www/_screenshots/spinners.png)

## Required Plugins ##

####The following Cordova Plugins are required for this sample:####

	com.blackberry.bbm.platform
	com.blackberry.invoke
	com.blackberry.invoke.card
	com.blackberry.ui.cover
	com.blackberry.ui.toast
	com.blackberry.utils


## Using The Boilerplate ##

####[Activity Spinner](https://github.com/blackberry/bbUI.js/wiki/Activity-Indicator)

**Show**  
	
	Spinner.on('small');
	Spinner.on('medium');	
	Spinner.on('large');	
	
**Hide**

	Spinner.off();
	

####[BBM](https://developer.blackberry.com/devzone/develop/bbm_connected/bbm.html)####


**Register with the BlackBerry Messenger service**

    Bbm.register();

**Update users status message**

	Bbm.updateMessage();
	
**Invite to download**
	
	Bbm.inviteToDownload();


####[Invoking Apps](https://developer.blackberry.com/html5/documentation/invoking_core_apps.html)####

**Share Targets**

	Invoke.app.targets();
	
**BlackBerry Worl - App**
	
	Invoke.app.blackberryWorld(applicationID);
	
**Compose an email**

	Invoke.app.email('email@address.com', 'subject', 'body');
	
**Maps**

	Invoke.app.maps('123 Street St, Waterloo, Ontario, Canada');
	
**NFC**

	Invoke.app.nfc('http://www.blackberry.com');
	
**Twitter**

	Invoke.app.twitter('this is a tweet!');
	
**Facebook**

	Invoke.app.facebook('this is a status update!');
	
**Take Photo**

	Invoke.utils.camera(function(path) {
		// success
			console.log('Photo: ' + path);
		},

		// card closed
		function(reason) {
			console.log('Card closed: ' + reason);
		},

		// error
		function(error) {
			console.log(error);
	});

**File Picker**

	Invoke.utils.filePicker(function(path) {
		// success
			console.log('Picked: ' + path);
		},

		// card closed
		function(reason) {
			console.log('Card closed: ' + reason);
		},

		// error
		function(error) {
			console.log(error);
	});


####[Toasts](https://developer.blackberry.com/html5/apis/blackberry.ui.toast.html)####

**Regular**

	Toast.regular('This is a toast!', 2500);

**With Button**

	Toast.withButton('Toast w/Button', 'Button', 'toastCallbackFunction', 3000);

####[Window Covers](https://developer.blackberry.com/html5/apis/blackberry.ui.cover.html)####

**Setup a Window Cover / Active Frame</br>**

    App.ui.windowCover.setup('local:///cover.png');


## How to Build

1. Clone this repo to your local machine.

2. Ensure the [BlackBerry 10 WebWorks SDK 2.0](https://developer.blackberry.com/html5/download/sdk) is correctly installed.
3. Open a command prompt (windows) or terminal (mac) and run the following command:

	```
	webworks create <your source folder>\BfB-Boilerplate-bbUI.js-0.9x
	```

4. **Replace** the default BfB-Boilerplate-bbUI.js-0.9x\www folder with the \www folder from **this** project

5. **Replace** the default BfB-Boilerplate-bbUI.js\config.xml with the config.xml from **this** project

6. From the command prompt (Windows) or terminal (mac), navigate to the BfB-Boilerplate-bbUI.js-0.9x folder

	```
	cd <your source folder>\BfB-Boilerplate-bbUI.js-0.9x
	```

7. Run the following commands to configure plugins used by **this app**

	```
	webworks plugin add com.blackberry.app
	webworks plugin add com.blackberry.invoke
	webworks plugin add com.blackberry.invoke.card
	webworks plugin add com.blackberry.ui.cover
	webworks plugin add com.blackberry.ui.toast
	webworks plugin add com.blackberry.utils	
	```

8. Run the following command to build and deploy the app to a device connected via USB

	```
	webworks run
	```



## More Info

* [BlackBerry HTML5 WebWorks](https://bdsc.webapps.blackberry.com/html5/) - Downloads, Getting Started guides, samples, code signing keys.
* [BlackBerry WebWorks Development Guides](https://bdsc.webapps.blackberry.com/html5/documentation)
* [BlackBerry WebWorks Community Forums](http://supportforums.blackberry.com/t5/Web-and-WebWorks-Development/bd-p/browser_dev)
* [BlackBerry Open Source WebWorks Contributions Forums](http://supportforums.blackberry.com/t5/BlackBerry-WebWorks/bd-p/ww_con)

## Contributing Changes

Please see the [README](https://github.com/blackberry/BB10-WebWorks-Samples) of the BB10-WebWorks-Samples repository for instructions on how to add new Samples or make modifications to existing Samples.

## Bug Reporting and Feature Requests

If you find a bug in a Sample, or have an enhancement request, simply file an [Issue](https://github.com/blackberry/BB10-WebWorks-Samples/issues) for the Sample.

## Disclaimer

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
