import React, { Component } from "react";
import Loader from "./Loader";
import { Link } from "react-router-dom";

class ProfileArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: props.user,
    };
  }

  componentDidMount() {
    var url = `https://conduit.productionready.io/api/articles?author=${this.state.author}&limit=5&offset=0`;

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${localStorage.getItem("authToken")}`,
      },
    })
      .then((res) => res.json())
      .then(({ articles }) => this.props.getMyArticles({ articles }));
  }

  render() {
    if (!this.props.articleList) {
      return <Loader />;
    }

    return (
      <div className="container">
        <ul className="list_nav">
          <li>
            <button
              onClick={(event) =>
                this.props.getFilteredArticles("myArticles", event)
              }
              className="active_filterParam article_list_btn all_btn"
            >
              My Articles
            </button>
          </li>
          <li>
            <button
              className="article_list_btn favorited_btn"
              onClick={(event) =>
                this.props.getFilteredArticles("favorited", event)
              }
            >
              Favorited Articles
            </button>
          </li>
        </ul>
        <ul>
          {this.props.articleList.map((article) => {
            return (
              <Link to={`/article/${article.slug}`}>
                <li className="article_card">
                  <div className="article_card_left">
                    <div className="article_info">
                      <div className="author_image">
                        <img src={article.author.image} alt="User" />
                      </div>
                      <div>
                        <p className="author_name">
                          <Link
                            to={`/user/profile/${article.author.username}`}
                            onClick={() => this.props.handleProfileVisit(article.author.username)}
                            className="author_name"
                          >
                            {article.author.username}
                          </Link>
                        </p>
                        <p className="create_date">
                          {article.createdAt
                            .toString()
                            .slice(0, 10)
                            .split("-")
                            .reverse()
                            .join(" / ")}
                        </p>
                      </div>
                    </div>

                    <div className="article_content">
                      <h3 className="article_title">{article.title || ""}</h3>
                      <p className="article_desc">
                        {article.description || ""}
                      </p>
                    </div>
                  </div>

                  <div className="article_card_right">
                    <button>{article.favoritesCount}</button>
                  </div>

                  <div className="card_footer">
                    <p>
                      <Link
                        to={`/article/${article.slug}`}
                        className="read_more"
                      >
                        {" "}
                        Read More...
                      </Link>
                    </p>
                    <ul className="card_taglist">
                      {article.tagList.length
                        ? article.tagList.map((tag) => {
                            return <li className="article_card_tag">{tag}</li>;
                          })
                        : ""}
                    </ul>
                  </div>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ProfileArticleList;
