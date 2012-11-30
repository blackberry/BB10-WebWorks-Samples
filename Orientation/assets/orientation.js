/* Copyright 2012 Research In Motion Limited.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var isLocked = false;

function showTab(id) {
  if (id == 'rotate') {
    document.getElementById('screenInfo').style.display = 'inline';
    document.getElementById('rotate').style.display = 'inline';
    document.getElementById('rotateAndLock').style.display = 'none';
    document.getElementById('info').style.display = 'none';
  } else if (id == 'rotateLock') {
    document.getElementById('screenInfo').style.display = 'inline';
    document.getElementById('rotate').style.display = 'none';
    document.getElementById('rotateAndLock').style.display = 'inline';
    document.getElementById('info').style.display = 'none';
  } else {
    document.getElementById('screenInfo').style.display = 'none';
    document.getElementById('rotate').style.display = 'none';
    document.getElementById('rotateAndLock').style.display = 'none';
    document.getElementById('info').style.display = 'inline';
  }
}

function displayOrientation(str){
  if (!isLocked || str === 'force'){
    var orientation = blackberry.app.orientation;
    document.getElementById("currentOrientation").innerHTML = orientation;
  }
}

function displayLockStatus(){
  var stat = "";
  if (isLocked) {
    stat = "Screen is locked";
  } else{ 
    stat = "Screen is unlocked";
  }
  document.getElementById("lockStatus").innerHTML = stat;
}

// If the device is currently not in the selected orientation, the application will rotate as specified.
// Orientation can be landscape-primary, landscape-secondary, portrait-primary, portrait-secondary.
function rotateOrientation(){
  // Only rotate if the screen is currently unlocked
  if (!isLocked) {
    var choice = document.getElementById("rotateList").value;
    blackberry.app.rotate (choice);
  } else {
    alert("Screen locked. Please unlock and try again.")
  }
}

// If the device is currently not in the selected orientation, the application will rotate as specified AND LOCK.
function rotateAndLock(){
  // Only rotate if the screen is currently unlocked
  if (!isLocked){
    var choice = document.getElementById("rotateLockList").value;
    blackberry.app.lockOrientation (choice);
    
    // If user rotates device while screen is locked,
    // make sure the correct orientation is displayed (the orientation it is locked to)
    displayOrientation("force");

    // Lock the screen then update the lock status
    isLocked = true;
    displayLockStatus();
  } else {
    alert("Screen locked. Please unlock and try again.")
  }
}

function unlockOrientation(){
  blackberry.app.unlockOrientation();
  isLocked = false;
  displayLockStatus();
}