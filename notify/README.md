# HTML5 Notification Sample Application

Sample applications that demonstrate how to use the HTML5 Notification API for the Blackberry 10 WebWorks SDK

**Applies To**

* [BlackBerry 10 WebWorks SDK 2.0](https://developer.blackberry.com/html5/download/sdk)


**Author(s)**

* [Hasan Ahmad](https://github.com/haahmad)
* [Adam Stanley](https://github.com/n_adam_stanley)

**Screenshot**

![image](screenshot_notifications.jpg)

**Dependencies**

1. [jquery.mobile-1.1.0.min.js, jquery.mobile-1.1.0.min.css, jquery-1.7.1.min.js ](http://www.jquerymobile.com/) The jQuery Mobile Framework

**To contribute code to this repository you must be [signed up as an official contributor](http://blackberry.github.com/howToContribute.html).**

## How to Build

1. Clone this repo to your local machine.

2. Ensure the [BlackBerry 10 WebWorks SDK 2.0](https://developer.blackberry.com/html5/download/sdk) is correctly installed.

3. Open a command prompt (windows) or terminal (mac) and run the following command:

	```
	webworks create <your source folder>\Notify
	```

4. **Replace** the default Notify\www folder with the \www folder from **this** project

5. **Replace** the default Notify\config.xml with the config.xml from **this** project

6. From the command prompt (Windows) or terminal (mac), navigate to the Notify folder

	```
	cd <your source folder>\Notify
	```

7. Run the following commands to configure plugins used by **this app**

	```
	webworks plugin add com.blackberry.invoke
	webworks plugin add com.blackberry.invoked
	webworks plugin add com.blackberry.notification
	```

8. Run the following command to build and deploy the app to a device connected via USB

	```
	webworks run
	```


## More Info

* [BlackBerry HTML5 WebWorks](https://bdsc.webapps.blackberry.com/html5/) - Downloads, Getting Started guides, samples, code signing keys.
* [BlackBerry WebWorks Development Guides] (https://bdsc.webapps.blackberry.com/html5/documentation)
* [BlackBerry WebWorks Community Forums](http://supportforums.blackberry.com/t5/Web-and-WebWorks-Development/bd-p/browser_dev)

## Contributing Changes

Please see the [README](https://github.com/blackberry/BB10-WebWorks-Samples) of the BB10-WebWorks-Samples repository for instructions on how to add new Samples or make modifications to existing Samples.


## Bug Reporting and Feature Requests

If you find a bug in a Sample, or have an enhancement request, simply file an [Issue](https://github.com/blackberry/BB10-WebWorks-Samples/issues) for the Sample.


## Disclaimer

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
