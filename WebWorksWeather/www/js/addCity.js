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
/************************************
 Functions for Adding a City
 ************************************ */
var addCity = {

  // Add city to local storage and set defaults
  saveCity : function(name, id) {
    util.setDefaultCityName(name.split(",")[0]);
    util.setDefaultCityID(id);

    localStorage.setItem(name, id);
    util.isEmptyCityList = false;
  },

  // If user wants to search again, this hides the results and clears the search box
  resetSearch : function() {
    document.getElementById('cityResults').hide();
    document.getElementById("citySearchBox").value = '';
    document.getElementById('citySearchContainer').show();
    document.getElementById('resetSearchButton').hide();
  },

  getLocation : function() {
    var options = {
      enableHighAccuracy : true,
      timeout : 5000,
      maximumAge : 0
    };

    function success(pos) {
      var crd = pos.coords;
      window.CITYID = crd.latitude + "," + crd.longitude;
      var cityname = addCity.getCityFromLatlng(crd.latitude + "," + crd.longitude);

      addCity.saveCity(cityname, window.CITYID);

      // Redirect user to the main screen where weather info will be updated
      showScreen.main();
    };

    function error(error) {
      var txt = '';
      console.warn('ERROR(' + error.code + '): ' + error.message);

      switch(error.code) {
        case error.PERMISSION_DENIED:
          txt = "Please enable Location Based Services for this app"
          break;
        case error.POSITION_UNAVAILABLE:
          txt = "Location information is unavailable."
          break;
        case error.TIMEOUT:
          txt = "The request to get user location timed out."
          break;
        case error.UNKNOWN_ERROR:
          txt = "An unknown error occurred."
          break;
      }

      bbutils.showToast(txt);
    };
    // Only continue if network connection is available
    if (!window.navigator.onLine) {
      bbutils.showConnectionDialog();
      return;
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
  },

  getCityFromLatlng : function(latlng) {
    var city = '';

    var api = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + latlng + "&sensor=true";

    $.ajax({
      url : api,
      dataType : 'json',
      async : false,
      success : function(json) {
        if (json.status == "OK") {
          // First item will contain the closest match to our location
          cityInfo = json.results[0];
          city = addCity.findCityStateCountry(cityInfo, latlng);
        }
      }
    });
    return city;
  },

  findCityStateCountry : function(cityInfo, latlng) {
    var address_components = cityInfo.address_components;

    var city = {};

    // How many address components are there?
    var thelength = address_components.length;

    // Iterate through address_components array
    for (var x = 0; x < thelength; x++) {

      // The "locality" component should contain the value for the name of the City
      if (address_components[x].types[0] == "locality") {
        city.name = address_components[x].long_name;
      }

      // Get the province/state where the city is located
      if (address_components[x].types[0] == "administrative_area_level_1") {
        city.state = address_components[x].long_name;
      }

      // Used if searching for special cities such as Hong Kong, Singapore, Vatican city etc
      if (address_components[x].types[0] == "country") {
        city.country = address_components[x].long_name;
      }

    }
    var c = '';
    for (var key in city) { //Make a string containing the address components found
      c += city[key] + ",";
    }
    return c;
  },

  search : function() {

    var cityInfo, temp;
    var city = document.getElementById("citySearchBox").value;
    if (city == null || city == "") {
      bbutils.showToast("Please enter a city");
      return;
    }

    // Once user presses the 'search' button, hide the virtual keyboard for all touch devices
    document.getElementById("citySearchBox").blur();

    var cityAPI = "http://maps.googleapis.com/maps/api/geocode/json?address=" + city + "&sensor=true";

    document.getElementById('cityIndicator').show();

    $.getJSON(cityAPI, function(json) {

      if (json.status == "OK") {
        var items = [], item, latlng, ct, city, state, country;

        // Create the item's DOM in a fragment
        // Displays the search results in a list
        // user will then select the city to add it to their saved cities
        for (var i = 0, j = json.results.length; i < j; i++) {
          cityInfo = json.results[i];

          latlng = cityInfo.geometry.location.lat + "," + cityInfo.geometry.location.lng;

          // Find the city based on user input
          ct = addCity.findCityStateCountry(cityInfo, latlng);

          item = document.createElement('div');
          item.setAttribute('data-bb-type', 'item');
          item.setAttribute('data-bb-title', cityInfo.formatted_address);
          item.setAttribute('id', latlng);
          item.setAttribute("itemlocality", ct);

          item.innerHTML = "";

          item.doclick = function() {

            // When the user taps on the city, add it to local storage and set defaults
            addCity.saveCity(this.getAttribute('itemlocality'), this.getAttribute('id'));

            var options = {
              dismissCallback : showScreen.main(),
              //buttonCallback : goToMainScreen,
              timeout : 2000
            };

            if (!inRipple)
              blackberry.ui.toast.show("New City Added", options);
          }
          item.doclick = item.doclick.bind(item);
          item.onclick = item.doclick;
          items.push(item);

        }
        document.getElementById('cityResultsList').refresh(items);
        document.getElementById('citySearchContainer').hide();
        document.getElementById('cityResults').show();
        document.getElementById('resetSearchButton').show();
      } else {
        // Data does not return any matching city
        bbutils.showToast("No results found, please try again");
      }

      document.getElementById('cityIndicator').hide()

    }).done(function() {
    }).fail(function() {
      document.getElementById('cityIndicator').hide();
      bbutils.showToast("No results found, please try again");
    });
  }
}
