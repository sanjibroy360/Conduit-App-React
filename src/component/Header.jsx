import React from "react";
import { NavLink } from "react-router-dom";

function Header(props) {
  return props.isLoggedIn ? loggedInHeader() : notLoggedInHeader();
}

function notLoggedInHeader() {
  return (
    <header>
      <div className="container header_flex">
        <p className="logo">conduit</p>

        <ul className="nav_menu">
          <li>
            <NavLink activeClassName="active_header" exact={true} to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active_header" to="/signin">
              Sign in
            </NavLink>
          </li>
          <li>
            <NavLink to="/register">Sign up</NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
}

function loggedInHeader() {
  return (
    <header>
      <div className="container header_flex">
        <p className="logo">conduit</p>

        <ul className="nav_menu">
          <li>
            <NavLink activeClassName="active_header" exact to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active_header" to="/article/new">
              New Post
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active_header" to="/register">
              Settings
            </NavLink>
          </li>

          <li>
            <NavLink activeClassName="active_header" to="/register">
              Sanjib
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
