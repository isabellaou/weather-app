// google api key: AIzaSyAhBeexcrUpGTQO6Ud_0u5u7fqSOaPZyow
//https://maps.googleapis.com/maps/api/timezone/json?location=39.6034810,-119.6822510&timestamp=1331161200&key=YOUR_API_KEY


$(document).ready(function() {  
  loader();  
  detectGeolocation(getGeolocationCb);
  console.log('1');
});



const API_KEY = 'AIzaSyAhBeexcrUpGTQO6Ud_0u5u7fqSOaPZyow'

const WEATHER_LUT = [
  {
    'keywords': ['default'],
    'weatherIconDay': 'wi wi-day-sunny',
    'weatherIconNight': 'wi wi-night-clear',    
    // 'day_bg_color': 'white',
    // 'day_fg_color': 'black',
    // 'night_bg_color': 'white',
    // 'night_fg_color': 'black',
  },
  {
    'keywords': ['clear'],
    'weatherIconDay': 'wi wi-day-sunny',
    'weatherIconNight': 'wi wi-night-clear',   
    // 'day_bg_color': 'white',
    // 'day_fg_color': 'black',
    // 'night_bg_color': 'white',
    // 'night_fg_color': 'black',
  },
  {
    'keywords': ['few clouds','scattered clouds'],
    'weatherIconDay': 'wi wi-day-cloudy',
    'weatherIconNight': 'wi wi-night-alt-cloudy',  
    // 'day_bg_color': 'white',
    // 'day_fg_color': 'black',
    // 'night_bg_color': 'white',
    // 'night_fg_color': 'black',
  },
  {
    'keywords': ['broken clouds','overcast clouds'],
    'weatherIconDay': 'wi wi-cloudy',
    'weatherIconNight': 'wi wi-cloudy', 
    // 'day_bg_color': 'white',
    // 'day_fg_color': 'black',
    // 'night_bg_color': 'white',
    // 'night_fg_color': 'black',
  },
  {
    'keywords': ['thunderstorm'],
    'weatherIconDay': 'wi wi-thunderstorm',
    'weatherIconNight': 'wi wi-thunderstorm',
    // 'day_bg_color': 'white',
    // 'day_fg_color': 'black',
    // 'night_bg_color': 'white',
    // 'night_fg_color': 'black',
  },
  {
    'keywords': ['drizzle'],
    'weatherIconDay': 'wi wi-day-showers',
    'weatherIconNight': 'wi wi-night-showers',
    // 'day_bg_color': 'white',
    // 'day_fg_color': 'black',
    // 'night_bg_color': 'white',
    // 'night_fg_color': 'black',
  },
  {
    'keywords': ['rain'],
    'weatherIconDay': 'wi wi-day-rain',
    'weatherIconNight': 'wi wi-night-rain',
    // 'day_bg_color': 'white',
    // 'day_fg_color': 'black',
    // 'night_bg_color': 'white',
    // 'night_fg_color': 'black',
  },
  {
    'keywords': ['snow'],
    'weatherIconDay': 'wi wi-day-snow',
    'weatherIconNight': 'wi wi-night-snow',
    // 'day_bg_color': 'white',
    // 'day_fg_color': 'black',
    // 'night_bg_color': 'white',
    // 'night_fg_color': 'black',
  },
  {
    'keywords': ['sleet'],
    'weatherIconDay': 'wi wi-day-sleet',
    'weatherIconNight': 'wi wi-night-sleet',
    // 'day_bg_color': 'white',
    // 'day_fg_color': 'black',
    // 'night_bg_color': 'white',
    // 'night_fg_color': 'black',
  },
  {
    'keywords': ['sleet'],
    'weatherIconDay': 'wi wi-day-sleet',
    'weatherIconNight': 'wi wi-night-sleet',
    // 'day_bg_color': 'white',
    // 'day_fg_color': 'black',
    // 'night_bg_color': 'white',
    // 'night_fg_color': 'black',
  },
  {
    'keywords': ['mist','smoke','haze','fog','volcanic ash','squalls'],
    'weatherIconDay': 'wi wi-day-fog',
    'weatherIconNight': 'wi wi-night-fog',
    // 'day_bg_color': 'white',
    // 'day_fg_color': 'black',
    // 'night_bg_color': 'white',
    // 'night_fg_color': 'black',
  },
  {
    'keywords': ['sand','dust'],
    'weatherIconDay': 'wi wi-sandstorm',
    'weatherIconNight': 'wi wi-sandstorm',
    // 'day_bg_color': 'white',
    // 'day_fg_color': 'black',
    // 'night_bg_color': 'white',
    // 'night_fg_color': 'black',
  },
  {
    'keywords': ['sand','dust'],
    'weatherIconDay': 'wi wi-sandstorm',
    'weatherIconNight': 'wi wi-sandstorm',
    // 'day_bg_color': 'white',
    // 'day_fg_color': 'black',
    // 'night_bg_color': 'white',
    // 'night_fg_color': 'black',
  },
  {
    'keywords': ['tornado','storm','hurricane'],
    'weatherIconDay': 'wi wi-tornado',
    'weatherIconNight': 'wi wi-tornado',
    // 'day_bg_color': 'white',
    // 'day_fg_color': 'black',
    // 'night_bg_color': 'white',
    // 'night_fg_color': 'black',
  },
];

