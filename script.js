// Theme functionality
let isDarkMode = true;

function toggleTheme() {
  isDarkMode = !isDarkMode;
  const body = document.body;
  const themeIcon = document.querySelector('.theme-toggle-icon');
  const themeText = document.getElementById('theme-text');

  if (isDarkMode) {
    body.removeAttribute('data-theme');
    themeIcon.textContent = '🌙';
    themeText.textContent = 'Dark';
  } else {
    body.setAttribute('data-theme', 'light');
    themeIcon.textContent = '☀️';
    themeText.textContent = 'Light';
  }
}

// Clock functionality
function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString();
  const date = now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const timezoneOffset = now.getTimezoneOffset();
  const offsetHours = Math.abs(Math.floor(timezoneOffset / 60));
  const offsetMinutes = Math.abs(timezoneOffset % 60);
  const offsetSign = timezoneOffset <= 0 ? '+' : '-';
  const utcOffset = `UTC${offsetSign}${offsetHours.toString().padStart(2, '0')}:${offsetMinutes.toString().padStart(2, '0')}`;

  document.getElementById('clock').innerText = time;
  document.getElementById('date').innerText = date;
  document.getElementById('timezone').innerText = `${timezone} (${utcOffset})`;
}

updateClock();
setInterval(updateClock, 1000);

// To-Do List functionality
let todos = [];
let todoIdCounter = 1;

function addTodo() {
  const input = document.getElementById('todo-input');
  const dueDateInput = document.getElementById('due-date-input');
  const text = input.value.trim();
  const dueDate = dueDateInput.value;

  if (text === '') return;

  const todo = {
    id: todoIdCounter++,
    text: text,
    dueDate: dueDate,
    completed: false
  };

  todos.push(todo);
  input.value = '';
  dueDateInput.value = '';
  renderTodos();
}

function toggleTodo(id) {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    renderTodos();
  }
}

function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  renderTodos();
}

function renderTodos() {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';

  todos.forEach(todo => {
    const li = document.createElement('li');
    const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;
    li.className = `todo-item ${todo.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`;

    const dueDateText = todo.dueDate ? `<small class="due-date">Due: ${todo.dueDate}</small>` : '';

    li.innerHTML = `
      <span class="todo-text">${todo.text}</span>
      ${dueDateText}
      <div class="todo-actions">
        <button class="complete-btn" onclick="toggleTodo(${todo.id})">
          ${todo.completed ? 'Undo' : 'Done'}
        </button>
        <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
      </div>
    `;
    todoList.appendChild(li);
  });
}

// Event listeners
document.getElementById('add-btn').addEventListener('click', addTodo);
document.getElementById('todo-input').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    addTodo();
  }
});

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
  console.log('Live Clock app initialized');
});
