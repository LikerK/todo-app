import { STATUSES, FILTERS} from './constants.js';


const FILTER_ALL = 'all';
const DEFAULT_STATUS = 'new';

const INITIAL_TASKS = [
  { id: crypto.randomUUID(), status: DEFAULT_STATUS, title: 'Разобраться с условиями'},
  { id: crypto.randomUUID(), status: DEFAULT_STATUS, title: 'Сверстать страницу'},
  { id: crypto.randomUUID(), status: DEFAULT_STATUS, title: 'Проверить фильтр'},
];

const state = {
  tasks: INITIAL_TASKS,
  filterTask: FILTER_ALL,
};

const addTask = (title) => {
  const newTask = {
    id: crypto.randomUUID(),
    status: 'new',
    title,
  }
  state.tasks = [...state.tasks, newTask];
};

const removeTask = (taskId) => {
  state.tasks = state.tasks.filter((task) => task.id !== taskId);
};

const setFilterTask = (filter) => {
  if (!FILTERS.includes(filter)) return;
  state.filterTask = filter;
};

const setStatusTask = (taskId, status) => {
  if (!STATUSES.includes(status)) return;
  const currentTask = state.tasks.find(task => task.id === taskId);
  if (!currentTask || currentTask.status === status) return;
  state.tasks = state.tasks.map((task) => task.id === taskId ? { ...task, status } : task)
};

const getVisibleTasks = () => {
  if (state.filterTask === FILTER_ALL) return [...state.tasks];
  return state.tasks.filter(task => task.status === state.filterTask);
};

export { addTask, removeTask, setFilterTask, setStatusTask, getVisibleTasks }
