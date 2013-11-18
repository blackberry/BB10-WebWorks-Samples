# "WebWorks Weather" Sample

This is an example of a "Built For BlackBerry" application.  It includes many of the "must have" components:
* [BBM](https://github.com/blackberry/BB10-WebWorks-Samples/tree/master/bbm)
* [Share Framework](https://github.com/blackberry/BB10-WebWorks-Samples/tree/master/ShareTargets)
* App Menu (swipe down)
* [Window Covers](https://github.com/blackberry/BB10-WebWorks-Samples/tree/master/WindowCovers)
* [Toasts](https://github.com/blackberry/BB10-WebWorks-Samples/tree/master/Toast)
*  BlackBerry 10 UI look and feel using [bbUI.js](https://github.com/blackberry/bbUI.js).

**Applies To**

* [BlackBerry 10 WebWorks SDK 2.0](https://developer.blackberry.com/html5/download/sdk)

**Author(s)**

* [Michelle Mendoza](http://www.twitter.com/mendozamiche)
* [Adam Stanley](http://www.twitter.com/n_adam_stanley)

**Built For BlackBerry**

Visit the [Built For BlackBerry](https://developer.blackberry.com/builtforblackberry/documentation/overview.html) for more information on the Built For BlackBerry program.

**Dependencies**

1. [bbUI.js] (https://github.com/blackberry/bbUI.js) is [licensed] (https://github.com/blackberry/bbUI.js/blob/master/LICENSE) under the Apache 2.0 license.

2. [jquery-1.9.1.js](http://code.jquery.com/jquery-1.9.1.js) is [dual licensed](http://jquery.org/license/) under the MIT or GPL Version 2 licenses.

3. Please register for a API key at [developer.forecast.io](http://developer.forecast.io) in order to test the sample application and enter the key in the "js/app.js" file

**Icons**

Icons provided by [Myers Design Limited](http://myersdesign.com/resources/)

**To contribute code to this repository you must be [signed up as an official contributor](http://blackberry.github.com/howToContribute.html).**

## How to Build

1. Clone this repo to your local machine.
2. Ensure the [BlackBerry 10 WebWorks SDK 2.0](https://developer.blackberry.com/html5/download/sdk) is correctly installed.
3. Open a command prompt (windows) or terminal (mac) and run the following command:

	```
	webworks create <your source folder>\WebWorksWeather
	```

3. **Replace** the default WebWorksWeather\www folder with the \www folder from **this** project
4. From the command prompt (Windows) or terminal (mac), navigate to the WebWorksWeather folder

	```
	cd <your source folder>\WebWorksWeather
	```

5. Run the following commands to configure plugins used by **this app**

	```
	webworks plugin add com.blackberry.app
	webworks plugin add com.blackberry.bbm.platform
	webworks plugin add com.blackberry.invoke
	webworks plugin add com.blackberry.invoke.card
	webworks plugin add com.blackberry.system
	webworks plugin add com.blackberry.ui.cover
	webworks plugin add com.blackberry.ui.dialog
	webworks plugin add com.blackberry.ui.toast
```

6. Run the following command to build and deploy the app to a device connected via USB

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