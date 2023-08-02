export const ACTION_TYPE = {
  ADD: "add_task",
  TOGGLE: "toggle_task",
  DELETE: "delete_task",
  SET_FILTER: "set_task_filter",
  FETCH_DATA: {
    REQUEST: "fetch_data_request",
    SUCCESS: "fetch_data_success",
    ERROR: "fetch_data_error",
  },
};

export const FETCH_STATE = {
  NOT_SET: "not_set",
  LOADING: "loading",
  LOADED: "loaded",
};

export const VISIBILITY_FILTERS = {
  ALL: "All",
  COMPLETED: "Completed",
  INCOMPLETE: "Incomplete",
};
