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

/* ** Enter your API key below **
 * ** Register for a free key at http://developer.forecast.io
 * **********************************************************/
APIKEY = "<API_KEY_HERE>";

// URL of the Forecast weather API
WEATHERAPI_ADDRESS = "http://api.forecast.io/forecast/" + APIKEY;

// Variable to hold weather data for each view (today/tmw/hourly/etc)
_weatherDetails = "";

// Global variable to store the default city while app is in session
window.CITYID = "";

window.cityName = "";

// Variable to store the JSON response from the weather API
// the response contains minutely, hourly, daily forecast
weatherData = {};

var UIdisplay = {
  // Title of the page that will display weather content
  panelTitle : function(str) {
    document.getElementById('panelTitle').innerHTML = str;
  },

  // div element that will display the weather information
  resultsContent : function(str) {
    document.getElementById("weatherdivresults").innerHTML = str;
  },

  showIndicator : function() {
    document.getElementById('indicator').show();
  },

  hideIndicator : function() {
    document.getElementById('indicator').hide();
  }
}

// The app object holds all the variables and functions related to displaying the weather information
var app = {

  updateWeatherData : function() {
    console.log('updateWeatherData()');
    // Empty state
    _weatherDetails = "";
    weatherData = "";

    if (!window.navigator.onLine) {
      bbutils.showConnectionDialog();
      return;
    }

    if (util.isEmptyCityList) {
      return;
    }
    // Clear the contents div and show the activity indicator
    UIdisplay.panelTitle("Retrieving weather info");
    UIdisplay.resultsContent("");
    UIdisplay.showIndicator();

    // Query the weather api and store the result in the weatherData variable

    // save the id (latlong) to global variable
    util.setDefaultCityID(window.CITYID);

    var api = WEATHERAPI_ADDRESS + "/" + window.CITYID;

    // To make sure the json object returns data correctly according to user's settings
    // We need to check it here before we query the API
    var units = (localStorage.getItem("temperatureUnit") == 'celsius') ? "ca" : "us";

    $.ajax({
      url : api + "?units=" + units,
      dataType : 'jsonp',
      async : true,
      timeout : 20000,
      success : function(json) {
        console.log("getWeatherData success");
        // Save the results into the global variable
        weatherData = json;
        app.getCurrentWeather();
      },
      error : function() {
        bbutils.showToast("Please Try Again");
      }
    });
  },

  // This function is called to display the current information
  getCurrentWeather : function() {

    // Continue if network connection is available
    if (!window.navigator.onLine) {
      bbutils.showConnectionDialog();
      return;
    }

    // Is there a city to retrieve the weather for?
    if (util.isEmptyCityList)
      return;

    UIdisplay.showIndicator();

    // This is a hack to display that the "Current" pill button is
    // selected whenever the user returns to that screen

    if (document.getElementById('pillbuttons'))
      document.getElementById('pillbuttons').remove();

    // Create Pill Buttons
    var pill = document.createElement('div');
    pill.setAttribute('data-bb-type', 'pill-buttons');
    pill.setAttribute('id', 'pillbuttons');

    // Create button
    var btn = document.createElement('div');
    btn.setAttribute('data-bb-type', 'pill-button');
    btn.setAttribute('data-bb-selected', 'true');
    btn.setAttribute('id', 'currentPillButton');
    btn.innerHTML = 'Current';
    btn.onclick = function() {
      app.getCurrentWeather();
    };
    pill.appendChild(btn);

    // Create button
    btn = document.createElement('div');
    btn.setAttribute('data-bb-type', 'pill-button');
    btn.setAttribute('id', 'hourlyPillButton');
    btn.innerHTML = 'Hourly';
    btn.onclick = function() {
      app.getHourly()
    };
    pill.appendChild(btn);

    pill = bb.pillButtons.style(pill);

    document.getElementById('buttonContainer').appendChild(pill);

    UIdisplay.panelTitle("Current Weather | " + window.cityName);

    UIdisplay.resultsContent("");

    var cityname = util.getCityName();

    _weatherDetails = {
      city : cityname,
      time : date.getDateTime(weatherData.currently.time),
      icon : "images/lg_wicons/" + weatherData.currently.icon + ".png",
      current : format.temperature(weatherData.currently.temperature),
      humidity : format.humidity(weatherData.currently.humidity),
      wind : format.wind(weatherData.currently.windSpeed, weatherData.currently.windBearing),
      visibility : format.visibility(weatherData.currently.visibility),
      pressure : format.pressure(weatherData.currently.pressure),
      weather : weatherData.currently.summary,
      desc : weatherData.minutely ? weatherData.minutely.summary : ""
    }

    var temptxt = '';
    if (_weatherDetails.desc == "")
      temptxt = _weatherDetails.weather;
    else
      temptxt = _weatherDetails.desc

    /*********************************/
    // SET THE BBM MESSAGE HERE
    bbm.messageText = _weatherDetails.city + ": " + format.tempPlaintext(weatherData.currently.temperature) + ". " + temptxt;

    /*********************************/
    // SET THE WINDOW COVER LABEL HERE
    coverlabel = format.coverLabel(cityname, weatherData.currently.temperature);

    var str = "";
    str += _weatherDetails.time;
    str += "<div>";
    str += "<div class='temperature'>" + _weatherDetails.current + "</div>";
    str += "<div class='weatherdesc'>";
    str += "<h1><img class='vmiddle' src=" + _weatherDetails.icon + ">" + _weatherDetails.weather + "</h1>";
    if (_weatherDetails.desc != "")
      str += "<span style='text-transform:none'>" + _weatherDetails.desc + "</span>";
    str += "</div></div>";
    str += "<ul class='indepth'><li><h2>Humidity</h2>" + _weatherDetails.humidity + "</li>";
    str += "<li><h2>Wind</h2>" + _weatherDetails.wind + "</li>";
    str += "<li><h2>Visibility</h2>" + _weatherDetails.visibility + "</li>";
    str += "<li><h2>Pressure</h2>" + _weatherDetails.pressure + "</li></ul>";

    UIdisplay.resultsContent(str);

    UIdisplay.hideIndicator();

  },

  // This function is called to display the Hourly information
  getHourly : function() {

    // Continue if network connection is available
    if (!window.navigator.onLine) {
      bbutils.showConnectionDialog();
      return;
    }

    // Is there a city to retrieve the weather for?
    if (util.isEmptyCityList) {
      console.log('No cities');
      return;
    }

    UIdisplay.panelTitle("Hourly Weather | " + window.cityName);
    UIdisplay.showIndicator();

    var str = "<h1><img class='vmiddle' src='images/lg_wicons/" + weatherData.hourly.icon + ".png'>" + weatherData.hourly.summary;

    bbm.messageText = util.getCityName() + ": " + weatherData.hourly.summary;

    var hourly = weatherData.hourly.data;

    for (var i = 0; i < 13; i++) {

      _weatherDetails = {
        icon : "images/sm_wicons/" + hourly[i].icon + ".png",
        current : format.temperature(hourly[i].temperature),
        humidity : hourly[i].humidity,
        weather : hourly[i].summary,
        desc : hourly[i].summary,
        time : date.getTime(hourly[i].time, "h")
      }

      str += "<div class='sdaysdiv'>";
      str += "<span class='hrlylist'>" + _weatherDetails.time + "</span>";
      str += "<span class='hrlylist'>" + _weatherDetails.current + "</span>  ";
      str += "<img class='vmiddle' src='" + _weatherDetails.icon + "'>";
      str += _weatherDetails.weather + "</div>";
    };

    UIdisplay.resultsContent(str);
    UIdisplay.hideIndicator();

  },

  // This function is called to display the information for the next 7 days
  get7DaysWeather : function() {

    // Continue if network connection is available
    if (!window.navigator.onLine) {
      bbutils.showConnectionDialog();
      return;
    }

    // Is there a city to retrieve the weather for?
    if (util.isEmptyCityList)
      return;

    document.getElementById('pillbuttons').hide();
    UIdisplay.panelTitle("Weather for next 7 days | " + window.cityName);
    UIdisplay.showIndicator();

    var str = "";

    var str = "<h1><img class='vmiddle' src='images/lg_wicons/" + weatherData.daily.icon + ".png'>" + weatherData.daily.summary + "</h1>";
    bbm.messageText = util.getCityName() + ": " + weatherData.daily.summary;

    dayWeather = weatherData.daily.data;

    for (var i = 1; i < 7; i++) {

      _weatherDetails = {
        icon : "images/lg_wicons/" + dayWeather[i].icon + ".png",
        low : format.temperature(dayWeather[i].temperatureMin),
        high : format.temperature(dayWeather[i].temperatureMax),
        lowTime : date.getTime(dayWeather[i].temperatureMinTime, "hm"),
        highTime : date.getTime(dayWeather[i].temperatureMaxTime, "hm"),
        weather : dayWeather[i].summary,
        time : date.getDateTime(dayWeather[i].time, "dmdy"),
        sunrise : date.getTime(dayWeather[i].sunriseTime, "hm"),
        sunset : date.getTime(dayWeather[i].sunsetTime, "hm")
      };

      str += "<div class='sdaysdiv'><span style='font-size:1.2em'>" + _weatherDetails.time + "</span>";
      str += '<div class="weatherdesc">';
      str += '<img class="vmiddle" src=' + _weatherDetails.icon + '>' + _weatherDetails.weather;
      str += '</div>';
      str += "<ul class='sevendays'>";
      str += "<li><div class='sdayshighlowblock'><h2>High</h2>" + _weatherDetails.highTime + "</div><div class='sdaystempblock'>" + _weatherDetails.high + "</div></li>";
      str += "<li><h2>Sunrise</h2>" + _weatherDetails.sunrise + "</li></ul>";
      str += "<ul class='sevendays'>";
      str += "<li><div class='sdayshighlowblock'><h2>Low</h2>" + _weatherDetails.lowTime + "</div><div class='sdaystempblock'>" + _weatherDetails.low + "</div></li>";
      str += "<li><h2>Sunset</h2>" + _weatherDetails.sunset + "</li></ul></div>";

      UIdisplay.resultsContent(str);

      UIdisplay.hideIndicator();
    }
  },

  // This function is called to display the information for the next 7 days
  getTomorrowsWeather : function() {

    // Continue if network connection is available
    if (!window.navigator.onLine) {
      bbutils.showConnectionDialog();
      return;
    }

    // Is there a city to retrieve the weather for?
    if (util.isEmptyCityList)
      return;

    // Continue if network connection is available
    if (!window.navigator.onLine) {
      bbutils.showConnectionDialog();
      return;
    }

    // Is there a city to retrieve the weather for?
    if (util.isEmptyCityList)
      return;

    var cityname = util.getCityName();
    document.getElementById('pillbuttons').hide();
    UIdisplay.panelTitle("Tomorrow's Weather | " + cityname);
    UIdisplay.showIndicator();

    UIdisplay.resultsContent("");

    // Tomorrow's information is stored in the first array position of the Daily data object
    var data = weatherData.daily.data[1];
    _weatherDetails = {
      city : cityname,
      day : date.getDateTime(data.time, "dmdy"),
      icon : "images/lg_wicons/" + data.icon + ".png",

      low : format.temperature(data.temperatureMin),
      high : format.temperature(data.temperatureMax),
      lowTime : date.getTime(data.temperatureMinTime, "hm"),
      highTime : date.getTime(data.temperatureMaxTime, "hm"),
      sunrise : date.getTime(data.sunriseTime, "hm"),
      sunset : date.getTime(data.sunsetTime, "hm"),

      humidity : format.humidity(data.humidity),
      wind : format.wind(data.windSpeed, data.windBearing),
      visibility : format.visibility(data.visibility),
      pressure : format.pressure(data.pressure),
      weather : data.summary
    }

    var str = "";
    str += _weatherDetails.day;
    str += '<h1>';
    str += '<img class="vmiddle" src=' + _weatherDetails.icon + '>' + _weatherDetails.weather + "</h1>";
    str += '</h1><hr/>';

    str += "<ul class='sevendays'>";
    str += "<li><div class='sdayshighlowblock'><h2>High</h2>" + _weatherDetails.highTime + "</div><div class='sdaystempblock'>" + _weatherDetails.high + "</div></li>";
    str += "<li><h2>Sunrise</h2>" + _weatherDetails.sunrise + "</li></ul>";

    str += "<ul class='sevendays'>";
    str += "<li><div class='sdayshighlowblock'><h2>Low</h2>" + _weatherDetails.lowTime + "</div><div class='sdaystempblock'>" + _weatherDetails.low + "</div></li>";
    str += "<li><h2>Sunset</h2>" + _weatherDetails.sunset + "</li></ul><hr/>";

    str += "<ul class='indepth'><li><h2>Humidity</h2>" + _weatherDetails.humidity + "</li>";
    str += "<li><h2>Wind</h2>" + _weatherDetails.wind + "</li>";
    str += "<li><h2>Visibility</h2>" + _weatherDetails.visibility + "</li>";
    str += "<li><h2>Pressure</h2>" + _weatherDetails.pressure + "</li></ul>";

    bbm.messageText = _weatherDetails.city + ": Tomorrow - " + _weatherDetails.weather;

    UIdisplay.resultsContent(str);
    UIdisplay.hideIndicator();
  }
};
