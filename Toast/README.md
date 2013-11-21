# Toast Sample
This sample demonstrates how to integrate Toast messages into a BlackBerry WebWorks application for BlackBerry 10.  The API documentation is ***[available here](https://developer.blackberry.com/html5/apis/blackberry.ui.toast.html)***.

The sample code for this application is Open Source under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.html).


**Applies To**

* [BlackBerry 10 WebWorks SDK 2.0](https://developer.blackberry.com/html5/download/sdk)

**Author(s)**

* [Chad Tetreault](http://www.twitter.com/chadtatro)
* [Adam Stanley](http://www.twitter.com/n_adam_stanley)


**Dependencies**

1. [bbUI.js] (https://github.com/blackberry/bbUI.js) is [licensed] (https://github.com/blackberry/bbUI.js/blob/master/LICENSE) under the Apache 2.0 license.

**Icons**<br/>
Icons used here are from [http://subway.pixle.pl/rim](http://subway.pixle.pl/rim) are [licensed](http://creativecommons.org/licenses/by/3.0/) under the CC-BY-3.0 license.  This is a subset of the Subway icons available at http://subway.pixle.pl/

**To contribute code to this repository you must be [signed up as an official contributor](http://blackberry.github.com/howToContribute.html).**

## Screenshots

![Screenshot](https://github.com/blackberry/BB10-WebWorks-Samples/raw/master/Toast/screenshot.png)


## Initial Setup

The following must be added to your CONFIG.XML in order to use the toast API.
```
<feature id="blackberry.ui.toast" />
```
## How to Use

Displaying a Toast message is really easy.  This sample app shows you two methods.  Simple, and Custom.

**Simple Toast**

Displays a custom message to the user for a few seconds, then disappears.
```
var message = 'This is a simple Toast';
blackberry.ui.toast.show(message);
```

**Custom Toast**

Displays a custom message, with an optional button (with callbacks).

```
var message = 'This is my toast!',
    buttonText = 'Click Me',
    toastId,

onButtonSelected = function () {
   	alert('Button was clicked for toast: ' + toastId);
},

onToastDismissed = function () {
   	alert('Toast disappeared: ' + toastId);
};

options = {
   	buttonText : buttonText,
    buttonCallback : onButtonSelected,
    dismissCallback : onToastDismissed
};

toastId = blackberry.ui.toast.show(message, options);
```

## How to Build

1. Clone this repo to your local machine.
2. Ensure the [BlackBerry 10 WebWorks SDK 2.0](https://developer.blackberry.com/html5/download/sdk) is correctly installed.
3. Open a command prompt (windows) or terminal (mac) and run the following command:

	```
	webworks create <your source folder>\Toast
	```

3. **Replace** the default Toast\www folder with the \www folder from **this** project
4. From the command prompt (Windows) or terminal (mac), navigate to the Toast folder

	```
	cd <your source folder>\Toast
	```

5. Run the following commands to configure plugins used by **this app**

	```
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