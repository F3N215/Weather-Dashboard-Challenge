document.addEventListener("DOMContentLoaded", function ()) {
  // fully load HTML first

  const cityInput = document.querySelector("#city-input");
  const searchButton = document.querySelector("#search-btn");
  const currentWeatherDiv = document.querySelector(".current-weather");
  const daysForecastDiv = document.querySelector(".days-forecast");
  const owmAPI = "0ef465a588f6128c27d826989d773558";

  // weather card html creation (bootstrap)
  const createWeatherCard = (cityName, weatherItem, index) => {
    // params use template literal to create HTML from string
    if (index === 0) {
      // checks for zero index - if yes, show current weather
      return `<div class="mt-3 d-flex justify-content-between">
                        <div>
                        
                            <h3 class="fw-bold">${cityName} (${
        weatherItem.dt_txt.split(" ")[0]
      })</h3>
                            <h6 class="my-3 mt-3">Temperature: ${(
                              weatherItem.main.temp - 273.15
                            ).toFixed(2)}°C</h6>
                            <h6 class="my-3">Wind: ${
                              weatherItem.wind.speed
                            } M/S</h6>
                            <h6 class="my-3">Humidity: ${
                              weatherItem.main.humidity
                            }%</h6>
                        </div>

                        <div class="text-center me-lg-5">
                            <img src="https://openweathermap.org/img/wn/${
                              weatherItem.weather[0].icon
                            }@4x.png" alt="weather icon">
                            <h6>${weatherItem.weather[0].description}</h6>
                        </div>
                    </div>`;
    } else {
      return `<div class="col mb-3">
                        <div class="card border-0 bg-secondary text-white">
                            <div class="card-body p-3 text-white">
                                <h5 class="card-title fw-semibold">(${
                                  weatherItem.dt_txt.split(" ")[0]
                                })</h5>
                                <img src="https://openweathermap.org/img/wn/${
                                  weatherItem.weather[0].icon
                                }.png" alt="weather icon">
                                <h6 class="card-text my-3 mt-3">Temp: ${(
                                  weatherItem.main.temp - 273.15
                                ).toFixed(2)}°C</h6>
                                <h6 class="card-text my-3">Wind: ${
                                  weatherItem.wind.speed
                                } M/S</h6>
                                <h6 class="card-text my-3">Humidity: ${
                                  weatherItem.main.humidity
                                }%</h6>
                            </div>
                        </div>
                    </div>`;
    }
  };

  // fetch weather using lat/long/cityname parameters
  const getWeatherDetails = (cityName, latitude, longitude) => {
    const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${owmAPI}`;
    fetch(weatherURL)
      .then((response) => response.json())
      .then((data) => {
        const forecastArray = data.list;
        const uniqueForecastDays = new Set();

        const fiveDayForecast = forecastArray.filter((forecast) => {
          const forecastDate = new Date(forecast.dt_txt).getDate();
          if (
            !uniqueForecastDays.has(forecastDate) &&
            uniqueForecastDays.size < 6
          ) {
            uniqueForecastDays.add(forecastDate);
            return true;
          }
          return false;
        });
        cityInput.value = "";
        currentWeatherDiv.innerHTML = "";
        daysForecastDiv.innerHTML = "";

        fiveDayForecast.forEach((weatherItem, index) => {
          const html = createWeatherCard(cityName, weatherItem, index);
          if (index === 0) {
            currentWeatherDiv.insertAdjacentHTML("beforeend", html);
          } else {
            daysForecastDiv.insertAdjacentHTML("beforeend", html);
          }
        });
      })
      .catch(() => {
        alert("An error occurred while fetching the weather forecast!");
      });
  };

  // get city coordinates
  const getCityCoordinates = (cityName) => {
    // const cityName = cityInput.value.trim();
    if (cityName === "") return;
    const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${owmAPI}`;

    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        if (!data.length) return alert(`No coordinates found for ${cityName}`);
        const { lat, lon, name } = data[0];
        getWeatherDetails(name, lat, lon);
        saveCity(cityName);
      })
      .catch(() => {
        alert("An error occurred while fetching the coordinates!");
      });
  };
  // save search to localStorage
  const saveCity = (newCity) => {
    const prevCities = JSON.parse(localStorage.getItem("prevCities")) || [];

    if (!prevCities.includes(newCity)) {
      prevCities.push(newCity);
      localStorage.setItem("prevCities", JSON.stringify(prevCities));
    }
  };
};

  // buttons + event listeners
  // searchButton.addEventListener("click", () => {
  //   const cityName = cityInput.value.trim();
  //   getCityCoordinates(cityName);
  // });

  // const showCities = () => {
  //   const prevCities = JSON.parse(localStorage.getItem("prevCities")) || [];
  //   const cityButtonsContainer = document.getElementById("city-buttons-container");
  //   cityButtonsContainer.innerHTML

  //   });

