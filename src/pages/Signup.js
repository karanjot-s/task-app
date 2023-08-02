import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const Login = ({ setPage }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState();

  const url = process.env.REACT_APP_SERVER_URL + "/signup";

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios({
      method: "POST",
      url: url,
      responseType: "json",
      data: {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      },
    })
      .then((res) => {
        setPage("login");
      })
      .catch((err) => {
        console.log(err);
        setErr(err.response.data.error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="w-100 m-auto text-center" style={{ paddingTop: "40px" }}>
      <form
        onSubmit={onSubmit}
        className="container"
        style={{ maxWidth: "330px" }}
      >
        <h1 className="h3 mb-3 fw-normal">Create Account</h1>
        {err && <p className="bg-danger text-light p-2 rounded">{err}</p>}
        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="email@example.com"
            style={{
              marginBottom: "-1px",
              borderBottomRightRadius: "0",
              borderBottomLeftRadius: "0",
            }}
            ref={emailRef}
            required
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="yourpass123"
            style={{
              borderTopRightRadius: "0",
              borderTopLeftRadius: "0",
            }}
            ref={passwordRef}
            required
          />
          <label htmlFor="password">Password</label>
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-3 w-100 btn-lg"
          disabled={loading}
        >
          Login
        </button>
      </form>
      <p className="mt-2">
        Already a user? {"  "}
        <span
          className="link-primary"
          style={{ cursor: "pointer" }}
          onClick={() => {
            setPage("login");
          }}
        >
          Login Instead
        </span>
      </p>
    </div>
  );
};

export default Login;
