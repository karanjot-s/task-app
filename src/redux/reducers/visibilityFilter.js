import { ACTION_TYPE, VISIBILITY_FILTERS } from "../../constants";

const initialState = VISIBILITY_FILTERS.ALL;

export const visibliityFilter = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_FILTER: {
      return action.payload.filter;
    }
    default:
      return state;
  }
};
