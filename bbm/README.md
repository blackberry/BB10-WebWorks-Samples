# Background

This application provides a look at **blackberry.bbm.platform** as well as **blackberry.invoke** APIs that will enable developers to leverage BlackBerry Messenger integration within their BlackBerry 10 applications.

To separate the BBM functionality from the remaining application, all relevant BBM implementation was implemented in **bbm.js** while the remaining files are leveraged to configure UI components, and define actions (click event listeners) connecting those components to the API functionality.

# Tested With

* BlackBerry 10 WebWorks SDK (1.0.3.8)
* BlackBerry 10 Dev Alpha B (10.0.9.1103)
* Ripple Emulator 0.9.10 (for packaging)

# Notes and Known Issues

* Registration must occur before any of the **blackberry.bbm.platform** functionality becomes available; working as intended.
* **Set Display Picture** is not properly initiating an update. As a workaround, the **Set Avatar** invocation can be used.
* **Start Chat** is not properly initating a chat when no URI is provided; expected to provide **Contact Picker**. As a workaround, **Share Text** can be invoked with an empty **data** property.
* **Start Chat** will invite the contact to BBM if the provided PIN **does not exist** in your **Contact List**; working as intended.
* **Start Chat** will immediately start a chat session if the provided PIN **exists** in your **Contact List** working as intended.
* There are currently some issues while saving modified **status** and **personal message** values.
* There are some performance issues while loading images and cropping; these have been addressed on later builds.