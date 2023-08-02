import { VISIBILITY_FILTERS } from "../constants";

export const getTasks = (store) => store.tasks.tasks;

export const getTaskByFilterWithProps = (store, filter) => {
  const allTasks = getTasks(store);
  switch (filter) {
    case VISIBILITY_FILTERS.COMPLETED:
      return allTasks.filter((item) => item.completed);
    case VISIBILITY_FILTERS.INCOMPLETE:
      return allTasks.filter((item) => !item.completed);
    case VISIBILITY_FILTERS.ALL:
    default:
      return allTasks;
  }
};

export const getFilter = (store) => {
  return store.visibilityFilter;
};

export const getTaskByFilter = (store) => {
  const { visibilityFilter } = store;
  return getTaskByFilterWithProps(store, visibilityFilter);
};

export const getAllData = (store) => {
  const tasks = getTaskByFilter(store);
  const { error, fetchState } = store.tasks;

  return { tasks, error, fetchState };
};
