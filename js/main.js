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


//currently commented out, use examples to finish layout and js 
/*
var current_Boston = null;
$.ajax({
	  type: 'GET',
	  url: "http://api.wunderground.com/api/" + private.key + "/forecast/q/MA/Boston.json",
	  success: function(data) {
	    console.log("Got data");
	   	current_Boston = data;
	  }
	});
*/


//commented out to work out the inner html on a test div
/*
function addDivs(){
  $("#current").remove();
  for (var i = 0; i < 4; i++){
      newDiv = document.createElement("div");
      $(newDiv).attr("id","day"+ i).addClass('threeDay').appendTo(".grid");
  }
}

//forEach

$("#test").on("click", addDivs);
*/
 //     newDiv = document.createElement("div");
 //     $(newDiv).attr("id","day1").addClass('threeDay').appendTo(".grid");
var threeDayForecast = [today, day1, day2, day3];
function addDivs(){
  $("#current").remove();
  for (var i = 0; i < 4; i++){
      newDiv = document.createElement("div");
      $(newDiv).attr("id","day"+ i).addClass('threeDay').appendTo(".grid");
  }
}


/*
addWeatherTags adds weather ready tags and ids to a div. 

When entering the selector enter as you would when choosing a selector using jQuery. For instance, if the selector you want to has an id named dog, use "#dog" as the selector parameter.

Suffix is the string or number you want to use to serve as the suffix for all ids created by this function.
*/
function addWeatherTags(selector, suffix){
  $(selector).append("<p id =weekday" + suffix +"></p>");
  $(selector).append("<p id =highTemp" + suffix +"></p>");
  $(selector).append("<p id =lowTemp" + suffix +"></p>");
  $(selector).append("<p id =weather" + suffix +"></p>");
  $(selector).append("<img id =icon" + suffix +">");
}


/*
This function is closely related to addWeatherTags. Enter the same suffix used for that function in this one to fill in the proper information inside the tags
*/
function fillWeatherContent(day, suffix){
  if(suffix === 0){
    $("#weekday"+ suffix).text("Today");
  }else{
    $("#weekday"+ suffix).text(day.date.weekday);
  }
  $("#highTemp"+ suffix).text("High: " + day.high.fahrenheit +" F");
  $("#lowTemp"+ suffix).text("Low: " + day.low.fahrenheit + " F");
  $("#weather"+ suffix).text(day.conditions);
  $("#icon"+ suffix).attr("src", day.icon_url);
}


//Testing
addDivs();

addWeatherTags("#day0", 0);
fillWeatherContent(threeDayForecast[0], 0);

addWeatherTags("#day1", 1);
fillWeatherContent(threeDayForecast[1], 1);

addWeatherTags("#day2", 2);
fillWeatherContent(threeDayForecast[2], 2);

addWeatherTags("#day3", 3);
fillWeatherContent(threeDayForecast[3], 3);

