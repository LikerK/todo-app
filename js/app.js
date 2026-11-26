import { addTask, state, removeTask } from './state.js';
import { renderTasks } from './render.js';

const taskForm = document.getElementById('task-form');
const tasksContainer = document.getElementById('tasks');

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(taskForm);
  const title = formData.get('title');
  addTask(title);
  renderTasks(state.tasks, tasksContainer);
  taskForm.reset();
});

tasksContainer.addEventListener('click', (e) => {
  const btn = e.target.closest('.remove-task-btn');
  if (!btn) return;
  const taskId = btn.closest('.task').dataset.id;
  if (!taskId) return;
  removeTask(taskId);
  renderTasks(state.tasks, tasksContainer);
});
