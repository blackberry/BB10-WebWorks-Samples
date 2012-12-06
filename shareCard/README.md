# Share Card

Share Card is the name of a proof-of-concept WebWorks application that shows how to create a native looking Share Card in a BlackBerry WebWorks application for BlackBerry 10 using HTML, CSS, and JavaScript.

The sample code for this application is Open Source under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.html).

**Applies To**

* [BlackBerry 10 WebWorks SDK](https://developer.blackberry.com/html5/download/sdk) 

**Author(s)** 

* Chad Tetreault (http://www.twitter.com/chadtatro)

**Dependencies**

1. [jquery-1.8.1.js](http://code.jquery.com/jquery-1.7.2.js) is [dual licensed](http://jquery.org/license/) under the MIT or GPL Version 2 licenses.

**To contribute code to this repository you must be [signed up as an official contributor](http://blackberry.github.com/howToContribute.html).**

## Using the Share Card in your application

Adding this Share Card to your BlackBerry 10 WebWorks application is easy!

1. Include the **card.js** and **card.css** in your HTML file.

```
<link rel="stylesheet" href="card.css" type="text/css" media="screen" />
<script src="card.js"></script>
```

2. Add the HTML portion of the Share Card to your HTML file.

```
<!-- share card -->
<div id="shareCard">
    <div class="cardTitlebar">
        <div onclick="shareHide();" class="bb-button-container bb-button-container-dark">
            <div class="bb-button bb-button-dark">
                <div>Cancel</div>
            </div>
        </div>
    </div>
    <span class="cardTitlebarText">Share</span>
    <div id="shareList"></div>
</div>
<!-- /share card -->
```

3. Trigger the Share Card how-ever you wish.  For this sample, we're using a button element.

```
<button onclick="sharePhoto();">Show Share</button>
```



## How to Build

1. Clone the repo to your local machine
2. Use Using the Ripple Mobile Emulator and either the BlackBerry WebWorks SDK for Smartphone or the BlackBerry WebWorks SDK for Tablet OS, package the contents of your local BB10-WebWorks-Samples/ShareCard folder into a BlackBerry application.

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