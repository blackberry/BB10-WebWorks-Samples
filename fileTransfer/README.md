# FileTransfer API

This sample demonstrates how to leverage both WebWorks and Cordova FileTransfer APIs for upload and download. For more information please visit:
https://developer.blackberry.com/html5/apis/


The primary functionality is implemented in **index.html**..

**Applies To**

* [BlackBerry 10 WebWorks SDK 2.0+](https://developer.blackberry.com/html5/download/sdk) 

**Author(s)**

* [Erik Oros](http://www.twitter.com/WaterlooErik)

**Contributing**

* To contribute code to this repository you must be [signed up as an official contributor](http://blackberry.github.com/howToContribute.html).

## Screenshots ##

![image](_screenshots/1.png) 
![image](_screenshots/2.png) 

## Requirements ##

####Cordova Plugins####

**com.blackberry.utils** will be added by default when you add **com.blackberry.io.filetransfer**. You will need to manually add these plugins:

	com.blackberry.io
	com.blackberry.io.filetransfer
	org.apache.cordova.file
	org.apache.cordova.file-transfer

####BlackBerry Permissions####

You will need permission to access the shared file system in order to save downloaded files.

	access_shared

####Domain Whitelisting####

You will need to whitelist the domain of the external server that you will be downloading from / uploading to.

	<access origin="http://domain.com" subdomains="true" />

## How to Build

1. Clone this repo to your local machine.

2. Ensure the [BlackBerry 10 WebWorks SDK 2.0](https://developer.blackberry.com/html5/download/sdk) is correctly installed.

3. Open a command prompt (windows) or terminal (mac) and run the following command:

	```
	webworks create <your source folder>\fileTransfer
	```

4. **Replace** the default fileTransfer\www folder with the \www folder from **this** project

5. **Replace** the default fileTransfer\config.xml with the config.xml from **this** project

6. From the command prompt (Windows) or terminal (mac), navigate to the **fileTransfer** folder

	```
	cd <your source folder>\fileTransfer
	```

7. Run the following commands to configure plugins used by **this app**
	
	```
	webworks plugin add com.blackberry.io
	webworks plugin add com.blackberry.io.filetransfer
	webworks plugin add org.apache.cordova.file
	webworks plugin add org.apache.cordova.file-transfer
	```

8. Update the following files.

	```
	config.xml: Add the access_shared permission.
	
		<rim:permissions>
			<rim:permit>access_shared</rim:permit>
		</rim:permissions>
	
	config.xml: Modify the <access> element to whitelist your external server.

		<access origin="http://domain.com" subdomains="true" />

	index.html: Update the settings.server variable to reference your external server.

		settings = {
			'server': 'http://subdomain.domain.com/fileTransferServer'
		};
	```

9. Host the **fileTransferServer** folder from this repo on your external server.
	
10. Run the following command to build and deploy the app to a device connected via USB

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
	
