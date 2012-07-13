# Push Capture Sample Application

The Push Capture sample app (post coming soon!) demonstrates how to write a BlackBerry 10 WebWorks application that is able to receive pushes. 

The sample code for this application is Open Source under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.html).


**Applies To**

* [BlackBerry 10 WebWorks SDK](https://developer.blackberry.com/html5/download/sdk)

**Author(s)** 

* [Matthew D'Andrea](https://github.com/mdandrea)
* [Marco Di Cesare](https://github.com/mdicesare)

**Dependencies**

* bbUI.js 0.9.3 (https://github.com/blackberry/bbUI.js/tree/next)

**To contribute code to this repository you must be [signed up as an official contributor](http://blackberry.github.com/howToContribute.html).**


## How to Build

To build the Push Capture sample application:

1. Click on the **Downloads** tab above.
2. Select **Download as zip** (Windows) or **Download as tar.gz** (Mac) and save the downloaded file to your local machine.
3. Create a new folder on your local machine named **pushCapture** e.g. **C:\Documents and Settings\User\WebWorks\pushCapture** (Windows) or **~/WebWorks/pushCapture** (Mac).
4. Open the downloaded ZIP file from step 2 and extract the contents **from inside the zipped pushCapture folder** to your local **pushCapture** folder from step 3.  This ensures that the necessary application assets, such as **config.xml**, are correctly located at the top level of the local **pushCapture** folder (e.g. **~/WebWorks/pushCapture/config.xml**).
5. When you're ready to try out the Push Capture sample app on your BlackBerry 10 device (the simulator is not yet supported), make sure you first download the **[BlackBerry 10 WebWorks SDK](https://developer.blackberry.com/html5/download/sdk)**.
6. Create a ZIP file from your local **pushCapture** folder with **config.html** and the HTML files at the **root level** of your ZIP (the root level should not be a folder).  See **[Creating a WebWorks archive file](https://developer.blackberry.com/html5/documentation/ww_developing/creating_an_archive_file_1873325_11.html)** for more details. 
7. Follow the instructions from **[Package your BlackBerry 10 app with the BlackBerry 10 WebWorks SDK](https://developer.blackberry.com/html5/documentation/ww_developing/package_your_bb10_app_with_ww_sdk_2008473_11.html)** to get the app running on your BlackBerry 10 device.

## How to send a push to the Push Capture sample application

In order to be able to send pushes to the Push Capture sample app, you will need to write a server-side push application (called a Push Initiator) to send out pushes with.
Luckily, this is fairly easy to do using the Push Service SDK available here: https://developer.blackberry.com/services/push.
You'll find all the documentation for the Push Service SDK here: http://docs.blackberry.com/en/developers/subcategories/?userType=21&category=Push+Service.
Note that in order to use the Push Service for developing an application for the general public, you will have to first register here: 
https://www.blackberry.com/profile/?eventId=8121

## More Info

* [BlackBerry HTML5 WebWorks](https://developer.blackberry.com/html5/) - Downloads, Getting Started guides, samples, code signing keys.
* [BlackBerry WebWorks Development Guides] (https://developer.blackberry.com/html5/documentation/)
* [BlackBerry WebWorks Community Forums](http://supportforums.blackberry.com/t5/Web-and-WebWorks-Development/bd-p/browser_dev)
* [BlackBerry Open Source WebWorks Contributions Forums](http://supportforums.blackberry.com/t5/BlackBerry-WebWorks/bd-p/ww_con)
* [Push Service SDK Download](https://developer.blackberry.com/services/push)
* [Push Service SDK Development Guides](http://docs.blackberry.com/en/developers/subcategories/?userType=21&category=Push+Service)
* [Push Service Registration Form](https://www.blackberry.com/profile/?eventId=8121)

## Contributing Changes

Please see the [README](https://github.com/blackberry/WebWorks-Samples) of the WebWorks-Samples repository for instructions on how to add new Samples or make modifications to existing Samples.


## Bug Reporting and Feature Requests

If you find a bug in a Sample, or have an enhancement request, simply file an [Issue](https://github.com/blackberry/WebWorks-Samples/issues) for the Sample.

## Disclaimer

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.