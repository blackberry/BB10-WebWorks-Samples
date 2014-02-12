# Custom Context Menu Sample

This sample demonstrates how to set custom Context Menu's to DOM Elements into a BlackBerry WebWorks application for BlackBerry 10.

The sample code for this application is Open Source under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.html).


**Applies To**

* [BlackBerry 10 WebWorks SDK](https://developer.blackberry.com/html5/download/sdk)

**Author(s)**

* [Chad Tetreault](http://www.twitter.com/chadtatro)
* [Adam Stanley](http://www.twitter.com/n_adam_stanley)

**Dependencies**

1. [bbUI.js] (https://github.com/blackberry/bbUI.js) is [licensed] (https://github.com/blackberry/bbUI.js/blob/master/LICENSE) under the Apache 2.0 license.

**Icons**<br/>
Icons used here are from [Liz Myers](http://www.myersdesign.com) and are [licensed](http://creativecommons.org/licenses/by/3.0/) under the CC-BY-3.0 license.

**To contribute code to this repository you must be [signed up as an official contributor](http://blackberry.github.com/howToContribute.html).**

## Screenshots

![Screenshot](https://raw.github.com/blackberry/BB10-WebWorks-Samples/master/CustomContext/screenshot.png)

## API Documentation ##
The documentation for this API is available at https://developer.blackberry.com/html5/apis/blackberry.ui.contextmenu.html#.defineCustomContext

## How to Use

**Config.xml**

The following feature must be included in your project's config.xml.
```
<feature id="blackberry.ui.contextmenu" />
```

**Define the custom Context Menu**
```
var options = {
	includeContextItems: [blackberry.ui.contextmenu.CONTEXT_IMAGE],
	includePlatformItems: true,
	includeMenuServiceItems: true
};

blackberry.ui.contextmenu.defineCustomContext("myContext", options)
```

**Setup the custom menu item**
```
var myItem = {
	actionId: 'MyCustomAction',
    label: 'Custom Item',
    icon: <path to image>
},
```

**Set which context type will trigger the menu**
```
contexts = [blackberry.ui.contextmenu.CONTEXT_IMAGE];
```

**Add the custom menu item to the Context Menu**
```
blackberry.ui.contextmenu.addItem(contexts, myItem, function() {
	console.log('Custom item selected');
});
```
## How to Build

1. Clone this repo to your local machine.

2. Ensure the [BlackBerry 10 WebWorks SDK 2.0](https://developer.blackberry.com/html5/download/sdk) is correctly installed.

3. Open a command prompt (windows) or terminal (mac) and run the following command:

	```
	webworks create <your source folder>\CustomContext
	```

4. **Replace** the default CustomContext\www folder with the \www folder from **this** project

5. **Replace** the default CustomContext\config.xml with the config.xml from **this** project

6. From the command prompt (Windows) or terminal (mac), navigate to the CustomContext folder

	```
	cd <your source folder>\CustomContext
	```

7. Run the following commands to configure plugins used by **this app**

	```
	webworks plugin add com.blackberry.app
	webworks plugin add com.blackberry.ui.toast
	webworks plugin add com.blackberry.ui.contextmenu
	```

8. Run the following command to build and deploy the app to a device connected via USB

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
