import { STATUSES, STATUS_LABELS } from './constants.js';

export const renderTasks = (tasks, container) => {
  container.innerHTML = '';

  if (!tasks.length) {
    const message = document.createElement('span');
    message.textContent = 'Не найдено ни одной задачи :(';
    container.appendChild(message);
    return;
  }

  tasks.forEach((task) => {
    const taskElement = createTaskElement(task);
    container.appendChild(taskElement);
  });
}

export const renderError = (error, container) => {
  container.innerHTML = '';
  if (error) {
    const errorElement = document.createElement('div');
    errorElement.classList.add('error');
    errorElement.textContent = error;
    container.appendChild(errorElement);
  }
}

const createTaskElement = (task) => {
  const taskElement = document.createElement('div');
  const title = document.createElement('span');
  const selectStatus = document.createElement('select');
  const removeButton = document.createElement('button');

  STATUSES.forEach((status) => {
    const option = document.createElement('option');
    option.value = status;
    option.textContent = STATUS_LABELS[status];
    selectStatus.appendChild(option);
  });

  taskElement.classList.add('task');
  taskElement.dataset.id = task.id;
  title.textContent = task.title;
  selectStatus.value = task.status;
  selectStatus.classList.add('task-status');
  removeButton.textContent = 'Удалить';
  removeButton.classList.add('remove-task-btn');

  taskElement.appendChild(title);
  taskElement.appendChild(selectStatus);
  taskElement.appendChild(removeButton);

  return taskElement;
}
