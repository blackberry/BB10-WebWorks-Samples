/*
* Copyright 2012 Research In Motion Limited.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

/**
 *  called by the webworksready event when the environment is ready
 */
function initApp() {
  bb.pushScreen('app.html', 'app');
}

// simple toast message
function showToast1() {
   var message = 'This is a simple Toast';
   blackberry.ui.toast.show(message);	
}

// custom toast message with button and callbacks
function showToast2() {
   var message = 'This is my toast!',
       buttonText = 'Click Me',
       toastId,

       // button clicked callback
       onButtonSelected = function () {
          alert('Button was clicked for toast: ' + toastId);
       },

       // toast dismissed callback
       onToastDismissed = function () {
          alert('Toast disappeared: ' + toastId);
       };

       // toast options
       options = {
         buttonText : buttonText,
         buttonCallback : onButtonSelected,
         dismissCallback : onToastDismissed
       };

   // display the toast message
   toastId = blackberry.ui.toast.show(message, options);	
}