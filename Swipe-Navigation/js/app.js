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
  // keeping track of which pages are in my app so we don't 'push' to a non-existing page
  pages = new Array();
  pages[0] = '1.html';
  pages[1] = '2.html';
  pages[2] = '3.html';  
  pages[3] = '4.html';
  pages[4] = '5.html';  
  pages[5] = '6.html';
  pages[6] = '7.html';
  pages[7] = '8.html';
  pages[8] = '9.html';

  pageStack = new Array();
  bb.pushScreen('1.html', '1');
}

function hammerTime() {
  var contentSwipe = new Hammer(document.getElementById("content"), {
  });

  contentSwipe.onswipe = function(ev) { 
    var dir = ev.direction;
    
    // swipe from right-to-left
    if (dir === 'left') {
      var currentPage = pageStack[pageStack.length -1];
          currentPage = parseInt(currentPage);
      var nextPage = currentPage + 1;

      if (nextPage >= pages.length + 1) {
        return false;
      } else {
        console.log('loading: ' + nextPage);
        bb.pushScreen(nextPage + '.html', nextPage);
      }

    // swipe from left-to-right
    }  else if (dir === 'right') {
        bb.popScreen()
      }

  };
}