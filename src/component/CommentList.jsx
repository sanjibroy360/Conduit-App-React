import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slug: props.slug,
    };
  }

  handleDelete = (id) => {
    var url = `https://conduit.productionready.io/api/articles/${this.state.slug}/comments/${id}`;

    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${localStorage.authToken}`,
      },
    }).then((res) => {
      if(res.status === 200) {
        this.props.removeComment(id);
      }
    });
  };

  componentDidMount() {
    var url = `https://conduit.productionready.io/api/articles/${this.state.slug}/comments`;

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${localStorage.authToken}`,
      },
    })
      .then((res) => res.json())
      .then(({ comments }) => {
        this.props.getCommentList(comments);
      });
  }

  render() {
    if (this.state.commentList) {
      console.log(this.state.commentList, "comment list");
    }
    return (
      <>
        {this.props.comments
          ? this.props.comments.map((comment) => {
              return (
                <div className="comment_form">
                  <p className="comment_textarea">{comment.body}</p>
                  <div className="comment_card_footer">
                    <div className="comment_footer_left">
                      <img
                        src={comment.author.image}
                        alt="author"
                        className="author_small_image"
                      />
                      <p className="author_name">{comment.author.username}</p>
                      <p className="comment_date">
                        {comment.createdAt
                          .toString()
                          .slice(0, 10)
                          .split("-")
                          .reverse()
                          .join(" / ")}
                      </p>
                    </div>
                    <div className="comment_del_btn">
                      <button onClick={() => this.handleDelete(comment.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          : ""}
      </>
    );
  }
}

export default withRouter(CommentList);
