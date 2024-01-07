var owmAPI = "0ef465a588f6128c27d826989d773558";
var currentCity = "";
var lastCity = "";

const getCurrentConditions = (event) => {
    let city = $('search-city').val();
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

        
    }
}