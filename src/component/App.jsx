import React from "react";
import Signup from "./Signup.jsx";
import Header from "./Header.jsx";
import Signin from "./Signin.jsx";
import Home from "./Home.jsx";
import CreateArticle from "./CreateArticle.jsx";
import Loader from "./Loader.jsx"
import ArticlePage from "./ArticlePage.jsx";
import EditArticle from "./EditArticle.jsx"
import { Route, Switch } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      userInfo: null,
    };
  }

  componentDidMount() {
    var url = "https://conduit.productionready.io/api/user";

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Token ${localStorage.authToken}`,
      },
    })
      .then((res) => res.json())
      .then(({ user }) => this.setState({ isLoggedIn: true, userInfo: user }));
  }

  updateLoggedIn = (status) => {
    this.setState({ isLoggedIn: status });
  };

  render() {
    if (!this.state.isLoggedIn) {
      return <Loader size="5" />;
    }
    if(!localStorage.currentUser && this.state.userInfo) {
      
      localStorage.setItem("currentUser", JSON.stringify(this.state.userInfo));
    }
    return (
      <>
        <Header isLoggedIn={this.state.isLoggedIn} />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/register" component={Signup} />
          <Route
            path="/signin"
            render={() => <Signin updateLoggedIn={this.updateLoggedIn} />}
          />
          <Route path="/article/new" component={CreateArticle} />
          <Route path="/article/edit/:slug" component={EditArticle} />
          <Route path="/article/:slug" component={ArticlePage} />
        </Switch>
      </>
    );
  }
}

export default App;
