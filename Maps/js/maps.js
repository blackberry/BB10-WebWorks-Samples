/*
* Copyright 2010-2011 Research In Motion Limited.
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
  APIKey = {
    'bing': '',
    'leaflet': ''
  };

  console.log('app initialized');
  startGeolocation();
}


/**
 *  google maps
 */

// initialize the map
function initGoogleMaps() {
  myLocation = new google.maps.LatLng(myLat, myLong);

  var mapOptions = {
    zoom: 14,
    center: myLocation,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControl: false,
    mapTypeControl: false,
    streetViewControl: false
  };
  googleMap = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
}

// search for nearby places
function initGooglePlaces() {
  searchForPlaces(googlePlacesCallback);
}

// search callback
function googlePlacesCallback(results) {
  for(var i = 0; i < results.length; i++) {
    createGoogleMarker(results[i]);
  }
}

// create a marker / push-pin
function createGoogleMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: googleMap,
    position: place.geometry.location
  });
}



/**
 *  bing
 */

// initialize the map
function initBingMaps() {
  setTimeout(function() {
    bingMap = new Microsoft.Maps.Map(document.getElementById("map_canvas"), {
      credentials: APIKey.bing,
      center: new Microsoft.Maps.Location(myLat, myLong),
      zoom: 14,
      mapTypeId: Microsoft.Maps.MapTypeId.road,
      showCopyright: false
    });
  }, 200);
}

// search for nearby places
function initBingPlaces() {
  Microsoft.Maps.loadModule('Microsoft.Maps.Search', {
    callback: bingSearch
  });
}

// seraching bing, using a query
function bingSearch() {
  bingMap.addComponent('searchManager', new Microsoft.Maps.Search.SearchManager(bingMap));
  searchManager = bingMap.getComponent('searchManager');

  var query = 'bars in Waterloo, Canada';
  var request = {
    query: query,
    count: 15,
    startIndex: 0,
    bounds: bingMap.getBounds(),
    callback: bingPlacesCallback
  };
  searchManager.search(request);
}

// search callback
function bingPlacesCallback(result) {
  var searchResults = result && result.searchResults;
  if(searchResults) {
    for(var i = 0; i < searchResults.length; i++) {
      createBingMarker(searchResults[i]);
    }
  }
}

// create marker / push-pin
function createBingMarker(result) {
  if(result) {
    var pin = new Microsoft.Maps.Pushpin(result.location, null);
    bingMap.entities.push(pin);
  }
}



/**
 *  leaflet
 */

// initialize the map
function initLeafletMaps() {
  leafletMap = L.map('map_canvas').setView([myLat, myLong], 14);
  L.tileLayer('http://{s}.tile.cloudmade.com/' + APIKey.leaflet.toUpperCase() + '/997/256/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 16
  }).addTo(leafletMap);
}

// search for nearby places
function initLeafletPlaces() {
  searchForPlaces(leafletPlacesCallback);
}

// search callback
function leafletPlacesCallback(results) {
  for(var i = 0; i < results.length; i++) {
    var lat = results[i].geometry.location.Ya;
    var lon = results[i].geometry.location.Za;
    var name = results[i].name;
    var address = results[i].vicinity;

    // add marker
    var marker = L.marker([lat, lon]).addTo(leafletMap);
  }
}



/**
 *  openlayers
 */

// initialize the map
function initOpenLayersMaps() {
  openLayersMap = new OpenLayers.Map('map_canvas');
  layer = new OpenLayers.Layer.OSM("Simple OSM Map");
  openLayersMap.addLayer(layer);
  openLayersMap.setCenter(
    new OpenLayers.LonLat(myLong, myLat).transform(
    new OpenLayers.Projection("EPSG:4326"), openLayersMap.getProjectionObject()
  ), 14);
}

// search for nearby places
function initOpenLayersPlaces() {
  searchForPlaces(openLayersPlacesCallback);
}

// search callback
function openLayersPlacesCallback(results) {
  if(results) {
    openLayersOverlay = new OpenLayers.Layer.Vector('Overlay', {
      styleMap: new OpenLayers.StyleMap({
        externalGraphic: 'http://www.openlayers.org/dev/img/marker.png',
        graphicWidth: 20,
        graphicHeight: 24,
        graphicYOffset: -24,
        title: '${tooltip}'
      })
    });
    openLayersMap.addLayer(openLayersOverlay);
    createOpenLayersMarker(results);
  }
}

// create marker / push-pin
function createOpenLayersMarker(results) {
    for(var i = 0; i < results.length; i++) {
      var lat = results[i].geometry.location.Ya;
      var lon = results[i].geometry.location.Za;
      var myLocation = new OpenLayers.Geometry.Point(lon, lat).transform('EPSG:4326', 'EPSG:3857');
      openLayersOverlay.addFeatures([
      new OpenLayers.Feature.Vector(myLocation)]);
    }
}



/**
 *  search for POI
 */

// example of seraching for places using google
function searchForPlaces(callback) {
  var request = {
    location: myLocation,
    radius: 2000,
    types: ['bar']
  };

  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(googleMap);
  service.search(request, callback);
  return;
}



/**
 *  geolocation
 */

// we use HTML5 Geolocation to pin-point where the user is
function startGeolocation() {
  var options;
  navigator.geolocation.getCurrentPosition(geoSuccess, geoFail, options);
}

// geolocation success callback
function geoSuccess(position) {
  var gpsPosition = position;
  var coordinates = gpsPosition.coords;
  myLat = coordinates.latitude;
  myLong = coordinates.longitude;
  bb.pushScreen('google.html', 'google');
}

// geolocation failure callback
function geoFail() {
  alert('Error getting your position. Using defaults instead');

  // set default position upon failure
  myLat = 43.465187;
  myLong = -80.522372;
  bb.pushScreen('google.html', 'google');
}
