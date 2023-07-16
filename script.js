


//https://openweathermap.org/forecast5#parameter
//you need two URLS. One for the daily weather...
// 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&appid=' + apiKey
//and...('https://api.openweathermap.org/data/2.5/forecast?q='+ cityName + '&units=imperial&appid=' + apiKey)
//




var searchResultsContainer= document.getElementById('searchResultsContainer')
var citySearched = document.getElementById('search')
var searchBtn = document.getElementById('submit-Button');
var apiKey= '7f46a3db399e49d22151e6cea69a5811';



function getWeatherByCity(cityName) {
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
      li1.innerText = 'Temp: ' + weatherData.main.temp;
      li2.innerText = 'Humidity: ' + weatherData.main.humidity;
      li3.innerText = 'Wind Speed: ' + weatherData.wind.speed;
      ul.appendChild(li1);
      ul.appendChild(li2);
      ul.appendChild(li3);

      searchResultsContainer.innerHTML = ''; // Clear previous results
      searchResultsContainer.appendChild(h2);
      searchResultsContainer.appendChild(ul);
    });
}

searchBtn.addEventListener('click', function(event){
getWeatherByCity(search.value)
})





  
