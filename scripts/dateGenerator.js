// dateGenerator.js

const n = new Date();
document.getElementById("dateNumber").innerHTML = n.getDate();

const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const m = new Date();
let month = months[m.getMonth()];
document.getElementById("dateMonth").innerHTML = month;

const year = new Date();
document.getElementById("fullYear").innerHTML = year.getFullYear();

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const d = new Date();
let day = days[d.getDay()];
document.getElementById("dayLong").innerHTML = day;
