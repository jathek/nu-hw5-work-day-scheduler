// store date of page load
let now = moment("10", "H"); // use moment("10", "H") to move "now" around to test
// set work day's beginning hour in 24h time
let dayStart = 8;

// add date to jumbotron
let currentDay = document.querySelector("#currentDay");
currentDay.innerText = now.format("dddd[, ]MMMM Do");

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
    container.innerHTML += `<div class="row time-block"><div class="col-1 pt-4 hour">${rowTime}</div><textarea class="${rowColor} col-10" data-hour="${rowHour}"></textarea><button class="col-1 saveBtn" data-hour="${rowHour}"><i class="fas fa-save"></i></button></div>`;
  }
}

document.querySelectorAll(".saveBtn").forEach((e) => {
  e.addEventListener("click", (event) => {
    let entryArea = event.target.parentNode.querySelector("textarea");
    console.log(event.target);
    console.log(entryArea);
  });
});