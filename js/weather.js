let searchInp = document.querySelector(".weather__search");
let city = document.querySelector(".weaher__city");
let day = document.querySelector(".weather__day");
let humidity = document.querySelector("weader__indicatoer--humiditiy>.value");
let wind = document.querySelector(".weader__indicatoer--humiditiy>.value");
let pressure = document.querySelector(".weader__indicatoer--pressure>.value");
let image = document.querySelector(".weather__image");
let temperaature = document.querySelector(".weather__temperature");

let weatherAPIKey = "833a87b3be5a98f32e77368383c8a6b3";
let weatherBaseEndpoint =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=" +
  weatherAPIKey;

//  API Connection
let getWeatherByCityName = async (city) => {
  let endpoint = weatherBaseEndpoint + "&q=" + city;
  let response = await fetch(endpoint);
  let weather = await response.json();
  return weather;
};

// search for city
searchInp.addEventListener("keydown", async (e) => {
  if (e.keyCode === 13) {
    let weather = await getWeatherByCityName(searchInp.nodeValue);

    updateCurrentWeather(weather);
  }
});

// update weather details
let updateCurrentWeather = (data) => {
  city.textContent = data.name + ", " + data.sys.country;
};
