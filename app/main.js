/*
  This file is intended to tie our Weather App to the DOM
  elements Since it relies on weather_app.js, we need to
  make sure to include this file AFTER we include
  weather_app.js
 */

(function () { // <-- Creating a closure like we did before


  /*
    Creating an array which includes multiple objects. Each
    object is used to set a minimum temperature and a short
    description to give the user
   */
  var descriptions = [
    {
      min: 80,
      text: "Ugh, it's hot as balls."
    },
    {
      min: 60,
      text: "It's warm, brah."
    },
    {
      min: 40,
      text: "Getting chilly, eh?"
    },
    {
      min: 20,
      text: "Maybe moving to LA is not such a bad idea after all."
    },
    {
      min: -Infinity,
      text: "Shit. Fuck. Shit."
    }
  ];

  /*
    Declaring variables that will be later accessed by our
    functions.  We declare them here so our functions can
    modify them and yet maintain their value between
    different function calls.
   */
  var tempEl, textEl, zipInputEl, locationEl, borderEl;

  /*
    This function is intended to run when our page has
    completed loading and all the necessary elements are
    present on the page.
   */
  function init() {

    /*
      Get reference to DOM elements we're going to use
      throughout the app. Again, these variables will be
      accessible in the rest of the functions as well,
      since they were declared outside of this function.
     */
    zipInputEl = document.getElementById('zip');
    tempEl     = document.getElementById('temp');
    locationEl = document.getElementById('location');
    textEl     = document.getElementById('text');
    borderEl   = document.getElementById('border');

     /*
       Attach an event handler to our form so when it is
       submitted our formHandler function below will be
       called.
      */
    document
      .getElementById('form')
      .addEventListener('submit', formHandler);

    /*
      Start with loading weather data for the user's current
      location and then update it on the page using the
      updateWeather function.
     */
    weatherApp.weatherForMyLocation(updateWeather);
  }

  /*
    Attaching our init function to be called only after the
    browser finished loading the page and fired the 'load'
    event (built-in).
   */
  window.addEventListener('load', init);

  /*
    This function is responsible for returning the
    (in-)appropriate description based on the temperature
    provided to it.
   */
  function getDescription(temp) {
    for (var i = 0; i < descriptions.length; i++) {
      if (temp >= descriptions[i].min) {
        return descriptions[i].text;
      }
    }
  }

  /*
    This function inserts the data in the right places every
    time we have new weather information
   */
  function updateWeather(weatherData) {
    var temp = weatherData.main.temp;
    locationEl.innerText = weatherData.name;
    tempEl.innerHTML = temp + " &#8457;";
    textEl.innerText = getDescription(temp);

    // Try to figure our what we're doing here:
    borderEl.style.transform =
      "rotate(" + (temp / 100) * 360 + "deg)";
  }

  /*
    This function just handles our form 'submit' event,
    makes sure it doesn't actually submit (would cause a
    page change), and then fires a temperature lookup based
    on the ZIP code the user entered
   */
  function formHandler(event) {
    event.preventDefault();
    var zip = zipInputEl.value;

    // invoking our Weather App with a zipcode!
    weatherApp.weatherForZipCodes([zip], updateWeather);
  }

})(); // <-- again, we have to immediately invoke our function
