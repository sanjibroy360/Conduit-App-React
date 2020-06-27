import React from "react";
import Loader from "./Loader.jsx";
import Comment from "./Comment.jsx";
import { Link } from "react-router-dom";

class ArticlePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem("currentUser")).username,
      slug: props.match.params.slug,
      articleDetails: null,
    };
  }

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
                <h2 className="author_name">{username}</h2>
                <p className="created_at">
                  {createdAt
                    .toString()
                    .slice(0, 10)
                    .split("-")
                    .reverse()
                    .join(" / ")}
                </p>
              </div>
              
              {this.state.user == username ? (
                <div className="article_details_btns">
                  <Link to={`/article/edit/${this.state.slug}`}>
                    <button className="edit_btn">Edit Article</button>
                  </Link>
                  <button className="del_btn">Delete Article</button>
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

            <Comment />
          </div>
        </div>
      </>
    );
  }
}

export default ArticlePage;
