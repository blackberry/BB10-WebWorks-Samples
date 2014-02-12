# Gestures Sample

This sample demonstrates how to easily use gestures in a BlackBerry WebWorks application for BlackBerry 10 using the Hammer.js library. 

**Applies To**

* [Hammer.js](http://eightmedia.github.io/hammer.js/)
* [BlackBerry 10 WebWorks SDK](https://developer.blackberry.com/html5/download/sdk) 
* [Apache Cordova for BlackBerry 10](https://github.com/blackberry/cordova-blackberry/tree/master/blackberry10) 

**Author(s)** 

* [Chad Tetreault](http://www.twitter.com/chadtatro)

**Waving Image Contribution** 

* [Jesse Ariss](http://www.twitter.com/jesseariss)

**Dependencies**

1. [Hammer.js] (https://github.com/EightMedia/hammer.js) is [licensed] (https://github.com/EightMedia/hammer.js/blob/master/LICENSE) under the MIT license.
2. [jquery-1.7.2.js](http://code.jquery.com/jquery-1.7.2.js) is [dual licensed](http://jquery.org/license/) under the MIT or GPL Version 2 licenses.

**Contributing**

* To contribute code to this repository you must be [signed up as an official contributor](http://blackberry.github.com/howToContribute.html).

## Screenshots ##

![image](https://raw.github.com/blackberry/BB10-WebWorks-Samples/WebWorks-2.0/gestures/www/_screenshots/gestures2.png)
![image](https://raw.github.com/blackberry/BB10-WebWorks-Samples/WebWorks-2.0/gestures/www/_screenshots/gestures1.png)


## Required Plugins ##

####The following Cordova Plugins are required for this sample:####

	com.blackberry.ui.toast

## Using this sample ##

**Adding touch-event listeners**


	var head = new Hammer(document.getElementById("hitHead"), { 
		// set an optional 'length of hold' timeout
		hold_timeout: 500
	});


**Event Workers**

	head.ondragstart = function(ev) {
		// do something when dragging of element starts
	};

	head.ondragend = function(ev) {
		// do something when dragging is finished
	}

## How to Build

1. Clone this repo to your local machine.

2. Ensure the [BlackBerry 10 WebWorks SDK 2.0](https://developer.blackberry.com/html5/download/sdk) is correctly installed.

3. Open a command prompt (windows) or terminal (mac) and run the following command:

	```
	webworks create <your source folder>\Gestures
	```

4. **Replace** the default Gestures\www folder with the \www folder from **this** project

5. **Replace** the default Gestures\config.xml with the config.xml from **this** project

6. From the command prompt (Windows) or terminal (mac), navigate to the Gestures folder

	```
	cd <your source folder>\Gestures
	```

7. Run the following commands to configure plugins used by **this app**

	```
	webworks plugin add com.blackberry.ui.toast
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
