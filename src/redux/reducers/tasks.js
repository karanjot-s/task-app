import { ACTION_TYPE, FETCH_STATE } from "../../constants";

const initialState = {
  ids: [],
  tasks: [],
  error: null,
  fetchState: FETCH_STATE.NOT_SET,
};

const tasks = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.FETCH_DATA.REQUEST:
      return {
        ...state,
        fetchState: FETCH_STATE.LOADING,
        error: null,
      };
    case ACTION_TYPE.FETCH_DATA.SUCCESS: {
      const { tasks } = action.payload;
      const ids = tasks.map((task) => task._id);
      return {
        ...state,
        ids: ids,
        tasks: tasks,
        error: null,
        fetchState: FETCH_STATE.LOADED,
      };
    }
    case ACTION_TYPE.FETCH_DATA.ERROR: {
      const { error } = action.payload;
      return {
        ...state,
        error: error,
        fetchState: FETCH_STATE.LOADED,
      };
    }
    case ACTION_TYPE.ADD: {
      const { id, content } = action.payload;
      return {
        ...state,
        ids: [...state.ids, id],
        tasks: [
          ...state.tasks,
          {
            _id: id,
            content,
            completed: false,
          },
        ],
        fetchState: FETCH_STATE.LOADED,
      };
    }
    case ACTION_TYPE.TOGGLE: {
      const { id } = action.payload;
      return {
        ...state,
        tasks: state.tasks.map((item) =>
          item._id === id ? { ...item, completed: !item.completed } : item
        ),
        fetchState: FETCH_STATE.LOADED,
      };
    }
    case ACTION_TYPE.DELETE: {
      const { id } = action.payload;
      return {
        ...state,
        ids: state.ids.filter((item) => item !== id),
        tasks: state.tasks.filter((item) => item._id !== id),
        fetchState: FETCH_STATE.LOADED,
      };
    }
    default:
      return state;
  }
};

export default tasks;
