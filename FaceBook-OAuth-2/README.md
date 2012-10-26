# Facebook OAuth 2.0 Sample

This sample demonstrates how to integrate Facebook and the OAuth 2.0 protocol into a BlackBerry WebWorks application for BlackBerry 10.

Facebook OAuth Sample is the name of a proof-of-concept WebWorks application that allows a user to authenticate with Facebook, post a new status to, and view their News Feed.

The sample code for this application is Open Source under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.html).


**Applies To**

* [BlackBerry 10 WebWorks SDK](https://developer.blackberry.com/html5/download/sdk) 

**Author(s)** 

* Chad Tetreault (http://www.twitter.com/chadtatro)

**Dependencies**

1. [jquery-1.7.2.js](http://code.jquery.com/jquery-1.7.2.js) is [dual licensed](http://jquery.org/license/) under the MIT or GPL Version 2 licenses.

**To contribute code to this repository you must be [signed up as an official contributor](http://blackberry.github.com/howToContribute.html).**

## Initial Facebook Setup

***Note: At this time Facebook doesn't allow apps to use "local:///" for their OAuth callback.  To work-around this, we're hosting a small PHP script on a webserver which will handle the redirection back to our app.  This PHP script needs to be hosted on the same domain you specify in your app settings on Facebook.***

1. Create an application on Facebook (http://developers.facebook.com/) 
2. Under "App Domains" enter a domain where you'll be hosting your callback PHP script (E.g. mydomain.com)
3. Under "Select how your app integrates with Facebook", choose "Website with Facebook Login"
4. Enter the domain where your PHP script is located (E.g. http://www.mydomain.com/oauth)
3. When your app is created, copy down your App ID, and App Secret

## WebWorks App Setup
1. Open index.html
2. Include the webworks-.js file ***see How To Build*** for instructions
3. Open js/oauth.js from the project folder
4. Edit clientId and clientSecret to reflect the keys given to you from Facebook
5. Move the ***_php*** folder out of the project directory, and see ***Server-side Setup***

```
// facebook setup
facebookOptions = {
   clientId: '<App ID>',
   clientSecret: '<App Secret>',
   redirectUri: 'http://www.mydomain.com/oauth/redirect.php'
};
```
## Config.xml 
As of BlackBerry WebWorks 1.0.2.9 SDK, all domains you plan on making Ajax/XHR requests to must be whitelisted in your app's config.xml.

```
<access uri="*" subdomains="true" />
<access uri="http://facebook.com" subdomains="true" />
<access uri="https://facebook.com" subdomains="true" />
<access uri="http://fbcdn.net" subdomains="true" />
<access uri="https://fbcdn.net" subdomains="true" />
```

## Server-side Setup
1. Upload the ***redirect.php*** script from the ***_php*** folder to your web server
2. ***[optional]*** By default the script is set to redirect to ***local:///index.html***, if you need it to redirect to a different url then edit the PHP script.

```
<?php
   $queryString = $_SERVER['QUERY_STRING'];
   header("Location: local:///index.html?" . $queryString);
?>
```

## Security Considerations

Your App Secret key, is intended to stay SECRET.  For demonstration purposes we coded the App ID and App Secret right in the JavaScript source.  This is not best practice, and is not recommended.  You don’t want anybody to get access to your keys.

One way to securely pass your App Secret to your application is to host it on a server, then use SSL and do a POST to obtain your key. It can then be used to obtain an Access Token from the service (in this case, Facebook).

## End Points

This sample app shows how to connect your application with a few different Facebook end-points. The source code is fairly well commented, and will show the entire flow. The syntax is as follows:

### User is prompted to allow your application access to their info.  Facebook returns an access "code".

Note the ***scope*** parameter in the url below.  This is how your application requests all the permissions it will need to interact with the user’s Facebook profile.  In this sample we are requesting permission to ***publish*** and ***read*** the users stream.

See Facebook’s [Permissions Reference]( https://developers.facebook.com/docs/authentication/permissions/) for a list of additional permissions your app may require.

```
window.location.replace('https://www.facebook.com/dialog/oauth?client_id=' + facebookOptions.clientId + '&redirect_uri=' + facebookOptions.redirectUri + '&scope=publish_stream,read_stream');
```
### Exchange the access code, for an access token (we use this token for authenticated requests)
		
```
var url = 'https://graph.facebook.com/oauth/access_token?client_id=' + facebookOptions.clientId + '&redirect_uri=' + facebookOptions.redirectUri + '&client_secret=' + facebookOptions.clientSecret + '&code=' + authCode;

$.ajax({
   type: 'GET',
   url: url,

   // success callback
   success: function(data) {
   },

   // failure callback
   error: function(data) {
   }
});
```

### Get authenticated user's info (we use this to display their real name)

```
var url = 'https://graph.facebook.com/me?access_token=' + accessToken;

$.ajax({
   type: 'GET',
   url: url,
   dataType: 'json',

   // success callback
   success: function(data) {
   },

   // failure callback
    error: function(data) {
   }
});
```

### Posting an update to the news feed

```
var url = 'https://graph.facebook.com/me/feed?message=your_message_goes_here&access_token=' + accessToken;

$.ajax({
   type: 'POST',
   url: url,
   dataType: 'json',

   // success callback
   success: function(data) {
   },

   // failure callback
   error: function(data) {
   }
});
```

### Fetching the user's news feed

```
var url = 'https://graph.facebook.com/me/feed?access_token=' + accessToken;

$.ajax({
   type: 'GET',
   url: url,
   dataType: 'json',

   // success callback
   success: function(data) {
   },

   // failure callback
   error: function(data) {
   }
});
```

## How to Build

1. Clone the repo to your local machine
2. Copy the webworks-.js client file from C:\Program Files\Research In Motion\BlackBerry 10 WebWorks SDK \Framework\clientFiles (Windows) or ~/SDKs/BlackBerry 10 WebWorks SDK /Framework/clientFiles (Mac) into the top level of the local Facebook-OAuth-2 folder (e.g. ~/WebWorks/Facebook-OAuth-2/js/webworks/webworks-.js).
3. Optional: Edit the script reference to the webworks-.js file within any *.html files to ensure the version number is correct.
4. Use Using the Ripple Mobile Emulator and either the BlackBerry WebWorks SDK for Smartphone or the BlackBerry WebWorks SDK for Tablet OS, package the contents of your local BB10-WebWorks-Samples/Facebook-OAuth-2 folder into a BlackBerry application.

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

