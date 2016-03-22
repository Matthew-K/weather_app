/*==========   Model   ==========*/

var data = {

  //Current weather that will eventually have nulls replaced with info from API call
  current: {
    location: null,
    temp: null,
    feelsLike: null,
    conditions: null,
    icon: null,
    humidity: null,
    wind: null
  },

  /*threeDay will eventually have four objects containing today's and the next three days' weather data*/

  threeDay: [/*today, tomorrow, day2, day3*/]

  /*Each object inside threeDay will have the following info. Note: The following only shows the key/value pairs that will or might be used in displaying the three day forecast.

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



/*==========   Controller   ==========*/

var controller = {

  //Runs when program first started. API will get called/data updated, view will get rendered, and button click handlers will be created
  init: function(){
    //controller.getWeatherInfo();
    view.init();
    buttons.init();
  },

  //Takes current weather info from the API call and sets it in data.current
  setCurrent: function(currentInfo){
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
  },

  //Takes three day forecast info from the API call and sets it in data.threeday
  setthreeDay: function(info){
    var simpleForecast = info.simpleforecast.forecastday;
    simpleForecast.forEach(function(val){
      data.threeDay.push(val);
    });
  },

  /*Gets weather information from Wunderground API and uses it to set data.current and data.threeday*/
  getWeatherInfo: function(){
    $.ajax({
        type: 'GET',
        url: "http://api.wunderground.com/api/" + private.key + "/forecast/conditions/q/MA/Boston.json",
        success: function(info) {
          console.log("----------------------------");
          console.log("   Data from API received   ");
          console.log("----------------------------");
          testingTesting = info;
          controller.setCurrent(info.current_observation);
          controller.setthreeDay(info.forecast);    
        }
      });
  },

  //Retrieves the current weather from data.current
  getCurrentWeather: function(){
    return data.current;
  },

  //Retrieves the three day forecast from data.threeDay
  getThreeDayForecast: function(){
    return data.threeDay;
  }

};



/*==========   View   ==========*/

var view = {

  //Runs when program is first initialized
/*  init: function(){
    $(document).ajaxStop(function () {
      //view.renderCurrent(controller.getCurrentWeather());
      view.renderCurrent(example_conditions);
      //view.renderthreeDayForecast(example_forecast.forecast.simpleforecast.forecastday);
    });
  },*/

// BELOW INIT IS FOR EXAMPLE
  init: function(){
    view.renderCurrent(example_conditions);
    view.renderthreeDayForecast(example_forecast.forecast.simpleforecast.forecastday);
    //$("#threeDayGrid").css("display", "none");
    $("#threeDayGrid").addClass("hide");
  },

  //Renders current weather 
  renderCurrent: function(currentWeather){
    $("h1").text(currentWeather.location);
    $("h2").text("Today");
    $("#temp").text(currentWeather.temp);
    $("#feelsLike").text(currentWeather.feelsLike);
    $("#weather").text(currentWeather.conditions);
    $("#weather_icon").attr("src", currentWeather.icon);
    $("#humidity").text("Humidity: " + currentWeather.humidity);
    $("#wind").text("Wind: " + currentWeather.wind);
  },

  //Renders the three day forecast
  renderthreeDayForecast: function(threeDayForecast){
    view.createThreeDayDivs(threeDayForecast);
    for (var i = 0; i < threeDayForecast.length; i++){
      view.addWeatherTags("#day" + i, i);
      view.fillWeatherContent(threeDayForecast[i], i);
    }
  },

  /*Creates four divs in order to show the three day forecast properly (a seperate div for today(id="day0"), tomorrow(id="day1"), day 2(id="day2"), and day 3(id="day3"))*/
  createThreeDayDivs: function(days){
    for (var i = 0; i < days.length; i++){
        newDiv = document.createElement("div");
        $(newDiv).attr("id","day"+ i).addClass('threeDay').appendTo("#threeDayGrid");
    }  
  },

  /*
  addWeatherTags adds weather ready html tags and ids to each three day forecast div created by createThreeDayDivs. 

  When entering the selector enter as you would when choosing a selector using jQuery. For instance, if the selector you want to has an id named day0, use "#day0" as the selector parameter. 

 
  Index corresponds to the index in the threeDay array. It will be used as a suffix for all the ids created by this function
  */
  addWeatherTags: function(selector, index){
    $(selector).append("<h3 id =weekday" + index +"></h3>");
    $(selector).append("<p id =highTemp" + index +"></p>");
    $(selector).append("<p id =lowTemp" + index +"></p>");
    $(selector).append("<p id =weather" + index +"></p>");
    $(selector).append("<img id =icon" + index +">");
  },

  
  /*fillWeatherContent is closely related to addWeatherTags. Enter the same index used for that function in this one to fill in the proper information inside the html tags*/
  fillWeatherContent: function(day, index){
    if(index === 0){
      $("#weekday"+ index).text("Today " + day.date.month + '/' + day.date.day);
    }else{
      $("#weekday"+ index).text(day.date.weekday_short + ' ' + day.date.month + '/' + day.date.day);
    }
    $("#highTemp"+ index).text("High: " + day.high.fahrenheit +" F");
    $("#lowTemp"+ index).text("Low: " + day.low.fahrenheit + " F");
    $("#weather"+ index).text(day.conditions);
    $("#icon"+ index).attr("src", day.icon_url);
  }
};


buttons = {
  //Creates Current button click handler
  createCurrentClick: function(){
    $("#currentButton").on("click", function(){
      $("#threeDayButton").removeClass("active");
      $(this).addClass("active");
      $("#current").show();
      $("#threeDayGrid").hide();
    });
  },

  //Creates Three Day Forecast button click handler 
  createThreeDayClick: function(){
    $("#threeDayButton").on("click", function(){  
      $("#current").hide();
      $("#currentButton").removeClass("active");
      $(this).addClass("active");
      $("#threeDayGrid").show();
    });
  },

  //Runs when program first initialized. Creates button click handlers
  init: function(){
    buttons.createCurrentClick();
    buttons.createThreeDayClick();
  }
};

controller.init();


