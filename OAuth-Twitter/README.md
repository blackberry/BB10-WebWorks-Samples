# Twitter - OAuth 1.0 Sample

This sample demonstrates how to integrate Twitter, and the OAuth 1.0 protocol into a BlackBerry WebWorks application for BlackBerry 10.

Twitter OAuth Sample is the name of a proof-of-concept WebWorks application that allows a user to authenticate with Twitter, post a new “tweet”, and view their public timeline. 
**Applies To**

* [BlackBerry 10 WebWorks SDK](https://developer.blackberry.com/html5/download/sdk) 
* [Apache Cordova for BlackBerry 10](https://github.com/blackberry/cordova-blackberry/tree/master/blackberry10) 

**Author(s)** 

* [Chad Tetreault](http://www.twitter.com/chadtatro)

**Dependencies**

1. [jsOauth-1.3.4.js](http://github.com/bytespider/jsOAuth) is [licensed](https://github.com/bytespider/jsOAuth/blob/master/LICENCE) under the MIT license.
2. [bbUI.js](https://github.com/blackberry/bbUI.js) is [licensed] (https://github.com/blackberry/bbUI.js/blob/master/LICENSE) under the Apache 2.0 license.
3. [jQuery](http://code.jquery.com/jquery-1.7.2.js) is [dual licensed](http://jquery.org/license/) under the MIT or GPL Version 2 licenses.

**Icons**

* The [Liz Myers](http://www.myersdesign.com) Icon set and are [licensed](http://creativecommons.org/licenses/by/3.0/) under the CC-BY-3.0 license.

**Contributing**

* To contribute code to this repository you must be [signed up as an official contributor](http://blackberry.github.com/howToContribute.html).

## Screenshots ##

![image](https://raw.github.com/blackberry/BB10-WebWorks-Samples/WebWorks-2.0/OAuth-Twitter/www/_screenshots/oauth-twitter.png)

## Required Plugins ##

####The following Cordova Plugins are required for this sample:####

	com.blackberry.app
	com.blackberry.ui.toast

## Initial Twitter Setup

1. Create an application on Twitter (https://dev.twitter.com)
2. Under "Callback URL" enter the domain where your app will return to upon authentication
3. When your app is created, copy down your Consumer Key, and Consumer Secret

## WebWorks App Setup
Open app.js and edit the following object

	twitterOptions = {
    	consumerKey: '<consumer key goes here>',
		consumerSecret: '<consumer secret goes here>',
		callbackUrl: '<callback url>'
	};

## Config.xml 

As of BlackBerry WebWorks 1.0.2.9 SDK, all domains you plan on making Ajax/XHR requests to must be whitelisted in your app's config.xml.

**Note: While we need to disable web security in order to read the location of our childWindow object, it's recommended that you don't do this in your apps unless absolutely necessary.**

	<access uri="*" subdomains="true" />
    <preference name="websecurity" value="disable" />

## Security Considerations

Your Consumer Secret key, is intended to stay SECRET.  For demonstration purposes we coded the Consumer Key and Consumer Secret right in the JavaScript source.  This is not best practice, and is not recommended.  You don’t want anybody to get access to your keys.

One way to securely pass your Consumer Secret to your application is to host it on a server, then use SSL and do a POST to obtain your key. It can then be used to obtain an Access Token from the service (in this case, Twitter).

## End Points
This sample app shows how to connect your application with a few different Twitter end-points with the help of the [jsOAuth](http://github.com/bytespider/jsOAuth) library. The source code is fairly well commented, and will show the entire flow. The syntax is as follows:

***Note: This sample shows how to interact with the new Twitter API v1.1 End Points. Important changes have been made, [check-out Twitter's documentation](https://dev.twitter.com/docs/api/1.1).***

###Obtaining Request Tokens

	twitterOauth.get('https://api.twitter.com/oauth/request_token',
		// success callback
		function(data) {
		},

		// failure callback
		function(data) {
		}
	);

###Exchanging request tokens for an Access Token
		
	twitterOauth.get('https://api.twitter.com/oauth/access_token?oauth_verifier=' + oauthVerifier + '&' + requestParams,

		// success callback
		function(data) {
		},

		// failure callback
		function(data) {
		}
	);

###Posting a Tweet

	twitterOauth.post('https://api.twitter.com/1/statuses/update.json', {
		'status': status
		},

		// success callback
		function(data) {
		}, 
   
		// failure
		function(data) {
		}
	);

###Viewing the Timeline

	twitterOauth.get('https://api.twitter.com/1/statuses/user_timeline.json',

		// success
		function(data) {
		},

		// failure
		function(data) {
		}
	);

## How to Build

1. Clone this repo to your local machine.
2. Ensure the [BlackBerry 10 WebWorks SDK 2.0](https://developer.blackberry.com/html5/download/sdk) is correctly installed.
3. Open a command prompt (windows) or terminal (mac) and run the following command:

	```
	webworks create <your source folder>\OAuth-Twitter
	```

3. **Replace** the default OAuth-Twitter\www folder with the \www folder from **this** project
4. From the command prompt (Windows) or terminal (mac), navigate to the OAuth-Twitter folder

	```
	cd <your source folder>\OAuth-Twitter
	```

5. Run the following commands to configure plugins used by **this app**

	```
	webworks plugin add com.blackberry.app
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
* [BlackBerry Open Source WebWorks Contributions Forums](http://supportforums.blackberry.com/t5/BlackBerry-WebWorks/bd-p/ww_con)

## Contributing Changes

Please see the [README](https://github.com/blackberry/BB10-WebWorks-Samples) of the BB10-WebWorks-Samples repository for instructions on how to add new Samples or make modifications to existing Samples.

## Bug Reporting and Feature Requests

If you find a bug in a Sample, or have an enhancement request, simply file an [Issue](https://github.com/blackberry/BB10-WebWorks-Samples/issues) for the Sample.

## Disclaimer

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
