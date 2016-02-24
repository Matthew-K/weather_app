// Examples from Weather Underground
// wunderground.com


// https://www.wunderground.com/weather/api/d/docs?d=data/conditions

var example_conditions = 
{
  "response": {
  "version": "0.1",
  "termsofService": "http://www.wunderground.com/weather/api/d/terms.html",
  "features": {
  "conditions": 1
  }
  },
  "current_observation": {
  "image": {
  "url": "http://icons-ak.wxug.com/graphics/wu2/logo_130x80.png",
  "title": "Weather Underground",
  "link": "http://www.wunderground.com"
  },
  "display_location": {
  "full": "San Francisco, CA",
  "city": "San Francisco",
  "state": "CA",
  "state_name": "California",
  "country": "US",
  "country_iso3166": "US",
  "zip": "94101",
  "latitude": "37.77500916",
  "longitude": "-122.41825867",
  "elevation": "47.00000000"
  },
  "observation_location": {
  "full": "SOMA - Near Van Ness, San Francisco, California",
  "city": "SOMA - Near Van Ness, San Francisco",
  "state": "California",
  "country": "US",
  "country_iso3166": "US",
  "latitude": "37.773285",
  "longitude": "-122.417725",
  "elevation": "49 ft"
  },
  "estimated": {},
  "station_id": "KCASANFR58",
  "observation_time": "Last Updated on June 27, 5:27 PM PDT",
  "observation_time_rfc822": "Wed, 27 Jun 2012 17:27:13 -0700",
  "observation_epoch": "1340843233",
  "local_time_rfc822": "Wed, 27 Jun 2012 17:27:14 -0700",
  "local_epoch": "1340843234",
  "local_tz_short": "PDT",
  "local_tz_long": "America/Los_Angeles",
  "local_tz_offset": "-0700",
  "weather": "Partly Cloudy",
  "temperature_string": "66.3 F (19.1 C)",
  "temp_f": 66.3,
  "temp_c": 19.1,
  "relative_humidity": "65%",
  "wind_string": "From the NNW at 22.0 MPH Gusting to 28.0 MPH",
  "wind_dir": "NNW",
  "wind_degrees": 346,
  "wind_mph": 22.0,
  "wind_gust_mph": "28.0",
  "wind_kph": 35.4,
  "wind_gust_kph": "45.1",
  "pressure_mb": "1013",
  "pressure_in": "29.93",
  "pressure_trend": "+",
  "dewpoint_string": "54 F (12 C)",
  "dewpoint_f": 54,
  "dewpoint_c": 12,
  "heat_index_string": "NA",
  "heat_index_f": "NA",
  "heat_index_c": "NA",
  "windchill_string": "NA",
  "windchill_f": "NA",
  "windchill_c": "NA",
  "feelslike_string": "66.3 F (19.1 C)",
  "feelslike_f": "66.3",
  "feelslike_c": "19.1",
  "visibility_mi": "10.0",
  "visibility_km": "16.1",
  "solarradiation": "",
  "UV": "5",
  "precip_1hr_string": "0.00 in ( 0 mm)",
  "precip_1hr_in": "0.00",
  "precip_1hr_metric": " 0",
  "precip_today_string": "0.00 in (0 mm)",
  "precip_today_in": "0.00",
  "precip_today_metric": "0",
  "icon": "partlycloudy",
  "icon_url": "http://icons-ak.wxug.com/i/c/k/partlycloudy.gif",
  "forecast_url": "http://www.wunderground.com/US/CA/San_Francisco.html",
  "history_url": "http://www.wunderground.com/history/airport/KCASANFR58/2012/6/27/DailyHistory.html",
  "ob_url": "http://www.wunderground.com/cgi-bin/findweather/getForecast?query=37.773285,-122.417725"
  }
};

