import React from "react";
import Loader from "./Loader.jsx";
import Comment from "./Comment.jsx";
import CommentList from "./CommentList.jsx";
import { withRouter, Link } from "react-router-dom";

class ArticlePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.userInfo,
      slug: props.match.params.slug,
      comments: null,
      articleDetails: null,
    };
  }

  updateCommentList = ({ comment }) => {
    var comments = [];
    if (this.state.comments) {
      comments = this.state.comments.slice();
      comments.push(comment);
      this.setState({ comments: comments });
    } else {
      comments.push(comment);
      this.setState({ comments: comments });
    }
  };

  getCommentList = (comments) => {
    this.setState({ comments });
  };

  removeComment = (commentId) => {
    var comments = this.state.comments.filter(
      (comment) => comment.id !== commentId
    );
    this.setState({ comments });
  };

  handleDelete = () => {
    fetch(
      `https://conduit.productionready.io/api/articles/${this.state.slug}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${localStorage.authToken}`,
        },
      }
    ).then((res) => {
      if (res.status === 200) {
        return this.props.history.push("/");
      }
    });
  };

  componentDidMount() {
    var url = `https://conduit.productionready.io/api/articles/${this.state.slug}`;

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${localStorage.authToken}`,
      },
    })
      .then((res) => res.json())
      .then(({ article }) => this.setState({ articleDetails: article }));
  }

  render() {
    if (!this.state.articleDetails) {
      return <Loader />;
    }

    if (this.state.comments) {
      console.log(this.state.comments, "article page comments");
    }

    let { createdAt, title, tagList, body } = this.state.articleDetails;
    let { username, image } = this.state.articleDetails.author;

    return (
      <>
        <div className="article_page_header">
          <div className="container">
            <h1 className="article_heading">{title}</h1>
            <div className="article_details_wrapper">
              <div className="article_author_image">
                <img src={image} alt="Author" />
              </div>

              <div className="article_details">
                <Link
                  to={`/user/profile/${username}`}
                  className="author_name"
                >
                  {username}
                </Link>
                <p className="created_at">
                  {createdAt
                    .toString()
                    .slice(0, 10)
                    .split("-")
                    .reverse()
                    .join(" / ")}
                </p>
              </div>

              {this.state.user.username === username ? (
                <div className="article_details_btns">
                  <Link to={`/article/edit/${this.state.slug}`}>
                    <button className="edit_btn">Edit Article</button>
                  </Link>
                  <button onClick={this.handleDelete} className="del_btn">
                    Delete Article
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="article_content_part">
          <div className="container">
            <p className="article_content">{body}</p>
            <ul className="taglist articlee_page_taglist">
              {tagList.map((tag) => {
                return <li className="taglist_btn">{tag}</li>;
              })}
            </ul>
            <hr />
            <Comment
              slug={this.state.slug}
              updateCommentList={this.updateCommentList}
            />
            <CommentList
              slug={this.state.slug}
              getCommentList={this.getCommentList}
              comments={this.state.comments}
              removeComment={this.removeComment}
            />
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(ArticlePage);
