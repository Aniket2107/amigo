import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import "./login/login.css";

const Landing = ({ history }) => {
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      return history.push("/home");
    }
  }, [history, user]);

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

      <div className="landing_rightcontainer">
        <div>
          <img src="images/social.png" alt="logo" />
          <h3>
            See what's happening in
            <br /> the world right now
          </h3>
          <span>Join amigo Today</span>
        </div>

        <Link to="/register" style={{ textDecoration: "none" }}>
          <button className="landing_register">Register</button>
        </Link>

        <Link to="/login" style={{ textDecoration: "none" }}>
          <button className="landing_login">Login</button>
        </Link>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Landing;
