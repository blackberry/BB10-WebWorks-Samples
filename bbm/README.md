# BBM

This application provides a look at **blackberry.bbm.platform** as well as **blackberry.invoke** APIs that will enable developers to leverage BlackBerry Messenger integration within their BlackBerry 10 applications.

To separate the BBM functionality from the remaining application, all relevant BBM implementation was implemented in **bbm.js** while the remaining files are leveraged to configure UI components, and define actions (click event listeners) connecting those components to the API functionality.

The same code will work across other WebKit browser such as Chrome and Safari, without any changes to the code.


**Applies To**

* [BlackBerry 10 WebWorks SDK 2.0](https://developer.blackberry.com/html5/download/sdk)

**Author(s)**

* [Erik Oros](http://www.twitter.com/waterlooerik)
* [Adam Stanley](http://www.twitter.com/n_adam_stanley)

**Dependencies**


**Libraries**

1. [bbUI.js] (https://github.com/blackberry/bbUI.js) is [licensed] (https://github.com/blackberry/bbUI.js/blob/master/LICENSE) under the Apache 2.0 license.



**To contribute code to this repository you must be [signed up as an official contributor](http://blackberry.github.com/howToContribute.html).**

** How to Build **

1. Clone this repo to your local machine.
2. Ensure the [BlackBerry 10 WebWorks SDK 2.0](https://developer.blackberry.com/html5/download/sdk) is correctly installed.
3. Open a command prompt (windows) or terminal (mac) and run the following command:

	```
	webworks create <your source folder>\BBM
	```

3. **Replace** the default BBM\www folder with the \www folder from **this** project
4. From the command prompt (Windows) or terminal (mac), navigate to the BBM folder

	```
	cd <your source folder>\BBM
	```

5. Run the following commands to configure plugins used by **this app**

	```
	webworks plugin add com.blackberry.app
	webworks plugin add com.blackberry.bbm.platform
	webworks plugin add com.blackberry.invoke
	webworks plugin add com.blackberry.invoke.card
	webworks plugin add com.blackberry.system
	webworks plugin add com.blackberry.ui.toast
```

6. Run the following command to build and deploy the app to a device connected via USB

	```
	webworks run
	```

* [BlackBerry HTML5 WebWorks](https://bdsc.webapps.blackberry.com/html5/) - Downloads, Getting Started guides, samples, code signing keys.
* [BlackBerry WebWorks Development Guides](https://bdsc.webapps.blackberry.com/html5/documentation)
* [BlackBerry WebWorks Community Forums](http://supportforums.blackberry.com/t5/Web-and-WebWorks-Development/bd-p/browser_dev)

# Notes and Known Issues

* Registration must occur before any of the **blackberry.bbm.platform** functionality becomes available; working as intended.
* **Set Display Picture** is not properly initiating an update. As a workaround, the **Set Avatar** invocation can be used.
* **Start Chat** is not properly initating a chat when no URI is provided; expected to provide **Contact Picker**. As a workaround, **Share Text** can be invoked with an empty **data** property.
* **Start Chat** will invite the contact to BBM if the provided PIN **does not exist** in your **Contact List**; working as intended.
* **Start Chat** will immediately start a chat session if the provided PIN **exists** in your **Contact List** working as intended.
* There are currently some issues while saving modified **status** and **personal message** values.
* There are some performance issues while loading images and cropping; these have been addressed on later builds.



## Contributing Changes

Please see the [README](https://github.com/blackberry/BB10-WebWorks-Samples) of the BB10-WebWorks-Samples repository for instructions on how to add new Samples or make modifications to existing Samples.


## Bug Reporting and Feature Requests

If you find a bug in a Sample, or have an enhancement request, simply file an [Issue](https://github.com/blackberry/BB10-WebWorks-Samples/issues) for the Sample.

## Disclaimer

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
