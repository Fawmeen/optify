const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const loadTasks = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => renderTask(task.text, task.completed));
};

const saveTasks = () => {
  const tasks = Array.from(taskList.children).map(li => ({
    text: li.querySelector('.task-text').innerText,
    completed: li.classList.contains('completed')
  }));
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const addTask = () => {
  const tt= taskInput.value.trim();
  if (!tt) return alert('Please enter a task!');
  renderTask(tt);
  taskInput.value = '';
  saveTasks();
};

const renderTask = (text, completed = false) => {
  const li = document.createElement('li');
  li.className = completed ? 'completed' : '';

  const taskSpan = document.createElement('span');
  taskSpan.innerText = text;
  taskSpan.className = 'task-text';
  taskSpan.onclick = () => {
    li.classList.toggle('completed');
    saveTasks();
  };

  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = 'Delete';
  deleteBtn.className = 'btn-d';
  deleteBtn.onclick = () => {
    li.remove();
    saveTasks();
  };

  li.appendChild(taskSpan);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
};
window.onload = loadTasks;
