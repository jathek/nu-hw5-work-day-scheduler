// store date of page load
let now = moment(); // use moment("10", "H") to move "now" around to test
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
    // set var for current hour
    console.log(now.format("H"));
    // set row color based on current hour
    let rowColor = "present"
    if (rowHour < now.format("H")) {
      rowColor = "past"
    } else if (rowHour > now.format("H")) {
      rowColor = "future"
    }
    // set text for .hour div from rowHour
    console.log(rowHour);
    let rowTime = moment(`${rowHour}`, "h").format("hA");
    container.innerHTML += `<div class="row time-block" data-hour="${rowHour}"><div class="col-1 pt-4 hour">${rowTime}</div><textarea class="${rowColor} col-10"></textarea><button class="col-1 saveBtn"><i class="fas fa-save"></i></button></div>`;
  }
}
