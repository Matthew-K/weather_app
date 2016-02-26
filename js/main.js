var data = {

  current: {
    location: null,
    temp: null,
    feelsLike: null,
    conditions: null,
    icon: null,
    precipChance: null,
    humidity: null,
    wind: null
  },

  /*threeDay will eventually have four objects containing today's and the next three days' weather data*/

  threeDay: [/*today, day1, day2, day3, day4*/]

  /*Each object inside threeDay will have the following info. Note: The following only shows the key/value pairs that will or might be used in displaying the three day forecast. It does not include all of the key/value pairs.

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


function setCurrent(currentInfo){
  data.current = {
    location: currentInfo.display_location.full,
    temp: currentInfo.temp_f,
    feelsLike: currentInfo.feelslike_f,
    conditions: currentInfo.weather,
    icon: currentInfo.icon_url,
    precipChance: currentInfo.precip_today_metric,
    humidity: currentInfo.relative_humidity,
    wind: currentInfo.wind_mph       
  };
}


function setthreeDay(info){
  var simpleForecast = info.simpleforecast.forecastday;
  simpleForecast.forEach(function(val){
    data.threeDay.push(val);
  });
}

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
        setthreeDay(info.forecast);
        renderthreeDayForecast();

        var currentInfo = info.current_observation;
        setCurrent(currentInfo);
        renderCurrent();
      }
    });
}


var view = {
  //Renders current weather 
  renderCurrent: function(){
    $("h1").text(data.current.location);
    $("h2").text("Today");
    $("#temp").text(data.current.temp);
    $("#feelsLike").text(data.current.feelsLike);
    $("#weather").text(data.current.conditions);
    $("#weather_icon").attr("src", data.current.icon);
    $("#precip").text("Precipitation: " + data.current.precipChance + " %");
    $("#humidity").text("Humidity: " + data.current.humidity);
    $("#wind").text("Wind: " + data.current.wind);
  },

  //Renders the three day forecast
  renderthreeDayForecast: function(){
    view.createThreeDayDivs(data.threeDay);
    for (var i = 0; i < data.threeDay.length; i++){
      view.addWeatherTags("#day" + i, i);
      view.fillWeatherContent(data.threeDay[i], i);
    }
  },


  //Creates four divs in order to show the three day forecast properly
  createThreeDayDivs: function(days){
    for (var i = 0; i < days.length; i++){
        newDiv = document.createElement("div");
        $(newDiv).attr("id","day"+ i).addClass('threeDay').appendTo("#threeDayTest");
    }  
  },

  /*
  addWeatherTags adds weather ready html tags and ids to each three day forecast div created by createThreeDayDivs. 

  When entering the selector enter as you would when choosing a selector using jQuery. For instance, if the selector you want to has an id named dog, use "#dog" as the selector parameter. 

 
  Index corresponds to the index in the threeDay array. It will be used as a suffix for all the ids created by this function
  */
  addWeatherTags: function(selector, index){
    $(selector).append("<p id =weekday" + index +"></p>");
    $(selector).append("<p id =highTemp" + index +"></p>");
    $(selector).append("<p id =lowTemp" + index +"></p>");
    $(selector).append("<p id =weather" + index +"></p>");
    $(selector).append("<img id =icon" + index +">");
  },

  /*
  fillWeatherContent is closely related to addWeatherTags. Enter the same index used for that function in this one to fill in the proper information inside the tags
  */
  fillWeatherContent: function(day, index){
    if(index === 0){
      $("#weekday"+ index).text("Today " + day.date.month + '/' + day.date.day);
    }else{
      $("#weekday"+ index).text(day.date.weekday + ' ' + day.date.month + '/' + day.date.day);
    }
    $("#highTemp"+ index).text("High: " + day.high.fahrenheit +" F");
    $("#lowTemp"+ index).text("Low: " + day.low.fahrenheit + " F");
    $("#weather"+ index).text(day.conditions);
    $("#icon"+ index).attr("src", day.icon_url);
  }
};

//init();



$("#test").on("click", function(){  
  $("#current").hide();
  $("#threeDayTest").show();
});

$("#currentButton").on("click", function(){
  $("#current").show();
  $("#threeDayTest").hide();
});



$("#threeDayTest").hide();
function init(){
  getWeather();
  //Explore why below has to be inside ajax function
  //showCurrent();
}
