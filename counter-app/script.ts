let counter: number = 0

const btn_inc = document.querySelector("#increment-btn") as HTMLButtonElement;
const btn_dec = document.querySelector("#decrement-btn") as HTMLButtonElement;
const btn_reset = document.querySelector("#reset-btn") as HTMLButtonElement;

function loadCounter() {
	const saved = localStorage.getItem("counter");
	if (saved !== null)
		counter = JSON.parse(saved);
}

function saveCounter() {
	localStorage.setItem("counter", JSON.stringify(counter));
}

function updateDisplay() {
	document.getElementById("counter")!.textContent = counter.toString();
}

function updateCounter(){

	btn_inc.onclick = () => {
		counter += 1
		saveCounter()
		updateDisplay()
	}

	btn_dec.onclick = () => {
		counter -= 1
		saveCounter()
		updateDisplay()
	}

	btn_reset.onclick = () => {
		counter = 0
		saveCounter()
		updateDisplay()
	}
}

loadCounter()
updateDisplay()
updateCounter()
