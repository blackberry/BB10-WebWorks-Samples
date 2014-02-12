# Swipe Navigation Sample

This sample demonstrates how to swipe left and right, to navigate through an application.  It uses Hammer.js, and bbUI.js.

The sample code for this application is Open Source under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.html).

**Applies To**

* [BlackBerry 10 WebWorks SDK 2.0](https://developer.blackberry.com/html5/download/sdk)

**Author(s)**

* [Chad Tetreault](http://www.twitter.com/chadtatro)
* [Adam Stanley](http://www.twitter.com/n_adam_stanley)

**Screenshot**

![image](screenshot_swipenavigation.jpg)

**Dependencies**

1. [bbUI.js] (https://github.com/blackberry/bbUI.js) is [licensed] (https://github.com/blackberry/bbUI.js/blob/master/LICENSE) under the Apache 2.0 license.
2. [Hammer.js] (https://github.com/EightMedia/hammer.js) is [licensed] (https://github.com/EightMedia/hammer.js/blob/master/LICENSE) under the MIT license.
3. [zepto.js](https://github.com/madrobby/zepto) is [dual licensed](https://github.com/madrobby/zepto/blob/master/MIT-LICENSE) under the MIT license.

**To contribute code to this repository you must be [signed up as an official contributor](http://blackberry.github.com/howToContribute.html).**


**Hammer.js Setup**
We simply specify the element which we will be monitoring for swipe events.  In this case it's the "content" div.
```
var contentSwipe = new Hammer(document.getElementById("content"), {});
```

**Capturing the gestures**
```
contentSwipe.onswipe = function(ev) {
	var dir = ev.direction;

	// swipe from right-to-left
	if (dir === 'left') {
		// do something

	// swipe from left-to-right
	}  else if (dir === 'right') {
		// do something
	}
};
```
## How to Build

1. Clone this repo to your local machine.

2. Ensure the [BlackBerry 10 WebWorks SDK 2.0](https://developer.blackberry.com/html5/download/sdk) is correctly installed.

3. Open a command prompt (windows) or terminal (mac) and run the following command:

	```
	webworks create <your source folder>\Swipe-Navigation
	```

4. **Replace** the default Swipe-Navigation\www folder with the \www folder from **this** project

5. **Replace** the default Swipe-Navigation\config.xml with the config.xml from **this** project

6. From the command prompt (Windows) or terminal (mac), navigate to the Swipe-Navigation folder

	```
	cd <your source folder>\Swipe-Navigation
	```

7. Run the following command to build and deploy the app to a device connected via USB

	```
	webworks run
	```

## More Info

* [BlackBerry HTML5 WebWorks](https://bdsc.webapps.blackberry.com/html5/) - Downloads, Getting Started guides, samples, code signing keys.
* [BlackBerry WebWorks Development Guides](https://bdsc.webapps.blackberry.com/html5/documentation)
* [BlackBerry WebWorks Community Forums](http://supportforums.blackberry.com/t5/Web-and-WebWorks-Development/bd-p/browser_dev)

## Contributing Changes

Please see the [README](https://github.com/blackberry/BB10-WebWorks-Samples) of the BB10-WebWorks-Samples repository for instructions on how to add new Samples or make modifications to existing Samples.

## Bug Reporting and Feature Requests

If you find a bug in a Sample, or have an enhancement request, simply file an [Issue](https://github.com/blackberry/BB10-WebWorks-Samples/issues) for the Sample.

## Disclaimer

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
