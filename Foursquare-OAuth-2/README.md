# Foursquare OAuth 2.0 Sample

This sample demonstrates how to integrate Foursquare and the OAuth 2.0 protocol into a BlackBerry WebWorks application for BlackBerry 10.

Foursquare OAuth Sample is the name of a proof-of-concept WebWorks application that allows a user to authenticate with Foursquare, search for near-by venues using HTML5 Geolocation, and check-in to a venue.

The sample code for this application is Open Source under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.html).

**Applies To**

* [BlackBerry 10 WebWorks SDK](https://developer.blackberry.com/html5/download/sdk) 

**Author(s)** 

* [Chad Tetreault](http://www.twitter.com/chadtatro)

**Dependencies**

1. [bbUI.js](https://github.com/blackberry/bbUI.js) is [licensed](https://github.com/blackberry/bbUI.js/blob/master/LICENSE) under the Apache 2.0 license.

2. [jquery-1.7.2.js](http://code.jquery.com/jquery-1.7.2.js) is [dual licensed](http://jquery.org/license/) under the MIT or GPL Version 2 licenses.

**To contribute code to this repository you must be [signed up as an official contributor](http://blackberry.github.com/howToContribute.html).**

**Icons**<br/>
Icons used here are from [http://subway.pixle.pl/rim](http://subway.pixle.pl/rim) are [licensed](http://creativecommons.org/licenses/by/3.0/) under the CC-BY-3.0 license.  This is a subset of the Subway icons available at http://subway.pixle.pl/

## What's new?

As of WebWorks SDK 1.0.4.7 we now take advantage of the window.open support.  OAuth samples **no longer need to rely on a server-side component** to redirect the webview back to your application.  This provides a nice flowing user experience.

## Initial Foursquare Setup

Open app.js and edit the following object

```
// foursquare setup
foursquareOptions = {
   clientId: '',
   clientSecret: '',
   redirectUri: ''
};
```
## Config.xml 
As of BlackBerry WebWorks 1.0.2.9 SDK, all domains you plan on making Ajax/XHR requests to must be whitelisted in your app's config.xml.

**Note: While we need to disable web security in order to read the location of our childWindow object, it's recommended that you don't do this in your apps unless absolutely necessary.**

```
<access uri="*" subdomains="true" />

<feature id="blackberry.app" >
   <param name="websecurity" value="disable" />
</feature>
```
## Security Considerations
Your Client Secret key, is intended to stay SECRET.  For demonstration purposes we coded the Client ID and Client Secret right in the JavaScript source.  This is not best practice, and is not recommended.  You don’t want anybody to get access to your keys.

One way to securely pass your Client Secret to your application is to host it on a server, then use SSL and do a POST to obtain your key. It can then be used to obtain an Access Token from the service (in this case, Foursquare).

## End Points

This sample app shows how to connect your application with a few different Foursquare end-points. The source code is fairly well commented, and will show the entire flow. The syntax is as follows:

### User grants app permission and Foursquare returns an OAuth access token

```
// open the authorzation url
var url = 'https://foursquare.com/oauth2/authenticate?client_id=' + foursquareOptions.clientId + '&response_type=token&display=touch&redirect_uri=' + foursquareOptions.redirectUri;
childWindow = window.open(url, '_blank');
```
### Search for near-by venues
		
```
var url = 'https://api.foursquare.com/v2/venues/search?ll=' + lat + ',' + lon + '&oauth_token=' + accessToken + '&v=' + currentDate;

$.ajax({
   type: 'GET',
   url: url,
   
   // success
   success: function(data) {
   },

   // fail
   error: function() {
   }
});
```

### Check-in to a venue

```
var url = 'https://api.foursquare.com/v2/checkins/add?venueId=' + venueId + '&oauth_token=' + accessToken;

$.ajax({
   type: 'POST',
   url: url,

   // success
   success: function() {
   },

   // fail
   error: function(data) {
   }
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