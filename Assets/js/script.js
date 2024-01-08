var owmAPI = "0ef465a588f6128c27d826989d773558";
var currentCity = "";
var lastCity = "";

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

        let currentWeatherIcon="https://openweathermap.org/img/w/" + response.weahter[0].icon + ".png";


    }
}