import React from "react";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
    };
  }

  handleInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    var url = "https://conduit.productionready.io/api/users";
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: this.state }),
    }).then((res) => {
      if (res.status === 200) {
        this.props.history.push("/signin");
      }
    });
  };

  render() {
    return (
      <div className="container">
        <div className="form_wrapper">
          <h1 className="form_heading">Sign Up</h1>
          <p className="form_link">
            <a href="/signin">Have an account ?</a>
          </p>
          <div className="form">
            {" "}
            {/*/api/users*/}
            <input
              type="text"
              placeholder="Username"
              className="form_input"
              onChange={this.handleInput}
              name="username"
            />
            <input
              type="email"
              placeholder="Email"
              className="form_input"
              onChange={this.handleInput}
              name="email"
            />
            <input
              type="password"
              placeholder="Password"
              className="form_input"
              onChange={this.handleInput}
              name="password"
            />
            <div className="btn_wrapper">
              <input
                onClick={this.handleSubmit}
                type="submit"
                value="Sign in"
                className="form_submit"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
