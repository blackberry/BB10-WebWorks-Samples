# BrickBreakerBold

BrickBreaker Bold takes the classic, standard BlackBerry game and re-implements it using a combination of the latest web technologies including HTML5, CSS3 and Javascript.

The sample code for this application is Open Source under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.html).


**Applies To**

* [BlackBerry WebWorks SDK for PlayBook and BB10](https://bdsc.webapps.blackberry.com/html5/download/sdk)

**Producer**

* Genevieve Mak

**Author(s)**

* Xinyuan Fan
* Pawel Chomicki

**Dependencies**

* None

**Known Issues**

* Enabling sound may cause loss of frames on PlayBook Device.

**Tested On**
* BlackBerry Playbook v2.1
* BlackBerry 10 (pre-release)

## How to Build

1. Create a .zip archive of the project's root directory using your program of choice.
2. Navigate to the \bbwp\ directory of your SDK installation.

	**Example:**
	`cd C:\Program Files\Research In Motion\BlackBerry WebWorks SDK for TabletOS 2.2.0.5\bbwp`

3. Compile the .zip archive into a .bar file using the following command:
`bbwp "INSERT-PATH-TO-ZIP\ARCHIVE.ZIP" -o "TARGET-PATH"`

	**Example:**
	`bbwp "C:\Documents and Settings\User\Desktop\BrickBreakerBold.zip" -o "C:\Documents and Settings\User\Desktop"`

4. Navigate to the \bbwp\blackberry-tablet-sdk\bin\ directory of your SDK installation.

	**Example:**
	`cd C:\Program Files\Research In Motion\BlackBerry WebWorks SDK for TabletOS 2.2.0.5\bbwp\blackberry-tablet-sdk\bin\`

5. Ensuring that your Playbook or BB10 is connected to your computer via USB, and that development mode is enabled on your device, install the application on your device using the following command:
`blackberry-deploy -installApp -device DEVICE-IP -package "TARGET-PATH\ARCHIVE.BAR" -password DEVICE-PASSWORD`

	**Example:**
	`blackberry-deploy -installApp -device 169.254.0.1 -package "C:\Documents and Settings\User\Desktop\BrickBreakerBold.bar" -password thisismypassword`

## More Info

* [BlackBerry HTML5 WebWorks](https://bdsc.webapps.blackberry.com/html5/) - Downloads, Getting Started guides, samples, code signing keys.
* [BlackBerry WebWorks Development Guides](https://bdsc.webapps.blackberry.com/html5/documentation)
* [BlackBerry WebWorks Community Forums](http://supportforums.blackberry.com/t5/Web-and-WebWorks-Development/bd-p/browser_dev)
* [BlackBerry Open Source WebWorks Contributions Forums](http://supportforums.blackberry.com/t5/BlackBerry-WebWorks/bd-p/ww_con)

## Contributing Changes

*To contribute code to this repository you must be [signed up as an official contributor](http://blackberry.github.com/howToContribute.html).**


