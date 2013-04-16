# Push Capture Sample Application

The Push Capture sample push-enabled application demonstrates how to write a BlackBerry 10 WebWorks application that is able to receive pushes. 

Consult the [PushService](https://developer.blackberry.com/html5/apis/blackberry.push.pushservice.html) and [PushPayload](https://developer.blackberry.com/html5/apis/blackberry.push.pushpayload.html) classes from the API reference for useful examples and a full description of how to use the
push APIs. 

There is also a valuable developer guide on how to write a push-enabled application using BlackBerry WebWorks that you can find [here](https://developer.blackberry.com/html5/documentation/push_service.html).

The developer guide offers the following topics:

1. An overview of push and the Push Service architecture
2. The requirements for creating a full push solution
3. How to download, build, and configure the sample application when it's loaded on your BlackBerry 10 device (This is also described below.)
4. Code samples to help you write your own push application using the BlackBerry 10 WebWorks SDK

You can also find a useful blog post about developing using the WebWorks SDK and push [here](http://devblog.blackberry.com/2012/08/blackberry-10-webworks-push-app).

The sample code for this application is Open Source under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.html).


**Applies To**

* [BlackBerry 10 WebWorks SDK](https://developer.blackberry.com/html5/download/sdk)

**Author(s)** 

* [Matthew D'Andrea](https://github.com/mdandrea)
* [Marco Di Cesare](https://github.com/mdicesare)

**Dependencies**

* bbUI.js 0.9.6 (https://github.com/blackberry/bbUI.js)

**To contribute code to this repository you must be [signed up as an official contributor](http://blackberry.github.com/howToContribute.html).**


## How to Build

To build the Push Capture sample application:

1. When you're ready to try out the Push Capture sample app on your BlackBerry 10 device (the simulator and Ripple are not yet supported), make sure you first download the **[BlackBerry 10 WebWorks SDK](https://developer.blackberry.com/html5/download/sdk)**.
2. Clone the **BB10-WebWorks-Samples** repo.
3. Navigate to the **pushCapture** subfolder.
4. If you are using the high-level APIs of the Push Service SDK (which offers subscription support) to implement your Push Initiator, then you should have an externally accessible Push Initiator URL.  Update the value of the uri attribute of the access tag in **pushCapture/config.xml** to point to the domain name of this URL. 
5. If you intend to sign your application before deploying it to your BlackBerry 10 device, you need to make sure your invoke target IDs are unique to your application (signing requires that they cannot match the invoke target IDs used by someone else who is also attempting to sign the Push Capture sample app):
   1. Change the "sample.pushcapture.invoke.push" value in **pushCapture/config.xml** to something unique of your choosing.
   2. Change the **invokeTargetIdPush** variable in **pushCapture/Scripts/common.js** to have this same value.
   3. Change the "sample.pushcapture.invoke.open" value in **pushCapture/config.xml** to something unique of your choosing.
   4. Change the **invokeTargetIdOpen** variable in **pushCapture/Scripts/common.js** to have this same value. 
6. Create a ZIP file from your local **pushCapture** folder with **config.xml** and the HTML files at the **root level** of your ZIP (the root level should not be a folder).  See **[Creating a WebWorks archive file](https://developer.blackberry.com/html5/documentation/ww_developing/creating_an_archive_file_1873325_11.html)** for more details. 
7. Follow the instructions from **[Package your BlackBerry 10 app with the BlackBerry 10 WebWorks SDK](https://developer.blackberry.com/html5/documentation/ww_developing/package_your_bb10_app_with_ww_sdk_2008473_11.html)** to get the app running on your BlackBerry 10 device.


## How to send a push

In order to be able to send pushes to the Push Capture sample app, you will need to write a server-side push application (called a Push Initiator) to send out pushes with.
Luckily, this is fairly easy to do using the Push Service SDK available [here](https://developer.blackberry.com/services/push).

You'll find all the documentation for the Push Service SDK [here](http://developer.blackberry.com/java/documentation/push_service_sdk.html).
The low-level API reference for the Push Service SDK can be found [here](http://www.blackberry.com/developers/docs/PushServiceSDK1.2/LowLevelAPI).
The high-level API reference for the Push Service SDK can be found [here](http://www.blackberry.com/developers/docs/PushServiceSDK1.2/HighLevelAPI).

Note that in order to use the Push Service for developing an application for the general public (non-enterprise), you will have to first register [here](https://www.blackberry.com/profile/?eventId=8121).


## How to receive a push

1. Start the Push Capture sample application (if you haven't done so already).
2. A toast will pop up telling you that you need to configure the sample application.  You will be taken to the configuration screen.
3. Click **Public/BIS** if the PPG is the BlackBerry Internet Service or **Enterprise/BDS** if the PPG is the BlackBerry Device Service.
4. Clear the **Subscribe with Push Service SDK** check box if one of the following is true:
i) You implemented a Push Initiator that does not use the Push Service SDK.
ii) Your Push Initiator only uses the low-level APIs without subscription support from the Push Service SDK.
iii) You're using the low-level sample Push Initiator that comes with the Push Service SDK.
5. If the **Subscribe with Push Service SDK** check box is selected, in the **Application ID** field, perform one of the
following actions:
i) If you are using the BlackBerry Internet Service as the PPG, type the application ID specified in the confirmation
email message that you received after registering to use the Push Service.
ii) If you are using the BlackBerry Device Service (part of BlackBerry Enterprise Service 10) as the PPG, type a unique application ID of your choosing. If you
clear the **Subscribe with Push Service SDK** check box, you cannot type an application ID. In this case, the
Push Service APIs create an application ID for you automatically.
6. If you are using the BlackBerry Internet Service as the PPG, in the **PPG URL** field, type the PPG base URL specified in
the confirmation email message. The sample application uses this URL to create a channel to the PPG. For an
evaluation environment, the URL is http://cp{cpid}.pushapi.eval.blackberry.com, where {cpid} is your content
provider ID. For a production environment, the URL is http://cp{cpid}.pushapi.na.blackberry.com.
7. If the **Subscribe with Push Service SDK** check box is selected, in the **Push Initiator URL** field, 
type https://{server_address}/high-level-sample, where {server_address} is the address of the server where the **high-level-sample** sample
Push Initiator is deployed. The SDK includes the high-level sample Push Initiator that is deployed on a server, such as the
Apache Tomcat server. The URL must be accessible from the Internet.  Of course, you can also point to your own
running Push Initiator application instead of the provided **high-level-sample** sample one.
8. Click the **Launch App on New Push** check box if you want to start the sample application if it is not already running
when a new push message arrives. Leave the check box unchecked if you do not want to start the sample application
when a new push message arrives. Note that if the check box is left unchecked and the sample application is not running when a new
push message arrives, that push message will never be received by the application (even if you manually start the application  
yourself later on). 
9. Click **Save**.
10. Tap the **Register** tab at the bottom of the device screen.  The register screen will appear.
11. If you had previously checked the **Subscribe with Push Service SDK** check box, you will be required to enter a username and password.
These will be mapped, after authentication, to a subscriber ID in your Push Initiator.  If the **Subscribe with Push Service SDK** check box
had not been checked, then simply click **Submit**.
12. You're all set to receive pushes!


## More Info

* [BlackBerry 10 WebWorks SDK](https://developer.blackberry.com/html5/download/sdk)
* [How to write a push-enabled application using BlackBerry WebWorks](https://developer.blackberry.com/html5/documentation/push_service.html)
* [Push Service SDK Download](https://developer.blackberry.com/services/push)
* [Push Service SDK Development Guide](http://developer.blackberry.com/java/documentation/push_service_sdk.html)
* [Push Service SDK Low-level API Reference](http://www.blackberry.com/developers/docs/PushServiceSDK1.2/LowLevelAPI)
* [Push Service SDK High-level API Reference](http://www.blackberry.com/developers/docs/PushServiceSDK1.2/HighLevelAPI)
* [Push Service Registration Form](https://www.blackberry.com/profile/?eventId=8121)
* [BlackBerry WebWorks Community Forums](http://supportforums.blackberry.com/t5/Web-and-WebWorks-Development/bd-p/browser_dev)
* [BlackBerry Open Source WebWorks Contributions Forums](http://supportforums.blackberry.com/t5/BlackBerry-WebWorks/bd-p/ww_con)

## Contributing Changes

Please see the [README](https://github.com/blackberry/BB10-WebWorks-Samples) of the BB10-WebWorks-Samples repository for instructions on how to add new Samples or make modifications to existing Samples.


## Bug Reporting and Feature Requests

If you find a bug in a Sample, or have an enhancement request, simply file an [Issue](https://github.com/blackberry/BB10-WebWorks-Samples/issues) for the Sample.

## Disclaimer

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.