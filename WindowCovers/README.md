# Window Covers Sample

This sample demonstrates how to integrate Window Covers into a BlackBerry WebWorks application for BlackBerry 10.

The sample code for this application is Open Source under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.html).

**Applies To**

* [BlackBerry 10 WebWorks SDK 2.0](https://developer.blackberry.com/html5/download/sdk)

**Author(s)**

* [Chad Tetreault](http://www.twitter.com/chadtatro)
* [Adam Stanley](http://www.twitter.com/n_adam_stanley)

**Dependencies**

1. [bbUI.js] (https://github.com/blackberry/bbUI.js) is [licensed] (https://github.com/blackberry/bbUI.js/blob/master/LICENSE) under the Apache 2.0 license.

**Icons**

Icons used here are from [Liz Myers](http://www.myersdesign.com) and are [licensed](http://creativecommons.org/licenses/by/3.0/) under the CC-BY-3.0 license.

**To contribute code to this repository you must be [signed up as an official contributor](http://blackberry.github.com/howToContribute.html).**

## Screenshots

![Screenshot](https://raw.github.com/blackberry/BB10-WebWorks-Samples/master/WindowCovers/screenshot.png)

## API Documentation ##
The documentation for this API is available at https://developer.blackberry.com/html5/apis/blackberry.ui.cover.html

**Config.xml**

The following feature must be included in your project's config.xml.
```
<feature id="blackberry.ui.cover" />
```

**Set the Cover Photo**
```
blackberry.ui.cover.setContent(blackberry.ui.cover.TYPE_IMAGE, {
	path: <path to the photo>
});
```

**Set the Cover Label**
```
blackberry.ui.cover.labels = [{
	label: "This is my label",
	size: 10,
	wrap: true
}];
```

**Update the Cover**
```
blackberry.ui.cover.updateCover();
```

## How to Build

1. Clone this repo to your local machine.
2. Ensure the [BlackBerry 10 WebWorks SDK 2.0](https://developer.blackberry.com/html5/download/sdk) is correctly installed.
3. Open a command prompt (windows) or terminal (mac) and run the following command:

	```
	webworks create <your source folder>\WindowCovers
	```

3. **Replace** the default WindowCovers\www folder with the \www folder from **this** project
4. From the command prompt (Windows) or terminal (mac), navigate to the WindowCovers folder

	```
	cd <your source folder>\WindowCovers
	```

5. Run the following commands to configure plugins used by **this app**

	```
	webworks plugin add com.blackberry.app
	webworks plugin add com.blackberry.invoke.card
	webworks plugin add com.blackberry.ui.cover
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
