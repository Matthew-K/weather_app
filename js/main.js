/*==========   Model   ==========*/

var data = {

  //Current weather that will eventually have nulls replaced with info from API call
  current: {
    location: null,
    temp: null,
    tempC: null,
    feelsLike: null,
    feelsLikeC: null,
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
    controller.getWeatherInfo();
    view.init();
    buttons.init();
  },

  //Takes current weather info from the API call and sets it in data.current
  setCurrent: function(currentInfo){
    data.current = {
      location: currentInfo.display_location.full,
      temp: currentInfo.temp_f,
      tempC: currentInfo.temp_c,
      feelsLike: currentInfo.feelslike_f,
      feelsLikeC: currentInfo.feelslike_c,
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
        // If you wish to make changes to the app without calling the API each time you refresh the browser, uncomment the url key with the empty string value below and comment out the url key with the actual url value below that. Note: The convert button currently does not work when working with the example.
        // url: "",
        url: "http://api.wunderground.com/api/b857cdba14540849/forecast/geolookup/conditions/q/autoip.json?",
        success: function(info) {
          // console.log("----------------------------");
          // console.log("   Data from API received   ");
          // console.log("----------------------------");
          controller.setCurrent(info.current_observation);
          controller.setthreeDay(info.forecast);    
        },
        error: function(){
          $( "<p id='error'>There was an error with the API call. Here is an example that simulates the call.<p>" ).insertBefore("#current" );
          //example_conditions and example_forecast are from the file example.js
          controller.setCurrent(example_conditions.current_observation);
          // console.log(example_forecast.forecast.simpleforecast.forecastday);
          // controller.setthreeDay(example_forecast.forecast.simpleforecast.forecastday);
          view.renderCurrent(data.current);
          view.renderthreeDayForecast(example_forecast.forecast.simpleforecast.forecastday);
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
 init: function(){
    $(document).ajaxStop(function () {
      view.renderCurrent(controller.getCurrentWeather());
      view.renderthreeDayForecast(controller.getThreeDayForecast());
    });
  },

  //Renders current weather 
  renderCurrent: function(currentWeather){
    $("h1").text(currentWeather.location);
    $("h2:first").text("Today");
    $("#temp").text(currentWeather.temp + ' F');
    $("#feelsLike").text(currentWeather.feelsLike + ' F');
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

  /*Creates four divs each with a class of .threeDay in order to show the three day forecast properly (a seperate div for today(id="day0"), tomorrow(id="day1"), day 2(id="day2"), and day 3(id="day3"))*/
  createThreeDayDivs: function(days){
    for (var i = 0; i < days.length; i++){
        newDiv = document.createElement("div");
        $(newDiv).attr("id","day"+ i).addClass('threeDay').appendTo("#threeDayGrid");
    }  
  },

  /*
  addWeatherTags adds weather ready html tags and ids to each three day forecast div created by createThreeDayDivs. 

  When entering the selector enter as you would when choosing a selector using jQuery. For instance, if the selector you want to has an id named day0, use "#day0" as the selector parameter. 

  Index corresponds to the index in data.threeDay. It will be used as a suffix for all the ids created by this function.

  The class "fahr" is also added to the necessary ids.
  */
  addWeatherTags: function(selector, index){
    $(selector).append("<h3 id =weekday" + index +"></h3>");
    $(selector).append("<p id =highTemp" + index +"></p>");
    $(selector).append("<p id =lowTemp" + index +"></p>");
    $(selector).append("<p id =weather" + index +"></p>");
    $(selector).append("<img id =icon" + index +">");

    // class "fahr" added to #highTemp and #lowTemp. Will be used when converting to celsius.
    $("#highTemp"+ index).addClass("fahr");
    $("#lowTemp"+ index).addClass("fahr");
  },

  /*fillWeatherContent is closely related to addWeatherTags. Enter the same index used for that function in this one to fill in the proper information inside the html tags in each div*/
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
  },

    //changes all fahr temps to celsius. threeDay should be an array
  convertToC: function(current, threeDay){
    $("#temp").text(current.tempC +" C");
    $("#feelsLike").text(current.feelsLikeC +" C");
    for (var i = 0; i < threeDay.length; i++){   
      $("#highTemp"+ i).text("High: " + threeDay[i].high.celsius +" C");
      $("#lowTemp"+ i).text("Low: " + threeDay[i].low.celsius +" C");
    }
  },

  // changes all celsius temps to fahr. threeDay should be an array
  convertToF: function(current, threeDay){
    $("#temp").text(current.temp +" F");
    $("#feelsLike").text(current.feelsLike +" F");
    for (var i = 0; i < threeDay.length; i++){   
      $("#highTemp"+ i).text("High: " + threeDay[i].high.fahrenheit +" F");
      $("#lowTemp"+ i).text("Low: " + threeDay[i].low.fahrenheit +" F");
    }
  },
};


buttons = {
  //Creates Current button click handler
  createCurrentClick: function(){
    $("#currentButton").on("click", function(){
      $("#threeDayButton").removeClass("active");
      $(this).addClass("active");
      $("#current").removeClass("hide");
      $("#threeDayGrid").removeClass("flex").addClass("hide");
      $("#FCDiv").removeClass("align-left");
    });
  },

  //Creates Three Day Forecast button click handler 
  createThreeDayClick: function(){
    $("#threeDayButton").on("click", function(){  
      $("#current").addClass("hide");
      $("#currentButton").removeClass("active");
      $(this).addClass("active");
      $("#threeDayGrid").removeClass("hide").addClass("flex");
      $("#FCDiv").addClass("align-left");
    });
  },

  createFCClick: function(){
    $("#FCToggle").on("click", function(){
      if($(this).text() === "Convert To "+ String.fromCharCode(176) + "C"){
        console.log(controller.getThreeDayForecast());
        view.convertToC(controller.getCurrentWeather(),controller.getThreeDayForecast());
        $(this).text("Convert To "+ String.fromCharCode(176) + "F");
      } else {
        $(this).text("Convert To "+ String.fromCharCode(176) + "C");
        view.convertToF(controller.getCurrentWeather(),controller.getThreeDayForecast());
      }
    });
  },

  //Runs when program first initialized. Creates button click handlers
  init: function(){
    buttons.createCurrentClick();
    buttons.createThreeDayClick();
    buttons.createFCClick();
  }
};


//Initializes app
controller.init();


