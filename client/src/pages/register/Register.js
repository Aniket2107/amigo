import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { register } from "../../redux/actions/authActions";

import "../login/login.css";

function Register() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    name: "",
  });

  const history = useHistory();
  const dispatch = useDispatch();

  const { loading, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      return history.push("/home");
    }
  }, [history, user]);

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(register(values));
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
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
        <h3>Register @ amigo.</h3>

        <form onSubmit={handleRegister}>
          <div className="form-control">
            <input
              type="text"
              placeholder="John Doe"
              name="name"
              value={values.name}
              onChange={handleChange}
              minLength={3}
              required
            />
          </div>

          <div className="form-control">
            <input
              type="email"
              placeholder="johndoe@email.com"
              name="email"
              value={values.email}
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
            {loading ? "Loading..." : "Register"}
          </button>

          <Link
            to="/login"
            style={{ textDecoration: "none", cursor: "pointer" }}
          >
            <p>Already a user? Login here</p>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Register;
