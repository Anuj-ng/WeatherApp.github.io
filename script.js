const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const currentWeatherItemsEl = document.getElementById("current-weather-items");
const timezone = document.getElementById("time-zone");
const countryEl = document.getElementById("country");
const weatherForcastEl = document.getElementById("weather-forecast");
const currenttempEl = document.getElementById("current-temp");
const imageEl = document.getElementById("style");
const obj = new Date();
const dayimg = "b.jpg";
const nightimg = "img.jpg";

const days = [
  "",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

function currentTime(response) {
  const days1 = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const obj1 = new Date(response.location.localtime);
  const day = obj1.getDay();
  const date = obj1.getDate();
  const month = obj1.getMonth();
  let dateandtime = response.location.localtime.split(" ");

  var hours =
    dateandtime[1].split(":")[0] > 12
      ? dateandtime[1].split(":")[0] - 12
      : dateandtime[1].split(":")[0];
  var am_pm = dateandtime[1].split(":")[0] >= 12 ? "PM" : "AM";
  var minutes = dateandtime[1].split(":")[1];

  let time = ` ${hours} : ${minutes} ${am_pm}`;
  timeEl.innerText = time;
  dateEl.innerHTML = days1[day] + ", " + date + " " + months[month];
}

function getWeather() {
  var city = cityName;
  var units = "m";
  fetch(
    "http://api.weatherstack.com/current?access_key=302d972eb0f78c44f63a28e18417fc38&query=" +
      city +
      "&units=" +
      units
  )
    .then((a) => a.json())
    .then((response) => {
      console.log(response);
      getData2(response);
    });
}

function getData2(response) {
  fetch(
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      response.location.lat +
      "&lon=" +
      response.location.lon +
      "&exclude=hourly,minutely&units=metric&appid=f3108c9ee1872ae74534614c51a2b117"
  )
    .then((a) => a.json())
    .then((response2) => {
      console.log(response2);
      changeData(response, response2);
    });
}

let cityName = window.prompt("Enter city Name: ");
getWeather();

function changeData(response, response2) {
  if (!cityName) {
    var date = new Date();
    var currentDate = date.toISOString().slice(0, 10);
    var currentTime = date.getHours() + ":" + date.getMinutes();

    document.getElementById("date").innerHTML = currentDate;

    let dateandtime = response.location.localtime.split(" ");
    var am_pm = dateandtime[1].split(":")[0] >= 12 ? "PM" : "AM";

    document.getElementById("time").innerHTML = `${currentTime} ${am_pm}`;

    response.location.name = "Delhi";
    response.location.region = "Delhi";
    response.location.country = "India";
    timezone.innerText =
      response.location.name +
      " , " +
      response.location.region +
      " " +
      response.location.country;

    response.location.timezone_id = "Asia/Kolkata";
    countryEl.innerText = "TimeZone : " + response.location.timezone_id;
  } else {
    const days1 = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const obj1 = new Date(response.location.localtime);
    const day = obj1.getDay();
    const date = obj1.getDate();
    const month = obj1.getMonth();
    let dateandtime = response.location.localtime.split(" ");

    var hours =
      dateandtime[1].split(":")[0] > 12
        ? dateandtime[1].split(":")[0] - 12
        : dateandtime[1].split(":")[0];
    var am_pm = dateandtime[1].split(":")[0] >= 12 ? "PM" : "AM";
    var minutes = dateandtime[1].split(":")[1];

    let time = ` ${hours} : ${minutes} ${am_pm}`;
    timeEl.innerText = time;
    dateEl.innerHTML = days1[day] + ", " + date + " " + months[month];
    timezone.innerText =
      response.location.name +
      " , " +
      response.location.region +
      " " +
      response.location.country;
    countryEl.innerText = "TimeZone : " + response.location.timezone_id;
  }

  if (response.current.is_day === "yes") {
    document.getElementById("marque").innerHTML = `
    <marquee behavior="scroll" direction="left" style="color:rgb(15, 15, 15);font-family: cursive; font-size:20px; font-weight: bold; padding:5px ;">WELCOME To Weather Forcasting Page created By Diwakar Kharb and Anuj Sharma </marquee>
    `;
    imageEl.innerHTML = `
     body{
      background:url(${dayimg});
      background-size: cover;
   
      overflow:hidden;
      height: 100vh;
      font-family: 'Poppins', sans-serif;
  }
     `;
  } else {
    document.getElementById("marque").innerHTML = `
    <marquee behavior="scroll" direction="left" style="color:rgb(248, 246, 246);font-family: cursive; font-size:20px; font-weight: bold; padding:5px ;">WELCOME To Weather Forcasting Page created By Diwakar Kharb and Anuj Sharma  </marquee>
    `;
    imageEl.innerHTML = `
    body{
     background:url(${nightimg});
     background-size: cover;
    
     overflow:hidden;
     height: 100vh;
     font-family: 'Poppins', sans-serif;
 }
    `;
  }
  currentWeatherItemsEl.innerHTML = `
  <div class="weather-item">
  <div>Humidity</div>
  <div>${response.current.humidity} g.kg -1</div>
</div>
<div class="weather-item">
  <div>Pressure</div>
  <div>${response.current.pressure} Pa</div>
</div>
<div class="weather-item">
  <div>Wind Speed</div>
  <div>${response.current.wind_speed} m/s</div>
</div>
<div class="weather-item">
  <div>Wind Degree</div>
  <div>${response.current.wind_degree} degrees</div>
</div>
<div class="weather-item">
  <div>Wind Direction</div>
  <div>${response.current.wind_dir}</div>
</div>
`;
  // dailyData Update
  let todaysarr = getDayNo();
  console.log(todaysarr);
  console.log(days);
  currenttempEl.innerHTML = `
<img src="http://openweathermap.org/img/wn/${
    response2.daily[todaysarr[0]].weather[0].icon
  }@2x.png" alt="weather icon" class="w-icon">
<div class="other">
    <div class="day">${days[todaysarr[0]]}</div>
    <div class="temp">Night - ${
      response2.daily[todaysarr[0]].temp.night
    }&#176; C</div>
    <div class="temp">Day - ${
      response2.daily[todaysarr[0]].temp.day
    }&#176; C</div>
</div>
`;
  console.log(weatherForcastEl);
  weatherForcastEl.innerHTML = `
<div class="weather-forecast-item">
                <div class="day">${days[todaysarr[1]]}</div>
                <img src="http://openweathermap.org/img/wn/${
                  response2.daily[todaysarr[1]].weather[0].icon
                }@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night -  ${
                  response2.daily[todaysarr[1]].temp.night
                }&#176; C</div>
                <div class="temp">Day -  ${
                  response2.daily[todaysarr[1]].temp.day
                }&#176; C</div>
            </div>
            <div class="weather-forecast-item">
                <div class="day">${days[todaysarr[2]]}</div>
                <img src="http://openweathermap.org/img/wn/${
                  response2.daily[todaysarr[2]].weather[0].icon
                }@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night - ${
                  response2.daily[todaysarr[2]].temp.night
                }&#176; C</div>
                <div class="temp">Day - ${
                  response2.daily[todaysarr[2]].temp.day
                }&#176; C</div>
            </div>
            <div class="weather-forecast-item">
                <div class="day">${days[todaysarr[3]]}</div>
                <img src="http://openweathermap.org/img/wn/${
                  response2.daily[todaysarr[3]].weather[0].icon
                }@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night - ${
                  response2.daily[todaysarr[3]].temp.night
                }&#176; C</div>
                <div class="temp">Day - ${
                  response2.daily[todaysarr[3]].temp.day
                }&#176; C</div>
            </div>
            <div class="weather-forecast-item">
                <div class="day">${days[todaysarr[4]]}</div>
                <img src="http://openweathermap.org/img/wn/${
                  response2.daily[todaysarr[4]].weather[0].icon
                }@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night - ${
                  response2.daily[todaysarr[4]].temp.night
                }&#176; C</div>
                <div class="temp">Day - ${
                  response2.daily[todaysarr[4]].temp.day
                }&#176; C</div>
            </div>
            <div class="weather-forecast-item">
                <div class="day">${days[todaysarr[5]]}</div>
                <img src="http://openweathermap.org/img/wn/${
                  response2.daily[todaysarr[5]].weather[0].icon
                }@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night - ${
                  response2.daily[todaysarr[5]].temp.night
                }&#176; C</div>
                <div class="temp">Day - ${
                  response2.daily[todaysarr[5]].temp.day
                }&#176; C</div>
            </div>
            <div class="weather-forecast-item">
                <div class="day">${days[todaysarr[6]]}</div>
                <img src="http://openweathermap.org/img/wn/${
                  response2.daily[todaysarr[6]].weather[0].icon
                }@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night - ${
                  response2.daily[todaysarr[6]].temp.night
                }&#176; C</div>
                <div class="temp">Day - ${
                  response2.daily[todaysarr[6]].temp.day
                }&#176; C</div>
            </div>
`;
}

function getDayNo() {
  let dayNo = [];
  console.log(obj.getDay());
  if (obj.getDay() == 0) dayNo = [7, 1, 2, 3, 4, 5, 6];
  if (obj.getDay() == 1) dayNo = [1, 2, 3, 4, 5, 6, 7];
  if (obj.getDay() == 2) dayNo = [2, 3, 4, 5, 6, 7, 1];
  if (obj.getDay() == 3) dayNo = [3, 4, 5, 6, 7, 1, 2];
  if (obj.getDay() == 4) dayNo = [4, 5, 6, 7, 1, 2, 3];
  if (obj.getDay() == 5) dayNo = [5, 6, 7, 1, 2, 3, 4];
  if (obj.getDay() == 6) dayNo = [6, 7, 1, 2, 3, 4, 5];
  if (obj.getDay() == 7) dayNo = [7, 1, 2, 3, 4, 5, 6];

  return dayNo;
}

