# HTML5 Sample Camera App

A sample application that demonstrates HTML5 camera Api, and Xhr2 uploading.

**Tested On**

* BlackBerry 10.0.9

**Author(s)** 

* [Daniel Audino](https://github.com/DanielAudino)

**Dependencies**

1. [jquery.mobile-1.1.0.min.js, jquery.mobile-1.1.0.min.css, jquery-1.7.1.min.js ](http://www.jquerymobile.com/) The jQuery Mobile Framework
2. [node.js and npm](https://github.com/joyent/node)

**To contribute code to this repository you must be [signed up as an official contributor](http://blackberry.github.com/howToContribute.html).**

## How to Build

1. Clone the repo to your local machine
2. Use Using the **[Ripple Mobile Emulator](http://developer.blackberry.com/html5/download)** and either the **[BlackBerry WebWorks SDK for Smartphone](http://developer.blackberry.com/html5/download)** or the **[BlackBerry WebWorks SDK for Tablet OS](http://developer.blackberry.com/html5/download)**, package the contents of your local **BB10-WebWorks-Samples/invoke/invoker** and **BB10-WebWorks-Samples/invoke/invokable** folders into a BlackBerry application.

## Configuration Instructions

1. Configure upload server - install and configure node and npm, inside the root directory of your node server, run the following commands 
* ```npm install express@2.5.9``` to install the necessary node_modules
* ```mkdir upload```-create the upload directory
* ```node app.js``` - to run the server
The node server listens on port 8080 by default, this can be changed in the app.js file

2. Update the access element to point to your server address in config.xml.

3. Within the index.html update the ip address to your upload server. Assure that the port number and folder related to the server are also part of this address. E.g http://Your.Ip:8080/upload/ for port '8080' and the 'upload' folder

## More Info

* [BlackBerry HTML5 WebWorks](https://bdsc.webapps.blackberry.com/html5/) - Downloads, Getting Started guides, samples, code signing keys.
* [BlackBerry WebWorks Development Guides](https://bdsc.webapps.blackberry.com/html5/documentation)
* [BlackBerry WebWorks Community Forums](http://supportforums.blackberry.com/t5/Web-and-WebWorks-Development/bd-p/browser_dev)
* [BlackBerry Open Source WebWorks Contributions Forums](http://supportforums.blackberry.com/t5/BlackBerry-WebWorks/bd-p/ww_con)

## Contributing Changes

Please see the [README](https://github.com/blackberry/BB10-WebWorks-Samples) of the BB10-WebWorks-Samples repository for instructions on how to add new Samples or make modifications to existing Samples.


## Bug Reporting and Feature Requests

If you find a bug in a Sample, or have an enhancement request, simply file an [Issue](https://github.com/blackberry/BB10-WebWorks-Samples/issues) for the Sample and send a message (via github messages) to the Sample Author(s) to let them know that you have filed an [Issue](https://github.com/blackberry/WebWorks-Samples/issues).


## Disclaimer

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.