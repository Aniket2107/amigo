import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";

import { login } from "../../redux/actions/authActions";

import "./login.css";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();
  const dispatch = useDispatch();

  const { loading, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      return history.push("/home");
    }
  }, [history, user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(login(values));
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleGuestLogin = async (e) => {
    e.preventDefault();

    dispatch(login({ email: "aniket@gmail.com", password: "123456" }));
  };

  return (
    <div className="login">
      <div className="login_leftcontainer">
        <div className="leftcontainer_item leftcontainer_item-1">
          <i className="fa fa-search fa-fw" aria-hidden="true"></i>
          <span>Follow your interests.</span>
        </div>

        <div className="leftcontainer_item">
          <i className="fa fa-user fa-fw" aria-hidden="true"></i>
          <span>Hear what people are talking about.</span>
        </div>
        <div className="leftcontainer_item">
          <i className="fa fa-comment fa-fw" aria-hidden="true"></i>
          <span className="label">Join the conversation.</span>
        </div>
      </div>
      <div className="login_container">
        <div className="back_btn">
          <Link to="/">
            <i className="fas fa-arrow-left"></i>
          </Link>
        </div>
        <div className="login_title">
          <img src="/images/social.png" alt="Logo" />
        </div>
        <h3>Log in to amigo.</h3>

        <form onSubmit={handleLogin}>
          <div className="form-control">
            <input
              type="email"
              name="email"
              value={values.email}
              placeholder="johndoe@email.com"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control">
            <input
              type="password"
              placeholder="********"
              minLength={6}
              name="password"
              value={values.password}
              onChange={handleChange}
              required
            />
          </div>
          <button className="login_btn" type="submit" disabled={loading}>
            {loading ? "Loading..." : "LOGIN"}
          </button>
          <br />
          <br />
          <button
            className="login_btn"
            onClick={handleGuestLogin}
            disabled={loading}
          >
            {loading ? "Loading..." : "GUEST LOGIN"}
          </button>

          <Link
            to="/register"
            style={{ textDecoration: "none", cursor: "pointer" }}
          >
            <p>Not a user? Register here</p>
          </Link>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
