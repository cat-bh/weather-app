var locationEl = document.getElementById("location");
var todayEl = $(".today");

// Weather icons
var sunIconEl = "<i class='fas fa-sun'></i>";
var cloudIconEl = "<i class='fas fa-cloud'></i>";
var sunCloudIconEl = "<i class='fas fa-cloud-sun'></i>";
var rainIconEl = "<i class='fas fa-cloud-rain'></i>";
var snowIconEl = "<i class='far fa-snowflake'></i>";
var fogIconEl = "<i class='fas fa-smog'></i>";
var thunderIconEl = "<i class='fas fa-bolt'></i>";

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

var lat = "";
var lng = "";


// gather data and display to page
var loadWeather = function (dailyWeather) {
    console.log(dailyWeather);
    // Get weather data
    var todayTemp = dailyWeather[0].temp.day;
    var todayWind = dailyWeather[0].wind_speed;
    var todayHumidity = dailyWeather[0].humidity;
    var todayUvi = dailyWeather[0].uvi;
    var weatherCondition = dailyWeather[0].weather[0].id;

    var icon = checkIcon(weatherCondition);

    // Display data
    todayEl.find(".temp").text(todayTemp);
    todayEl.find(".wind").text(todayWind);
    todayEl.find(".humid").text(todayHumidity);
    todayEl.find(".uvi").text(todayUvi);
    todayEl.find(".icon").html(icon);

    // Display future data
    $(".future").each(function() {
        var i = $(this).attr("data-day");

        weatherCondition = dailyWeather[i].weather[0].id;
        var icon = checkIcon(weatherCondition);
        
        $(this).find(".temp").text(dailyWeather[i].temp.day);
        $(this).find(".wind").text(dailyWeather[i].wind_speed);
        $(this).find(".humid").text(dailyWeather[i].humidity);
        $(this).find(".icon").html(icon);
    });
}

// Returns the correct icon for the weather conditions
function checkIcon (weatherId) {
    if (weatherId >= 200 && weatherId < 300) {
        return thunderIconEl;
    }
    if ((weatherId >= 300 && weatherId < 510) || (weatherId >= 520 && weatherId < 600)) {
        return rainIconEl;
    }
    if (weatherId === 511 || (weatherId >= 600 && weatherId < 700)) {
        return snowIconEl;
    }
    if (weatherId >= 700 && weatherId < 800) {
        return fogIconEl;
    }
    if (weatherId === 800) {
        return sunIconEl;
    }
    if (weatherId === 801) {
        return sunCloudIconEl;
    }
    if (weatherId >= 802) {
        return cloudIconEl;
    }
}

function getWeather() {
    var url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lng + "&exclude=hourly,minutely,alerts&units=imperial&appid=aa5d1cd32b930fb9d0bbbffde6f83c5f";

    fetch(url).then(function(response) {
        response.json().then(function (data) {
            
            loadWeather(data.daily);
        })
    });
}

// Get coordinates for city search
function getCoordinates(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=aa5d1cd32b930fb9d0bbbffde6f83c5f";
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                
                $(".location").text(data.name);
                lat = data.coord.lat;
                lng = data.coord.lon;
                
                getWeather();
            })
        } else {
            // request went wrong
            $(".location").text("Something went wrong! Please enter just the city name");
        }
        
    })
}

// Updates the recent search buttons
function loadRecentSearch() {
    var searches = localStorage.getItem('recentSearch');
    if (!searches) {
        return;
    }
    searches = JSON.parse(searches);

    $(".recent-searches").empty();

    for(var i = searches.length -1; i >= 0; i--) {
        var place = searches[i];
        var btn = $("<button>")
        btn.text(place).addClass("btn-recent");
        $(".recent-searches").append(btn);
    }
}

// adds the most recent search to local storage
function addSearchHistory(location) {
    var searchArray = localStorage.getItem('recentSearch');
    if (!searchArray) {
        searchArray = [];
    } else {
        searchArray = JSON.parse(searchArray);
    }
    searchArray.push(location);

    if (searchArray.length > 7) {
        searchArray.splice(0, 1);
    }

    localStorage.setItem('recentSearch', JSON.stringify(searchArray));
    loadRecentSearch();
}

loadRecentSearch();

//Event listener for form submit
$(".location-search").on("submit", function(event) {
    event.preventDefault();
    var locationSearch = locationEl.value.trim();
    locationEl.value = "";
    console.log(locationSearch);
    getCoordinates(locationSearch);
    addSearchHistory(locationSearch);
});

// Runs a search when recent search buttons are clicked
$(".recent-searches").on("click", ".btn-recent", function(event) {
    var location = this.textContent;
    getCoordinates(location);
})