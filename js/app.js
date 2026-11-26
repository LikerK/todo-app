import { addTask, state } from './state.js';
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
