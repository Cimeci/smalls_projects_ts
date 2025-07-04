var counter = 0;
var btn_inc = document.querySelector("#increment-btn");
var btn_dec = document.querySelector("#decrement-btn");
var btn_reset = document.querySelector("#reset-btn");
function loadCounter() {
    var saved = localStorage.getItem("counter");
    if (saved !== null)
        counter = JSON.parse(saved);
}
function saveCounter() {
    localStorage.setItem("counter", JSON.stringify(counter));
}
function updateDisplay() {
    document.getElementById("counter").textContent = counter.toString();
}
function updateCounter() {
    btn_inc.onclick = function () {
        counter += 1;
        saveCounter();
        updateDisplay();
    };
    btn_dec.onclick = function () {
        counter -= 1;
        saveCounter();
        updateDisplay();
    };
    btn_reset.onclick = function () {
        counter = 0;
        saveCounter();
        updateDisplay();
    };
}
loadCounter();
updateDisplay();
updateCounter();
