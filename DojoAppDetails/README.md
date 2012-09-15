# Dojo Sample Application

This application shows the markup for creating a simple Dojo application to view app details based on the app's WebWorks config.xml file

The sample code for this application is Open Source under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.html).


**Applies To**

* [BlackBerry WebWorks SDK for BB10](https://developer.blackberry.com/html5/)


**Author(s)** 

* Michelle Mendoza


**Dependencies**

* When running the application on a device, to access Dojo toolkit resources, the device must have an internet connection

**Known Issues**

* When using the Ripple Emulator, a Chrome Console log error is shown: "Uncaught Error: undefinedModule". This is due to Dojo trying to load Ripple's "ripple/bootstrap" since it follows the same Dojo syntax for loading legacy modules e.g. require("ripple/bootstrap")

**Tested On**
* BlackBerry 10 Dev Alpha 10.0.6.671

**To contribute code to this repository you must be [signed up as an official contributor](http://blackberry.github.com/howToContribute.html).**

## How to Build

To build the DojoAppDetails sample application:

1. Click on the **Downloads** tab above.
2. Select **Download as zip** (Windows) or **Download as tar.gz** (Mac) and save the downloaded file to your local machine.
3. Create a new folder on your local machine named **DojoAppDetails** e.g. **C:\Documents and Settings\User\WebWorks\DojoAppDetails** (Windows) or **~/WebWorks/DojoAppDetails** (Mac).
4. Open the downloaded ZIP file from step 2 and extract the contents **from inside the zipped DojoAppDetails folder** to your local **DojoAppDetails** folder from step 3.  This ensures that the necessary application assets, such as **config.xml**, are correctly located at the top level of the local **DojoAppDetails** folder (e.g. **~/WebWorks/DojoAppDetails/config.xml**).
5. Copy the webworks-<version>.js client file from **C:\Program Files\Research In Motion\BlackBerry 10 WebWorks SDK <version>\Framework\clientFiles** (Windows) or **~/SDKs/BlackBerry 10 WebWorks SDK <version>/Framework/clientFiles** (Mac) into the top level of the local **DojoAppDetails** folder (e.g. **~/WebWorks/DojoAppDetails/webworks-<version>.js**).
6. Optional: Edit the script reference to the webworks-<version>.js file within any *.html files to ensure the version number is correct.
7. Using the **[Ripple Mobile Emulator](http://developer.blackberry.com/html5/download)** and the **[BlackBerry WebWorks SDK for BB10](http://developer.blackberry.com/html5/download)**, package the contents of your local **DojoAppDetails** folder into a BlackBerry application.  Enter the project root settings field as the local folder created in step 3, and the archive name settings field as **DojoAppDetails**.


## More Info

* [BlackBerry HTML5 WebWorks](https://bdsc.webapps.blackberry.com/html5/) - Downloads, Getting Started guides, samples, code signing keys.
* [BlackBerry WebWorks Development Guides](https://bdsc.webapps.blackberry.com/html5/documentation)
* [BlackBerry WebWorks Community Forums](http://supportforums.blackberry.com/t5/Web-and-WebWorks-Development/bd-p/browser_dev)
* [BlackBerry Open Source WebWorks Contributions Forums](http://supportforums.blackberry.com/t5/BlackBerry-WebWorks/bd-p/ww_con)

## Contributing Changes

Please see the [README](https://github.com/blackberry/WebWorks-Samples) of the WebWorks-Samples repository for instructions on how to add new Samples or make modifications to existing Samples.


## Bug Reporting and Feature Requests

If you find a bug in a Sample, or have an enhancement request, simply file an [Issue](https://github.com/blackberry/WebWorks-Samples/issues) for the Sample and send a message (via github messages) to the Sample Author(s) to let them know that you have filed an [Issue](https://github.com/blackberry/WebWorks-Samples/issues).


## Disclaimer

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.