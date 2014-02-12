# Localytics Sample

This sample demonstrates how to integrate Localytics "App Analytics" in to a BlackBerry WebWorks application for BlackBerry 10.
 
**Applies To**

* [Localytics Analytics](http://www.localytics.com)
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

![image](https://raw.github.com/blackberry/BB10-WebWorks-Samples/WebWorks-2.0/Analytics-Localytics/www/_screenshots/localytics.png)

## Required Plugins ##

####The following Cordova Plugins are required for this sample:####

	com.blackberry.app
	com.blackberry.ui.toast


## How to get started

Note: This sample is collecting live analytics data. To use this sample code in your own application, you must first [register](http://www.localytics.com/register) with Localytics and create your own application. A unique application key will be generated, and used to track analytics for your own app.

#####1. Register with Localytics#####
To begin tracking your own applications usage, you must [Sign-up for Localytics](http://www.localytics.com/register). Once registered you will be able to create a new application and obtain your unique app "key" (used for tracking analytics). If you'd like to run this sample app using my test keys that's fine as well, just remember that in order to track your own analytics you'll need to register for an account.<br/>

#####2. Use your own key#####
Your application key is used to identify your specific app on the Localytics server, so it knows which app is being tracked. If you are using this sample code for reference and did not replace my key for yours, you will not see any analytics data when you login to your Localytics dashboard.

To use your own key, edit the following code on ***line 31 of js/app.js***.

```
localyticsSession = LocalyticsSession("<insert your key here>", options);
```

#####3. Tracking events and usage#####
Localytics has done an amazing job at creating simple, easy to follow instructions for how to get started. Rather than duplicate their efforts I ***strongly*** recommend that you read their [HTML5 Integration Guide](http://www.localytics.com/docs/html5-integration/).


## How to Build

1. Clone this repo to your local machine.
 
2. Ensure the [BlackBerry 10 WebWorks SDK 2.0](https://developer.blackberry.com/html5/download/sdk) is correctly installed.
3. Open a command prompt (windows) or terminal (mac) and run the following command:

	```
	webworks create <your source folder>\Analytics-Localytics
	```

4. **Replace** the default Analytics-Localytics\www folder with the \www folder from **this** project

5. **Replace** the default Analytics-Localytics\config.xml with the config.xml from **this** project

6. From the command prompt (Windows) or terminal (mac), navigate to the Analytics-Localytics folder

	```
	cd <your source folder>\Analytics-Localytics
	```

7. Run the following commands to configure plugins used by **this app**

	```
	webworks plugin add com.blackberry.app
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
