var dateEl = document.querySelector(".todays-date");

var now = dayjs().format('ddd MMMM D');

dateEl.textContent = now;