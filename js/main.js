var current = example_conditions.current_observation;


//The following use the current object to get the appropriate weather info 

$("h1").text(current.display_location.full);

$("h2").text("Today");

$("#temp").text(current.temp_f);

$("#feelsLike").text(current.feelslike_f);

$("#weather").text(current.weather);

$("#weather_icon").attr("src", current.icon_url);

$("#precip").text("Precipitation: " + current.precip_today_metric + "%");

$("#humidity").text("Humidity: " + current.relative_humidity);

$("#wind").text("Wind: " + current.wind_mph);


//Today
var today = example_forecast.forecast.simpleforecast.forecastday[0];

//Day 1
var day1 = example_forecast.forecast.simpleforecast.forecastday[1];

//Day 2
var day2 = example_forecast.forecast.simpleforecast.forecastday[2];

//Day 3
var day3 = example_forecast.forecast.simpleforecast.forecastday[3];


/* Easy reference for the three day forecast, removed info that will not be used
{
  "date": {
  "pretty": "11:00 PM PDT on June 26, 2012",
  "day": 26,
  "month": 6,
  "year": 2012,
  "monthname": "June",
  "weekday": "Tuesday",
  },
  "high": {
  "fahrenheit": "68",
  "celsius": "20"
  },
  "low": {
  "fahrenheit": "50",
  "celsius": "10"
  },
  "conditions": "Partly Cloudy",
  "icon_url": "http://icons-ak.wxug.com/i/c/k/partlycloudy.gif",
  "skyicon": "mostlysunny"
  },
*/