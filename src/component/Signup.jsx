import React from "react";

function Signup() {
  return (
    <div className="container">
      <div className="form_wrapper">
        <h1 className="form_heading">Sign Up</h1>
        <p className="form_link">
            <a href="#">Have an account ?</a>
        </p>
        <form action="#" method="POST" className="form">
          <input type="text" placeholder="Username" className="form_input" />
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

export default Signup;
