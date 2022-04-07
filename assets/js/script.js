// store date of page load
let now = moment(); // use moment("10", "H") to move "now" around to test
let today = now.format("YYYYMMDD");
// set work day's beginning hour in 24h time
let dayStart = 8;

// add date to jumbotron
let currentDayHeading = document.querySelector("#currentDay");
currentDayHeading.innerText = now.format("dddd[, ]MMMM Do");

let container = document.querySelector(".container");
// write rows for hours on page load
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
    container.innerHTML += `<div class="row time-block"><div class="col-1 pt-4 hour">${rowTime}</div><textarea class="${rowColor} col-10 text-dark" data-hour="${rowHour}"></textarea><button class="col-1 saveBtn"><i class="fas fa-save"></i></button></div>`;
  }
}

let schedules = JSON.parse(localStorage.getItem("schedules"));
if (schedules === null) {
  schedules = {};
}
if (schedules[today] === undefined) {
  schedules[today] = {};
}

function writeSchedule() {
  let textAreas = document.querySelectorAll("textarea");
  for (let i = 0; i < textAreas.length; i++) {
    let selectedHour = Number(textAreas[i].dataset.hour);
    let hourSchedule = schedules[today][selectedHour];
    if (hourSchedule !== undefined) {
      textAreas[i].value = hourSchedule;
    }
  }
}
writeSchedule();

let saveButtons = document.querySelectorAll(".saveBtn");
let saveIcons = document.querySelectorAll(".saveBtn > i");
(saveButtons || saveIcons).forEach((element) => {
  element.addEventListener("click", submitData);
});
function submitData(event) {
  let entryArea;
  if (event.target.matches(".saveBtn")) {
    entryArea = event.target.parentNode.querySelector("textarea");
  }
  if (event.target.matches("i")) {
    entryArea = event.target.parentNode.parentNode.querySelector("textarea");
  }
  let selectedHour = entryArea.dataset.hour;
  schedules[today][selectedHour] = entryArea.value.trim();
  localStorage.setItem("schedules", JSON.stringify(schedules));
}
