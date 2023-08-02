import React from "react";
import { useDispatch } from "react-redux";
import { toggleTask } from "../redux/actions";
import { fetchDeleteTask, fetchToggleTask } from "../redux/fetchData";

const TaskItem = ({ id, title, completed }) => {
  const dispatch = useDispatch();

  const removeTask = () => {
    dispatch(fetchDeleteTask(id));
  };
  const toggleTaskHandler = () => {
    dispatch(fetchToggleTask(id));
  };

  return (
    <div className="list-group-item list-group-item-action">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{title}</h5>
        <small>{completed ? "- Completed" : ""}</small>
      </div>
      <div className="btn-group d-flex mt-2" role="group">
        <button
          className="btn btn-outline-secondary"
          onClick={toggleTaskHandler}
        >
          Toggle
        </button>
        <button className="btn btn-outline-danger" onClick={removeTask}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
