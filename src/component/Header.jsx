import React from "react";
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';


function Header() {
  return (
    <header>
      <div className="container header_flex">
        <p className="logo">conduit</p>

        <ul className="nav_menu">
          <li>
            <Link to="/">
              <button>Home</button>
            </Link>
          </li>
          <li>
            <Link to="/signin">
              <button>Sign in</button>
            </Link>
          </li>
          <li>
            <Link to="/register">
              <button>Sign up</button>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
