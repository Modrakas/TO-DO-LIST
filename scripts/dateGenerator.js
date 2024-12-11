//js date generator
const n = new Date();
document.getElementById("date").innerHTML = n.getDate();

const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const m = new Date();
let month = months[m.getMonth()];
document.getElementById("month").innerHTML = month;

const year = new Date();
document.getElementById("year").innerHTML = year.getFullYear();

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const d = new Date();
let day = days[d.getDay()];
document.getElementById("day").innerHTML = day;