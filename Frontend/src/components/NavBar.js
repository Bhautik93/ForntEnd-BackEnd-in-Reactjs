import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import img1 from "../img/creenSight.png";
import FeedBack from "../pages/feedback/FeedBack";

let bgColor = { backgroundColor: "#63e5ff" };

const NavBar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // alert('are you sure to logout')
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light" style={bgColor}>
        <div className="container-fluid">
          <NavLink className="navbar-brand" exact to="/home">
            <img alt="logo" src={img1} width={"60%"} />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            userInfo-bs-toggle="collapse"
            userInfo-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  exact
                  to="/home"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  exact
                  to="/profile"
                >
                  Profile
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  exact
                >
                  <FeedBack/>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  exact
                  to="/users"
                >
                  Users
                </NavLink>
              </li>
            </ul>
            <form className="d-flex">
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                Logout
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
