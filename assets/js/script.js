var locationEl = document.getElementById("location");
var todayEl = $(".today");

// Weather icons
var sunIconEl = "<i class='fas fa-sun'></i>";
var cloudIconEl = "<i class='fas fa-cloud'></i>";
var sunCloudIconEl = "<i class='fas fa-cloud-sun'></i>";
var rainIconEl = "<i class='fas fa-cloud-rain'></i>";
var snowIconEl = "<i class='far fa-snowflake'></i>";
var windIconEl = "<i class='fas fa-wind'></i>";


// Set date
var dateEl = document.querySelector(".todays-date");

var now = dayjs().format('ddd MMMM D');

dateEl.textContent = now;

// Set Days of week for 5 day forecast
$(".future").each(function() {
    var addDays = $(this).attr("data-day");
    addDays = parseInt(addDays);
    
    var dayOfWeek = dayjs().add(addDays, 'day').format('dddd');
    $(this).find(".day").text(dayOfWeek);  
});

var loadWeather = function (dailyWeather) {
    console.log(dailyWeather);
    // Get weather data
    var todayTemp = dailyWeather[0].temp.day;
    var todayWind = dailyWeather[0].wind_speed;
    var todayHumidity = dailyWeather[0].humidity;
    var todayUvi = dailyWeather[0].uvi;
    var weatherCondition = dailyWeather[0].weather[0].id;

    // Display data
    todayEl.find(".temp").text(todayTemp);
    todayEl.find(".wind").text(todayWind);
    todayEl.find(".humid").text(todayHumidity);
    todayEl.find(".uvi").text(todayUvi);



}

//Event listener for form submit
$(".location-search").on("submit", function(event) {
    event.preventDefault();
    var locationSearch = locationEl.value.trim();
    locationEl.value = "";
    console.log(locationSearch);
    $(".location").text(locationSearch);
});

var url = "https://api.openweathermap.org/data/2.5/onecall?lat=53.34&lon=-6.26&exclude=hourly,minutely,alerts&units=imperial&appid=aa5d1cd32b930fb9d0bbbffde6f83c5f";

fetch(url).then(function(response) {
    response.json().then(function (data) {
        
        loadWeather(data.daily);
    })
});