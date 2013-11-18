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

var date = {

  // Since we are dealing with global cities, the date or time information must be displayed according to their local time
  localizeDate : function(time) {
    /* Find local time in a given country
     * http://www.techrepublic.com/article/convert-the-local-time-to-another-time-zone-with-this-javascript/
     */

    var d = new Date(time * 1000)
    // convert to msec
    // add local time zone offset
    // get UTC time in msec
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

    // create new Date object for different city
    // using supplied offset

    // "weatherData.offset" property comes from the global weatherData variable
    d = new Date(utc + (3600000 * weatherData.offset));

    // return time as a string
    return d;
  },

  getDateTime : function(time, option) {
    // option can be "mdy", "dmdy" (see below)

    // pad(num) function ensures that time values are represented properly
    // e.g. 4 minutes past 8 is displayed as 8:04 and not 8:4
    function pad(num) {
      return (num < 10 ? '0' : '') + num;
    }

    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var weekDayNames = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var d = date.localizeDate(time);

    var month, day, year, hour, minute, seconds;

    month = monthNames[d.getMonth()];
    weekday = weekDayNames[d.getDay()];
    day = d.getDate();
    year = d.getFullYear();
    hour = pad(d.getHours());
    minute = pad(d.getMinutes());
    seconds = pad(d.getSeconds());

    var str = weekday + " " + month + " " + day + " " + year + " " + hour + ":" + minute + ":" + seconds;

    if (option === "mdy") {
      str = month + " " + day + " " + year;
    } else if (option === "dmdy") {
      str = weekday + ", " + month + " " + day + ", " + year;
    }
    return str;
  },

  getTime : function(time, option) {
    // option can be "h", "hm",

    // This function ensures that time values are represented properly
    // e.g. 4 minutes past 8 is displayed as 8:04 and not 8:4
    function pad(num) {
      return (num < 10 ? '0' : '') + num;
    }

    var d = date.localizeDate(time);
    var hours = d.getHours();
    var seconds = pad(d.getSeconds());

    var nhours = hours, ampm;
    ampm = "AM";

    if (hours >= 12) {
      ampm = "PM";
      // Subtract 12 from the hour, except if it is already 12pm
      if (hours != 12)
        nhours -= 12;
    } else if (hours === 0) {
      nhours = "12";
    }

    var str = nhours + ":" + pad(d.getMinutes()) + ":" + seconds + ampm;

    if (option == "h") {
      // This is used for the Hourly Weather view
      str = nhours + ampm;
    } else if (option == "hm") {
      // This is used in the 7 days view (high temp time, sunrise etc)
      str = nhours + ":" + pad(d.getMinutes()) + ampm;
    }

    return str;
  }
}; 