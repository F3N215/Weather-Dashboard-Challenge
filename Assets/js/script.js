var owmAPI = "0ef465a588f6128c27d826989d773558";
var currentCity = "";
var lastCity = "";

// error handling from MDN
var showError = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

// this function pulls + displays current weather conditions
var getCurrentConditions = (event) => {
    let city = $('search-city').val(); // pulls city name from search box
    currentCity = $('search-city').val();

    let searchURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric" + "&APPID=" + owmAPI;
    fetch(searchURL)
    .then(showError)
    .then((response) = {
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
        
            
        })
}

        


    }
}