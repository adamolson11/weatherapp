


//https://openweathermap.org/forecast5#parameter
//you need two URLS. One for the daily weather...
// 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&appid=' + apiKey
//and...('https://api.openweathermap.org/data/2.5/forecast?q='+ cityName + '&units=imperial&appid=' + apiKey)
//




var searchResultsContainer= document.getElementById('searchResultsContainer')
var citySearched = document.getElementById('search')
var searchBtn = document.getElementById('submit-Button');
var apiKey= '7f46a3db399e49d22151e6cea69a5811';
//const distance = distanceData?.rows[0].elements[0]?.distance?.value || 0 


// function get5DayForecast(cityName){



function fetchWeatherByCity(cityName){
  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&appid=' + apiKey)
    .then(function (responseObject) {
      return responseObject.json();
    })
    .then(function (weatherData) {
      var h2 = document.createElement('h2');
      h2.innerText = cityName;

      var ul = document.createElement('ul');
      var li1 = document.createElement('li');
      var li2 = document.createElement('li');
      var li3 = document.createElement('li');
      var li4 = document.createElement('li');
      
      li1.innerText = 'Date: ' + weatherData.main.date;//need to find the date 
      li2.innerText = 'Temp: ' + weatherData.main.temp;
      li3.innerText = 'Humidity: ' + weatherData.main.humidity;
      li4.innerText = 'Wind Speed: ' + weatherData.wind.speed;
      ul.appendChild(li1);
      ul.appendChild(li2);
      ul.appendChild(li3);
      ul.appendChild(li4);

      searchResultsContainer.innerHTML = ''; // Clear previous results
      searchResultsContainer.appendChild(h2);
      searchResultsContainer.appendChild(ul);
    });
}



function fetch5DayWeatherForecast(cityName) {
  fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&units=imperial&appid=' + apiKey)
    .then(response => response.json())
    .then(data => {
      // Loop through the forecast data and display 5 days
      for (var i = 0; i < 5; i++) {
        var forecastData = data.list[i * 8]; // Data for 15:00:00 of each day

        // Populate the existing container elements with weather data
        document.getElementById("date" + (i + 1)).innerText = "Date: " + new Date(forecastData.dt * 1000).toLocaleDateString();

        // Add the following lines to update the weather icon using an image tag
        var iconElement = document.getElementById("icon" + (i + 1));
        var weatherIconUrl = "http://openweathermap.org/img/wn/" + forecastData.weather[0].icon + ".png";
        iconElement.src = weatherIconUrl; // Set the src attribute of the image tag
        iconElement.alt = "Weather Icon"; // Set alt text for accessibility

        document.getElementById("day" + (i + 1)).innerText = "Weather: " + forecastData.weather[0].main;
        document.getElementById("day" + (i + 1) + "Temp").innerText = "Temp: " + forecastData.main.temp + "°F";
        document.getElementById("day" + (i + 1) + "Wind").innerText = "Wind: " + forecastData.wind.speed + " mph";
        document.getElementById("day" + (i + 1) + "Humidity").innerText = "Humidity: " + forecastData.main.humidity + "%";
      }
    })
    .catch(error => {
      console.error('Error fetching 5-day forecast:', error);
    });
}

searchBtn.addEventListener('click', function(event){
  fetchWeatherByCity(search.value)
  fetch5DayWeatherForecast(search.value)
})



searchBtn.addEventListener('click', function(event){
fetchWeatherByCity(search.value)
fetch5DayWeatherForecast(search.value)
})


