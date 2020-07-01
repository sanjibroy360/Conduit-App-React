import React from "react";
import {withRouter} from "react-router-dom"

class CreateArtilce extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.currentUser.username,
      bio: props.currentUser.bio,
      email: props.currentUser.email,
      password: "",
      image:props.currentUser.image
    };
  }

  handleInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };


  render() {
   
    return (
      <div className="container">
        <div className="form_wrapper">
          <h1 className="form_heading">Your Settings</h1>
          <div className="form">
            {" "}
            {/*/api/users*/}
            <input
              type="text"
              placeholder="URL of profile picture"
              className="form_input"
              onChange={this.handleInput}
              value={this.state.image}
              name="image"
            />
            <input
              type="text"
              placeholder="Username"
              className="form_input"
              onChange={this.handleInput}
              value={this.state.username}
              name="username"
            />
            <textarea
              name="bio"
              onChange={this.handleInput}
              className="form_input"
              rows="10"
              placeholder="Short bio about you"
              value={this.state.bio}
            ></textarea>
            <input
              type="text"
              placeholder="Email"
              className="form_input"
              onChange={this.handleInput}
              value={this.state.email}
              name="email"
            />
            <input
              type="text"
              placeholder="New Password"
              className="form_input"
              onChange={this.handleInput}
              value={this.state.password}
              name="password"
            />

            <div className="btn_wrapper">
              <input
                onClick={(event) => this.props.updateProfile(event, {user: this.state})}
                type="submit"
                value="Update Settings"
                className="form_submit"
              />
            </div>
          </div>
          <button onClick={this.props.handleLogOut}>Log Out</button>
        </div>
       
      </div>
    );
  }
}

export default withRouter(CreateArtilce);
