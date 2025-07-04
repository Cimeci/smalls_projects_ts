var tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
var taskList = document.querySelector("#task-list");
var form = document.querySelector("#task-form");
var input = document.querySelector("#task-input");
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach(function (task) {
        var li = document.createElement("li");
        li.className = task.done ? "done" : "";
        li.textContent = task.text;
        var toggleBtn = document.createElement("button");
        toggleBtn.textContent = "✓";
        toggleBtn.onclick = function () {
            task.done = !task.done;
            saveTasks();
            renderTasks();
        };
        var deleteBtn = document.createElement("button");
        deleteBtn.textContent = "✗";
        deleteBtn.onclick = function () {
            tasks = tasks.filter(function (t) { return t.id !== task.id; });
            saveTasks();
            renderTasks();
        };
        li.append(toggleBtn, deleteBtn);
        taskList.appendChild(li);
    });
}
form.addEventListener("submit", function (e) {
    e.preventDefault();
    var newTask = {
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
