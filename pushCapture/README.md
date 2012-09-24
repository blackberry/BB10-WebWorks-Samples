# Push Capture Sample Application

The Push Capture sample app (post coming soon!) demonstrates how to write a BlackBerry 10 WebWorks application that is able to receive pushes. 

Consult the **PushService** and **PushPayload** classes from the API reference for useful examples and a full description of how to use the
push APIs. The API reference can be found [here](https://developer.blackberry.com/html5/apis/).  Look under the **Push** heading from the menu
on the left side.

There is also a very valuable developer guide for this sample push-enabled application that you can find [here](https://developer.blackberry.com/html5/documentation/push_service.html).

The developer guide offers the following topics:

1. An overview of push and the Push Service architecture
2. The requirements for creating a full push solution
3. How to download, build, and configure the sample application when it's loaded on your BlackBerry 10 device (This is also described below.)
4. Code samples to help you write your own push application using the BlackBerry 10 WebWorks SDK

The sample code for this application is Open Source under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.html).


**Applies To**

* [BlackBerry 10 WebWorks SDK](https://developer.blackberry.com/html5/download/sdk)

**Author(s)** 

* [Matthew D'Andrea](https://github.com/mdandrea)
* [Marco Di Cesare](https://github.com/mdicesare)

**Dependencies**

* bbUI.js 0.9.4 (https://github.com/blackberry/bbUI.js/tree/next)

**To contribute code to this repository you must be [signed up as an official contributor](http://blackberry.github.com/howToContribute.html).**


## How to Build

To build the Push Capture sample application:

1. When you're ready to try out the Push Capture sample app on your BlackBerry 10 device (the simulator and Ripple are not yet supported), make sure you first download the **[BlackBerry 10 WebWorks SDK](https://developer.blackberry.com/html5/download/sdk)**.
2. Click on the **Downloads** tab above.
3. Select **Download as zip** (Windows) or **Download as tar.gz** (Mac) and save the downloaded file to your local machine.
4. Create a new folder on your local machine named **pushCapture** e.g. **C:\Documents and Settings\User\WebWorks\pushCapture** (Windows) or **~/WebWorks/pushCapture** (Mac).
5. Open the downloaded ZIP file from step 2 and extract the contents **from inside the zipped pushCapture folder** to your local **pushCapture** folder from step 3.  This ensures that the necessary application assets, such as **config.xml**, are correctly located at the top level of the local **pushCapture** folder (e.g. **~/WebWorks/pushCapture/config.xml**).
6. Copy the webworks-<version>.js client file from **C:\Program Files\Research In Motion\BlackBerry 10 WebWorks SDK <version>\Framework\clientFiles** (Windows) or **~/SDKs/BlackBerry 10 WebWorks SDK <version>/Framework/clientFiles** (Mac) into your **pushCapture/Scripts/** folder.
7. Edit the script reference to the webworks-<version>.js file within **pushCapture/index.htm** to ensure the version number is correct.
8. If you are using the high-level APIs of the Push Service SDK (which offers subscription support) to implement your Push Initiator, then you should have an externally accessible Push Initiator URL.  Update the value of the uri attribute of the access tag in **pushCapture/config.xml** to point to the domain name of this URL. 
9. If you intend to sign your application before deploying it to your BlackBerry 10 device, you need to make sure your invoke target ID is unique to your application (signing requires that it cannot match the invoke target ID used by someone else who is also attempting to sign the Push Capture sample app):
   1. Change the "sample.pushcapture.invoke.target" value in **pushCapture/config.xml** to something unique of your choosing.
   2. Also, change the **invoketargetid** variable in **pushCapture/Scripts/common.js** to have this same value. 
10. Create a ZIP file from your local **pushCapture** folder with **config.xml** and the HTML files at the **root level** of your ZIP (the root level should not be a folder).  See **[Creating a WebWorks archive file](https://developer.blackberry.com/html5/documentation/ww_developing/creating_an_archive_file_1873325_11.html)** for more details. 
11. Follow the instructions from **[Package your BlackBerry 10 app with the BlackBerry 10 WebWorks SDK](https://developer.blackberry.com/html5/documentation/ww_developing/package_your_bb10_app_with_ww_sdk_2008473_11.html)** to get the app running on your BlackBerry 10 device.


## How to send a push

In order to be able to send pushes to the Push Capture sample app, you will need to write a server-side push application (called a Push Initiator) to send out pushes with.
Luckily, this is fairly easy to do using the Push Service SDK available [here](https://developer.blackberry.com/services/push).

You'll find all the documentation for the Push Service SDK [here](http://docs.blackberry.com/en/developers/subcategories/?userType=21&category=Push+Service).

Note that in order to use the Push Service for developing an application for the general public, you will have to first register [here](https://www.blackberry.com/profile/?eventId=8121).


## How to receive a push

1. Start the Push Capture sample application (if you haven't done so already).
2. An alert will pop up telling you that you need to configure the sample application.  You will be taken to the configuration screen.
3. Click **Public/BIS** if the PPG is the BlackBerry Internet Service or **Enterprise/BES** if the PPG is the BlackBerry Enterprise Server.
4. Clear the **Use Push Service SDK as Push Initiator** check box if one of the following is true:
i) You implemented a Push Initiator that does not use the Push Service SDK.
ii) Your Push Initiator only uses the low-level APIs without subscription support from the Push Service SDK.
5. If the **Use Push Service SDK as Push Initiator** check box is selected, in the **Application ID** field, perform one of the
following actions:
i) If you are using the BlackBerry Internet Service as the PPG, type the application ID specified in the confirmation
email message that you received from RIM.
ii) If you are using the BlackBerry Enterprise Server as the PPG, type a unique application ID of your choosing. If you
clear the **Use Push Service SDK as Push Initiator** check box, you cannot type an application ID. In this case, the
Push Service APIs create an application ID for you automatically.
6. If you are using the BlackBerry Internet Service as the PPG, in the **PPG URL** field, type the PPG base URL specified in
the confirmation email message. The sample application uses this URL to create a channel to the PPG. For an
evaluation environment, the URL is http://cp{cpid}.pushapi.eval.blackberry.com, where {cpid} is your content
provider ID. For a production environment, the URL is http://cp{cpid}.pushapi.na.blackberry.com.
7. If the **Use Push Service SDK as Push Initiator** check box is selected, in the **Push Initiator URL** field, 
type https://{server_address}/pushsdk, where {server_address} is the address of the server where the pushsdk helper
application is deployed. The SDK includes the pushsdk helper application that is deployed on a server, such as the
Apache Tomcat server. The URL must be accessible from the Internet.  Of course, you can also point to your own
running Push Initiator application instead of the provided pushsdk helper one.
8. Click the **Launch App on New Push** check box if you want to start the sample application if it is not already started
when a new push message arrives. Leave the check box unchecked if you do not want to start the sample application
when a new push message arrives.
9. Click **Save**.
10. Tap the **Register** tab at the bottom of the device screen.  The register screen will appear.
11. If you had previously checked the **Use Push Service SDK as Push Initiator** check box, you will be required to enter a username and password.
These will be mapped, after authentication, to a subscriber ID in your Push Initiator.  If the **Use Push Service SDK as Push Initiator** check box
had not been checked, then simply click **Submit**.
12. You're all set to receive pushes!


## More Info

* [BlackBerry HTML5 WebWorks](https://developer.blackberry.com/html5/) - Downloads, Getting Started guides, samples, code signing keys.
* [BlackBerry WebWorks Development Guides] (https://developer.blackberry.com/html5/documentation/)
* [BlackBerry WebWorks Community Forums](http://supportforums.blackberry.com/t5/Web-and-WebWorks-Development/bd-p/browser_dev)
* [BlackBerry Open Source WebWorks Contributions Forums](http://supportforums.blackberry.com/t5/BlackBerry-WebWorks/bd-p/ww_con)
* [Push Service SDK Download](https://developer.blackberry.com/services/push)
* [Push Service SDK Development Guides](http://docs.blackberry.com/en/developers/subcategories/?userType=21&category=Push+Service)
* [Push Service Registration Form](https://www.blackberry.com/profile/?eventId=8121)

## Contributing Changes

Please see the [README](https://github.com/blackberry/BB10-WebWorks-Samples) of the BB10-WebWorks-Samples repository for instructions on how to add new Samples or make modifications to existing Samples.


## Bug Reporting and Feature Requests

If you find a bug in a Sample, or have an enhancement request, simply file an [Issue](https://github.com/blackberry/BB10-WebWorks-Samples/issues) for the Sample.

## Disclaimer

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.