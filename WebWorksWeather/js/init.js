/*
* Copyright 2013 BlackBerry Limited.
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

// This variable is altered in the weather functions
coverlabel = 'WebWorks Weather';

// This flag will allow us to run the code in Ripple by dynamically swapping/disabling some device specific functions
// e.g. BBM, cover labels, toasts etc
inRipple = ((navigator.userAgent.indexOf('Ripple') >= 0) || window.tinyHippos);

config = {
  actionBarDark : true,
  controlsDark : true,
  listsDark : true,
  highlightColor : '#00BFFF',
  coloredTitleBar : true,

  // Fires "before" styling is applied and "before" the screen is inserted in the DOM
  onscreenready : function(element, id) {

    var screen = element.querySelector('[data-bb-type=screen]');
    // Set our styles
    screen.style['background-color'] = '#242424';
    screen.style.color = 'white';
    screen.style.fontSize = "2.5em";

    // add the settings menu (swipedown menu) to each screen
    if (id != "about" && id != "settings" && id != "editcities") {
      insertMenu(screen);

      // Create the tab (city) buttons except if the user is on the "add city" page
      if (id != "add") {
        var actionbar = element.querySelector('[data-bb-type=action-bar]');
        createCitiesList(actionbar);
      }
    }
  },

  // Fires "after" styling is applied and "after" the screen is inserted in the DOM
  ondomready : function(element, id) {

    if (id === "main") {
      if (util.isEmptyCityList) {
        localStorage.removeItem('defaultCityID');
        localStorage.removeItem('defaultCityName');
        weatherData = '';
        UIdisplay.resultsContent("No cities added. Please add a city");
        UIdisplay.hideIndicator();
      } else
        app.updateWeatherData();
    }
    if (id === "add") {
      document.getElementById("resetSearchButton").hide();
    }

    if (id === "settings") {
      // Toggle the radio button to show the user's settings for the unit of temperature
      if (localStorage.getItem("temperatureUnit") == 'celsius') {
        document.getElementById("c").setChecked(true);
      } else
        document.getElementById("f").setChecked(true);
    }

    if (id === "editcities") {
      // Create a list of cities which the user can edit
      var cities = util.getSavedCities();

      if (cities.length == 0) {
        var temp = document.createElement('div');
        temp.className = 'panel';
        temp.innerText = 'No cities available. Please add a city';
        document.getElementById("citiesList").appendChild(temp);
      } else {
        var items = [], item;
        // create a city tab item object and pass this object to create a bbui tab item (the list of saved cities)
        for (i in cities) {
          item = document.createElement('div');
          item.setAttribute('data-bb-type', 'item');
          item.setAttribute('data-bb-title', cities[i].name);
          // Set the ID as the value of the saved city key in local storage,
          // this will allow us to get the right key to delete from local storage
          item.setAttribute('id', cities[i].key);
          item.innerHTML = cities[i].country;
          item.setAttribute('data-bb-img', "images/icons/marker.png");
          item.onbtnclick = function() {
            var selected = document.getElementById('citiesList').selected;
            if (selected) {
              localStorage.removeItem(selected.id);
              if (localStorage.getItem('defaultCityID') == selected.id) {

              };
              selected.remove();
            }
          };
          items.push(item);
        }
        document.getElementById('citiesList').refresh(items);
      }
    }
  }
}

// Called by the webworks ready event
function initApp() {

  // Need to check if the network is available in order to use the app
  // Otherwise, notify the user
  if (!window.navigator.onLine) {
    showConnectionDialog();
  }

  // If app is running in Emulator...
  if (inRipple) {
    bbutils.showToast = function(msg) {
      console.log(msg);
    };
    // Used for debugging using console.log
  } else {
    // The app is being run on device and the following code can be executed

    // Register with bbm platform
    bbm.register();

    // 'resume' event is triggered when the app comes back into foreground
    blackberry.event.addEventListener("resume", function() {
      app.updateWeatherData();
    });

    // Set up the window cover (displayed when app is minimized)
    // Default cover image is for the all touch device
    var coverimage = 'local:///images/coverZ.png';

    // If the device has a 1:1 screen ratio, use the appropriate cover
    if (window.innerWidth === window.innerHeight)
      coverimage = 'local:///images/coverQ.png';

    blackberry.ui.cover.setContent(blackberry.ui.cover.TYPE_IMAGE, {
      path : coverimage
    });

    // When the application is put into the background,
    // update the window cover according to the desired cover image
    blackberry.event.addEventListener("entercover", function() {

      // Set the text for the label
      blackberry.ui.cover.labels = [{
        label : coverlabel,
        size : 10,
        wrap : true
      }];
      blackberry.ui.cover.updateCover();
    });
  }

  if (!localStorage.getItem("temperatureUnit")) {
    localStorage.setItem("temperatureUnit", "celsius");
  }

  if (util.getSavedCities().length != 0)
    util.isEmptyCityList = false;

  // When app is first launched on the device or there are no saved cities,
  // request user to enter a location
  if (!localStorage.getItem("firstRun") || util.isEmptyCityList) {
    localStorage.setItem("firstRun", "false");
    bb.pushScreen('add.html', 'add');
  } else {
    // retrieve the Default location to show weather data
    window.CITYID = localStorage.getItem("defaultCityID");
    window.cityName = localStorage.getItem("defaultCityName");
    bb.pushScreen('main.html', 'main');
  }
}

// setup the global bbm object so we can call bbm.<function> from where-ever in the app
var bbm = {
  registered : false,

  // Registers this application with the blackberry.bbm.platform APIs.
  register : function() {
    blackberry.event.addEventListener('onaccesschanged', function accessChangedCallback(accessible, status) {
      // called when access is given by the user to connect w/bbm via bbm.register()

      console.log("BBM Service Status: " + status);
      if (status === 'unregistered') {
        blackberry.bbm.platform.register({
          // Randomly generated UUID using any online service
          uuid : 'f36ae935-d9d1-4fec-bcee-76717ded235c'
        });
      } else if (status === 'allowed') {
        bbm.registered = accessible;
      } else if (status === 'pending') {
        console.log('Access is pending and being processed.');
      } else if (status === 'user') {
        console.log('Access is blocked by the user.');
      } else if (status === 'nodata') {
        console.log('Access is blocked because the device is out of data coverage. A data connection is required to register the application.');
      } else if (status === 'temperror') {
        console.log('Access is blocked because of a temporary error. The application should try to call blackberry.bbm.platform.register in 30 minutes, or the next time the application starts.');
      } else {
        console.log("BBM Service Status: " + status);
      }
    }, false);
  },

  // This holds the bbm message text depending on the view the user is on
  // This property is altered in the weather functions
  messageText : "",

  // Update the users personal message in bbm
  updateMessage : function() {
    console.log('Content for BBM: ' + bbm.messageText);
    if (bbm.registered) {
      if (!inRipple)
        blackberry.bbm.platform.self.setPersonalMessage(bbm.messageText, function(accepted) {
        });
    } else
      // if BBM is not registered
      bbutils.showToast("Please enable BBM integration");
  },

  // Invite a contact to download your app via bbm
  inviteToDownload : function() {
    blackberry.bbm.platform.users.inviteToDownload();
  }
};

function createCitiesList(bar) {

  var cities = util.getSavedCities();

  var tabItem = {};

  // Create a city tab item object and pass this object to create a bbui list of saved cities
  for (i in cities) {
    tabItem.type = "action";
    tabItem.style = "tab";
    tabItem.overflow = "true";
    tabItem.id = cities[i].id;
    tabItem.img = "images/icons/marker.png";
    tabItem.caption = cities[i].name;

    // Create a tab item for each city and add each one to the action bar
    bar.appendChild(createTabItem(tabItem));
  }

  // This function is used to create a bbUI tab item
  function createTabItem(tabItem) {
    // This will create the list of saved cities in the tab menu
    // on item click, user will be shown the appropriate weather data
    var item;
    item = document.createElement('div');
    item.setAttribute('data-bb-type', tabItem.type);
    item.setAttribute('data-bb-style', tabItem.style);
    item.setAttribute('data-bb-overflow', tabItem.overflow);
    item.setAttribute('data-bb-img', tabItem.img);
    item.setAttribute('data-bb-accent-text', cities[i].country);
    item.setAttribute('id', tabItem.id);

    // Set a city name attribute to make it easier to retrieve the city's name
    item.setAttribute('cityname', tabItem.caption);

    // If this is set as the default city, make this the selected city as seen on bottom bar
    // this is for UI appearance on the BB10 Action bar
    if (tabItem.id == window.CITYID) {
      item.setAttribute('data-bb-selected', true);
    }

    item.innerHTML = tabItem.caption;

    item.doclick = function() {
      // Set this city as the default city of the app using the lat/lng values
      util.setDefaultCityID(this.id);

      // Set the name of the city for easy access throughout the app
      util.setDefaultCityName(this.getAttribute("cityname"));

      // Update the view and retrieve new weather details
      app.updateWeatherData();
    }
    item.doclick = item.doclick.bind(item);
    item.onclick = item.doclick;

    return item;
  }

}

function insertMenu(screen) {
  var menu = document.createElement('div'), about = document.createElement('div'), settings = document.createElement('div'), invite = document.createElement('div');

  menu.setAttribute('data-bb-type', 'menu');

  // About button
  about.setAttribute('data-bb-type', 'menu-item');
  about.setAttribute('data-bb-img', 'images/icons/info.png');
  about.setAttribute('data-bb-pin', 'left');
  about.innerHTML = 'About';
  about.onclick = showScreen.about;

  // Invite to Download Button
  invite.setAttribute('data-bb-type', 'menu-item');
  invite.setAttribute('data-bb-img', 'images/icons/bbm.png');
  invite.innerHTML = 'Invite';
  invite.onclick = function() {
    bbm.inviteToDownload()
  };

  // Settings Button
  settings.setAttribute('data-bb-type', 'menu-item');
  settings.setAttribute('data-bb-img', 'images/icons/settings.png');
  settings.setAttribute('data-bb-pin', 'right');
  settings.innerHTML = 'Settings';
  settings.onclick = showScreen.settings;

  // Add menu
  menu.appendChild(about);
  menu.appendChild(invite);
  menu.appendChild(settings);
  screen.appendChild(menu);
}

showScreen = {
  about : function() {
    bb.pushScreen('about.html', 'about');
    // show info screen
  },
  addItem : function() {
    bb.pushScreen('add.html', 'add');
    // add new item
  },
  settings : function() {
    bb.pushScreen('settings.html', 'settings');
  },
  addCity : function() {
    bb.pushScreen('add.html', 'add');
  },
  editCities : function() {
    bb.pushScreen('editcities.html', 'editcities');
    // show info screen
  },
  main : function() {
    bb.pushScreen('main.html', 'main');
  },
  pop : function() {
    bb.popScreen();
  }
};

var bbutils = {
  showToast : function(str) {

    //create a div to overlay so user can't click behind it
    var message, buttonText = "Ok", toastId;
    message = str;

    var onToastDismissed = function() {
      console.log('Toast disappeared: ' + toastId);
    }
    var options = {
      buttonText : buttonText,
      dismissCallback : onToastDismissed,
      //buttonCallback : goToMainScreen,
      timeout : 4000
    };
    toastId = blackberry.ui.toast.show(message, options);
  },

  loadShareCard : function() {
    // Load the share card
    request = {
      action : 'bb.action.SHARE',
      target_type : ["CARD"],
      mime : "text/plain",
      data : bbm.messageText
    }

    blackberry.invoke.card.invokeTargetPicker(request, "Broadcast the Weather",

    // success
    function(e) {
      console.log("Invocation successful");
    },

    // error
    function(e) {
      console.log("Invocation error: " + e);
    });
  },

  showConnectionDialog : function() {
    if (!inRipple) {
      function dialogCallBack(selection) {
        // alert(selection.return);
      }

      try {
        blackberry.ui.dialog.standardAskAsync("To use this app, please enable network connections", blackberry.ui.dialog.D_OK, dialogCallBack, {
          title : "Network Connection Required"
        });
      } catch (e) {
        alert("Exception in standardDialog: " + e);
      }
    } else
      console.log("Network Connection Required");
  }
}