import React, { Component } from "react";
import Loader from "./Loader";
import { withRouter } from "react-router-dom";
import ProfileArticleList from "./ProfileArticleList.jsx";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.profile,
      username: props.username || props.match.params.username,
      currentUser: props.currentUser,
      articleList: [],
    };
  }

  componentDidMount() {
    var url = `https://conduit.productionready.io/api/profiles/${this.state.username}`;

      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${localStorage.getItem("authToken")}`,
        },
      })
        .then((res) => res.json())
        .then(({ profile }) => this.setState({ user: profile }))
        .catch((error) => alert(error));

  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.profile.following !== prevProps.profile.following) {
      this.setState({ user: this.props.profile });
    }
  }

  getMyArticles = ({ articles }) => {
    this.setState({ articleList: articles });
  };

  getFilteredArticles = (filterParam, event) => {
    var prevBtn = document.querySelector(".active_filterParam");
    prevBtn.classList.remove("active_filterParam");
    event.target.classList.add("active_filterParam");
    console.log({ filterParam });

    if (filterParam === "myArticles") {
      fetch(
        `https://conduit.productionready.io/api/articles?author=${this.state.username}&limit=5&offset=0`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Token ${localStorage.getItem("authToken")}`,
          },
        }
      )
        .then((response) => response.json())
        .then(({ articles }) => this.setState({ articleList: articles }));
    } else if (filterParam === "favorited") {
      fetch(
        `https://conduit.productionready.io/api/articles?favorited=${this.state.username}&limit=5&offset=0`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Token ${localStorage.getItem("authToken")}`,
          },
        }
      )
        .then((response) => response.json())
        .then(({ articles }) => this.setState({ articleList: articles }));
    }
  };

  render() {
    if (!this.state.user) {
      return <Loader />;
    }

    var { user, username } = this.state;
    console.log(username);

    return (
      <div>
        <div className="profile_hero_sec">
          <div className="container profile_info">
            <div className="user_image_wrapper">
              <img src={user.image} alt="User" className="user_image" />
            </div>
            <p className="profile_username">{user.username}</p>
            <div className="follow_btn_wrapper">
              {this.state.currentUser.username && this.state.currentUser.username !== this.state.username ? (
                <button
                  className="follow_btn"
                  onClick={() => this.props.handleFollow(user.following)}
                >
                  {user.following
                    ? `+ Unfollow ${user.username}`
                    : `+ Follow ${user.username}`}
                </button>
              ) : (
                <button className="follow_btn">Edit Profile</button>
              )}
            </div>
          </div>
        </div>

        <div className="profile_articles_sec">
          <ProfileArticleList
            user={this.state.username}
            articleList={this.state.articleList}
            getMyArticles={this.getMyArticles}
            getFilteredArticles={this.getFilteredArticles}
            handleProfileVisit={this.props.handleProfileVisit}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(UserProfile);
