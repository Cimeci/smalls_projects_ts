type Task = {
	id: number;
	text: string;
	done: boolean;
};

let tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");

const taskList = document.querySelector("#task-list") as HTMLUListElement;
const form = document.querySelector("#task-form") as HTMLFormElement;
const input = document.querySelector("#task-input") as HTMLInputElement;

function saveTasks() {
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
	taskList.innerHTML = "";
	tasks.forEach(task => {
		const li = document.createElement("li");
		li.className = task.done ? "done" : "";
		li.textContent = task.text;


		const toggleBtn = document.createElement("button");
		toggleBtn.textContent = "✓";
		toggleBtn.onclick = () => {
			task.done = !task.done;
			saveTasks();
			renderTasks();
		};


		const deleteBtn = document.createElement("button");
		deleteBtn.textContent = "✗";
		deleteBtn.onclick = () => {
			tasks = tasks.filter(t => t.id !== task.id);
			saveTasks();
			renderTasks();
		};

		li.append(toggleBtn, deleteBtn);
		taskList.appendChild(li);
	});
}

form.addEventListener("submit", (e) => {
	e.preventDefault();
	const newTask: Task = {
		id: Date.now(),
		text: input.value,
		done: false
	};
	tasks.push(newTask);
	input.value = "";
	saveTasks();
	renderTasks();
});

renderTasks();
