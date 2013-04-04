# EXIF Data Sample

This sample demonstrates how to read the EXIF data from an image, and rotate it accordingly.

The sample code for this application is Open Source under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.html).

**Applies To**

* [BlackBerry 10 WebWorks SDK](https://developer.blackberry.com/html5/download/sdk) 

**Author(s)** 

* [Chad Tetreault](http://www.twitter.com/chadtatro)

**Dependencies**

1. [jQuery](http://code.jquery.com/jquery-1.9.1.js) is [dual licensed](https://github.com/jquery/jquery/blob/master/MIT-LICENSE.txt) under the MIT or GPL Version 2 licenses.

2. [EXIF Reader](http://www.nihilogic.dk/labs/exifjquery/) is [licensed](http://www.nihilogic.dk/licenses/mpl-license.txt) under the MPL license.


**To contribute code to this repository you must be [signed up as an official contributor](http://blackberry.github.com/howToContribute.html).**

**How It Works**

When you take a photo on your BlackBerry Z10 or Q10 the image is stored with an orientation value of 6 (right-side up).  If you have an app that needs to use these photos, they will be displayed sideways in your app.  Naturally you're probably thinking "That's fine, I'll just rotate all my photos so that they are the right orientation".  That's fine, but what if the user wants to open a photo that is not saved right-side up?  This is where detecting the images EXIF data comes in to play.

This sample is extremely easy to use.  We are simply picking a photo (in this case, from the camera), detecting what the EXIF.orientation value is, and rotating the image accordingly.

The included EXIF Reader plugin has been modified to retrieve the EXIF data from a sepcified image object.

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

If you find a bug in a Sample, or have an enhancement request, simply file an [Issue](https://github.com/blackberry/BB10-WebWorks-Samples/issues) for the Sample and send a message (via github messages) to the Sample Author(s) to let them know that you have filed an [Issue](https://github.com/blackberry/BB10-WebWorks-Samples/issues).

## Disclaimer

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.