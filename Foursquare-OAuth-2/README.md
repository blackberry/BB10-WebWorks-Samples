# Foursquare OAuth 2.0 Sample

This sample demonstrates how to integrate Foursquare and the OAuth 2.0 protocol into a BlackBerry WebWorks application for BlackBerry 10.

Foursquare OAuth Sample is the name of a proof-of-concept WebWorks application that allows a user to authenticate with Foursquare, search for near-by venues using HTML5 Geolocation, and check-in to a venue.

The sample code for this application is Open Source under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.html).


**Applies To**

* [BlackBerry 10 WebWorks SDK](https://developer.blackberry.com/html5/download/sdk) 

**Author(s)** 

* Chad Tetreault (http://www.twitter.com/chadtatro)

**Dependencies**

1. [jquery-1.7.2.js](http://code.jquery.com/jquery-1.7.2.js) is [dual licensed](http://jquery.org/license/) under the MIT or GPL Version 2 licenses.

**To contribute code to this repository you must be [signed up as an official contributor](http://blackberry.github.com/howToContribute.html).**

## Initial Foursquare Setup
1. Open index.html
2. Include the webworks-.js file ***see How To Build*** for instructions
3. Create an application on Foursquare (https://developer.foursquare.com/) 
4. Under “Callback URL” enter “local:///index.html”
5. When your app is created, copy down your Client ID, and Client Secret

## WebWorks App Setup
1. Open js/oauth.js from the project folder.
2. Edit clientId and clientSecret to reflect the keys given to you from Foursquare.

```
// foursquare setup
foursquareOptions = {
   clientId: '<client id goes here>',
   clientSecret: '<client secret goes here>',
   callbackUrl: 'local:///index.html'
};
```

## Config.xml 
As of BlackBerry WebWorks 1.0.2.9 SDK, all domains you plan on making Ajax/XHR requests to must be whitelisted in your app's config.xml.

```
<access uri="*" subdomains="true" />
<access uri="http://foursquare.com" subdomains="true" />    
<access uri="https://foursquare.com" subdomains="true" />    
```

## Security Considerations
Your Client Secret key, is intended to stay SECRET.  For demonstration purposes we coded the Client ID and Client Secret right in the JavaScript source.  This is not best practice, and is not recommended.  You don’t want anybody to get access to your keys.

One way to securely pass your Client Secret to your application is to host it on a server, then use SSL and do a POST to obtain your key. It can then be used to obtain an Access Token from the service (in this case, Foursquare).

## End Points

This sample app shows how to connect your application with a few different Foursquare end-points. The source code is fairly well commented, and will show the entire flow. The syntax is as follows:

### User grants app permission and Foursquare returns an OAuth access token

```
window.location.replace('https://foursquare.com/oauth2/authenticate?client_id=' + foursquareOptions.clientId + '&response_type=token&display=touch&redirect_uri=' + foursquareOptions.callbackUrl);
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
2. Copy the webworks-.js client file from C:\Program Files\Research In Motion\BlackBerry 10 WebWorks SDK \Framework\clientFiles (Windows) or ~/SDKs/BlackBerry 10 WebWorks SDK /Framework/clientFiles (Mac) into the top level of the local Foursquare-OAuth-2 folder (e.g. ~/WebWorks/Foursquare-OAuth-2/js/webworks/webworks-.js).
3. Optional: Edit the script reference to the webworks-.js file within any *.html files to ensure the version number is correct.
4. Use Using the Ripple Mobile Emulator and either the BlackBerry WebWorks SDK for Smartphone or the BlackBerry WebWorks SDK for Tablet OS, package the contents of your local BB10-WebWorks-Samples/Foursquare-OAuth-2 folder into a BlackBerry application.

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

