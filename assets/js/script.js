// store date of page load
let now = moment("10", "H"); // use moment("10", "H") to move "now" around to test
let today = now.format("YYYYMMDD");
// set work day's beginning hour in 24h time
let dayStart = 8;

// add date to jumbotron
let currentDayHeading = document.querySelector("#currentDay");
currentDayHeading.innerText = now.format("dddd[, ]MMMM Do");

// write rows for hours on page load
let container = document.querySelector(".container");
writeRows();
function writeRows() {
  // loop for 9 rows (8 work hours + lunch)
  for (let i = 0; i < 9; i++) {
    // set row's hour by adding i to dayStart
    let rowHour = dayStart + i;
    // set var for current hour
    let nowHour = now.format("H");
    // set row color based on current hour
    let rowColor = "present";
    if (rowHour < nowHour) {
      rowColor = "past";
    } else if (rowHour > nowHour) {
      rowColor = "future";
    }
    // set text for .hour div from rowHour
    let rowTime = moment(`${rowHour}`, "h").format("hA");
    // append a row for each hour
    container.innerHTML += `<div class="row time-block"><div class="col-1 pt-4 hour">${rowTime}</div><textarea class="${rowColor} col-10 text-dark" data-hour="${rowHour}"></textarea><button class="col-1 saveBtn" data-hour="${rowHour}"><i class="fas fa-save" data-hour="${rowHour}"></i></button></div>`;
  }
}

// set schedules from localStorage
let schedules = JSON.parse(localStorage.getItem("schedules"));
if (schedules === null) {
  schedules = {};
}
if (schedules[today] === undefined) {
  schedules[today] = {};
}

// write localstorage values to schedule
function writeSchedule() {
  // get textareas from document
  let textAreas = document.querySelectorAll("textarea");
  // iterate through textAreas and set each textarea to today's data from localStorage
  for (let i = 0; i < textAreas.length; i++) {
    let selectedHour = Number(textAreas[i].dataset.hour);
    let hourSchedule = schedules[today][selectedHour];
    if (hourSchedule !== undefined) {
      textAreas[i].value = hourSchedule;
    }
  }
}
// write the schedule on page load
writeSchedule();

// submitData: save user input to localstorage
// variables for click targets
let saveButtons = document.querySelectorAll(".saveBtn");
let saveIcons = document.querySelectorAll(".saveBtn > i");
// set click listener for button and i elems
(saveButtons || saveIcons).forEach((element) => {
  element.addEventListener("click", submitData);
});
function submitData(event) {
  // selectedHour equal to data-hour from button or i
  let selectedHour = event.target.dataset.hour;
  // textarea to modify is identified based on selectedHour
  let entryArea = document.querySelector(
    `textarea[data-hour="${selectedHour}"]`
  );
  // schedules object is modified to submitted value
  schedules[today][selectedHour] = entryArea.value.trim();
  // submit to localStorage
  localStorage.setItem("schedules", JSON.stringify(schedules));
}
