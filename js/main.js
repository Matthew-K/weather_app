var data = {

  rightNow: {
    location: null,
    temp: null,
    feelsLike: null,
    conditions: null,
    icon: null,
    precipChance: null,
    humidity: null,
    wind: null
  },

  /*threeDayForecast will eventually have four objects containing today's and the next three days' weather data*/

  threeDayForecast: [1,2,3,4]//<-- Numbers are there for temp testing

  /*Each object inside threeDayForecast will have the following info. Note: The following only shows the keys that will or might be used in displaying the three day forecast. It does not include all of the keys.

    "date": {
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
    }
  */
};


function setRightNow(current){
  data.rightNow = {
    location: current.display_location.full,
    temp: current.temp_f,
    feelsLike: current.feelslike_f,
    conditions: current.weather,
    icon: current.icon_url,
    precipChance: current.precip_today_metric,
    humidity: current.relative_humidity,
    wind: current.wind_mph       
  };
}

function showCurrent(){
  $("h1").text(data.rightNow.location);
  $("h2").text("Today");
  $("#temp").text(data.rightNow.temp);
  $("#feelsLike").text(data.rightNow.feelsLike);
  $("#weather").text(data.rightNow.conditions);
  $("#weather_icon").attr("src", data.rightNow.icon);
  $("#precip").text("Precipitation: " + data.rightNow.precipChance + " %");
  $("#humidity").text("Humidity: " + data.rightNow.humidity);
  $("#wind").text("Wind: " + data.rightNow.wind);
}

/* Easy reference for the three day forecast, info that will not be used removed
{
  "date": {
  "day": 26,
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

var testingTesting = null;

function getWeather(){
  $.ajax({
      type: 'GET',
      url: "http://api.wunderground.com/api/" + private.key + "/forecast/conditions/q/MA/Boston.json",
      success: function(info) {
        console.log("----------------------------");
        console.log("   Data from API received   ");
        console.log("----------------------------");
        testingTesting = info;
        addToThreeDay(info.forecast);
        var current = info.current_observation;
        setRightNow(current);
        showCurrent();
      }
    });
}

function addToThreeDay(info){
  var simpleForecast = info.simpleforecast.forecastday;
  simpleForecast.forEach(function(val){
    data.threeDayForecast.push(val);
  });
}

function addDivs(days){
  for (var i = 0; i < days.length; i++){
      newDiv = document.createElement("div");
      $(newDiv).attr("id","day"+ i).addClass('threeDay').appendTo("#threeDayTest");
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
    $("#weekday"+ suffix).text("Today " + day.date.month + '/' + day.date.day);
  }else{
    $("#weekday"+ suffix).text(day.date.weekday + ' ' + day.date.month + '/' + day.date.day);
  }
  $("#highTemp"+ suffix).text("High: " + day.high.fahrenheit +" F");
  $("#lowTemp"+ suffix).text("Low: " + day.low.fahrenheit + " F");
  $("#weather"+ suffix).text(day.conditions);
  $("#icon"+ suffix).attr("src", day.icon_url);
}

function renderThreeDay(){
  addDivs(data.threeDayForecast);
  for (var i = 0; i < data.threeDayForecast.length; i++){
    addWeatherTags("#day" + i, i);
    fillWeatherContent(data.threeDayForecast[i], i);
  }
}


$("#test").on("click", function(){  
  $("#current").hide();
  $("#threeDayTest").show();
});

$("#currentButton").on("click", function(){
  $("#current").show();
  $("#threeDayTest").hide();
});



$("#threeDayTest").hide();
addDivs(data.threeDayForecast);


function init(){
  getWeather();
  //Explore why below has to be inside ajax function
  //showCurrent();
}
