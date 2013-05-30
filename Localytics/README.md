# Localytics Sample

This sample demonstrates how to integrate Localytics "App Analytics" in to a BlackBerry WebWorks application for BlackBerry 10.

The sample code for this application is Open Source under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.html).

**Applies To**

* [BlackBerry 10 WebWorks SDK](https://developer.blackberry.com/html5/download/sdk) 

**Author(s)** 

* [Chad Tetreault](http://www.twitter.com/chadtatro)

**Dependencies**

1. [bbUI.js](https://github.com/blackberry/bbUI.js) is [licensed](https://github.com/blackberry/bbUI.js/blob/master/LICENSE) under the Apache 2.0 license.
2. [Localytics](http://localytics.com) is [licensed](http://www.localytics.com/docs/opensourceinfo/#license-documentation) under the Localytics Modified BSD License.

**Icons**

Icons used here are from [http://subway.pixle.pl/rim](http://subway.pixle.pl/rim) are [licensed](http://creativecommons.org/licenses/by/3.0/) under the CC-BY-3.0 license.  This is a subset of the Subway icons available at http://subway.pixle.pl/

**To contribute code to this repository you must be [signed up as an official contributor](http://blackberry.github.com/howToContribute.html).**

## Screenshots 

![Screenshot](https://raw.github.com/ctetreault/BB10-WebWorks-Samples/master/Localytics/screenshot.png)


## How to get started

***Note:*** This sample is collecting live analytics data. To use this sample code in your own application, you must first [register](http://www.localytics.com/register) with Localytics and create your own application. A unique application key will be generated, and used to track analytics for your own app.

***1. Register with Localytics***</br>
To begin tracking your own applications usage, you must [Sign-up for Localytics](http://www.localytics.com/register). Once registered you will be able to create a new application and obtain your unique app "key" (used for tracking analytics). If you'd like to run this sample app using my test keys that's fine as well, just remember that in order to track your own analytics you'll need to register for an account.<br/>

***2. Use your own key***</br>
Your application key is used to identify your specific app on the Localytics server, so it knows which app is being tracked. If you are using this sample code for reference and did not replace my key for yours, you will not see any analytics data when you login to your Localytics dashboard.

To use your own key, edit the following code on ***line 31 of js/app.js***.

```
localyticsSession = LocalyticsSession("<insert your key here>", options);
```

***3. Tracking events and usage***</br>
Localytics has done an amazing job at creating simple, easy to follow instructions for how to get started. Rather than duplicate their efforts I ***strongly*** recommend that you read their [HTML5 Integration Guide](http://www.localytics.com/docs/html5-integration/).

## How to Build

1. Clone the repo to your local machine
2. Use Using the Ripple Mobile Emulator and the BlackBerry 10 WebWorks SDK, package the contents of your local BB10-WebWorks-Samples/Localytics folder into a BlackBerry application.

## More Info

* [BlackBerry HTML5 WebWorks](https://bdsc.webapps.blackberry.com/html5/) - Downloads, Getting Started guides, samples, code signing keys.
* [BlackBerry WebWorks Development Guides](https://bdsc.webapps.blackberry.com/html5/documentation)
* [BlackBerry WebWorks Community Forums](http://supportforums.blackberry.com/t5/Web-and-WebWorks-Development/bd-p/browser_dev)
* [BlackBerry Open Source WebWorks Contributions Forums](http://supportforums.blackberry.com/t5/BlackBerry-WebWorks/bd-p/ww_con)

## Contributing Changes

Please see the [README](https://github.com/blackberry/BB10-WebWorks-Samples) of the BB10-WebWorks-Samples repository for instructions on how to add new Samples or make modifications to existing Samples.

## Bug Reporting and Feature Requests

If you find a bug in a Sample, or have an enhancement request, simply file an [Issue](https://github.com/blackberry/BB10-WebWorks-Samples/issues) for the Sample and send a message (via GitHub messages) to the Sample Author(s) to let them know that you have filed an [Issue](https://github.com/blackberry/BB10-WebWorks-Samples/issues).

## Disclaimer

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
