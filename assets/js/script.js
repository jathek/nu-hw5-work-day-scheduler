// store date of page load
let now = moment();
let dayStart = 8;

// add date to jumbotron
let currentDay = document.querySelector("#currentDay");
currentDay.innerText = now.format("dddd[, ]MMMM Do");

function writeRows() {
    let container = document.querySelector(".container");
    for (let i = 0; i < 9; i++) {
        let rowHour = dayStart + i;
        let rowTime = moment(`${rowHour}`, "h").format("hA");
        container.innerHTML += `<div class="row time-block" data-hour="${rowHour}"><div class="col-2 hour">${rowTime}</div><textarea class="col-8"></textarea><button class="col-2 saveBtn"></button></div>`;
    }
}

writeRows();