/*
  * Objects Definition
*/
function Coord(latitude,longitude){
  this.latitude = latitude;
  this.longitude = longitude;
}

function Weather(weatherResponse){
  const w = weatherResponse;
  console.log(w);
  this.description = w.weather[0].description;
  this.icon = w.weather[0].icon;
  
  this.tempC = Math.round(w.main.temp);
  this.minC = w.main.temp_min;
  this.maxC = w.main.temp_max;
  
  this.humidity = w.main.humidity;
  this.wind = w.wind.speed;
  this.pressure = w.main.pressure;
  this.sunrise = w.sys.sunrise;
  this.sunset = w.sys.sunset;
  this.visibility = w.visibility;
  
  this.location = w.name;
}



function getCurrentWeather(coord){
  const url =
   'https://api.openweathermap.org/data/2.5/weather?lat=' + coord.latitude +
    '&lon=' + coord.longitude + '&APPID=7ee7d85b375e69e58e3cff0eedb3a2b1&units=metric';
  
  return $.ajax({
    url: url,
    dataType: 'jsonp',
    timeout: 10000,
  });
}

function getGeolocationCb(coord) {
  /* Get weather data */
  const weatherXhr = getCurrentWeather(coord);

  /* Successfully got weather and timezone data. Process and display data. */
  $.when(weatherXhr).done(
    function(weatherResponse) {
      /* Construct a weather object */
      const weatherData = new Weather(weatherResponse);
      /* Display app */
      displayWeather(weatherData);
      
    }
  );
}


function detectGeolocation(callback){
  console.log('2');
  const getGeolocation = new Promise(
    function(resolve,reject) {
      if(!('geolocation' in navigator)){
      console.log('2');  
      reject();
      }
      const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      };
      
      navigator.geolocation.getCurrentPosition(
        function(position){
          resolve(position);
          console.log('31');
        },
        function(){
          reject();
        },
        options
      );
    }
  );
  
    getGeolocation
      .then(function(position) {
      const latitude = position.coords.latitude.toFixed(3);
      const longitude = position.coords.longitude.toFixed(3);
      console.log(latitude);
      const coord = new Coord(latitude,longitude);
      callback(coord);
    })
    .catch(function(){
      const coord = new Coord(22.545540, 114.068298);
      callback(coord);
    });
}

function weatherTheme(WEATHER_LUT,weatherData,date){
  const description = weatherData.description;
  const sunrise = new Date(weatherData.sunrise * 1000);
  const sunset = new Date(weatherData.sunset * 1000);
  
  var weatherIcon = WEATHER_LUT[0].weatherIcon + ' bounce';
  
  for(var i = 0; i < WEATHER_LUT.length; i++){
    for(var j = 0;j < WEATHER_LUT[i].keywords.length;j++){
      if(description.includes(WEATHER_LUT[i].keywords[j])){
       
        if((date < sunrise) || (date > sunset)){
          weatherIcon = WEATHER_LUT[i].weatherIconNight;
        }
        else{
          weatherIcon = WEATHER_LUT[i].weatherIconDay;
        }
        break;
      }
    }
  }
  
  $('#weather-icon').addClass(weatherIcon + ' bounce');
}

function formatDate(date,param) {
  
  var dayNames = [
    "SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY",
    "THURSDAY", "FRIDAY", "SATURDAY"
  ];
  var monthNames = [
    "JAN", "FEB", "MAR",
    "APR", "MAY", "JUN", "JUL",
    "AUG", "SEP", "OCT",
    "NOV", "DEC"
  ];
  
  if(param == 1){
    var dayIndex = date.getDay();
    var day = date.getDate();
    var monthIndex = date.getMonth();
    console.log(monthIndex);
    var year = date.getFullYear();

    return dayNames[dayIndex] + ', ' + monthNames[monthIndex] + ' ' + day + ', ' + year;
  }
  else if(param == 0){
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();

    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2);
    return formattedTime;
  }
  
}
function displayWeather(weatherData) {
  var date = new Date();
  var date_unix = Math.round(date.getTime()/1000.0);
  var sunrise = new Date(weatherData.sunrise * 1000);
  var sunset = new Date(weatherData.sunset * 1000);
  
  weatherTheme(WEATHER_LUT,weatherData,date);
  /* Current temp at location*/
  $('#weather-location').text(weatherData.location);
  $('#date').text(formatDate(date,1));
  $('#weather-description').text(weatherData.description);
  
  $('#weather-temp')
    .text(weatherData.tempC).append('°C');
  $('#weather-limit').text(weatherData.minC).append('~').append(weatherData.maxC).append('°C');
  $('#humidity-text')
    .text(weatherData.humidity).append('%');
  $('#wind-text')
    .text(weatherData.wind).append('m/s');
  $('#pressure-text')
    .text(weatherData.pressure).append('hpa');
  $('#sunrise-text')
    .text(formatDate(sunrise,0));
  $('#sunset-text')
    .text(formatDate(sunset,0));
  $('#visibility-text')
    .text(weatherData.visibility).append('m'); 
  $('#loader-wrap').addClass('hide');
  $('#content').removeClass('hide');
}

function loader(){
  $('#loader-wrap').removeClass('hide');  
}