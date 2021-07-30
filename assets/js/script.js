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