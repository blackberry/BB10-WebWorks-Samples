# Foursquare Cards

This sample demonstrates how an application can integrate with the available Foursquare Cards in a BlackBerry WebWorks application for BlackBerry 10.


**Applies To**

* [Foursquare](http://engineering.foursquare.com/2013/01/31/native-app-integration-like-never-before-the-foursquare-for-blackberry-10-sdk/)
* [Invocation Framework](https://developer.blackberry.com/html5/apis/blackberry.invoke.html)
* [BlackBerry 10 WebWorks SDK](https://developer.blackberry.com/html5/download/sdk) 

**Author(s)** 

* [Chad Tetreault](http://www.twitter.com/chadtatro)

**Dependencies**

1. [bbUI.js](https://github.com/blackberry/bbUI.js) is [licensed](https://github.com/blackberry/bbUI.js/blob/master/LICENSE) under the Apache 2.0 license.
2. [Built for BlackBerry Boilerplate](https://github.com/blackberry/BB10-WebWorks-Samples/tree/master/BfB-Boilerplate-bbUI.js-0.9x) is [licensed](https://github.com/blackberry/bbUI.js/blob/master/LICENSE) under the Apache 2.0 license.


**Icons**

* The [Liz Myers](http://www.myersdesign.com) Icon set is [licensed](http://creativecommons.org/licenses/by/3.0/) under the CC-BY-3.0 license.

**Contributing**

* To contribute code to this repository you must be [signed up as an official contributor](http://blackberry.github.com/howToContribute.html).

## Screenshots ##

![image](https://raw.github.com/blackberry/BB10-WebWorks-Samples/master/Foursquare-Cards/_screenshots/one.png)

## Using The Sample ##

####Single Sign-On

	var request = {
		target: "com.foursquare.blackberry.sso.card",
		action: "bb.action.VIEW",
		type: "sso/foursquare",
		data: "L4CURGRJ0JCCVA0QJ1Y5JI052HMZI0MSQIQMVTMX1JTN43L2"
	};


####Venue Search

	var request = {
		target: "com.foursquare.blackberry.venuesearch.card",
		action: "bb.action.VIEW",
		type: "venuesearch/foursquare",
		uri: "foursquare://venues/search?oauth_token=" + accessToken,
	};
	

####Explore

	var request = {
		target: "com.foursquare.blackberry.uri",
		action: "bb.action.OPEN",
		uri: "foursquare://venues/explore"
	};	


####User Profile

	var request = {
		target: "com.foursquare.blackberry.uri",
		action: "bb.action.OPEN",
		uri: "foursquare://users/self/update"
	};


####Friend Requests

	var request = {
		target: "com.foursquare.blackberry.uri",
		action: "bb.action.OPEN",
		uri: "foursquare://users/requests"
	};


####Friend Suggestions

	var request = {
		target: "com.foursquare.blackberry.uri",
		action: "bb.action.OPEN",
		uri: "foursquare://users/suggest?type=friend"
	};


####Page Suggestions

	var request = {
		target: "com.foursquare.blackberry.uri",
		action: "bb.action.OPEN",
		uri: "foursquare://users/suggest?type=page"
	};


####Add Friends

	var request = {
		target: "com.foursquare.blackberry.uri",
		action: "bb.action.OPEN",
		uri: "foursquare://users/addfriends?from=phonebook"
	};


####Checkin

	var request = {
		target: "com.foursquare.blackberry.uri",
		action: "bb.action.OPEN",
		uri: "foursquare://checkins/50a08609e4b04c46ea54446d"
	};


####How to call the invocation request

	blackberry.invoke.invoke(
		request,

		// success
		function() {
			console.log('success');
		},

		// error
		function(e) {
			console.log(e);
		}
	);


## Config.xml Setup ##

The following must be whitelisted in the **config.xml** file

	<feature id="blackberry.invoke" />
	<feature id="blackberry.invoke.card" />



## How To Build

1. Clone the repo to your local machine
2. Use Using the Ripple Mobile Emulator and the BlackBerry 10 WebWorks SDK, package the contents of your local BB10-WebWorks-Samples/Boilerplate-bbUI.js-0.9x folder into a BlackBerry application.


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
