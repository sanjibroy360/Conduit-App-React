import React from "react";

function Signin(props=null) {
  return (
    <div className="container">
      <div className="form_wrapper">
        <h1 className="form_heading">Sign in</h1>
        <p className="form_link">
            <a href="/register">Need an account ?</a>
        </p>
        <form action="/api/users/login" method="POST" className="form"> {/*/api/users/login*/}
          <input type="email" placeholder="Email" className="form_input" />
          <input
            type="password"
            placeholder="Password"
            className="form_input"
          />
          <div className="btn_wrapper">
            <input type="submit" value="Sign in" className="form_submit" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;
