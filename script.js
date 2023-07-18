


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



// }
function fetch5DayWeatherForecast(cityName) {
  fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&units=imperial&appid=' + apiKey)
    .then(response => response.json())
    .then(data => {
      for(i=0; i<5; i++) {
        document.getElementById("date1").innerHTML = "date: " + data.list[0].dt;
      } 
      for (i = 0; i < 5; i++) {
        document.getElementById("day" + (i + 1) + "Temp").innerHTML = "Temp: " + Number(data.list[i].main.temp);
      }
      for(i = 0; i < 5; i++) {
        document.getElementById("icon" + (i + 1)).src = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon+".png";
      }

    });
}





searchBtn.addEventListener('click', function(event){
fetchWeatherByCity(search.value)
fetch5DayWeatherForecast(search.value)
})


