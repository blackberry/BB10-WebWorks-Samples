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

// All our helper functions

var util = {
  celsius : function() {
    // the setting could change depending on the user, so we always have to check what the current setting is
    if (localStorage.getItem("temperatureUnit") == 'celsius')
      return true
    else
      return false;
  },

  setDefaultCityName : function(cityName) {
    window.cityName = cityName;
    localStorage.setItem("defaultCityName", cityName);
  },

  getCityName : function() {
    return window.cityName;
  },

  setDefaultCityID : function(cityID) {
    localStorage.setItem("defaultCityID", cityID);
    window.CITYID = cityID;
  },

  isEmptyCityList : true,

  checkCityList : function() {
    if (util.getSavedCities().length != 0)
      util.isEmptyCityList = false;
    else
      util.isEmptyCityList = true;
  },

  // Return an array of the cities saved in local storage
  getSavedCities : function() {
    var cities = [];

    // Create an array containing all the saved cities
    for ( i = 0; i <= localStorage.length - 1; i++) {
      key = localStorage.key(i);

      // Only display the cities, not the unrelated keys
      if (key != "temperatureUnit" && key != "firstRun" && key != "defaultCityID" && key != "defaultCityName" && key != "ripple-last-load") {
        cities.push({
          key : key,
          id : localStorage.getItem(key),
          name : key.split(",")[0],
          country : key.split(",")[1] == undefined ? "" : key.split(",")[1]
        });
      }
    }

    // Sort the list in alphabetical order
    return cities.sort(function(row1, row2) {
      var k1 = row1["name"], k2 = row2["name"];
      return (k1 > k2) ? 1 : ((k2 > k1) ? -1 : 0 );
    });
  }
};

var format = {

  // Return the temperature without the degree symbol
  // Used to format BBM Status messages
  tempPlaintext : function(num) {
    return Math.round(num) + (util.celsius() ? "C" : "F");
  },

  // Return the city name and the temperature (Note the degree symbol is not present)
  // &#176 does not work and copy/pasting degree symbol inserts erroneous letter (A)
  // cover label example: "Toronto: 22C"
  coverLabel : function(city, num) {
    return city + ": " + Math.round(num) + (util.celsius() ? "C" : "F");
  },

  humidity : function(hum) {
    if (hum)
      return Math.round(hum * 100) + "%";
    else
      return "-";
  },

  pressure : function(pres) {
    if (pres) {
      return Math.round(pres) + "mb";
    } else
      return "-";
  },

  temperature : function(num) {
    var unit;

    if (localStorage.getItem("temperatureUnit") == 'celsius') {
      //calculation for celsius
      unit = "C";
    } else
      //calculation for fahrenheit
      unit = "F";
    return Math.round(num) + "&#176" + unit;
  },

  visibility : function(vis) {
    if (vis) {
      return Math.round(vis) + (util.celsius() ? "km" : "mi");
    } else {
      return "-";
    }
  },

  wind : function(wind, dir) {

    function getWindDirection(degrees) {
      var windDirection = "";

      if (337.5 > degrees <= 22.5) {
        windDirection += "N";
      } else if (22.5 > degrees <= 67.5) {
        windDirection += "NE";
      } else if (67.5 > degrees <= 112.5) {
        windDirection += "E";
      } else if (112.5 > degrees <= 157.5) {
        windDirection += "SE";
      } else if (157.5 > degrees <= 202.5) {
        windDirection += "S";
      } else if (202.5 > degrees <= 247.5) {
        windDirection += "SW";
      } else if (247.5 > degrees <= 292.5) {
        windDirection += "W";
      } else if (292.5 > degrees <= 337.5) {
        windDirection += "NW";
      }
      return windDirection;
    }

    return getWindDirection(dir) + " " + Math.round(wind) + (util.celsius() ? "km/h" : "mph");
  }
}
