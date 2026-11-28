import { 
  addTask,
  removeTask,
  setStatusTask,
  setFilterTask,
  getVisibleTasks,
} from './state.js';
import { renderTasks, renderError } from './render.js';

const SELECTORS = {
  removeBtn: '.remove-task-btn',
  status: '.task-status',
  task: '.task',
};

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const tasksContainer = document.getElementById('tasks');
const statusFilter = document.getElementById('status-filter');
const errorSpan = document.getElementById('valid-message');

const validateTitle = (value) => {
  const isValid = !!value.trim();
  const message = isValid ? '' : 'Поле не должно быть пустым';
  
  return { isValid, message };
}

const updateView = () => {
  const visibleTasks = getVisibleTasks();
  renderTasks(visibleTasks, tasksContainer);
}

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(taskForm);
  const title = formData.get('title') ?? '';
  const { isValid, message } = validateTitle(title);
  renderError(taskInput, errorSpan, message, isValid);
  if (!isValid) return
  addTask(title.trim());
  updateView();
  taskForm.reset();
});

tasksContainer.addEventListener('click', (e) => {
  const btn = e.target.closest(SELECTORS.removeBtn);
  if (!btn) return;
  const taskId = btn.closest(SELECTORS.task).dataset.id;
  if (!taskId) return;
  removeTask(taskId);
  updateView();
});

tasksContainer.addEventListener('input', (e) => {
  const select = e.target.closest(SELECTORS.status);
  if (!select) return;
  const currentTask = select.closest(SELECTORS.task);
  const taskId = currentTask?.dataset.id;
  if (!taskId) return;
  const status = select.value;
  setStatusTask(taskId, status);
  updateView();
});


statusFilter.addEventListener('input', (e) => {
  setFilterTask(e.target.value);
  updateView();
});

updateView();