var example_forecast =
{
  "response": {
  "version": "0.1",
  "termsofService": "http://www.wunderground.com/weather/api/d/terms.html",
  "features": {
  "forecast": 1
  }
  },
  "forecast": {
  "txt_forecast": {
  "date": "2:00 PM PDT",
  "forecastday": [{
  "period": 0,
  "icon": "partlycloudy",
  "icon_url": "http://icons-ak.wxug.com/i/c/k/partlycloudy.gif",
  "title": "Tuesday",
  "fcttext": "Partly cloudy in the morning, then clear. High of 68F. Breezy. Winds from the West at 10 to 25 mph.",
  "fcttext_metric": "Partly cloudy in the morning, then clear. High of 20C. Windy. Winds from the West at 20 to 35 km/h.",
  "pop": "0"
  }, {
  "period": 1,
  "icon": "partlycloudy",
  "icon_url": "http://icons-ak.wxug.com/i/c/k/partlycloudy.gif",
  "title": "Tuesday Night",
  "fcttext": "Mostly cloudy. Fog overnight. Low of 50F. Winds from the WSW at 5 to 15 mph.",
  "fcttext_metric": "Mostly cloudy. Fog overnight. Low of 10C. Breezy. Winds from the WSW at 10 to 20 km/h.",
  "pop": "0"
  }, {
  "period": 2,
  "icon": "partlycloudy",
  "icon_url": "http://icons-ak.wxug.com/i/c/k/partlycloudy.gif",
  "title": "Wednesday",
  "fcttext": "Mostly cloudy. Fog early. High of 72F. Winds from the WSW at 10 to 15 mph.",
  "fcttext_metric": "Mostly cloudy. Fog early. High of 22C. Breezy. Winds from the WSW at 15 to 20 km/h.",
  "pop": "0"
  }, {
  "period": 3,
  "icon": "mostlycloudy",
  "icon_url": "http://icons-ak.wxug.com/i/c/k/mostlycloudy.gif",
  "title": "Wednesday Night",
  "fcttext": "Overcast. Fog overnight. Low of 54F. Winds from the WSW at 5 to 15 mph.",
  "fcttext_metric": "Overcast. Fog overnight. Low of 12C. Breezy. Winds from the WSW at 10 to 20 km/h.",
  "pop": "0"
  }, {
  "period": 4,
  "icon": "partlycloudy",
  "icon_url": "http://icons-ak.wxug.com/i/c/k/partlycloudy.gif",
  "title": "Thursday",
  "fcttext": "Overcast in the morning, then partly cloudy. Fog early. High of 72F. Winds from the WSW at 10 to 15 mph.",
  "fcttext_metric": "Overcast in the morning, then partly cloudy. Fog early. High of 22C. Breezy. Winds from the WSW at 15 to 25 km/h.",
  "pop": "0"
  }, {
  "period": 5,
  "icon": "partlycloudy",
  "icon_url": "http://icons-ak.wxug.com/i/c/k/partlycloudy.gif",
  "title": "Thursday Night",
  "fcttext": "Partly cloudy in the evening, then overcast. Fog overnight. Low of 54F. Winds from the WNW at 5 to 15 mph.",
  "fcttext_metric": "Partly cloudy in the evening, then overcast. Fog overnight. Low of 12C. Breezy. Winds from the WNW at 10 to 20 km/h.",
  "pop": "0"
  }, {
  "period": 6,
  "icon": "partlycloudy",
  "icon_url": "http://icons-ak.wxug.com/i/c/k/partlycloudy.gif",
  "title": "Friday",
  "fcttext": "Overcast in the morning, then partly cloudy. Fog early. High of 68F. Winds from the West at 5 to 15 mph.",
  "fcttext_metric": "Overcast in the morning, then partly cloudy. Fog early. High of 20C. Breezy. Winds from the West at 10 to 20 km/h.",
  "pop": "0"
  }, {
  "period": 7,
  "icon": "partlycloudy",
  "icon_url": "http://icons-ak.wxug.com/i/c/k/partlycloudy.gif",
  "title": "Friday Night",
  "fcttext": "Mostly cloudy. Fog overnight. Low of 52F. Winds from the West at 5 to 10 mph.",
  "fcttext_metric": "Mostly cloudy. Fog overnight. Low of 11C. Winds from the West at 10 to 15 km/h.",
  "pop": "0"
  }]
  },
  "simpleforecast": {
  "forecastday": [{
  "date": {
  "epoch": "1340776800",
  "pretty": "11:00 PM PDT on June 26, 2012",
  "day": 26,
  "month": 6,
  "year": 2012,
  "yday": 177,
  "hour": 23,
  "min": "00",
  "sec": 0,
  "isdst": "1",
  "monthname": "June",
  "weekday_short": "Tue",
  "weekday": "Tuesday",
  "ampm": "PM",
  "tz_short": "PDT",
  "tz_long": "America/Los_Angeles"
  },
  "period": 1,
  "high": {
  "fahrenheit": "68",
  "celsius": "20"
  },
  "low": {
  "fahrenheit": "50",
  "celsius": "10"
  },
  "conditions": "Partly Cloudy",
  "icon": "partlycloudy",
  "icon_url": "http://icons-ak.wxug.com/i/c/k/partlycloudy.gif",
  "skyicon": "mostlysunny",
  "pop": 0,
  "qpf_allday": {
  "in": 0.00,
  "mm": 0.0
  },
  "qpf_day": {
  "in": 0.00,
  "mm": 0.0
  },
  "qpf_night": {
  "in": 0.00,
  "mm": 0.0
  },
  "snow_allday": {
  "in": 0,
  "cm": 0
  },
  "snow_day": {
  "in": 0,
  "cm": 0
  },
  "snow_night": {
  "in": 0,
  "cm": 0
  },
  "maxwind": {
  "mph": 21,
  "kph": 34,
  "dir": "West",
  "degrees": 272
  },
  "avewind": {
  "mph": 17,
  "kph": 27,
  "dir": "West",
  "degrees": 272
  },
  "avehumidity": 72,
  "maxhumidity": 94,
  "minhumidity": 58
  }, {
  "date": {
  "epoch": "1340863200",
  "pretty": "11:00 PM PDT on June 27, 2012",
  "day": 27,
  "month": 6,
  "year": 2012,
  "yday": 178,
  "hour": 23,
  "min": "00",
  "sec": 0,
  "isdst": "1",
  "monthname": "June",
  "weekday_short": "Wed",
  "weekday": "Wednesday",
  "ampm": "PM",
  "tz_short": "PDT",
  "tz_long": "America/Los_Angeles"
  },
  "period": 2,
  "high": {
  "fahrenheit": "72",
  "celsius": "22"
  },
  "low": {
  "fahrenheit": "54",
  "celsius": "12"
  },
  "conditions": "Partly Cloudy",
  "icon": "partlycloudy",
  "icon_url": "http://icons-ak.wxug.com/i/c/k/partlycloudy.gif",
  "skyicon": "mostlysunny",
  "pop": 0,
  "qpf_allday": {
  "in": 0.00,
  "mm": 0.0
  },
  "qpf_day": {
  "in": 0.00,
  "mm": 0.0
  },
  "qpf_night": {
  "in": 0.00,
  "mm": 0.0
  },
  "snow_allday": {
  "in": 0,
  "cm": 0
  },
  "snow_day": {
  "in": 0,
  "cm": 0
  },
  "snow_night": {
  "in": 0,
  "cm": 0
  },
  "maxwind": {
  "mph": 11,
  "kph": 18,
  "dir": "WSW",
  "degrees": 255
  },
  "avewind": {
  "mph": 9,
  "kph": 14,
  "dir": "WSW",
  "degrees": 252
  },
  "avehumidity": 70,
  "maxhumidity": 84,
  "minhumidity": 54
  }, {
  "date": {
  "epoch": "1340949600",
  "pretty": "11:00 PM PDT on June 28, 2012",
  "day": 28,
  "month": 6,
  "year": 2012,
  "yday": 179,
  "hour": 23,
  "min": "00",
  "sec": 0,
  "isdst": "1",
  "monthname": "June",
  "weekday_short": "Thu",
  "weekday": "Thursday",
  "ampm": "PM",
  "tz_short": "PDT",
  "tz_long": "America/Los_Angeles"
  },
  "period": 3,
  "high": {
  "fahrenheit": "72",
  "celsius": "22"
  },
  "low": {
  "fahrenheit": "54",
  "celsius": "12"
  },
  "conditions": "Partly Cloudy",
  "icon": "partlycloudy",
  "icon_url": "http://icons-ak.wxug.com/i/c/k/partlycloudy.gif",
  "skyicon": "partlycloudy",
  "pop": 0,
  "qpf_allday": {
  "in": 0.00,
  "mm": 0.0
  },
  "qpf_day": {
  "in": 0.00,
  "mm": 0.0
  },
  "qpf_night": {
  "in": 0.00,
  "mm": 0.0
  },
  "snow_allday": {
  "in": 0,
  "cm": 0
  },
  "snow_day": {
  "in": 0,
  "cm": 0
  },
  "snow_night": {
  "in": 0,
  "cm": 0
  },
  "maxwind": {
  "mph": 14,
  "kph": 22,
  "dir": "West",
  "degrees": 265
  },
  "avewind": {
  "mph": 12,
  "kph": 19,
  "dir": "WSW",
  "degrees": 256
  },
  "avehumidity": 80,
  "maxhumidity": 91,
  "minhumidity": 56
  }, {
  "date": {
  "epoch": "1341036000",
  "pretty": "11:00 PM PDT on June 29, 2012",
  "day": 29,
  "month": 6,
  "year": 2012,
  "yday": 180,
  "hour": 23,
  "min": "00",
  "sec": 0,
  "isdst": "1",
  "monthname": "June",
  "weekday_short": "Fri",
  "weekday": "Friday",
  "ampm": "PM",
  "tz_short": "PDT",
  "tz_long": "America/Los_Angeles"
  },
  "period": 4,
  "high": {
  "fahrenheit": "68",
  "celsius": "20"
  },
  "low": {
  "fahrenheit": "52",
  "celsius": "11"
  },
  "conditions": "Fog",
  "icon": "partlycloudy",
  "icon_url": "http://icons-ak.wxug.com/i/c/k/partlycloudy.gif",
  "skyicon": "mostlysunny",
  "pop": 0,
  "qpf_allday": {
  "in": 0.00,
  "mm": 0.0
  },
  "qpf_day": {
  "in": 0.00,
  "mm": 0.0
  },
  "qpf_night": {
  "in": 0.00,
  "mm": 0.0
  },
  "snow_allday": {
  "in": 0,
  "cm": 0
  },
  "snow_day": {
  "in": 0,
  "cm": 0
  },
  "snow_night": {
  "in": 0,
  "cm": 0
  },
  "maxwind": {
  "mph": 11,
  "kph": 18,
  "dir": "West",
  "degrees": 267
  },
  "avewind": {
  "mph": 10,
  "kph": 16,
  "dir": "West",
  "degrees": 272
  },
  "avehumidity": 79,
  "maxhumidity": 93,
  "minhumidity": 63
  }]
  }
  }
};