let searchInp = document.querySelector(".weather__search");
let city = document.querySelector(".weaher__city");
let day = document.querySelector(".weather__day");
let calendar = document.querySelector(".weather__calendar");
let humidity = document.querySelector(".humiditiy-value");
let wind = document.querySelector(".wind-value");
let pressure = document.querySelector(".pressure-value");
let image = document.querySelector(".weather__image");
let temperaature = document.querySelector(".temperature-value");

let weatherAPIKey = "833a87b3be5a98f32e77368383c8a6b3";
let weatherBaseEndpoint =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=" +
  weatherAPIKey;

let forecastBaseEndpoint =
  "api.openweathermap.org/data/2.5/forecast/daily?units=metric&appid=" +
  weatherAPIKey;

//  API Connection for weathet today seaction
let getWeatherByCityName = async (city) => {
  let endpoint = weatherBaseEndpoint + "&q=" + city;
  let response = await fetch(endpoint);
  let weather = await response.json();
  return weather;
};

//  API Connection for forecast seaction
let getForecastByCityID = async (id) => {
  let endpoint = forecastBaseEndpoint + "&id=" + id;
  let result = await fetch(endpoint);
  let forecast = await result.json();
  let forecastList = forecast.list;
  let daily = [];

  forecastList.forEach((day) => {
    let date = new Date(day.dt_txt.replace(" ", "T"));
    let hours = date.getHours();
    if (hours === 12) {
      daily.push(day);
    }
  });
};

// search for city
searchInp.addEventListener("keydown", async (e) => {
  if (e.keyCode === 13) {
    let weather = await getWeatherByCityName(searchInp.value);

    let cityID = weather.id;
    updateCurrentWeather(weather);
    getForecastByCityID(cityID);
  }
});

// update weather details
let updateCurrentWeather = (data) => {
  city.textContent = data.name + ", " + data.sys.country;
  day.textContent = dayOfWeak();
  calendar.textContent = calenderInfo();
  humidity.textContent = data.main.humidity;
  pressure.textContent = data.main.pressure;
  wind.textContent = windInfo(data);
  temperaature.textContent =
    data.main.temp > 0
      ? "+" + Math.round(data.main.temp)
      : Math.round(data.main.temp);
};

// get day info
let dayOfWeak = () => {
  return new Date().toLocaleDateString("en-EN", { weekday: "long" });
};

// get calender info
let calenderInfo = () => {
  return new Date().toLocaleDateString("en-EN", { calendar: "long" });
};

// get wind info
let windInfo = (data) => {
  let windDirection;
  let deg = data.wind.deg;
  if (deg > 45 && deg <= 135) {
    windDirection = "East";
  } else if (deg > 135 && deg <= 225) {
    windDirection = "South";
  } else if (deg > 225 && deg <= 315) {
    windDirection = "West";
  } else {
    windDirection = "North";
  }
  return windDirection + ", " + data.wind.speed;
};
