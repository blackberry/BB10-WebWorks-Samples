# Invoke ShareTargets Sample

This sample demonstrates how to invoke a list of Share Targets (aka. display a "Share Card") in a BlackBerry WebWorks application for BlackBerry 10.

**Applies To**

* [BlackBerry 10 WebWorks SDK](https://developer.blackberry.com/html5/download/sdk) 
* [Apache Cordova for BlackBerry 10](https://github.com/blackberry/cordova-blackberry/tree/master/blackberry10) 

**Author(s)** 

* [Chad Tetreault](http://www.twitter.com/chadtatro)

**Dependencies**

1. [bbUI.js](https://github.com/blackberry/bbUI.js) is [licensed](https://github.com/blackberry/bbUI.js/blob/master/LICENSE) under the Apache 2.0 license.

**Icons**

* The [Liz Myers](http://www.myersdesign.com) Icon set and are [licensed](http://creativecommons.org/licenses/by/3.0/) under the CC-BY-3.0 license.

**Contributing**

* To contribute code to this repository you must be [signed up as an official contributor](http://blackberry.github.com/howToContribute.html).

## Screenshots ##

![image](https://raw.github.com/blackberry/BB10-WebWorks-Samples/WebWorks-2.0/Share-Targets/www/_screenshots/sharetargets.png)

## Required Plugins ##

####The following Cordova Plugins are required for this sample:####

	com.blackberry.invoke
	com.blackberry.invoke.card

## API Documentation ##
The documentation for this API is available at https://developer.blackberry.com/html5/apis/blackberry.invoke.card.html#.invokeTargetPicker

## How to use this sample

**Setup the request object**

	var request = {
		action: 'bb.action.SHARE',
		uri: 'file://' + path,
		target_type: ["APPLICATION", "VIEWER", "CARD"]
	};

**Display the "Share Card"**

	blackberry.invoke.card.invokeTargetPicker(request, "Your Title",

		// success callback
		function() {
			console.log('success');
		},

		// error callback
		function(e) {
			console.log('error: ' + e);
		}
	);
	

## How to Build

1. Clone this repo to your local machine.

2. Ensure the [BlackBerry 10 WebWorks SDK 2.0](https://developer.blackberry.com/html5/download/sdk) is correctly installed.

3. Open a command prompt (windows) or terminal (mac) and run the following command:

	```
	webworks create <your source folder>\Share-Targets
	```

4. **Replace** the default ShareTargets\www folder with the \www folder from **this** project

5. **Replace** the default ShareTargets\config.xml with the config.xml from **this** project

6. From the command prompt (Windows) or terminal (mac), navigate to the Share-Targets folder

	```
	cd <your source folder>\Share-Targets
	```

7. Run the following commands to configure plugins used by **this app**

	```
	webworks plugin add com.blackberry.invoke
	webworks plugin add com.blackberry.invoke.card
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
