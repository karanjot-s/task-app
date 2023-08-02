import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import TaskFilter from "./components/TaskFilter";
import TaskList from "./components/TaskList";
import Login from "./pages/Login";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./pages/Signup";

function App() {
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setLoading(false);
      setLogged(false);
      setCurrentPage("login");
      return;
    }

    axios({
      method: "GET",
      url: process.env.REACT_APP_SERVER_URL + "/check-token/" + token,
      signal: controller.signal,
    })
      .then((res) => {
        setLoading(false);
        if (res.data.success) return setLogged(true);
      })
      .catch((err) => {
        // console.log(err);
        if (err.code === "ERR_CANCELLED") return;
        setLoading(false);
        if (err.status === 406) localStorage.removeItem("accessToken");
      });

    return () => {
      controller.abort();
    };
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("accessToken");
    setLogged(false);
  };

  if (loading) return <>Loading...</>;

  if (!logged) {
    if (currentPage === "login") return <Login setPage={setCurrentPage} />;
    else return <Signup setPage={setCurrentPage} />;
  }

  return (
    <div className="py-3 m-auto" style={{ maxWidth: "500px" }}>
      <div className="d-flex justify-content-between">
        <h1 className="h2">My Tasks</h1>
        <button className="btn btn-danger" onClick={logoutHandler}>
          Logout
        </button>
      </div>
      <AddTask />
      <TaskFilter />
      <TaskList />
    </div>
  );
}

export default App;
