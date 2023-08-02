import { ACTION_TYPE } from "../constants";

export const fetchRequest = () => ({
  type: ACTION_TYPE.FETCH_DATA.REQUEST,
});

export const fetchSuccess = (tasks) => ({
  type: ACTION_TYPE.FETCH_DATA.SUCCESS,
  payload: {
    tasks,
  },
});

export const fetchError = (error) => ({
  type: ACTION_TYPE.FETCH_DATA.ERROR,
  payload: {
    error,
  },
});

export const addTask = (content, id) => ({
  type: ACTION_TYPE.ADD,
  payload: {
    id: id,
    content,
  },
});

export const toggleTask = (id) => ({
  type: ACTION_TYPE.TOGGLE,
  payload: { id },
});

export const deleteTask = (id) => ({
  type: ACTION_TYPE.DELETE,
  payload: { id },
});

export const setFilter = (filter) => ({
  type: ACTION_TYPE.SET_FILTER,
  payload: { filter },
});
