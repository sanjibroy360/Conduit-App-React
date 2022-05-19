import React from "react";
import Signup from "./Signup.jsx";
import Header from "./Header.jsx";
import Signin from "./Signin.jsx";
import Home from "./Home.jsx";
import CreateArticle from "./CreateArticle.jsx";
import Loader from "./Loader.jsx";
import ArticlePage from "./ArticlePage.jsx";
import EditArticle from "./EditArticle.jsx";
import UserProfile from "./UserProfile.jsx";
import Setting from "./Setting.jsx";
import { withRouter, Route, Switch } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      userInfo: null,
      profileVisit: "",
      profile: null,
    };
  }

  handleLogOut = () => {
    this.setState({
      isLoggedIn: false,
      userInfo: null,
      profileVisit: "",
      profile: null,
    });
    localStorage.removeItem("currentUser");
    localStorage.removeItem("authToken");
  };

  updateProfile = (event, updatedUserInfo) => {
    var url = "https://conduit.productionready.io/api/user";
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify(updatedUserInfo),
    })
      .then((res) => res.json())
      .then(({ user }) => {
        console.log(user);
        console.log(this.state.userInfo);
        this.setState({ userInfo: user });
      });
  };

  handleFollow = (isFollowing) => {
    var method;
    if (!isFollowing) {
      method = "POST";
    } else {
      method = "DELETE";
    }

    var url = `https://conduit.productionready.io/api/profiles/${this.state.profileVisit}/follow`;

    fetch(url, {
      method: `${method}`,
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${localStorage.authToken}`,
      },
    })
      .then((res) => res.json())
      .then(({ profile }) => this.setState({ profile }));
  };

  handleProfileVisit = (username) => {
    this.setState({ profileVisit: username });
  };

  componentDidMount() {
    var url = "https://conduit.productionready.io/api/user";
    if (localStorage.authToken) {
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${localStorage.authToken}`,
        },
      })
        .then((res) => res.json())
        .then(({ user }) =>
          this.setState({ isLoggedIn: true, userInfo: user })
        );
    }
  }

  componentDidUpdate(_prevProps, prevState) {
    if (this.state.profileVisit !== prevState.profileVisit) {
      var url = `https://conduit.productionready.io/api/profiles/${this.state.profileVisit}`;

      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${localStorage.getItem("authToken")}`,
        },
      })
        .then((res) => res.json())
        .then(({ profile }) => this.setState({ profile }))
        .catch((error) => console.error(error));

      console.log("Called App.jsx");
    }

    if (
      this.state.userInfo !== prevState.userInfo ||
      (!this.state.isLoggedIn && prevState.isLoggedIn)
    ) {
      this.props.history.push(`/`);
    }
  }

  updateLoggedIn = (status, user) => {
    this.setState({ isLoggedIn: status, userInfo: user });
    console.log(user);
    localStorage.setItem("authToken", user.token);
  };

  render() {
    if (
      (!this.state.isLoggedIn && this.userInfo) ||
      (this.state.profileVisit && !this.state.profile) ||
      (this.state.profile &&
        this.state.profileVisit !== this.state.profile.username)
    ) {
      return <Loader />;
    }
    if (!localStorage.currentUser && this.state.userInfo) {
      localStorage.setItem("currentUser", JSON.stringify(this.state.userInfo));
    }
    return (
      <>
        <Header
          isLoggedIn={this.state.isLoggedIn}
          userInfo={this.state.userInfo}
          handleProfileVisit={this.handleProfileVisit}
        />
        <Switch>
          <Route
            path="/"
            render={() => (
              <Home
                isLoggedIn={this.state.isLoggedIn}
                handleProfileVisit={this.handleProfileVisit}
              />
            )}
            exact
          />
          <Route path="/register" component={Signup} />
          <Route
            path="/signin"
            render={() => <Signin updateLoggedIn={this.updateLoggedIn} />}
          />
          <Route path="/article/new" component={CreateArticle} />
          <Route path="/article/edit/:slug" component={EditArticle} />
          <Route
            path="/article/:slug"
            render={() => (
              <ArticlePage
                handleProfileVisit={this.handleProfileVisit}
                userInfo={this.state.userInfo}
              />
            )}
          />
          <Route
            path="/user/profile/:username"
            render={() => (
              <UserProfile
                handleProfileVisit={this.handleProfileVisit}
                username={this.state.profileVisit}
                profile={this.state.profile}
                currentUser={this.state.userInfo}
                handleFollow={this.handleFollow}
              />
            )}
          />

          <Route
            path="/setting/:username"
            render={() => (
              <Setting
                currentUser={this.state.userInfo}
                updateProfile={this.updateProfile}
                handleLogOut={this.handleLogOut}
              />
            )}
          />
        </Switch>
      </>
    );
  }
}

export default withRouter(App);
