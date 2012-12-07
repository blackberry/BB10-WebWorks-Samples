This application provides a look at **blackberry.bbm.platform** as well as **blackberry.invoke** APIs that will enable developers to leverage BlackBerry Messenger integration within their BlackBerry 10 applications.

To separate the BBM functionality from the remaining application, all relevant BBM implementation was implemented in **bbm.js** while the remaining files are leveraged to configure UI components, and define actions (click event listeners) connecting those components to the API functionality.

#Known Issues

**blackberry.bbm.platform.self.setDisplayPicture**
* Not currently working.
* Can be replaced with the **Set Avatar** invocation.

**Start Chat**
* Should display Contact Picker if no **uri** is provided; not currently working.
* Can be replaced with the **Share Text* invocation (provide empty **data** string.)
* If a URI is provided that exists in the users's BBM Contact List, a chat will be immediately started; working as intended.
* If a URI is provided that does not exist in the user's BBM Contact List, an invitation to join BBM will be sent instead; working as intended.