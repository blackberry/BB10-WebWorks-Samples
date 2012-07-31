# swipemenu.js Sample Application

Sample application that demonstrates swipemenu.js: A swipe-down menu framework for BlackBerry WebWorks SDK.

![Screenshot](https://github.com/astanley/WebWorks-Samples/raw/master/swipemenu/screenshots/swipemenu.png "Swipe Menu Screenshot")

**Applies To**

* [BlackBerry WebWorks SDK for BB10](https://developer.blackberry.com/html5/)

**Tested On**

* BlackBerry 10 Dev Alpha 10.0.384
* BlackBerry 10 Dev Alpha 10.0.386

**Author(s)** 

* [Adam Stanley](https://github.com/astanley)
* [Rory Craig-Barnes](https://github.com/glassspear)

**Dependencies**

1. [icon_options.png, icon_reset.png and icon_rules.png](https://github.com/glasspear/WebWorks-CodeSamples) courtesy of Rory Craig-Barnes, available under public domain.
2. [monkey-icon.png](http://www.iconarchive.com/show/animal-icons-by-martin-berube/monkey-icon.html) courtesy of Martin Berube, available as freeware, allowed commercial usage.
3. [icon.png](http://www.clker.com/clipart-green-menu-icon-set-down.html) courtesy of OCAL, available under public domain.
				

**To contribute code to this repository you must be [signed up as an official contributor](http://blackberry.github.com/howToContribute.html).**


## How to Build

To build the swipemenu sample application:

1. Click on the **Downloads** tab above.
2. Select **Download as zip** (Windows) or **Download as tar.gz** (Mac) and save the downloaded file to your local machine.
3. Create a new folder on your local machine named **swipemenu** e.g. **C:\Documents and Settings\User\WebWorks\swipemenu** (Windows) or **~/WebWorks/swipemenu** (Mac).
4. Open the downloaded ZIP file from step 2 and extract the contents **from inside the zipped swipemenu folder** to your local **swipemenu** folder from step 3.  This ensures that the necessary application assets, such as **config.xml**, are correctly located at the top level of the local **swipemenu** folder (e.g. **~/WebWorks/swipemenu/config.xml**).
5. Copy the webworks-<version>.js client file from **C:\Program Files\Research In Motion\BlackBerry 10 WebWorks SDK <version>\Framework\clientFiles** (Windows) or **~/SDKs/BlackBerry 10 WebWorks SDK <version>/Framework/clientFiles** (Mac) into the top level of the local **swipemenu** folder (e.g. **~/WebWorks/swipemenu/webworks-<version>.js**).
5. Optional: Edit the script reference to the webworks-<version>.js file within any *.html files to ensure the version number is correct.
6. Using the **[Ripple Mobile Emulator](http://developer.blackberry.com/html5/download)** and the **[BlackBerry WebWorks SDK for BB10](http://developer.blackberry.com/html5/download)**, package the contents of your local **swipemenu** folder into a BlackBerry application.  Enter the project root settings field as the local folder created in step 3, and the archive name settings field as **swipemenu**.

## Troubleshooting

1. Menu doesn't appear when I swipe down - check to make sure you have added the "blackberry.app" feature to config.xml.
2. Outer frame of the menu bar appears, but nothing else - make sure you have defined a callback function for the addButton step (without it, runtime error interrupts menu creation).
3. Images appear broken - ensure the path to your image files is correct and they are accesible by your application.
4. The font style is wrong - swipemenu.js inherits the font-style from your application. Add a body-tag CSS definition that sets the font-family property.
4. I don't like the background, colors, sizes - These can be customized.  Open and edit swipemenu.js. Modify the createSwipeMenu() and addButton() sections to set the styles you prefer.

## More Info

* [BlackBerry HTML5 WebWorks](https://bdsc.webapps.blackberry.com/html5/) - Downloads, Getting Started guides, samples, code signing keys.
* [BlackBerry WebWorks Development Guides] (https://bdsc.webapps.blackberry.com/html5/documentation)
* [BlackBerry WebWorks Community Forums](http://supportforums.blackberry.com/t5/Web-and-WebWorks-Development/bd-p/browser_dev)
* [BlackBerry Open Source WebWorks Contributions Forums](http://supportforums.blackberry.com/t5/BlackBerry-WebWorks/bd-p/ww_con)

## Contributing Changes

Please see the [README](https://github.com/blackberry/WebWorks-Samples) of the WebWorks-Samples repository for instructions on how to add new Samples or make modifications to existing Samples.


## Bug Reporting and Feature Requests

If you find a bug in a Sample, or have an enhancement request, simply file an [Issue](https://github.com/blackberry/WebWorks-Samples/issues) for the Sample and send a message (via github messages) to the Sample Author(s) to let them know that you have filed an [Issue](https://github.com/blackberry/WebWorks-Samples/issues).


## Disclaimer

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
