# Swipe Navigation Sample

This sample demonstrates how to swipe left and right, to navigate through an application.  It uses Hammer.js, and bbUI.js.

The sample code for this application is Open Source under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.html).

**Applies To**

* [BlackBerry 10 WebWorks SDK](https://developer.blackberry.com/html5/download/sdk) 

**Author(s)** 

* [Chad Tetreault](http://www.twitter.com/chadtatro)

**Dependencies**

1. [bbUI.js] (https://github.com/blackberry/bbUI.js) is [licensed] (https://github.com/blackberry/bbUI.js/blob/master/LICENSE) under the Apache 2.0 license.
2. [Hammer.js] (https://github.com/EightMedia/hammer.js) is [licensed] (https://github.com/EightMedia/hammer.js/blob/master/LICENSE) under the MIT license.
3. [zepto.js](https://github.com/madrobby/zepto) is [dual licensed](https://github.com/madrobby/zepto/blob/master/MIT-LICENSE) under the MIT license.

**To contribute code to this repository you must be [signed up as an official contributor](http://blackberry.github.com/howToContribute.html).**


**Hammer.js Setup**
We simply specify the element which we will be monitoring for swipe events.  In this case it's the "content" div.
```
var contentSwipe = new Hammer(document.getElementById("content"), {});
```

**Capturing the gestures**
```
contentSwipe.onswipe = function(ev) { 
	var dir = ev.direction;
    
	// swipe from right-to-left
	if (dir === 'left') {
		// do something

	// swipe from left-to-right
	}  else if (dir === 'right') {
		// do something
	}
};
```
## How to Build

1. Clone the repo to your local machine
2. Use Using the Ripple Mobile Emulator and the BlackBerry 10 WebWorks SDK, package the contents of your local BB10-WebWorks-Samples/WindowCovers folder into a BlackBerry application.

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