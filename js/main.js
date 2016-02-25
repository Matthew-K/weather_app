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


/* Easy reference for the three day forecast, info that will not be used removed
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



var threeDayForecast = [];

/*
currently commented out, uncomment to run properly

$.ajax({
	  type: 'GET',
	  url: "http://api.wunderground.com/api/" + private.key + "/forecast/q/MA/Boston.json",
	  success: function(data) {
	    console.log("Got data");
	   	//current_Boston = data;
      console.log(data.forecast.simpleforecast);
      var simpleForcast = data.forecast.simpleforecast;

      //today
      threeDayForecast.push(simpleForcast.forecastday[0]);
      //Day 1
      threeDayForecast.push(simpleForcast.forecastday[1]);

      //Day 2
      threeDayForecast.push(simpleForcast.forecastday[2]);

      //Day 3
      threeDayForecast.push(simpleForcast.forecastday[3]);
	  }
	});
*/

/*Able to combine 
key/conditions/forecast/q/CA/San_Francisco.json

function addDivs(days){
  $("#current").hide();
  for (var i = 0; i < days.length; i++){
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

function renderThreeDay(){
  addDivs(threeDayForecast);
  for (var i = 0; i < threeDayForecast.length; i++){
    addWeatherTags("#day" + i, i);
    fillWeatherContent(threeDayForecast[i], i);
  }
}

$("#test").on("click", function(){
  renderThreeDay();
  $(this).off('click');
});


