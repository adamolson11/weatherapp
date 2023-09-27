var searchResultsContainer = document.getElementById('searchResultsContainer');
var citySearched = document.getElementById('search');
var searchBtn = document.getElementById('submit-Button');
var apiKey = '7f46a3db399e49d22151e6cea69a5811';

// Create an empty array to store search history
var searchHistory = [];

// Function to add a city to the search history
function addToSearchHistory(city) {
  if (!searchHistory.includes(city)) {
    searchHistory.push(city);

    var cityContainer = document.createElement('div');
    cityContainer.innerText = city;
    cityContainer.classList.add('rounded-bold-border'); // Adds the CSS class
    document.getElementById('searchHistoryContainer').appendChild(cityContainer);
  }
}


function fetchWeatherByCity(cityName) {
 
  addToSearchHistory(cityName);

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

      li1.innerText = 'Date: ' + new Date(weatherData.dt * 1000).toLocaleDateString(); // Convert timestamp to date
      li2.innerText = 'Temp: ' + weatherData.main.temp;
      li3.innerText = 'Humidity: ' + weatherData.main.humidity;
      li4.innerText = 'Wind Speed: ' + weatherData.wind.speed;
      ul.appendChild(li1);
      ul.appendChild(li2);
      ul.appendChild(li3);
      ul.appendChild(li4);

      searchResultsContainer.innerHTML = ''; 
      searchResultsContainer.appendChild(h2);
      searchResultsContainer.appendChild(ul);
    });
}

function fetch5DayWeatherForecast(cityName) {
  fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&units=imperial&appid=' + apiKey)
    .then(response => response.json())
    .then(data => {
      
      for (var i = 0; i < 5; i++) {
        var forecastData = data.list[i * 8];

        
        document.getElementById("date" + (i + 1)).innerText = "Date: " + new Date(forecastData.dt * 1000).toLocaleDateString();

        var iconElement = document.getElementById("icon" + (i + 1));
        var weatherIconUrl = "http://openweathermap.org/img/wn/" + forecastData.weather[0].icon + ".png";
        iconElement.src = weatherIconUrl; 
        iconElement.alt = "Weather Icon"; 

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

searchBtn.addEventListener('click', function (event) {
  var city = search.value;
  fetchWeatherByCity(city);
  fetch5DayWeatherForecast(city);
});

searchBtn.addEventListener('click', function (event) {
  var city = search.value;
  fetchWeatherByCity(city);
  fetch5DayWeatherForecast(city);
});

