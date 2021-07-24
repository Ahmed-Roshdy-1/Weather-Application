let weatherAPIKey = "833a87b3be5a98f32e77368383c8a6b3";
let weatherBaseEndpoint =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=" +
  weatherAPIKey;

// check API Connection
let getWeatherByCityName = async (city) => {
  let endpoint = weatherBaseEndpoint + "&q=" + city;
  let response = await fetch(endpoint);
  let weather = await response.json();
  console.log(weather);
};

getWeatherByCityName("New York");
