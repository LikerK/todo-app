import { STATUSES, STATUS_LABELS } from './constants.js';

export const renderTasks = (tasks, container) => {
  container.innerHTML = '';

  if (!tasks.length) {
    const message = document.createElement('span');
    message.setAttribute('id', 'no-tasks-message');
    message.textContent = 'Не найдено ни одной задачи :(';
    container.appendChild(message);
    return;
  }

  tasks.forEach((task) => {
    const taskElement = createTaskElement(task);
    container.appendChild(taskElement);
  });
}

export const renderError = (input, span, message, isValid) => {
  span.textContent = message;
  // const border = `1px solid ${isValid ? '#d1d5db' : '#ef4444'}`;
  // input.style.border = border;
  input.setAttribute('aria-invalid', String(!isValid));
}

const createTaskElement = (task) => {
  const taskElement = document.createElement('div');
  const title = document.createElement('span');
  const selectStatus = document.createElement('select');
  const removeButton = document.createElement('button');
  const toolsContainer = document.createElement('div');

  STATUSES.forEach((status) => {
    const option = document.createElement('option');
    option.value = status;
    option.textContent = STATUS_LABELS[status];
    selectStatus.appendChild(option);
  });

  toolsContainer.classList.add('task-tools');
  taskElement.classList.add('task');
  taskElement.dataset.id = task.id;
  title.textContent = task.title;
  selectStatus.value = task.status;
  selectStatus.classList.add('task-status', 'select');
  removeButton.textContent = 'Удалить';
  removeButton.classList.add('remove-task-btn');

  toolsContainer.appendChild(selectStatus);
  toolsContainer.appendChild(removeButton);
  taskElement.appendChild(title);
  taskElement.appendChild(toolsContainer);

  return taskElement;
}
