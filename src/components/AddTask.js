import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchAddTask } from "../redux/fetchData";

const AddTask = () => {
  const inputRef = useRef();
  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();

    if (inputRef.current.value.trim().length === 0) {
      alert("No task added");
      inputRef.current.value = "";
      return;
    }

    dispatch(fetchAddTask(inputRef.current.value));

    inputRef.current.value = "";
  };

  return (
    <div className="w-100 input-group my-3">
      <input
        type="text"
        placeholder="Add task"
        ref={inputRef}
        className="form-control"
      />
      <button
        onClick={onSubmit}
        className="btn btn-outline-primary btn-md px-5"
      >
        Save
      </button>
    </div>
  );
};

export default AddTask;
