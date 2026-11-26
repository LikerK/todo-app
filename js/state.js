const STATUSES = ['new', 'in-progress', 'done'];

const state = {
  tasks: [],
  filterTask: 'all',
  error: null
};

const addTask = (title) => {
  const newTask = {
    id: crypto.randomUUID(),
    status: 'new',
    title: title,
  }
  state.tasks = [...state.tasks, newTask];
};

const removeTask = (taskId) => {
  state.tasks = state.tasks.filter((task) => task.id !== taskId);
};

const setFilterTask = (filter) => {
  state.filterTask = filter;
}

const setError = (error) => {
  state.error = error;
};

const setStatusTask = (taskId, status) => {
  if (!STATUSES.includes(status)) return;
  const currentTask = state.tasks.find(task => task.id === taskId);
  if (!currentTask || currentTask.status === status) return;
  currentTask.status = status;
};


const getVisibleTasks = () => {
  if (state.filterTask === 'all') return state.tasks;
  return state.tasks.filter(task => task.status === state.filterTask);
};

export { state, addTask, removeTask, setError, setFilterTask, setStatusTask, getVisibleTasks }
