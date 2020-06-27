import React from "react";
import { Link, withRouter } from "react-router-dom";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    
    var url = "https://conduit.productionready.io/api/users/login"
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: this.state }),
    }).then((res) => {
        if (res.status === 200) {
          this.props.history.push("/");
          this.props.updateLoggedIn(true);
        }
        return res.json();
      })
      .then(({user}) => localStorage.setItem("authToken",user.token))
      .catch(err => console.log(err));
      // .this(({ user }) => console.log(user));
  };

  render() {
    return (
      <div className="container">
        <div className="form_wrapper">
          <h1 className="form_heading">Sign in</h1>
          <p className="form_link">
            <Link to="/register">Need an account ?</Link>
          </p>
          <div className="form">
            {" "}
            {/*/api/users/login*/}
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={this.handleInput}
              className="form_input"
              value={this.state.email}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form_input"
              onChange={this.handleInput}
              value={this.state.password}
            />
            <div className="btn_wrapper">
              <input
                type="submit"
                value="Sign in"
                className="form_submit"
                onClick={this.handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Signin);
