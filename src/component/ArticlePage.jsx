import React from "react";
import Loader from "./Loader.jsx";

class ArticlePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    console.log(this.state);
    let username = this.state.articleDetails.author.username;
    let createdAt = this.state.articleDetails.createdAt;
    let title = this.state.articleDetails.title;
    let description = this.state.articleDetails.description;
    let image = this.state.articleDetails.author.image;
    let tagList = this.state.articleDetails.tagList.slice();
    let content = this.state.articleDetails.body;
    return (
      <>
        <div className="article_page_header">
          <div className="container">
            <h1 className="article_heading">{title}</h1>
            <div className="article_details_wrapper">
              <div className="article_author_image">
                <img src={image} alt="User's Image" />
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

              <div className="article_details_btns">
                <button>Edit Article</button>
                <button className="del_btn">Delete Article</button>
              </div>
            </div>
          </div>
        </div>
        <div className="article_content_part">
          <div className="container">
            <ul className="taglist articlee_page_taglist">
              {tagList.map((tag) => {
                return <li className="taglist_btn">{tag}</li>;
              })}
            </ul>
            <p className="article_content">{content}</p>
          </div>
        </div>{" "}
      </>
    );
  }
}

export default ArticlePage;
