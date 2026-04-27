let tasks = [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const stored = localStorage.getItem("tasks");
  if (stored) {
    tasks = JSON.parse(stored);
    tasks.forEach(task => renderTask(task));
  }
}

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value;

  if (taskText === "") return;

  const task = {
    text: taskText,
    completed: false
  };

  tasks.push(task);
  saveTasks();
  renderTask(task);

  input.value = "";
}

function renderTask(task) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = task.text;

  if (task.completed) {
    span.classList.add("completed");
  }

  span.onclick = () => {
    task.completed = !task.completed;
    span.classList.toggle("completed");
    saveTasks();
  };

  const button = document.createElement("button");
  button.textContent = "❌";

  button.onclick = () => {
    tasks = tasks.filter(t => t !== task);
    li.remove();
    saveTasks();
  };

  li.appendChild(span);
  li.appendChild(button);

  document.getElementById("taskList").appendChild(li);
}

loadTasks();