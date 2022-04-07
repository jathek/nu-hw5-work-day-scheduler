// store date of page load
let now = moment();
// set work day's beginning hour in 24h time
let dayStart = 8;

// add date to jumbotron
let currentDay = document.querySelector("#currentDay");
currentDay.innerText = now.format("dddd[, ]MMMM Do");

// write rows for hours on page load
writeRows();
function writeRows() {
  let container = document.querySelector(".container");
  // loop for 9 rows (8 work hours + lunch)
  for (let i = 0; i < 9; i++) {
    // set row's hour by adding i to dayStart
    let rowHour = dayStart + i;
    // handle schedules over midnight
    if (rowHour > 24) {
      rowHour -= 24;
    }
    console.log(rowHour);
    // set text for .hour div from rowHour
    let rowTime = moment(`${rowHour}`, "h").format("hA");
    container.innerHTML += `<div class="row time-block" data-hour="${rowHour}"><div class="col-2 hour">${rowTime}</div><textarea class="col-8"></textarea><button class="col-2 saveBtn"><i class="fad fa-save"></i></button></div>`;
  }
}
