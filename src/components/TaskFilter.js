import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { VISIBILITY_FILTERS } from "../constants";
import { setFilter } from "../redux/actions";
import { getFilter } from "../redux/selectors";

const TaskFilter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  return (
    <ul className="nav nav-pills nav-fill container m-auto">
      {Object.keys(VISIBILITY_FILTERS).map((key, ind) => {
        const currentFilter = VISIBILITY_FILTERS[key];
        return (
          <span
            className="nav-item"
            key={ind}
            onClick={() => {
              dispatch(setFilter(currentFilter));
            }}
            style={{
              cursor: "pointer",
            }}
          >
            <a
              className={`nav-link ${currentFilter === filter ? "active" : ""}`}
              href="#"
            >
              {currentFilter}
            </a>
          </span>
        );
      })}
    </ul>
  );
};

export default TaskFilter;
