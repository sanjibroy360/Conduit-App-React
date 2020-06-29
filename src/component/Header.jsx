import React from "react";
import { NavLink, Link } from "react-router-dom";

function Header(props) {
  return props.isLoggedIn ? loggedInHeader(props) : notLoggedInHeader(props);
}

function notLoggedInHeader(props) {
  return (
    <header>
      <div className="container header_flex">
        <p>
          <Link to="/" className="logo">conduit</Link>
        </p>

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

function loggedInHeader(props) {
  return (
    <header>
      <div className="container header_flex">
        <p>
          <Link to="/" className="logo">conduit</Link>
        </p>

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
            <NavLink activeClassName="active_header" to={`/setting/${props.userInfo.username}`}>
              Settings
            </NavLink>
          </li>

          <li>
            <NavLink activeClassName="active_header" to={`/user/profile/${props.userInfo.username}`} onClick={() => props.handleProfileVisit(props.userInfo.username)}>
              {props.userInfo.username}
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
