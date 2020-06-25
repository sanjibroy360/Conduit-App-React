import React from "react";

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      userInfo: null
    };
  }

  handleInput = ({target : {name, value}}) => {
    this.setState({[name]:value})
  }

  componentDidMount() {
    // fetch("https://conduit.productionready.io/api/users/login")
    fetch("https://conduit.productionready.io/api/users")
    .then(res => res.json())
    .then({user} => this.setState({userInfo: user}))
  }

  render() {
    return (
      <div className="container">
        <div className="form_wrapper">
          <h1 className="form_heading">Sign Up</h1>
          <p className="form_link">
            <a href="/signin">Have an account ?</a>
          </p>
          <form action="#" method="POST" className="form">
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
              <input type="submit" value="Sign in" className="form_submit" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
