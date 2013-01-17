# Maps Sample

This sample demonstrates how to integrate a few popular mapping services into a BlackBerry WebWorks application for BlackBerry 10.

The sample code for this application is Open Source under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.html).


**Applies To**

* [BlackBerry 10 WebWorks SDK](https://developer.blackberry.com/html5/download/sdk)

**Author(s)**

* [Chad Tetreault](http://www.twitter.com/chadtatro)

**Dependencies**

1. [jquery-1.7.2.js](http://code.jquery.com/jquery-1.7.2.js) is [dual licensed](http://jquery.org/license/) under the MIT or GPL Version 2 licenses.

2. [bbUI.js] (https://github.com/blackberry/bbUI.js) is [licensed] (https://github.com/blackberry/bbUI.js/blob/master/LICENSE) under the Apache 2.0 license.

**Icons**<br/>
Icons used here are from [http://subway.pixle.pl/rim](http://subway.pixle.pl/rim) are [licensed](http://creativecommons.org/licenses/by/3.0/) under the CC-BY-3.0 license.  This is a subset of the Subway icons available at http://subway.pixle.pl/

**Demo Video**<br/>
Check-out the demo video on the [BlackBerry DevTube Channel](http://www.youtube.com/watch?v=lSn3rex7PCI).


**To contribute code to this repository you must be [signed up as an official contributor](http://blackberry.github.com/howToContribute.html).**

## Initial Setup

***To use this sample, you must sign up for API keys from the service you wish to use.  The links below will point you in the right direction. ***

[Google Maps](https://code.google.com/apis/console)<br/>
[Bing Maps](http://www.bingmapsportal.com/)<br/>
[Leaflet via CloudMade](http://ww.cloudmade.com/)<br/>
[OpenLayers](http://www.openlayers.org)<br/>

## Add your API Keys
Open ***js/maps.js*** and enter your API Keys in the proper place

```
function initApp() {

  APIKey = {
    'bing': '<my bing key>',
    'leaflet': '<my leafleft/cloudmade key>'
  };

  console.log('app initialized');
  startGeolocation();
}
```
## Config.xml
As of BlackBerry WebWorks 1.0.2.9 SDK, all domains you plan on making Ajax/XHR requests to must be whitelisted in your app's config.xml.

```
<access uri="*" subdomains="true" />
<access uri="http://virtualearth.net" subdomains="true" />
<access uri="http://bing.net" subdomains="true" />
```

Don't forget to access the devices location information via HTML5 Geolocation, the proper permissions must be requested.

```
<rim:permissions>
   <rim:permit>read_geolocation</rim:permit>
</rim:permissions>
```

## Security Considerations

Your API Keys are meant to be private. For demonstration purposes we're coding the keys right in the JavaScript source.  This is not best practice, and is not recommended. You don’t want anybody to get access to your keys.

***One way*** to securely pass your API Keys to your application is to host them on a server, then use SSL and do a POST to obtain your keys.


## How to Build

1. Clone the repo to your local machine
2. Use Using the Ripple Mobile Emulator and either the BlackBerry WebWorks SDK for Smartphone or the BlackBerry WebWorks SDK for Tablet OS, package the contents of your local BB10-WebWorks-Samples/Maps folder into a BlackBerry application.

## More Info

* [BlackBerry HTML5 WebWorks](https://bdsc.webapps.blackberry.com/html5/) - Downloads, Getting Started guides, samples, code signing keys.
* [BlackBerry WebWorks Development Guides](https://bdsc.webapps.blackberry.com/html5/documentation)
* [BlackBerry WebWorks Community Forums](http://supportforums.blackberry.com/t5/Web-and-WebWorks-Development/bd-p/browser_dev)
* [BlackBerry Open Source WebWorks Contributions Forums](http://supportforums.blackberry.com/t5/BlackBerry-WebWorks/bd-p/ww_con)


## Contributing Changes

Please see the [README](https://github.com/blackberry/BB10-WebWorks-Samples) of the BB10-WebWorks-Samples repository for instructions on how to add new Samples or make modifications to existing Samples.


## Bug Reporting and Feature Requests

If you find a bug in a Sample, or have an enhancement request, simply file an [Issue](https://github.com/blackberry/BB10-WebWorks-Samples/issues) for the Sample and send a message (via github messages) to the Sample Author(s) to let them know that you have filed an [Issue](https://github.com/blackberry/BB10-WebWorks-Samples/issues).

## Disclaimer

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

