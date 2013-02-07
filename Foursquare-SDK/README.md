# Foursquare SDK Sample

This sample demonstrates how to integrate the new Foursquare SDK into a BlackBerry WebWorks application for BlackBerry 10.

The sample code for this application is Open Source under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.html).

**Applies To**

* [BlackBerry 10 WebWorks SDK](https://developer.blackberry.com/html5/download/sdk) 
* [Foursquare SDK](http://engineering.foursquare.com/2013/01/31/native-app-integration-like-never-before-the-foursquare-for-blackberry-10-sdk/)

**Author(s)** 

* [Chad Tetreault](http://www.twitter.com/chadtatro)

**Dependencies**

1. [bbUI.js](https://github.com/blackberry/bbUI.js) is [licensed](https://github.com/blackberry/bbUI.js/blob/master/LICENSE) under the Apache 2.0 license.
2. [jquery-1.7.2.js](http://code.jquery.com/jquery-1.7.2.js) is [dual licensed](http://jquery.org/license/) under the MIT or GPL Version 2 licenses.

**To contribute code to this repository you must be [signed up as an official contributor](http://blackberry.github.com/howToContribute.html).**

**Icons**<br/>
Icons used here are from [http://subway.pixle.pl/rim](http://subway.pixle.pl/rim) are [licensed](http://creativecommons.org/licenses/by/3.0/) under the CC-BY-3.0 license.  This is a subset of the Subway icons available at http://subway.pixle.pl/

## Screenshots 

![Screenshot](https://raw.github.com/ctetreault/BB10-WebWorks-Samples/master/Foursquare-SDK/screenshot.png)

## Initial Foursquare Setup

Open app.js and add your app's ClientID to the foursqaureOptions object.

```
foursquareOptions = {
   clientId: '',
};
```
## Config.xml 

White-list the foursquare.com domain.

```
<access uri="*" subdomains="true" />
<access uri="https://foursquare.com" subdomains="true" />    
```

Add the feature elements.
```
<feature id="blackberry.ui.toast" />
<feature id="blackberry.invoke" />
```

## Single Sign On (SSO)

With the intoduction of this new Foursquare "SDK", we are now able to take advantage of a SSO flow instead of the old OAuth approach outlined in my [previous sample](https://github.com/blackberry/BB10-WebWorks-Samples/tree/master/Foursquare-OAuth-2).

To start the sign-on process we simply ivoke the Foursquare card.

```
// invoke the card
blackberry.invoke.invoke({
   action: "bb.action.VIEW",
   data: foursquareOptions.clientId,
   target: "com.foursquare.blackberry.sso.card",
   type: "sso/foursquare",
}, 

// invoke success callback
function(data) {
},

// invoke error callback
function(data) {
});

```

### Place Picker

Searching for venues is also really easy.  Again, we simply invoke the Place Picker card.
		
```
blackberry.invoke.invoke({
   target: "com.foursquare.blackberry.venuesearch.card",
   action: "bb.action.VIEW",
   type: "venuesearch/foursquare",
   uri: "foursquare://venues/search?oauth_token=" + accessToken,
},

// invoke success callback
function(data) {
},

// invoke error callback
function(data) {
});
```

## How to Build

1. Clone the repo to your local machine
2. Use Using the Ripple Mobile Emulator and either the BlackBerry WebWorks SDK for Smartphone or the BlackBerry WebWorks SDK for Tablet OS, package the contents of your local BB10-WebWorks-Samples/Foursquare-OAuth-2 folder into a BlackBerry application.

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