import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_STATE } from "../constants";
import fetchTasks from "../redux/fetchData";
import { getAllData } from "../redux/selectors";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const { tasks, error, fetchState } = useSelector(getAllData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (fetchState !== FETCH_STATE.NOT_SET) return;
    dispatch(fetchTasks());
  }, []);

  if (fetchState === FETCH_STATE.LOADING) return <>Loading...</>;

  if (fetchState === FETCH_STATE.LOADED && error)
    return <>Something went wrong</>;

  return (
    <div className="list-group my-3">
      {tasks.map((todo, ind) => (
        <TaskItem
          key={ind}
          id={todo._id}
          title={todo.content}
          completed={todo.completed}
        />
      ))}
    </div>
  );
};

export default TaskList;
