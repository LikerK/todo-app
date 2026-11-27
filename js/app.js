import { addTask, removeTask, setStatusTask, setFilterTask, getVisibleTasks } from './state.js';
import { renderTasks } from './render.js';

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const tasksContainer = document.getElementById('tasks');
const statusFilter = document.getElementById('status-filter');
const errorSpan = document.getElementById('task-error');

const validate = (value) => {
  const isValid = value.trim().length > 0;
  errorSpan.textContent = isValid ? '' : 'Поле не должно быть пустым';
  taskInput.setAttribute('aria-invalid', String(!isValid));
  return isValid;
}

const updateView = () => {
  const visibleTasks = getVisibleTasks();
  renderTasks(visibleTasks, tasksContainer);
}

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(taskForm);
  const title = formData.get('title') ?? '';
  if (!validate(title)) return
  addTask(title);
  updateView();
  taskForm.reset();
});

tasksContainer.addEventListener('click', (e) => {
  const btn = e.target.closest('.remove-task-btn');
  if (!btn) return;
  const taskId = btn.closest('.task').dataset.id;
  if (!taskId) return;
  removeTask(taskId);
  updateView();
});

tasksContainer.addEventListener('change', (e) => {
  const select = e.target.closest('.task-status');
  if (!select) return;
  const currentTask = e.target.closest('.task');
  const taskId = currentTask.dataset.id;
  const status = select.value;
  setStatusTask(taskId, status);
  updateView();
});


statusFilter.addEventListener('change', (e) => {
  setFilterTask(e.target.value);
  updateView();
});

updateView();
