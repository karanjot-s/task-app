import axios from "axios";
import {
  addTask,
  deleteTask,
  fetchError,
  fetchRequest,
  fetchSuccess,
  toggleTask,
} from "./actions";

const url = process.env.REACT_APP_SERVER_URL + "/task/";

const fetchTasks = () => {
  return (dispatch) => {
    dispatch(fetchRequest());
    const token = localStorage.getItem("accessToken");

    if (!token) {
      dispatch(fetchError({ err: "Not Authorized" }));
      return;
    }
    axios
      .get(url, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        dispatch(fetchSuccess(res.data.tasks));
      })
      .catch((err) => {
        // console.log(err);
        dispatch(fetchError(err.response.toJSON()));
      });
  };
};

export const fetchAddTask = (content) => {
  return (dispatch) => {
    dispatch(fetchRequest());
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");

    if (!token) {
      dispatch(fetchError({ err: "Not Authorized" }));
      return;
    }
    axios
      .post(
        url,
        {
          content: content,
          userId: userId,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        dispatch(addTask(content, res.data.task._id));
      })
      .catch((err) => {
        // console.log(err);
        dispatch(fetchError(err.response.toJSON()));
      });
  };
};

export const fetchDeleteTask = (id) => {
  return (dispatch) => {
    dispatch(fetchRequest());
    const token = localStorage.getItem("accessToken");

    if (!token) {
      dispatch(fetchError({ err: "Not Authorized" }));
      return;
    }

    axios
      .delete(url + id, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        dispatch(deleteTask(id));
      })
      .catch((err) => {
        // console.log(err);
        dispatch(fetchError(err.response.toJSON()));
      });
  };
};

export const fetchToggleTask = (id) => {
  return (dispatch) => {
    dispatch(fetchRequest());
    const token = localStorage.getItem("accessToken");

    if (!token) {
      dispatch(fetchError({ err: "Not Authorized" }));
      return;
    }

    axios
      .put(
        url + id,
        {},
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        dispatch(toggleTask(id));
      })
      .catch((err) => {
        // console.log(err);
        dispatch(fetchError(err.response.toJSON()));
      });
  };
};

export default fetchTasks;
