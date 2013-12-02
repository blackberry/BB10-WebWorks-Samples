# "Sencha Touch Sample with BlackBerry 10 look and feel" 

This sample is a meant to be a starting point for any Sencha Touch developer who wishes to build apps for BlackBerry 10 with the BlackBerry 10 native look and feel.  It includes many of the BlackBerry 10 components and features:  [BBM](https://github.com/blackberry/BB10-WebWorks-Samples/tree/master/bbm), [Share Framework](https://github.com/blackberry/BB10-WebWorks-Samples/tree/master/ShareTargets), App Menu (swipe down), Context Menu, Activity Indicator (spinner), [Window Covers](https://github.com/blackberry/BB10-WebWorks-Samples/tree/master/WindowCovers), [Toasts](https://github.com/blackberry/BB10-WebWorks-Samples/tree/master/Toast) and more...

**Applies To**

* [BlackBerry 10 WebWorks SDK](https://developer.blackberry.com/html5/download/sdk) 
* [Sencha Touch SDK](http://www.sencha.com/products/touch/download/) 

**Author(s)** 

* [Naveenan Murugesu](http://www.twitter.com/Naveenan5)

**Dependencies**

1. [Sencha Touch](http://www.sencha.com/products/touch) is [licensed](http://www.sencha.com/legal/touch-commercial-license) under the Free RTU License.

**Icons**

Icons used here are from [Liz Myers](http://www.myersdesign.com) and are [licensed](http://creativecommons.org/licenses/by/3.0/) under the CC-BY-3.0 license.

**To contribute code to this repository you must be [signed up as an official contributor](http://blackberry.github.com/howToContribute.html).**

## How to Build

1. Clone the repo to your local machine
2. Create a folder named "touch" in the root of the project, same level as the index.html.
3. Download the [Sencha Touch SDK 2.3] (http://www.sencha.com/products/touch/download/)
4. Extract the downloaded SDK to a folder.
5. Copy the following files & folders from the extracted folder to the "touch" folder.
   - builds
   - cmd
   - microloader
   - packages
   - resources
   - src
   - sencha-touch
   - sencha-touch-all
   - sencha-touch-all-debug
   - sencha-touch-debug
   
6. Ensure the [BlackBerry 10 WebWorks SDK 2.0](https://developer.blackberry.com/html5/download/sdk) is correctly installed.
7. Open a command prompt (windows) or terminal (mac) and run the following command:

	```
	webworks create <your source folder>\WebWorksWeather
	```

8. **Replace** the default Sencha-Touch-Sample-with-BlackBerry-10-Look-and-Feel\www folder with the \www folder from **this** project
9. From the command prompt (Windows) or terminal (mac), navigate to the Sencha-Touch-Sample-with-BlackBerry-10-Look-and-Feel folder

	```
	cd <your source folder>\Sencha-Touch-Sample-with-BlackBerry-10-Look-and-Feel
	```

10. Run the following commands to configure plugins used by **this app**

	```
	webworks plugin add com.blackberry.app
	webworks plugin add com.blackberry.bbm.platform
	webworks plugin add com.blackberry.invoke
	webworks plugin add com.blackberry.invoke.card
	webworks plugin add com.blackberry.system
	webworks plugin add com.blackberry.ui.cover
	webworks plugin add com.blackberry.ui.dialog
	webworks plugin add com.blackberry.ui.toast
	
```

11. Run the following command to build and deploy the app to a device connected via USB

	```
	webworks run
	```

## More Info

* [BlackBerry HTML5 WebWorks](https://bdsc.webapps.blackberry.com/html5/) - Downloads, Getting Started guides, samples, code signing keys.
* [BlackBerry WebWorks Development Guides](https://bdsc.webapps.blackberry.com/html5/documentation)
* [BlackBerry WebWorks Community Forums](http://supportforums.blackberry.com/t5/Web-and-WebWorks-Development/bd-p/browser_dev)
* [BlackBerry Open Source WebWorks Contributions Forums](http://supportforums.blackberry.com/t5/BlackBerry-WebWorks/bd-p/ww_con)
* [Sencha Touch](http://www.sencha.com/products/touch/) - Downloads, Getting Started guides, samples.
* [Sencha Touch BlackBerry 10 Documentation](http://docs.sencha.com/touch/2.3.0/#!/guide/blackberry)
* [Sencha Touch Q&A Forums](http://www.sencha.com/forum/forumdisplay.php?90-Sencha-Touch-2.x-Q-amp-A)


## Contributing Changes

Please see the [README](https://github.com/blackberry/BB10-WebWorks-Samples) of the BB10-WebWorks-Samples repository for instructions on how to add new Samples or make modifications to existing Samples.

## Bug Reporting and Feature Requests

If you find a bug in a Sample, or have an enhancement request, simply file an [Issue](https://github.com/blackberry/BB10-WebWorks-Samples/issues) for the Sample.

## Disclaimer

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.