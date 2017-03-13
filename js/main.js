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
  setThreeDay: function(info){
    var simpleForecast = info.simpleforecast.forecastday;
    simpleForecast.forEach(function(val){
      data.threeDay.push(val);
    });
  },

  /*Gets weather information from Wunderground API and uses it to set data.current and data.threeday*/
  getWeatherInfo: function(){
    $.ajax({
        type: 'GET',
        url: "",
        success: function(info) {
          // console.log("----------------------------");
          // console.log("   Data from API received   ");
          // console.log("----------------------------");
          controller.setCurrent(info.current_observation);
          controller.setThreeDay(info.forecast);    
        },
        error: function(){
          $( "<p id='error'>There was an error with the API call. Here is an example that simulates the call.<p>" ).insertBefore("#current" );
          //example_conditions and example_forecast are from the file example.js
          controller.setCurrent(example_conditions.current_observation);
          controller.setThreeDay(example_forecast.forecast);
          view.renderCurrent(controller.getCurrentWeather());
          view.renderthreeDayForecast(controller.getThreeDayForecast());
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

  //Renders the three day forecast. Input will be controller.getThreeDayForecast()
  renderthreeDayForecast: function(threeDayForecast){
    view.createThreeDayDivs(threeDayForecast);
    for (var i = 0; i < threeDayForecast.length; i++){
      view.addWeatherTags(i);
      view.fillWeatherContent(i);
    }
  },

  /*Creates four divs each with a class of .threeDay in order to show the three day forecast properly (a seperate div for today(id="day0"), tomorrow(id="day1"), day 2(id="day2"), and day 3(id="day3")) */
  createThreeDayDivs: function(array){
    for (var i = 0; i < array.length; i++){
        newDiv = document.createElement("div");
        $(newDiv).attr("id","day"+ i).addClass('threeDay').appendTo("#threeDayGrid");
    }  
  },

  // adds weather tags to div. Index is used to locate div with an id of "day" + index. Will be used for displaying three day forecast
  addWeatherTags: function(index){
    $("#day" + index)
      .append("<h3 id =weekday" + index +"></h3>")
      .append("<p id =highTemp" + index +"></p>")
      .append("<p id =lowTemp" + index +"></p>")
      .append("<p id =weather" + index +"></p>")
      .append("<img id =icon" + index +">");
  },

  /*Puts appropriate weather info in specified div. Enter the same index used for addWeatherTags function to fill in the proper information inside the div*/
  fillWeatherContent: function(index){
    var forecast = controller.getThreeDayForecast();
    var date = forecast[index];
    if(index === 0){
      $("#weekday"+ index).text("Today " + date.date.month + '/' + date.date.day);
    }else{
      $("#weekday"+ index).text(date.date.weekday_short + ' ' + date.date.month + '/' + date.date.day);
    }
    $("#highTemp"+ index).text("High: " + date.high.fahrenheit +" F");
    $("#lowTemp"+ index).text("Low: " + date.low.fahrenheit + " F");
    $("#weather"+ index).text(date.conditions);
    $("#icon"+ index).attr("src", date.icon_url);
  },

  //Changes all fahr temps to celsius. threeDay should be an array
  convertToC: function(current, threeDay){
    $("#temp").text(current.tempC +" C");
    $("#feelsLike").text(current.feelsLikeC +" C");
    for (var i = 0; i < threeDay.length; i++){   
      $("#highTemp"+ i).text("High: " + threeDay[i].high.celsius +" C");
      $("#lowTemp"+ i).text("Low: " + threeDay[i].low.celsius +" C");
    }
  },

  //Changes all celsius temps to fahr. threeDay should be an array
  convertToF: function(current, threeDay){
    $("#temp").text(current.temp +" F");
    $("#feelsLike").text(current.feelsLike +" F");
    for (var i = 0; i < threeDay.length; i++){   
      $("#highTemp"+ i).text("High: " + threeDay[i].high.fahrenheit +" F");
      $("#lowTemp"+ i).text("Low: " + threeDay[i].low.fahrenheit +" F");
    }
  }
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

  //Creates click handler for the "Convert To " button. 
  createFCClick: function(){
    $("#FCToggle").on("click", function(){
      if($(this).text() === "Convert To "+ String.fromCharCode(176) + "C"){
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


