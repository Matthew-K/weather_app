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
