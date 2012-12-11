# Custom Context Menu Sample

This sample demonstrates how to set custom Context Menu's to DOM Elements into a BlackBerry WebWorks application for BlackBerry 10.

The sample code for this application is Open Source under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.html).


**Applies To**

* [BlackBerry 10 WebWorks SDK](https://developer.blackberry.com/html5/download/sdk) 

**Author(s)** 

* [Chad Tetreault](http://www.twitter.com/chadtatro)

**Dependencies**

1. [bbUI.js] (https://github.com/blackberry/bbUI.js) is [licensed] (https://github.com/blackberry/bbUI.js/blob/master/LICENSE) under the Apache 2.0 license.

**Icons**<br/>
Icons used here are from [Liz Myers](http://www.myersdesign.com) and are [licensed](http://creativecommons.org/licenses/by/3.0/) under the CC-BY-3.0 license.

**To contribute code to this repository you must be [signed up as an official contributor](http://blackberry.github.com/howToContribute.html).**

## Screenshots 

![Screenshot](https://raw.github.com/blackberry/BB10-WebWorks-Samples/master/CustomContext/screenshot.png)

## API Documentation ##
The documentation for this API is available at https://developer.blackberry.com/html5/apis/

## How to Use

**Config.xml**

The following feature must be included in your project's config.xml.
```
<feature id="blackberry.ui.contextmenu" />
```
**Binding the DOM Element**
```
<div data-webworks-context="myMenuItem">This is a test</div>
```

**Setup the Menu Item**

Note: You can have multiple Context Menus in your application. For this document, we're using **"myMenu"**
```
var myMenuItem = {
	actionId: 'MyActionID',
	label: 'My Label',
	icon: '../images/4.png'
};

var menu = ["myMenu"];
```

**Add the Menu Item to the Context Menu**
```
blackberry.ui.contextmenu.addItem(menu, myMenuItem, function() {
	alert('You clicked me!');
});
```

**Putting it all together**
```
var myMenuItem = {
	actionId: 'MyActionID',
	label: 'My Label',
	icon: '../images/4.png'
};

var menu = ["myMenu"];

blackberry.ui.contextmenu.addItem(menu, myMenuItem, function() {
	alert('You clicked me!');
});
```

## How to Build

1. Clone the repo to your local machine
2. Use Using the Ripple Mobile Emulator and the BlackBerry 10 WebWorks SDK, package the contents of your local BB10-WebWorks-Samples/CustomContext folder into a BlackBerry application.

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