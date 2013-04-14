# Sensors Sample Application

This application shows how to use the various sensors on the device and capture the data points for display to the user, with the help of the Flotr2 graphing library.

The sample code for this application is Open Source under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.html).

**Applies To**

* [BlackBerry WebWorks SDK for BB10](https://developer.blackberry.com/html5/) Version 1.0.3.8 or higher.


**Author(s)** 

* Tim Windsor

**Dependencies**

* [bbUI.js](https://github.com/blackberry/bbUI.js) version 0.9.5, available under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.html).
* [Flotr2.js](https://github.com/HumbleSoftware/Flotr2), available under the [MIT License]()
* [Subway Icons by Pixle](http://subway.pixle.pl/rim/) Licensed under [CC-BY3](http://creativecommons.org/licenses/by/3.0/)

** Screenshots 

![Screenshot](https://raw.github.com/blackberry/BB10-WebWorks-Samples/master/Sensors/screenshots/IMG_00000004.png)
![Screenshot](https://raw.github.com/blackberry/BB10-WebWorks-Samples/master/Sensors/screenshots/IMG_00000003.png)
![Screenshot](https://raw.github.com/blackberry/BB10-WebWorks-Samples/master/Sensors/screenshots/IMG_00000002.png)
![Screenshot](https://raw.github.com/blackberry/BB10-WebWorks-Samples/master/Sensors/screenshots/IMG_00000001.png)

**Known Issues**

* The Y axis of the graphs is set to autoscale. When significant changes happen, there can be a pause while the graph recalculates the appropriate size, and no graph is shown temporarily.

* The Sensors API doesn't work in the Simulator.

**Tested On**
* BlackBerry 10 Dev Alpha B 10.0.9.1103

**To contribute code to this repository you must be [signed up as an official contributor](http://blackberry.github.com/howToContribute.html).**

## How to Build

This sample includes an Ant based build.xml file which will work with the [WebWorks Ant Build Script](https://github.com/blackberry/BB10-WebWorks-Community-Samples/tree/master/Ant-Build-Script). It is optional to build with the script, but if you have it set up, it will require only editing of your device IP and password to use.

Otherwise, zip the contents and run bbwp on the zip file to build the application.

## More Info

* [BlackBerry HTML5 WebWorks](https://bdsc.webapps.blackberry.com/html5/) - Downloads, Getting Started guides, samples, code signing keys.
* [BlackBerry WebWorks Development Guides](https://bdsc.webapps.blackberry.com/html5/documentation)
* [BlackBerry WebWorks Community Forums](http://supportforums.blackberry.com/t5/Web-and-WebWorks-Development/bd-p/browser_dev)
* [BlackBerry Open Source WebWorks Contributions Forums](http://supportforums.blackberry.com/t5/BlackBerry-WebWorks/bd-p/ww_con)

## Contributing Changes

Please see the [README](https://github.com/blackberry/BB10-WebWorks-Samples) of the WebWorks-Samples repository for instructions on how to add new Samples or make modifications to existing Samples.


## Bug Reporting and Feature Requests

If you find a bug in a Sample, or have an enhancement request, simply file an [Issue](https://github.com/blackberry/BB10-WebWorks-Samples/issues) for the Sample and send a message (via github messages) to the Sample Author(s) to let them know that you have filed an [Issue](https://github.com/blackberry/BB10-WebWorks-Samples/issues).


## Disclaimer

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
