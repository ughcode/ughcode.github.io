/*
  Weather App

  filename: weather_app.js
 */

(function () {

  var apiUrl = 'http://api.openweathermap.org/data/2.5/weather';

  var apiKey = 'fa32fe96da1b6e0398aecdf455e73263';

  function getWeather(locationObject, callback) {
    var url = apiUrl + '?' +
      parameterize(locationObject) +
      '&APPID=' + apiKey +
      '&units=imperial';

    makeRequest(url, function () {
      var response = this.responseText;
      response = JSON.parse(response);
      callback(response);
    });
  }

  function parameterize(object) {
    var params = [];
    for (var key in object) {
      params.push(key + '=' + encodeURIComponent(object[key]));
    }
    return params.join('&');
  }

  function makeRequest(url, callback) {
    var xhrObject = new XMLHttpRequest();
    xhrObject.onload = callback;
    xhrObject.open('GET', url, true);
    xhrObject.send();
  }

  function getUserCoordinates(callback) {
    navigator.geolocation.getCurrentPosition(function (position) {
      if (position.coords) {
        callback(position.coords);
      } else {
        console.error("Didn't get a valid coordinate, Miao!");
      }
    });
  }

  function weatherForMyLocation(callback) {
    getUserCoordinates(function (coord) {
      getWeather({
        lon: coord.longitude,
        lat: coord.latitude
      }, callback);
    });
  }

  function weatherForZipCodes(zips, callback) {
    for (var i = 0; i < zips.length; i++) {
      getWeather({
        zip: zips[i]
      }, callback);
    }
  }

  // The only difference lies here:

  // check if we're in command line environment:
  if (typeof module !== 'undefined' && module.exports) {
    global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
    module.exports = {
      weatherForZipCodes : weatherForZipCodes
    };

  // else, if we're in a browser environment:
  } else if (typeof window !== 'undefined') {
    window.weatherApp = {
      weatherForMyLocation : weatherForMyLocation,
      weatherForZipCodes   : weatherForZipCodes
    };
  }

})();

