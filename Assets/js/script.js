const cityInput = document.querySelector("#city-input");
const searchButton = document.querySelector("#search-btn");
const currentWeatherDiv = document.querySelector(".current-weather");
const daysForecastDiv = document.querySelector(".days-forecast");
const owmAPI = "0ef465a588f6128c27d826989d773558"

// var currentCity = "";
// var lastCity = "";

const createWeatherCard = (cityName, weatherItem, index) => {
    if(index === 0) {
        return `<div class="mt-3 d-flex justify-content-between">
                    <div>
                        <h3 class="fw-bold">${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h3>
                        <h6 class="my-3 mt-3">Temperature: ${((weatherItem.main.temp - 273.15).toFixed(2))}°C</h6>
                        <h6 class="my-3">Wind: ${weatherItem.wind.speed} M/S</h6>
                        <h6 class="my-3">Humidity: ${weatherItem.main.humidity}%</h6>
                    </div>
                    <div class="text-center me-lg-5">
                        <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather icon">
                        <h6>${weatherItem.weather[0].description}</h6>
                    </div>
                </div>`;
    } else {
        return `<div class="col mb-3">
                    <div class="card border-0 bg-secondary text-white">
                        <div class="card-body p-3 text-white">
                            <h5 class="card-title fw-semibold">(${weatherItem.dt_txt.split(" ")[0]})</h5>
                            <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}.png" alt="weather icon">
                            <h6 class="card-text my-3 mt-3">Temp: ${((weatherItem.main.temp - 273.15).toFixed(2))}°C</h6>
                            <h6 class="card-text my-3">Wind: ${weatherItem.wind.speed} M/S</h6>
                            <h6 class="card-text my-3">Humidity: ${weatherItem.main.humidity}%</h6>
                        </div>
                    </div>
                </div>`;
    }
}


// error handling from MDN
// var showError = (response) => {
//     if (!response.ok) {
//         throw Error(response.statusText);
//     }
//     return response;
// }

// this function pulls + displays current weather conditions
var getCurrentConditions = (event) => {
    let city = $('search-city').val(); // pulls city name from search box
    currentCity = $('search-city').val();

    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric" + "&APPID=" + owmAPI;
    fetch(queryURL)
    .then(handleErrors)
    .then((response) => {
        return response.json();
    })
    .then((response) => {

        saveCity(city);
        $('#search-error').text("");

        let currentWeatherIcon="https://openweathermap.org/img/w/" + response.weather[0].icon + ".png"; // creates a weather icon for current weather

        let currentTimeUTC = response.dt;
        let currentTimeZoneOffset = response.timezone;
        let currentTimeZoneOffsetHours = currentTimeZoneOffset / 60 / 60;
        let currentMoment = moment.unix(currentTimeUTC).utc().utcOffset(currentTimeZoneOffsetHours);

        renderCities();

        getFiveDayForecast(event); // get 5 day forecast for current city

        $('#header-text').text(response.name);

        // creates results in html from search
        let currentWeatherHTML = `
            <h3>{response.name} ${currentMoment.format("(MM/DD/YY)")}<img src=${currentWeatherIcon}"></h3>
            <ul class="list-unstyled">
                <li>Temperature: ${response.main.temp}&#x2103;</li>
                <li>Humidity: ${response.main.humidity}%</li>
                <li>Wind Speed: ${response.wind.speed} m/s</li>
            </ul>`;
        $('#current-weather').html(currentWeatherHTML);
    })
}

var getFiveDayForecast = (event) => {
    let city = $('#search-city').val();
    let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric" + "&APPID=" + owmAPI;
    fetch(queryURL)
        .then (showError)
        .then((response) => {
            return esponse.json();
        })
        .then((response) => {

        // this creates an HTML template    
        let fiveDayForecast = ` 
        <h2>5 Day Forecast:</h2>
        <div id=fiveDayForecastUl" class=d-inline-flex flex-wrap ">`;

            
        })
}

        


    }
}
//  search button event listener
$('#search-button').on("click", (event) => {
    event.preventDefault();
    currentCity = $('#search-city').val();
    getCurrentConditions(event);
    });
    
    // previous cities buttons event listener
    $('#city-results').on("click", (event) => {
        event.preventDefault();
        $('#search-city').val(event.target.textContent);
        currentCity=$('#search-city').val();
        getCurrentConditions(event);
    });

        // clear old searches cities from localStorage event listener
        $("#clear-storage").on("click", (event) => {
            localStorage.clear();
            renderCities();
        });
        
        // render the searched cities function
        renderCities();
        
        // calls 5 day forecast
        getCurrentConditions();