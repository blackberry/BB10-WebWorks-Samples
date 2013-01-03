# Localization Sample

This sample application demonstrates different techniques for localizing a BlackBerry 10 WebWorks application.

The sample code for this application is Open Source under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.html).


**Applies To**

* [BlackBerry 10 WebWorks SDK](https://developer.blackberry.com/html5/download/sdk)

**Author(s)**

* Naveenan Murugesu (http://www.twitter.com/Naveenan5)
* Adam Stanley (http://www.twitter.com/n_adam_stanley)

**Dependencies**

1. [handlebars.js](http://handlebarsjs.com/) is released under the MIT license.

2. [bbUI.js] (https://github.com/blackberry/bbUI.js) is [licensed] (https://github.com/blackberry/bbUI.js/blob/master/LICENSE) under the Apache 2.0 license.

**Icons**<br/>
Icons used here are from [http://subway.pixle.pl/rim](http://subway.pixle.pl/rim) are [licensed](http://creativecommons.org/licenses/by/3.0/) under the CC-BY-3.0 license.  This is a subset of the Subway icons available at http://subway.pixle.pl/


**To contribute code to this repository you must be [signed up as an official contributor](http://blackberry.github.com/howToContribute.html).**


## Retrieving system language

```
var lang = blackberry.system.language;

blackberry.event.addEventListener("languagechanged", displayLanguage);
blackberry.event.addEventListener("regionchanged", displayLanguage);
```

## Using handlebars.js
```
var template_source = "<div class=\"{{align}}\"><h1 id=\"activeLanguage\">{{language}}</h1><h2 id=\"pagetitle\">{{page_title}}</h2><h3 id=\"subtitle\">{{sub_title}}}</h3></div>";
var template = Handlebars.compile(template_source);

var lang = blackberry.system.language;
var translated_text = languages[(lang).substring(0,2)];

document.getElementById("container").innerHTML = template(translated_text);
```


## WebWorks App Setup
1. Open index.html
2. ***see How To Build*** for instructions


## Config.xml
In order to read the system language, you must whitelist the necessary WebWorks API feature(s):

```
<feature id="blackberry.system" required="true" version="1.0.0.0"/>
```

The home screen application name can be localized by defining each variant as its own name element:
```
<name>Localization Example</name>
<name xml:lang="ca">Exemple de localisation</name>
<name xml:lang="fr_FR">Exemple de localisation</name>
<name xml:lang="de_DE">Localization Probe</name>
```

The home screen icon can be localized by creating copies of the icon name within corresponding locales/ folders (e.g. locales/it or locales/en_CA)
```
<icon src="icon.png"/>
```


## How to Build

1. Clone the repo to your local machine
2. Use Using the Ripple Mobile Emulator and the BlackBerry 10 WebWorks SDK, package the contents of your local BB10-WebWorks-Samples/Localization folder into a BlackBerry application.

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

